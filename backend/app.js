const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const path = require("path")
const dbconnect = require('./config/db');
const logger = require('./config/logger');

dbconnect();

const userRouter = require('./router/userRouter');
const sellerRouter = require('./router/sellerRouter');
const itemRouter = require('./router/itemRouter');
const cartRouter = require("./router/cartRouter");

const app = express();

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cookieParser());
app.use('/user', userRouter);
app.use('/seller', sellerRouter);
app.use('/item', itemRouter);
app.use('/cart', cartRouter);

app.listen(3000, () => {
  logger.info('Server is running on port 3000');
});

logger.info('All routes and middleware loaded');