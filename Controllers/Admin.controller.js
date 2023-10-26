const mongoose = require('mongoose')
const UserProfile = require('../Models/UserProfile.model')

const getUserRatings = async (req,res) => {

    try{
        const userProfiles = await UserProfile.find({rating: { $lte: req.params.rating }}).select('_id')
        res.status(200).json(userProfiles)
    }
    catch(error){
        console.log(error)
        res.status(500)
    }

}

module.exports = {getUserRatings}