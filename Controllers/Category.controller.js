const Category = require('../Models/Category.model');

const createCategory = async (req, res) => {
  try {
    const name = req.body.name;

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const newCategory = new Category({
      name
    });

    await newCategory.save();

    res.status(201).send(newCategory);
  } catch (err) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const getAllCategoriesByAdmin = async (req, res) => {
  try {

    const categories = await Category.find();

    res.status(201).send(categories);
  } catch (err) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { createCategory, getAllCategoriesByAdmin };