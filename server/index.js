/** @format */

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const subCategoryRouter = require("./routes/subCategoryRoutes");
const { notFound, ErrorHandler } = require("./middlewares/errMiddleware");
dotenv.config();
const app = express();

//middleware
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/subcategory", subCategoryRouter);

//connecting to the database
connectDB();

app.use(notFound);
app.use(ErrorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server Running Successfully On PORT ${PORT}`),
);
