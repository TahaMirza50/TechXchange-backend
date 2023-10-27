const Advert = require('../Models/Advert.model'); 
const Review = require('../Models/Review.model');  
const Category = require('../Models/Category.model');

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

// create a category by an admin
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if the category already exists
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    // Create a new category
    const newCategory = new Category({
      name,
      description,
      createdByAdmin: true, // Flag to indicate that it's created by an admin
    });

    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).send(err);
  }
};


// get all categories by an admin
exports.getAllCategoriesByAdmin = async (req, res) => {
  try {
    // Retrieve all categories
    const categories = await Category.find({ createdByAdmin: true });

    res.json(categories);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { getAdvertsByCategory, createCategory, getAllCategoriesByAdmin};