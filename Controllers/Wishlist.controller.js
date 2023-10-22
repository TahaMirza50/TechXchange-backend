const mongoose = require('mongoose')
const UserProfile = require('../Models/UserProfile.model')
const Advert = require('../Models/Advert.model')

const addAdvertWishlist = async (req, res) => {

    const advertid = req.params.advertid

    if (!mongoose.Types.ObjectId.isValid(advertid)){
        return res.status(404).send("invalid id")
    }

    try{
        const user_profile = await UserProfile.findById(req.user.profileID).populate('wishlistID')
        const advert = await Advert.findById(advertid)
        advert.wishListedByUser.push(req.user.profileID)
        user_profile.wishlistID.wishlist.push(advertid)
        res.status(200).send("advert added to wishlist successfully!")
    }
    catch(error){
        console.log(error)
        res.status(500)
    }
}

const removeAdvertWishlist = async (req, res) => {

    const advertid = req.params.advertid

    if (!mongoose.Types.ObjectId.isValid(advertid)){
        return res.status(404).send('invalid')
    }

    try{
        const user_profile = await UserProfile.findById(req.user.profileID).populate('wishlistID')
        const advert = await Advert.findById(advertid)
        advert.wishListedByUser = advert.wishListedByUser.filter((userProfileId) => {
            return userProfileId != req.user.profileID
        })
        user_profile.wishlistID.wishlist = user_profile.wishlistID.wishlist.filter( (id) => {
            return id != advertid
        })
        res.status(200).send("advert removed from wishlist successfully!")
    }
    catch(error){
        console.log(error)
        res.status(500)
    }
}

const getAdvertsWishlist = async (req,res) => {
    try{
        const user_profile = await UserProfile.findById(req.user.profileID).populate({
            path: 'wishlistID',
            populate: {
                path: 'wishlist'
            }
        })

        res.status(200).json(user_profile.wishlistID.wishlist)
    }
    catch(error){
        console.log(error)
        res.status(500)
    }
}

const getWishlist = async (req,res) => {
    try{
        const user_profile = await UserProfile.findById(req.user.profileID).populate('wishlistID')

        res.status(200).json(user_profile.wishlistID.wishlist)
    }
    catch(error){
        console.log(error)
        res.status(500)
    }
}

module.exports = {addAdvertWishlist, removeAdvertWishlist, getAdvertsWishlist, getWishlist}