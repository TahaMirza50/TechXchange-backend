const UserProfile = require('../Models/UserProfile.model')
const mongoose = require('mongoose')

const getProfile = async (req, res) => {

    const id = req.user.profileID

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('invalid')
    }

    try{
        userProfile = await UserProfile.findById(id)
        if(!userProfile) {
            return res.status(404).send('No such Profile')
        }
        res.status(200).json(userProfile)
    }
    catch(error){
        console.log(error)
        res.status(500)
    }
}

const updateProfile = async (req, res) => {
    const id = req.user.profileID

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('invalid')
    }

    try{
        const userProfile = await UserProfile.findOneAndUpdate({_id: id}, {
            ...req.body
        })
    
        if(!userProfile) {
            return res.status(404).send('No such Profile')
        }
    
        res.status(200).json(userProfile)
    }
    catch(error){
        console.log(error)
        res.status(500)
    }
    
};

const getProfileById = async (req,res) => {

    const id = req.user.profileID

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('invalid')
    }

    try {  

        const result = await UserProfile.findById(req.params.profileId).select('firstName lastName contact address CNIC rating socialMediaLinks');

        if (!result) {
            return res.status(404).json({ error: 'No profile found.' });
        }

        res.status(200).send(result);
        
    } catch (error) {
        console.log(error)
        res.status(500)
    }

};


module.exports = {getProfile, updateProfile, getProfileById}