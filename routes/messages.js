const { Router } = require('express');
const router = Router();
const messageController = require('../controllers/messageController');
const { isAuth, isAdmin } = require('../middlewares/auth');

// GET LIST OF ALL MESSAGES
router.get('/', messageController.messageList);

// CREATE A MESSAGE
router.post('/create', isAuth, messageController.messageCreatePost);

// DELETE A MESSAGE
router.post('/:id/delete', isAdmin, messageController.messageDeletePost);

module.exports = router;
