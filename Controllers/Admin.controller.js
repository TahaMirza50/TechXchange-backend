const mongoose = require('mongoose')
const UserProfile = require('../Models/UserProfile.model')
const Advert = require('../Models/Advert.model'); 
const Notification = require('../Models/NotificationsBox.model'); 

const getUserRatings = async (req,res) => {

    try{
        const userProfiles = await UserProfile.find({rating: { $lte: req.params.rating }}).select('firstName lastName')
        console.log(userProfiles)
        res.status(200).json(userProfiles)
    }
    catch(error){
        console.log(error)
        res.status(500)
    }

};

module.exports = {getUserRatings}