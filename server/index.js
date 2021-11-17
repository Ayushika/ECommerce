/** @format */

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const subCategoryRouter = require("./routes/subCategoryRoutes");
const brandRouter = require("./routes/brandRoutes");
const productRouter = require("./routes/productRoutes");
const cloudinaryRouter = require("./routes/cloudinaryRoutes");
const couponRouter = require("./routes/couponRoutes");
const stripeRouter = require("./routes/stripeRoutes");
const adminRouter = require("./routes/adminRoutes");
const { notFound, ErrorHandler } = require("./middlewares/errMiddleware");

dotenv.config();
const app = express();

//middleware
app.use(cors());
app.use(express.json({ limit: "5mb" }));

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/subcategory", subCategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/product", productRouter);
app.use("/api/cloudinary", cloudinaryRouter);
app.use("/api/coupon", couponRouter);
app.use("/api", stripeRouter);
app.use("/api/admin/order", adminRouter);

//connecting to the database
connectDB();

app.use(notFound);
app.use(ErrorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server Running Successfully On PORT ${PORT}`),
);
