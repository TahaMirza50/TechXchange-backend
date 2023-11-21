const mongoose = require('mongoose')
const Advert = require('../Models/Advert.model')
const UserWishlist = require('../Models/UserWishlist.model')

const addAdvertWishlist = async (req, res) => {

    const advertId = req.params.advertId
    const id = req.user.profileID
    if (!mongoose.Types.ObjectId.isValid(advertId) || !mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send("invalid id")
    }

    try{
        const userWishlist = await UserWishlist.findOne({userId: id})
        const advert = await Advert.findById(advertId)
        advert.wishListedByUser.push(id)
        userWishlist.wishlist.push(advertId)
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

    const advertId = req.params.advertId
    const id = req.user.profileID
    if (!mongoose.Types.ObjectId.isValid(advertId) || !mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send("invalid id")
    }

    try{
        const userWishlist = await UserWishlist.findOne({userId: id})
        const advert = await Advert.findById(advertId)
        advert.wishListedByUser = advert.wishListedByUser.filter((userProfileId) => {
            return userProfileId != id
        })
        userWishlist.wishlist = userWishlist.wishlist.filter( (id) => {
            return id != advertId
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
    if (!mongoose.Types.ObjectId.isValid(id)){
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