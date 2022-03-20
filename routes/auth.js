const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isAuth } = require('../middlewares/auth');
/* REGISTER page */
router.get('/signup', authController.signupGet);
router.post('/signup', authController.signupPost);

/* LOGIN page. */
router.get('/signin', authController.signinGet);
router.post('/signin', authController.signinPost);

/* LOGOUT page */
router.get('/logout', isAuth, authController.logout);

/* ADMIN page*/
router.get('/admin', isAuth, authController.adminGet);
router.post('/admin', isAuth, authController.adminPost);

module.exports = router;
