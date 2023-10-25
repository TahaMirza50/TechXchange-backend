const mongoose = require('mongoose');
const Advert = require('../Models/Advert.model');

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
    } catch (error) {
        
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

module.exports = { newAdvert, getAdvertByAdmin };