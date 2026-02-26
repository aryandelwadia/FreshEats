const express = require('express');
const { additem, getitem } = require('../controller/itemController');
const { isSellerLoggedIn } = require('../middlewares/auth.middleware');

const itemRouter = express.Router();

itemRouter
    .route('/additem')
    .post(isSellerLoggedIn, additem);

itemRouter
    .route('/getitem')
    .get(getitem);

module.exports = itemRouter;