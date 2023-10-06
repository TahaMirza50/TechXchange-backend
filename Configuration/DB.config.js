const mongoose = require("mongoose");
require('dotenv').config()
const user = process.env.USER;
const password = process.env.PASSWORD;

const connectDB = () => {
    mongoose.connect('mongodb+srv://cluster0.0nnmisv.mongodb.net/?retryWrites=true&w=majority',
        {
            user: user,
            pass: password,
            dbName: 'Project-DataBase',
            useNewUrlParser: true,
            useUnifiedTOpology: true
        }).then(() => {
            console.log("server connected to database...")
        });
};

module.exports = {connectDB};