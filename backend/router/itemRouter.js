const express = require('express');
const { additem, getitem, getSellerItems, updateItem, deleteItem } = require('../controller/itemController');
const { isSellerLoggedIn } = require('../middlewares/auth.middleware');

const itemRouter = express.Router();

itemRouter
    .route('/additem')
    .post(isSellerLoggedIn, additem);

itemRouter
    .route('/getitem')
    .get(getitem);

itemRouter
    .route('/myitems')
    .get(isSellerLoggedIn, getSellerItems);

itemRouter
    .route('/update/:id')
    .put(isSellerLoggedIn, updateItem);

itemRouter
    .route('/delete/:id')
    .delete(isSellerLoggedIn, deleteItem);

module.exports = itemRouter;