const { body, validationResult } = require('express-validator');
const Message = require('../models/message');

exports.messageList = (req, res, next) => {
  res.render('index', {
    title: 'Home',
    messages: [],
    message: null,
    errors: null,
  });
};

exports.messageCreatePost = [
  body('text', 'Message is required').trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      res.render('index', {
        title: 'Home',
        messages: [],
        message: { text: req.body.text },
        errors: null,
      });
    } else {
      const message = new Message({
        text: req.body.text,
        author: req.body.author,
      });

      message.save(async (err) => {
        if (err) {
          return next(err);
        }
        const messages = Message.find({})
          .populate('author', '-password')
          .exec();

        res.render('index', {
          title: 'Home',
          messages,
          message: null,
          errors: null,
        });
      });
    }
  },
];

exports.messageDeleteGet = (req, res, next) => {
  res.send('Get - Message Delete');
};

exports.messageDeletePost = (req, res, next) => {
  res.send('Post - Message Delete');
};
