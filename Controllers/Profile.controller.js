const UserProfile = require('../Models/UserProfile.model')
const mongoose = require('mongoose')

const getProfile = async (req, res) => {

    const id = req.user.profileID

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'invalid'})
    }

    try{
        userProfile = await UserProfile.findById(req.user.profileID)
        if(!userProfile) {
            return res.status(404).json({error: 'No such Profile'})
        }
        res.status(200).send(userProfile)
    }
    catch(error){
        console.log(error)
        res.status(500)
    }
}

const updateProfile = async (req, res) => {
    const id = req.user.profileID

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'invalid'})
    }

    try{
        const userProfile = await UserProfile.findOneAndUpdate({_id: id}, {
            ...req.body
        })
    
        if(!userProfile) {
            return res.status(404).json({error: 'No such Profile'})
        }
    
        res.status(200).json(userProfile)
    }
    catch(error){
        console.log(error)
        res.status(500)
    }

    
}



module.exports = {getProfile, updateProfile}