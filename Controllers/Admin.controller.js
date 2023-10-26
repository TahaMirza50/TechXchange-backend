const mongoose = require('mongoose')
const UserProfile = require('../Models/UserProfile.model')
const Advert = require('../Models/Advert.model'); 
const Notification = require('../Models/NotificationsBox.model'); 

const getUserRatings = async (req,res) => {

    try{
        const userProfiles = await UserProfile.find({rating: { $lte: req.params.rating }}).select('_id')
        res.status(200).json(userProfiles)
    }
    catch(error){
        console.log(error)
        res.status(500)
    }

}

// Update and approve an advertisement in review and send a notification
exports.approveReviewAdvertisement = async (req, res) => {
    const { id } = req.params;
  
    try {
      const advert = await Advert.findByIdAndUpdate(id, { status: 'approved' }, { new: true });
  
      if (!advert) {
        return res.status(404).json({ message: 'Advertisement not found' });
      }
  
      // Create and send a notification to the user
      const notification = new Notification({
        userId: advert.createdBy, // Assuming 'createdBy' is the user who created the advertisement
        message: `Your advertisement '${advert.title}' has been approved by the admin.`,
      });
  
      await notification.save();
  
      res.json(advert);
    } catch (err) {
      res.status(500).send(err);
    }
  };

module.exports = {getUserRatings}