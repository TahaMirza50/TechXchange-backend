const mongoose = require('mongoose')
const Advert = require('../Models/Advert.model')
const UserWishlist = require('../Models/UserWishlist.model')

const addAdvertWishlist = async (req, res) => {

    const advertid = req.params.advertid
    const id = req.user.profileID
    if (!mongoose.Types.ObjectId.isValid(advertid) || !mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send("invalid id")
    }

    try{
        const userWishlist = await UserWishlist.findOne({userId: id})
        const advert = await Advert.findById(advertid)
        advert.wishListedByUser.push(id)
        userWishlist.wishlist.push(advertid)
        await advert.save()
        await userWishlist.save()
        res.status(200).send("advert added to wishlist successfully!")
    }
    catch(error){
        console.log(error)
        res.status(500)
    }
}

const removeAdvertWishlist = async (req, res) => {

    const advertid = req.params.advertid
    const id = req.user.profileID
    if (!mongoose.Types.ObjectId.isValid(advertid) || !mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send("invalid id")
    }

    try{
        const userWishlist = await UserWishlist.findOne({userId: id})
        const advert = await Advert.findById(advertid)
        advert.wishListedByUser = advert.wishListedByUser.filter((userProfileId) => {
            return userProfileId != id
        })
        userWishlist.wishlist = userWishlist.wishlist.filter( (id) => {
            return id != advertid
        })
        await advert.save()
        await userWishlist.save()
        res.status(200).send("advert removed from wishlist successfully!")
    }
    catch(error){
        console.log(error)
        res.status(500)
    }
}

const getAdvertsWishlist = async (req,res) => {
    const id = req.user.profileID
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send("invalid id")
    }

    try{
        const userWishlist = await UserWishlist.findOne({userId: id}).populate('wishlist')

        res.status(200).json(userWishlist.wishlist)
    }
    catch(error){
        console.log(error)
        res.status(500)
    }
}

const getWishlist = async (req,res) => {
    const id = req.user.profileID
    if (!mongoose.Types.ObjectId.isValid(advertid) || !mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send("invalid id")
    }

    try{
        const userWishlist = await UserWishlist.findOne({userId: id})

        res.status(200).json(userWishlist.wishlist)
    }
    catch(error){
        console.log(error)
        res.status(500)
    }
}

module.exports = {addAdvertWishlist, removeAdvertWishlist, getAdvertsWishlist, getWishlist}