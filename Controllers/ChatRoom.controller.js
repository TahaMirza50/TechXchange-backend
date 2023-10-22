const ChatRoom = require('../Models/ChatRoom.model');
const UserProfile = require('../Models/UserProfile.model');
const mongoose = require('mongoose');

const getAllChatRooms = async (req, res) => {

    const userID = req.user.profileID;

    if (!mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(404).json({ error: 'invalid' });
    }

    try {
        const result = await UserProfile.findById(req.user.profileID);

        const chatsArray = [];
        for (const chat of result.chatRooms) {
            const c = await ChatRoom.findById(chat).populate({
                path: 'participants',
                select: 'firstName lastName'
            });

            chatsArray.push(c);
        };
        res.status(200).send(chatsArray)
    } catch (error) {
        console.log(error)
        res.status(500)
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
            // 'advertID': req.body.advertID,
            'participants': { $all: req.body.participants }
        };
        console.log(filter);

        const result = await ChatRoom.findOne(filter);
        console.log(result)

        if (result == null) {
            chatRoom = new ChatRoom({
                advertID: req.body.advertID,
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

module.exports = { getAllChatRooms, deleteChatRoom, createChatRoom };