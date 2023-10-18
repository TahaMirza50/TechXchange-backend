const User = require('../Models/User.model');
const UserProfile = require('../Models/UserProfile.model');
const UserWishlist = require('../Models/UserWishlist.model');
const NotificationsBox = require('../Models/NotificationsBox.model');
const Review = require('../Models/Review.model');
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    user = await User.findOne({ email: req.body.email });
    if (user != null) {
        return res.status(400).send('Email already exist, Please login.');
    }
    try {
        encryptedPass = await bcrypt.hash(req.body.password, 10);
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
};

const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user == null) {
        return res.status(400).send('Cannot find user, Please register.');
    }

    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            console.log(user.profileID)
            const accessToken = jwt.sign({ profileID: user.profileID, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            const refreshToken = jwt.sign({ profileID: user.profileID, role: user.role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '24h' });
            res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
        } else {
            return res.status(400).send("Password doesn't match.");
        };
    } catch (error) {
        console.log(error.message)
        res.sendStatus(500);
    }

};

const getAccessToken = async (req,res) => {
    const accessToken = jwt.sign({ profileID: req.user.profileID, role: req.user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    res.status(200).json({accessToken: accessToken});
};

module.exports = { register, login, getAccessToken };