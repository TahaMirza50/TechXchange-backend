const mongoose = require('mongoose');
const Advert = require('../Models/Advert.model');
const cloudinary = require("../Configuration/Cloudinary.config");
// const cloudinary = require('cloudinary');
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

module.exports = { newAdvert, getAdvertByAdmin, newAdvertUploadImage };