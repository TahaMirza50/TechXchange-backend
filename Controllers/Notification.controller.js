const mongoose = require('mongoose')
const UserProfile = require('../Models/UserProfile.model')
const NotificationsBox = require('../Models/NotificationsBox.model')

const getNotificationBox = async (req,res) => {
    const id = req.user.profileID

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('invalid')
    }

    try{
        const userProfile = await UserProfile.findById(id).populate('notificationsID')
        const notifications = userProfile.notificationsID.notifications
        res.status(200).json(notifications)
    }
    catch(error){
        console.log(error)
        res.status(500)
    }
}

const deleteNotification = async (req,res) => {
    const id = req.user.profileID

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('invalid')
    }

    try{
        const notificationBox = await NotificationsBox.findOne({userID: id})
        
        notificationBox.notifications = notificationBox.notifications.filter((notification) => {
            return notification._id != req.params.notid;
        })
        await notificationBox.save()
       res.status(200).send('notification deleted successfully')
    }
    catch(error){
        console.log(error)
        res.status(500)
    }
}



module.exports = {getNotificationBox, deleteNotification}