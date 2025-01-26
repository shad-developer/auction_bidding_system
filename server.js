const path = require('path');
require("dotenv").config({ path: "./config/.env" });
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoute");
const productRoutes = require("./routes/productRoute");
const biddingRoutes = require("./routes/biddingRoute");
const categoryRoutes = require("./routes/categoryRoute");
const reviewRoutes = require("./routes/reviewsRoute");
const messageRoutes = require("./routes/messageRoute");
const { app, server } = require("./socket/socket");

// const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

const _dirname = path.resolve();

// Middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(errorHandler);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/bidding", biddingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/category", categoryRoutes);


//app.use(express.static(path.join(_dirname, '/Client/dist')));
// app.get('*', (_, res) => {
//   res.sendFile(path.join(_dirname, "Client","dist","index.html"));
// })

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
