const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/* REGISTER page */
router.get('/signup', authController.signupGet);
router.post('/signup', authController.signupPost);

/* LOGIN page. */
router.get('/signin', authController.signinGet);
router.post('/signin', authController.signinPost);

/* LOGOUT page */
router.get('/logout', authController.logout);

module.exports = router;
