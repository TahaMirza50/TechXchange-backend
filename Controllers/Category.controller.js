const Advert = require('../models/advert'); 
const Review = require('../models/review');  


// Get all advertisements in a specific category that have been reviewed
exports.getAdvertsByCategory = async (req, res) => {
  const { categoryName } = req.params;

  try {
    // Find advertisements in the specified category
    const advertsInCategory = await Advertisement.find({ category: categoryName });

    // Filter the advertisements that have associated reviews
    const advertsWithReviews = await Promise.all(
      advertsInCategory.map(async (advert) => {
        const reviews = await Review.find({ advertisement: advert._id });
        if (reviews.length > 0) {
          return advert;
        }
        return null;
      })
    );

    // Filter out null values (advertisements without reviews)
    const filteredAdverts = advertsWithReviews.filter((advert) => advert !== null);

    res.json(filteredAdverts);
  } catch (err) {
    res.status(500).send(err);
  }
};
