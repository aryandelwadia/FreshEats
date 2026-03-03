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
const adminRouter = require("./router/adminRouter");

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
  const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
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
app.use('/admin', adminRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

logger.info('All routes and middleware loaded');