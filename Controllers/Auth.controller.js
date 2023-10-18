const User = require('../Models/User.model');
const UserProfile = require('../Models/UserProfile.model');
const UserWishlist = require('../Models/UserWishlist.model');
const NotificationsBox = require('../Models/NotificationsBox.model');
const Review = require('../Models/Review.model');
const bcrypt = require('bcrypt');

const register = async (req,res) => {
    user = await User.findOne({email:req.body.email});
    if(user != null){
        return res.status(400).send('Email already exist, Please login.');
    }
    try {
        encryptedPass = await bcrypt.hash(req.body.password,10); 
        user = new User({
            email: req.body.email,
            password: encryptedPass,
        });

        userProfile = new UserProfile({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            contact: req.body.contact,
            CNIC: req.body.CNIC,
            birthday: req.body.birthday,
            socialMediaLinks: req.body.socialMediaLinks,
        });

        wishlist = new UserWishlist({
            userId: user._id,
            wishlist: [],
        });

        notificationsBox = new NotificationsBox({
            userID: user._id,
            notifications: [],
        });

        review = new Review({
            userID: user._id,
            ratings: [],
        });

        user.profileID = userProfile._id;
        userProfile.wishlistID = wishlist._id;
        userProfile.notificationsID = notificationsBox._id;
        userProfile.reviewsID = review._id;

        const result1 = await user.save();
        const [result2, result3, result4, result5] = await Promise.all([
            userProfile.save(),
            wishlist.save(),
            notificationsBox.save(),
            review.save()
        ]);
    
        res.status(201).send(result1);

    } catch (error) {
        console.log(error.message)
        res.status(500).send();
    }
}

module.exports = {register};