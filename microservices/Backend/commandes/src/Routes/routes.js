const express = require('express');
const router = express.Router();

const { createCartItem, getAllCartItems ,getCartItemsForUser } = require("../Controllers/Commandes/cartItemController");
const { authenticateToken,authorizeRole } = require("../../../authentification/src/Middleware/auth")
const { createCart, getAllCarts ,getCartByUser } = require("../Controllers/Commandes/cartController");
const { createOrder , getAllOrders , getOrdersByUser } = require('../Controllers/Commandes/orderController');




// ***********service commandes route

// // **cart item
router.post("/cartItems",authenticateToken, createCartItem);
router.get("/cartItems",authenticateToken, getCartItemsForUser); 
// router.get("/cartItems", getAllCartItems); 
// //  **cart
router.post('/cart', authenticateToken, createCart);
router.get('/cart', authenticateToken, getCartByUser);
router.get('/carts', authenticateToken, authorizeRole('admin'), getAllCarts);
// //  **order

router.post('/order',authenticateToken , createOrder);
router.get('/order', authenticateToken ,getOrdersByUser);
router.get('/orders', authenticateToken ,getAllOrders);



// *******************************************************



module.exports = router;
