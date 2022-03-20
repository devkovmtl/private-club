const { Router } = require('express');
const router = Router();
const messageController = require('../controllers/messageController');

// GET LIST OF ALL MESSAGES
router.get('/', messageController.messageList);

// CREATE A MESSAGE
router.post('/create', messageController.messageCreatePost);

// DELETE A MESSAGE
router.post('/:id/delete', messageController.messageDeletePost);

module.exports = router;
