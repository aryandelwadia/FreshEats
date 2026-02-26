const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const sellerModel = require('../models/sellerModel');
const itemModel = require('../models/itemModel');
const orderModel = require('../models/orderModel');
const cartModel = require('../models/cartModel');
const logger = require('../config/logger');
require('dotenv').config();

const admin_jwt_key = process.env.ADMIN_JWT_KEY || 'admin_secret_key_fresheats';

// Hardcoded admin credentials
const ADMIN_USERNAME = 'ADMIN';
const ADMIN_PASSWORD = 'ADMIN1234';

// ==================== AUTH ====================

module.exports.adminLogin = async function adminLogin(req, res) {
    try {
        const { username, password } = req.body;
        logger.info(`Admin login attempt for username: ${username}`);

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            let token = jwt.sign({ role: 'admin', username: ADMIN_USERNAME }, admin_jwt_key);
            logger.info('Admin logged in successfully');
            res.cookie('adminLoggedin', token, { sameSite: 'None', secure: true, httpOnly: false, withCredentials: true }).status(200).json({
                message: 'Admin logged in successfully'
            });
        } else {
            logger.warn(`Admin login failed - wrong credentials for username: ${username}`);
            res.status(401).json({ message: 'Invalid admin credentials' });
        }
    } catch (err) {
        logger.error(`Admin login error: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

module.exports.adminLogout = async function adminLogout(req, res) {
    try {
        logger.info('Admin logging out');
        res.cookie('adminLoggedin', '', { maxAge: 1, withCredentials: true });
        res.status(200).json({ message: 'Admin logged out successfully' });
    } catch (err) {
        logger.error(`Admin logout error: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

// ==================== USERS ====================

module.exports.getAllUsers = async function getAllUsers(req, res) {
    try {
        logger.info('Admin fetching all users');
        let users = await userModel.find({}).select('-password');
        res.status(200).json(users);
    } catch (err) {
        logger.error(`Admin get users error: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getUserById = async function getUserById(req, res) {
    try {
        let user = await userModel.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        logger.error(`Admin get user error: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

module.exports.createUser = async function createUser(req, res) {
    try {
        logger.info(`Admin creating user: ${req.body.email}`);
        let user = await userModel.create(req.body);
        res.status(200).json({ message: 'User created successfully', userId: user._id });
    } catch (err) {
        logger.error(`Admin create user error: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

module.exports.updateUser = async function updateUser(req, res) {
    try {
        let data = { ...req.body };
        // If password is being updated, hash it
        if (data.password) {
            let salt = await bcrypt.genSalt();
            data.password = await bcrypt.hash(data.password, salt);
        }
        let user = await userModel.findByIdAndUpdate(req.params.id, data, { new: true }).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        logger.info(`Admin updated user: ${user.email}`);
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (err) {
        logger.error(`Admin update user error: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

module.exports.deleteUser = async function deleteUser(req, res) {
    try {
        let user = await userModel.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        // Also clear user's cart and orders
        await cartModel.deleteMany({ email: user.email });
        logger.info(`Admin deleted user: ${user.email}`);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        logger.error(`Admin delete user error: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

// ==================== SELLERS ====================

module.exports.getAllSellers = async function getAllSellers(req, res) {
    try {
        logger.info('Admin fetching all sellers');
        let sellers = await sellerModel.find({}).select('-password');
        res.status(200).json(sellers);
    } catch (err) {
        logger.error(`Admin get sellers error: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getSellerById = async function getSellerById(req, res) {
    try {
        let seller = await sellerModel.findById(req.params.id).select('-password');
        if (!seller) return res.status(404).json({ message: 'Seller not found' });
        res.status(200).json(seller);
    } catch (err) {
        logger.error(`Admin get seller error: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

module.exports.createSeller = async function createSeller(req, res) {
    try {
        logger.info(`Admin creating seller: ${req.body.email}`);
        let seller = await sellerModel.create(req.body);
        res.status(200).json({ message: 'Seller created successfully', sellerId: seller._id });
    } catch (err) {
        logger.error(`Admin create seller error: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

module.exports.updateSeller = async function updateSeller(req, res) {
    try {
        let data = { ...req.body };
        if (data.password) {
            let salt = await bcrypt.genSalt();
            data.password = await bcrypt.hash(data.password, salt);
        }
        let seller = await sellerModel.findByIdAndUpdate(req.params.id, data, { new: true }).select('-password');
        if (!seller) return res.status(404).json({ message: 'Seller not found' });
        logger.info(`Admin updated seller: ${seller.email}`);
        res.status(200).json({ message: 'Seller updated successfully', seller });
    } catch (err) {
        logger.error(`Admin update seller error: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

module.exports.deleteSeller = async function deleteSeller(req, res) {
    try {
        let seller = await sellerModel.findByIdAndDelete(req.params.id);
        if (!seller) return res.status(404).json({ message: 'Seller not found' });
        logger.info(`Admin deleted seller: ${seller.email}`);
        res.status(200).json({ message: 'Seller deleted successfully' });
    } catch (err) {
        logger.error(`Admin delete seller error: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

// ==================== ITEMS ====================

module.exports.getAllItems = async function getAllItems(req, res) {
    try {
        logger.info('Admin fetching all items');
        let items = await itemModel.find({});
        res.status(200).json(items);
    } catch (err) {
        logger.error(`Admin get items error: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

module.exports.createItem = async function createItem(req, res) {
    try {
        logger.info(`Admin creating item: ${req.body.itemname}`);
        let item = await itemModel.create(req.body);
        res.status(200).json({ message: 'Item created successfully', item });
    } catch (err) {
        logger.error(`Admin create item error: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

module.exports.updateItem = async function updateItem(req, res) {
    try {
        let item = await itemModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) return res.status(404).json({ message: 'Item not found' });
        logger.info(`Admin updated item: ${item.itemname}`);
        res.status(200).json({ message: 'Item updated successfully', item });
    } catch (err) {
        logger.error(`Admin update item error: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

module.exports.deleteItem = async function deleteItem(req, res) {
    try {
        let item = await itemModel.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        logger.info(`Admin deleted item: ${item.itemname}`);
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
        logger.error(`Admin delete item error: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

// ==================== ORDERS ====================

module.exports.getAllOrders = async function getAllOrders(req, res) {
    try {
        logger.info('Admin fetching all orders');
        let orders = await orderModel.find({}).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        logger.error(`Admin get orders error: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getOrderById = async function getOrderById(req, res) {
    try {
        let order = await orderModel.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (err) {
        logger.error(`Admin get order error: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

module.exports.updateOrderStatus = async function updateOrderStatus(req, res) {
    try {
        const { status } = req.body;
        const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
        }
        let order = await orderModel.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        logger.info(`Admin updated order ${order._id} status to: ${status}`);
        res.status(200).json({ message: 'Order status updated', order });
    } catch (err) {
        logger.error(`Admin update order error: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

module.exports.deleteOrder = async function deleteOrder(req, res) {
    try {
        let order = await orderModel.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        logger.info(`Admin deleted order: ${order._id}`);
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
        logger.error(`Admin delete order error: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

// ==================== STATS ====================

module.exports.getDashboardStats = async function getDashboardStats(req, res) {
    try {
        logger.info('Admin fetching dashboard stats');
        const [totalUsers, totalSellers, totalItems, totalOrders, orders] = await Promise.all([
            userModel.countDocuments(),
            sellerModel.countDocuments(),
            itemModel.countDocuments(),
            orderModel.countDocuments(),
            orderModel.find({})
        ]);

        let totalRevenue = 0;
        orders.forEach(o => { totalRevenue += o.total || 0; });

        res.status(200).json({
            totalUsers,
            totalSellers,
            totalItems,
            totalOrders,
            totalRevenue: totalRevenue.toFixed(2),
            ordersByStatus: {
                pending: orders.filter(o => o.status === 'pending').length,
                confirmed: orders.filter(o => o.status === 'confirmed').length,
                shipped: orders.filter(o => o.status === 'shipped').length,
                delivered: orders.filter(o => o.status === 'delivered').length,
                cancelled: orders.filter(o => o.status === 'cancelled').length
            }
        });
    } catch (err) {
        logger.error(`Admin stats error: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};
