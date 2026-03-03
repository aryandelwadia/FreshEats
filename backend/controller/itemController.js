const itemModel = require('../models/itemModel');
const logger = require('../config/logger');

module.exports.additem = async function additem(req, res) {
    try {
        const data = req.body;
        const sellerEmail = req.user.email;
        logger.info(`Adding item to shop: ${data.itemname} | price: ${data.itemprice} | seller: ${sellerEmail}`);
        let item = await itemModel.create({ ...data, sellerEmail });
        logger.info(`Item added to shop successfully: ${data.itemname}`);
        res.status(200).json({
            message: 'Item added to Shop',
            item
        });
    }
    catch (err) {
        logger.error(`Add item error: ${err.message}`);
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports.getitem = async function getitem(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const search = req.query.search || '';
        const category = req.query.category || '';
        const sort = req.query.sort || 'newest';

        // Build query object
        let query = {};
        if (search) {
            query.itemname = { $regex: search, $options: 'i' };
        }
        if (category && category !== 'All') {
            query.category = category;
        }

        // Build sort object
        let sortObj = { createdAt: -1 }; // Default: Newest arrivals
        if (sort === 'priceLowToHigh') sortObj = { itemprice: 1 };
        if (sort === 'priceHighToLow') sortObj = { itemprice: -1 };

        logger.info(`Fetching items. Page: ${page}, Limit: ${limit}, Search: ${search}, Category: ${category}, Sort: ${sort}`);

        const skip = (page - 1) * limit;
        const items = await itemModel.find(query).sort(sortObj).skip(skip).limit(limit);
        const total = await itemModel.countDocuments(query);

        return res.json({
            items,
            totalPages: Math.ceil(total / limit) || 1,
            currentPage: page
        });
    }
    catch (err) {
        logger.error(`Get items error: ${err.message}`);
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports.getSellerItems = async function getSellerItems(req, res) {
    try {
        const sellerEmail = req.user.email;
        logger.info(`Fetching items for seller: ${sellerEmail}`);
        let items = await itemModel.find({ sellerEmail });
        logger.info(`Fetched ${items.length} items for seller: ${sellerEmail}`);
        res.status(200).json(items);
    }
    catch (err) {
        logger.error(`Get seller items error: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

module.exports.updateItem = async function updateItem(req, res) {
    try {
        const sellerEmail = req.user.email;
        const itemId = req.params.id;
        let item = await itemModel.findOne({ _id: itemId, sellerEmail });
        if (!item) return res.status(404).json({ message: 'Item not found or not owned by you' });
        let updated = await itemModel.findByIdAndUpdate(itemId, req.body, { new: true });
        logger.info(`Seller ${sellerEmail} updated item: ${updated.itemname}`);
        res.status(200).json({ message: 'Item updated', item: updated });
    }
    catch (err) {
        logger.error(`Update item error: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

module.exports.deleteItem = async function deleteItem(req, res) {
    try {
        const sellerEmail = req.user.email;
        const itemId = req.params.id;
        let item = await itemModel.findOne({ _id: itemId, sellerEmail });
        if (!item) return res.status(404).json({ message: 'Item not found or not owned by you' });
        await itemModel.findByIdAndDelete(itemId);
        logger.info(`Seller ${sellerEmail} deleted item: ${item.itemname}`);
        res.status(200).json({ message: 'Item deleted' });
    }
    catch (err) {
        logger.error(`Delete item error: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};