const mongoose = require('mongoose');
const Advert = require('../Models/Advert.model');
const UserWishlist = require('../Models/UserWishlist.model');
const cloudinary = require("../Configuration/Cloudinary.config");
const NotificationsBox = require('../Models/NotificationsBox.model');
const UserProfile = require('../Models/UserProfile.model');
const ChatRoom = require('../Models/ChatRoom.model');

const newAdvert = async (req, res) => {

  const userID = req.user.profileID;

  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return res.status(404).json({ error: 'invalid' });
  }

  try {

    const advert = new Advert({
      userId: userID,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      condition: req.body.condition,
      categoryId: req.body.categoryId,
      location: req.body.location,
      wishListedByUser: []
    });

    await advert.save();

    res.status(200).send(advert);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const newAdvertUploadImage = async (req, res) => {

  const uploadedImages = [];
  const uploadPromises = req.files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
        if (result) {
          uploadedImages.push(result.url);
          resolve(); // Resolve the promise when upload is successful
        } else if (error) {
          console.error('Error uploading image to Cloudinary:', error);
          reject(error); // Reject the promise if there's an error
        }
      }).end(file.buffer);
    });
  });

  try {
    await Promise.all(uploadPromises);
    console.log(uploadedImages);

    const result = await Advert.findByIdAndUpdate(req.params.advertId, { images: uploadedImages });

    res.status(200).json({ message: 'Images uploaded to Cloudinary', uploadedImages }).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const getAdvertByAdmin = async (req, res) => {

  try {
    const result = await Advert.findById(req.params.advertId);

    if (!result) {
      return res.status(404).json({ error: 'User report not found' });
    }

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const updateAdvert = async (req, res) => {

  const userID = req.user.profileID;

  const advertId = req.params.advertId;
  const updateData = req.body;

  try {
    const result = await Advert.findOneAndUpdate({ _id: advertId, userId: userID, delete: false }, updateData, { new: true });

    if (!result) {
      return res.status(404).json({ message: 'Advertisement not found' });
    };

    res.status(200).send(result);

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const deleteAdvert = async (req, res) => {

  const userID = req.user.profileID;

  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return res.status(404).json({ error: 'invalid' });
  }

  const advertID = req.params.advertId;

  try {
    const result = await Advert.findOneAndUpdate({ _id: advertID, userId: userID, delete: false }, { delete: true }, { new: true });
  
    if (!result) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }

    for (const part of result.wishListedByUser) {
      const userProfile = await UserProfile.findById(part).select('wishlistID');
      const userWishlist = await UserWishlist.findById(userProfile.wishlistID);
      userWishlist.wishlist.pull(advertID);
      await userWishlist.save();
    }

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }

};

const getAllAdvertsOfUser = async (req, res) => {
  const userID = req.user.profileID;

  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return res.status(404).json({ error: 'invalid' });
  }

  try {
    const result = await Advert.find({ userId: userID, delete: false });

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const getAdvert = async (req, res) => {
  const advertId = req.params.advertId;

  try {
    const advert = await Advert.findOne({ _id: advertId, delete: false, status: 'approved' });

    if (!advert) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }

    res.status(200).send(result);
  } catch (err) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const getAdvertsByCategory = async (req, res) => {

  const categoryId = req.params.categoryId;

  try {
    const advertsInCategory = await Advertisement.find({ category: categoryId, delete: false, status: 'approved' })
      .sort({ timestamp: -1 })
      .limit(10);

    res.status(200).send(advertsInCategory);

  } catch (err) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Get advertisements that have been reviewed and match a search criteria
exports.getAdvertsBySearch = async (req, res) => {
  const { searchTerm } = req.query;

  try {
    // Find advertisements that match the search term and are not soft-deleted
    const matchedAdverts = await Advertisement.find({
      $text: { $search: searchTerm },
      isDeleted: { $ne: true }, // Exclude soft-deleted ads
    });

    if (!matchedAdverts.length) {
      return res.status(404).json({ message: 'No matching advertisements found' });
    }

    res.json(matchedAdverts);
  } catch (err) {
    res.status(500).send(err);
  }
};

const markAdvertSold = async (req, res) => {

  const advertId = req.params.advertId;
  const userId = req.user.profileID;

  try {
    const advert = await Advert.findById(advertId);

    if (!advert) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }

    if (advert.userId != userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    advert.sold = true;
    await advert.save();

    for (const part of advert.wishListedByUser) {
      const notificationBox = await NotificationsBox.findOne({ userID: part });
      notificationBox.notifications.push({ type: 'fav_add_sold', advertId: advertId });
      await notificationBox.save();
    };

    const updatedChatRooms = await ChatRoom.find({ advertId: advertId, disabled: false });
    for (const chat of updatedChatRooms) {
      chat.disabled = true;
      await chat.save();
    }

    res.status(200).send(advert);

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const approveAdvertByAdmin = async (req, res) => {

  const advertID = req.params.advertId;
  const userID = req.user.profileID;

  try {

    const result = await Advert.findOneAndUpdate({ _id: advertID, status: 'in review', delete: false }, { status: 'approved' }, { new: true });

    if (!result) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }

    const notBox = await NotificationsBox.findOne({ userID: result.userId });
    notBox.notifications.push({ type: 'add_approved', advertId: advertID });
    await notBox.save();

    res.status(200).send(result);

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const rejectAdvertByAdmin = async (req, res) => {

  const advertID = req.params.advertId;

  try {

    const result = await Advert.findOneAndUpdate({ _id: advertID, status: 'in review', delete: false }, { status: 'rejected' }, { new: true });

    if (!result) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }

    const notBox = await NotificationsBox.findOne({ userID: result.userId });
    notBox.notifications.push({ type: 'add_rejected', advertId: advertID });
    await notBox.save();

    res.status(200).send(result);

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const getInReviewAdvertByAdmin = async (req, res) => {

  try {
    const result = await Advert.find({ status: 'in review', delete: false, sold: false });

    res.status(200).send(result);

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  newAdvert, getAdvertByAdmin, newAdvertUploadImage, updateAdvert, getAllAdvertsOfUser, getAdvert, markAdvertSold, deleteAdvert,
  getAdvertsByCategory, approveAdvertByAdmin, rejectAdvertByAdmin, getInReviewAdvertByAdmin
};
