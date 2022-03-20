const { Router } = require('express');
const router = Router();
const messageController = require('../controllers/messageController');

// GET LIST OF ALL MESSAGES
router.get('/', messageController.messageList);

// CREATE A MESSAGE
router.post('/create', messageController.messageCreatePost);

// DELETE A MESSAGE
router.get('/:id/delete', messageController.messageDeleteGet);
router.get('/:id/delete', messageController.messageDeletePost);

module.exports = router;
