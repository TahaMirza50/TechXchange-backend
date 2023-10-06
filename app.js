require('dotenv').config()

const express = require("express");
const app = express();

const {connectDB} = require("./Configuration/DB.config")
const PORT = process.env.PORT || 3000

// import routes here

connectDB();

// .use routes here

app.use(express.json());


app.listen(PORT, () => {
    console.log("server started on port " + PORT + "...");
});