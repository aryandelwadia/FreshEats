const express = require('express');
const { isAdminLoggedIn } = require('../middlewares/auth.middleware');
const {
    adminLogin, adminLogout,
    getAllUsers, getUserById, createUser, updateUser, deleteUser,
    getAllSellers, getSellerById, createSeller, updateSeller, deleteSeller,
    getAllItems, createItem, updateItem, deleteItem,
    getAllOrders, getOrderById, updateOrderStatus, deleteOrder,
    getDashboardStats
} = require('../controller/adminController');

const adminRouter = express.Router();

// Auth
adminRouter.post('/login', adminLogin);
adminRouter.post('/logout', isAdminLoggedIn, adminLogout);

// Dashboard
adminRouter.get('/stats', isAdminLoggedIn, getDashboardStats);

// Users CRUD
adminRouter.get('/users', isAdminLoggedIn, getAllUsers);
adminRouter.get('/users/:id', isAdminLoggedIn, getUserById);
adminRouter.post('/users', isAdminLoggedIn, createUser);
adminRouter.put('/users/:id', isAdminLoggedIn, updateUser);
adminRouter.delete('/users/:id', isAdminLoggedIn, deleteUser);

// Sellers CRUD
adminRouter.get('/sellers', isAdminLoggedIn, getAllSellers);
adminRouter.get('/sellers/:id', isAdminLoggedIn, getSellerById);
adminRouter.post('/sellers', isAdminLoggedIn, createSeller);
adminRouter.put('/sellers/:id', isAdminLoggedIn, updateSeller);
adminRouter.delete('/sellers/:id', isAdminLoggedIn, deleteSeller);

// Items CRUD
adminRouter.get('/items', isAdminLoggedIn, getAllItems);
adminRouter.post('/items', isAdminLoggedIn, createItem);
adminRouter.put('/items/:id', isAdminLoggedIn, updateItem);
adminRouter.delete('/items/:id', isAdminLoggedIn, deleteItem);

// Orders
adminRouter.get('/orders', isAdminLoggedIn, getAllOrders);
adminRouter.get('/orders/:id', isAdminLoggedIn, getOrderById);
adminRouter.put('/orders/:id/status', isAdminLoggedIn, updateOrderStatus);
adminRouter.delete('/orders/:id', isAdminLoggedIn, deleteOrder);

module.exports = adminRouter;
