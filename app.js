require('dotenv').config()

const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));

const {connectDB} = require("./Configuration/DB.config");
const PORT = process.env.PORT || 3000;

// import routes here
const authRoutes = require('./Routes/Auth.route');
const profileRoutes = require('./Routes/Profile.route')
const chatRoomRoutes = require('./Routes/ChatRoom.route');
const wishlistRoutes = require('./Routes/Wishlist.route')
const notificationRoutes = require('./Routes/Notification.route')
const reviewRoutes = require('./Routes/Review.route')
const adminRoutes = require('./Routes/Admin.route')
const reportRoutes = require('./Routes/Report.route');
const categoryRoutes = require('./Routes/Category.route');
const advertRoutes = require('./Routes/Advert.route');

connectDB();

// .use routes here
app.use('/api/auth',authRoutes);
app.use('/api/profile',profileRoutes)
app.use('/api/advert',advertRoutes)
app.use('/api/chatroom',chatRoomRoutes);
app.use('/api/wishlist',wishlistRoutes)
app.use('/api/notifications',notificationRoutes)
app.use('/api/review-forms', reviewRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/report',reportRoutes);
app.use('/api/category',categoryRoutes);

app.listen(PORT, () => {
    console.log("server started on port " + PORT + "...");
});