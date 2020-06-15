const express = require('express');
const UserController = require('../controllers/usersController');
const router = express.Router();

router.post('/signup', UserController.createUser);
router.post('/login',  UserController.loginUser);
router.get('/logout', UserController.logout);
router.post('/forgetPassword', UserController.forgetPassword);
router.patch('/resetPassword/:token', UserController.resetPassword);

module.exports = router;
