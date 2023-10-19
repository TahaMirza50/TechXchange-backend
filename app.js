require('dotenv').config()

const express = require("express");
const app = express();

app.use(express.json());

const {connectDB} = require("./Configuration/DB.config");
const PORT = process.env.PORT || 3000;

// import routes here
const authRoutes = require('./Routes/Auth.route');
const profileRoutes = require('./Routes/Profile.route')

connectDB();

// .use routes here
app.use('/api/auth',authRoutes);
app.use('/api/profile',profileRoutes)

app.listen(PORT, () => {
    console.log("server started on port " + PORT + "...");
});