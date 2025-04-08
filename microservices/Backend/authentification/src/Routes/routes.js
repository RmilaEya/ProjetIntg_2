const express = require('express');
const User = require('../Models/UserModel');


const router = express.Router();

const { register, login,updateUser,
  deleteUser,getAllUsers,getUserById,logout } = require('../Controllers/UserController');
const { authenticateToken,authorizeRole } = require("../Middleware/auth")





//*****route user */
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
// ***********auth route
router.post('/register', register);
router.post('/login', login);
router.post('/deconnexion', logout);





module.exports = router;
