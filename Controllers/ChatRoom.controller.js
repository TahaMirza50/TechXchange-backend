const ChatRoom = require('../Models/ChatRoom.model');
const NotificationsBox = require('../Models/NotificationsBox.model');
const UserProfile = require('../Models/UserProfile.model');
const mongoose = require('mongoose');

const getAllChatRooms = async (req, res) => {

    const userID = req.user.profileID;

    if (!mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(404).json({ error: 'invalid' });
    }

    try {
        const result = await UserProfile.findById(req.user.profileID).select('chatRooms').populate({
            path: 'chatRooms',
            populate: [
                {
                    path: 'participants',
                    select: 'firstName lastName'
                },
                {
                    path: 'messages',
                    populate: {
                        path: 'userID',
                        select: 'firstName lastName'
                    }
                }
            ]
        });

        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        res.status(500).send();
    }

};

// chatroom is only deleted from the side of user that requested it, if both user requested to delete
// then whole chatroom is deleted.

const deleteChatRoom = async (req, res) => {

    const userID = req.user.profileID;
    const chatID = req.params.chatRoomID;

    try {
        const chat = await ChatRoom.findById(chatID);
        if (chat === null) {
            res.status(404).json({ error: "Invalid chat id." });
        } else {
            for (const part of chat.participants) {

                const userChatRooms = await UserProfile.findById(part).select('chatRooms');
                console.log(userChatRooms);
                if (part == userID) {

                    const newArray = userChatRooms.chatRooms.filter(item => item != chatID);

                    const result = await UserProfile.findByIdAndUpdate(
                        part,
                        { $set: { chatRooms: newArray } }
                    );
                }
                else {
                    if (!userChatRooms.chatRooms.includes(chatID)) {
                        const result = await ChatRoom.findByIdAndDelete(chatID);
                    }
                }
            }

            res.status(200).json({ message: "Chat deleted successfully" });
        }
    } catch (error) {
        console.log(error)
        res.status(500)
    }


};

const createChatRoom = async (req, res) => {

    const userID = req.user.profileID;

    if (!mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(404).json({ error: 'invalid' });
    }

    try {

        const filter = {
            'advertID': req.body.advertID,
            'participants': { $all: req.body.participants }
        };

        const result = await ChatRoom.findOne(filter);

        if (result == null) {
            chatRoom = new ChatRoom({
                advertId: req.body.advertID,
            });

            chatRoom.participants.push(req.body.participants[0]);
            chatRoom.participants.push(req.body.participants[1]);

            const chatResult = await chatRoom.save();

            for (const part of req.body.participants) {

                const userProfile = await UserProfile.findById(part);

                if (userProfile) {
                    userProfile.chatRooms.push(chatRoom._id);
                    await userProfile.save();
                }
                else {
                    return res.status(404).json({ error: 'No such Profile' })
                }

            };
            res.status(200).send(chatResult);


        } else {
            for (const part of req.body.participants) {
                if (part == userID) {
                    const userProfile = await UserProfile.findById(part);

                    if (userProfile) {
                        userProfile.chatRooms.push(result._id);
                        await userProfile.save();
                    }
                    else {
                        return res.status(404).json({ error: 'No such Profile' })
                    }
                }

            };
            res.status(200).send(result);

        }

    } catch (error) {
        console.log(error)
        res.status(500)
    }

};

const sendMessage = async (req, res) => {

    const userID = req.user.profileID;
    const chatID = req.body.chatID;

    if (!mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(404).json({ error: 'invalid' });
    }

    try {
        const chat = await ChatRoom.findOne({ _id: chatID, disabled: false });

        for (const part of chat.participants) {

            if (part != userID) {
                const userProfile = await UserProfile.findById(part);

                if (!userProfile.chatRooms.includes(chatID)) {
                    userProfile.chatRooms.push(chatID);
                    await userProfile.save();
                }
                const notBox = await NotificationsBox.findById(userProfile.notificationsID);
                notBox.notifications.push({ type: "message_received", advertId: chat.advertId });
                await notBox.save();
            }
        }

        chat.messages.push({ userID: userID, message: req.body.message });

        await chat.save();

        res.status(200).send(chat);

    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
};

const getChatroom = async (req, res) => {

    const advertID = req.params.advertId
    const id = req.user.profileID
    if (!mongoose.Types.ObjectId.isValid(advertID) || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("invalid id")
    }

    try {
        const chatRoom = await ChatRoom.findOne({ advertId: advertID, participants: { $in: [id] } }).populate({
            path: 'participants',
            select: 'firstName lastName'
        }).populate({
            path: 'messages',
            populate: {
                path: 'userID',
                select: 'firstName lastName'
            }
        });

        res.status(200).json(chatRoom)
    }
    catch (error) {
        console.log(error)
        res.status(500).send();
    }

}

const deleteMessage = async (req, res) => {

    const id = req.user.profileID;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("invalid id")
    }

    const chatID = req.body.chatID;
    const messageID = req.body.messageID;

    try {
        await ChatRoom.updateOne(
            { _id: chatID },
            { $pull: { messages: { _id: messageID,userID:id } } })
        
        res.status(200).send();
        
    } catch (error) {
        console.log(error)
        res.status(500).send();
    }
}

module.exports = { getAllChatRooms, deleteChatRoom, createChatRoom, sendMessage, getChatroom, deleteMessage };