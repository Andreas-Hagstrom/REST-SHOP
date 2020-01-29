// Initializes the api

const express = require("express");
const app = express();

// Middleware which express is funelling request through for logging of requests & errors
const morgan = require("morgan");

const mongoose = require("mongoose");

// Requests forwarded from routes
const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

mongoose.connect(
  "mongodb+srv://Andreas:" +
    process.env.MONGO_ATLAS_PW +
    "@assignmentwebdev1-r21fg.mongodb.net/test?retryWrites=true&w=majority",
  // Used to connect with mongoose
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);

app.use(morgan("dev"));

// Makes the file dir public for accesing img
app.use("/uploads", express.static("uploads"));

app.use(express.urlencoded({ extended: false })); //Parse URL-encoded bodies. False -supports only simple bodies

app.use(express.json()); //Used to parse JSON bodies

// Prevents CORS error - permitting clients to access server from other hosts
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes handling requests
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// Error handling (i.e not finding a fitting route)
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// Error handling for NON 404 errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      msg: error.message
    }
  });
});

module.exports = app;
