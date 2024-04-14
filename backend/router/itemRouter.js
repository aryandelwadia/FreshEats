const express = require('express');

const { additem, getitem } = require('../controller/itemController');

const itemRouter = express.Router();

itemRouter
.route('/additem')
.post(additem);

itemRouter
.route('/getitem')
.get(getitem);

module.exports = itemRouter;