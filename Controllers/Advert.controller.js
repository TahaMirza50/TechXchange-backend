const mongoose = require('mongoose');
const Advert = require('../Models/Advert.model');
<<<<<<< HEAD
const Review = require('../Models/Review.model');
const Notification = require('../Models/NotificationsBox.model');

=======
const cloudinary = require("../Configuration/Cloudinary.config");
// const cloudinary = require('cloudinary');
>>>>>>> d60314120f4950c15894a49a98265e2cd1ce84aa
const newAdvert = async (req,res) => {
    
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
        res.status(500);   
    }
};

const newAdvertUploadImage = async (req,res) => {

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

        const result = await Advert.findByIdAndUpdate(req.params.advertId,{images:uploadedImages});

        res.status(200).json({ message: 'Images uploaded to Cloudinary', uploadedImages }).send();
      } catch (error) {
        console.error(error);
        res.status(500);
      }
};

const getAdvertByAdmin = async (req,res) => {

    try {
        const result = await Advert.findById(req.params.advertId);

        if(!result){
            return res.status(404).json({ error: 'User report not found' });
          }

        res.status(result).send();
    } catch (error) {
        console.error(error);
        res.status(500);        
    }
};

<<<<<<< HEAD
// Update an advertisement by ID
exports.updateAdvert = (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
  
    Advert.findByIdAndUpdate(id, updateData, { new: true }, (err, advert) => {
      if (err) {
        return res.status(500).send(err);
      }
  
      if (!advert) {
        return res.status(404).json({ message: 'Advertisement not found' });
      }
  
      res.json(advert);
    });
  };

// Soft Delete an advertisement by User
exports.softDeleteAdvertisement = async (req, res) => {
  const { id } = req.params;

  try {
    const advert = await Advert.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

    if (!advert) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }

    res.json(advert);
  } catch (err) {
    res.status(500).send(err);
  }
};


  // Get all advertisements of a user
exports.getAllAdvertsOfUser = (req, res) => {
    const { userId } = req.params;
  
    Advert.find({ createdBy: userId }, (err, adverts) => {
      if (err) {
        return res.status(500).send(err);
      }
  
      res.json(adverts);
    });
  };

  // Get a single advertisement that has been reviewed
exports.getReviewedAdvert = async (req, res) => {
    const { id } = req.params;
  
    try {
      const advert = await Advert.findById(id);
  
      if (!advert) {
        return res.status(404).json({ message: 'Advertisement not found' });
      }
  
      const reviews = await Review.find({ advert: id });
  
      if (reviews.length > 0) {
        return res.json(advert);
      }
  
      return res.status(404).json({ message: 'Advertisement has not been reviewed' });
    } catch (err) {
      res.status(500).send(err);
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

// Mark an advertisement as sold and send a notification
  exports.markAdvertisementAsSold = async (req, res) => {
    const { id } = req.params;
  
    try {
      const advert = await Advert.findByIdAndUpdate(id, { isSold: true }, { new: true });
  
      if (!advert) {
        return res.status(404).json({ message: 'Advertisement not found' });
      }
  
      // Create and send a notification to the user
      const notification = new Notification({
        userId: advert.createdBy, // Assuming 'createdBy' is the user who created the advertisement
        message: `Your advertisement '${advert.title}' has been marked as sold.`,
      });
  
      await notification.save();
  
      res.json(advert);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  // Function to reject a review advertisement and send a notification
exports.rejectAdvert = async (req, res) => {
  const { advertId } = req.params;

  try {
    // Update the advertisement status to 'approved' or as needed
    const updatedAdvert = await Advert.findByIdAndUpdate(advertId, { status: 'rejected' }, { new: true });

    if (!updatedAdvert) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }

    // Create and send a notification to the user
    const notification = new Notification({
      userId: updatedAdvert.userId, // Set the user ID of the advertisement owner
      message: 'Your advertisement has been rejected by the admin.',
    });

    await notification.save();

    res.json(updatedAdvert);
  } catch (err) {
    res.status(500).send(err);
  }
};

  // Function to approve a review advertisement and send a notification
  exports.approveAdvert = async (req, res) => {
    const { advertId } = req.params;
  
    try {
      // Update the advertisement status to 'approved' or as needed
      const updatedAdvert = await Advert.findByIdAndUpdate(advertId, { status: 'approved' }, { new: true });
  
      if (!updatedAdvert) {
        return res.status(404).json({ message: 'Advertisement not found' });
      }
  
      // Create and send a notification to the user
      const notification = new Notification({
        userId: updatedAdvert.userId, // Set the user ID of the advertisement owner
        message: 'Your advertisement has been approved by the admin.',
      });
  
      await notification.save();
  
      res.json(updatedAdvert);
    } catch (err) {
      res.status(500).send(err);
    }
  };
  
module.exports = { newAdvert, getAdvertByAdmin };
=======
module.exports = { newAdvert, getAdvertByAdmin, newAdvertUploadImage };
>>>>>>> d60314120f4950c15894a49a98265e2cd1ce84aa
