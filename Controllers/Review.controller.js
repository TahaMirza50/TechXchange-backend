const mongoose = require('mongoose')
const Review = require('../Models/Review.model')
const UserProfile = require('../Models/UserProfile.model')

const getReviews = async (req, res) => {

    const id = req.user.profileID

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('invalid')
    }

    try{
        const reviews = await Review.findOne({userID: id})
        res.status(200).json(reviews)
    }
    catch(error){
        console.log(error)
        res.status(500)
    }
    
}

const createReview = async (req, res) => {
    const id = req.user.profileID

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('invalid')
    }

    try{
        const review = await Review.findOne({userID: id})
        if (review.ratings.some((rating) => rating.ratedUserId.toString() === req.body.userid)) {
            return res.send('You have already rated this user!')
        }
        const userProfile = await UserProfile.findById(req.body.userid)
        review.ratings.push({ratedUserId: req.body.userid, rating: req.body.rating})
        userProfile.rating = calculateAverage(userProfile, req.body.rating)
        await userProfile.save()
        await review.save()
        res.status(200).send('Review submitted successfully!')
    }
    catch(error){
        console.log(error)
        res.status(500)
    }
}



function calculateAverage (userProfile, newRating) {
    const rating = ((userProfile.rating*userProfile.numberOfReviews) + newRating)/(userProfile.numberOfReviews +1)
    userProfile.numberOfReviews = userProfile.numberOfReviews + 1
    return rating
}

module.exports = {getReviews, createReview}