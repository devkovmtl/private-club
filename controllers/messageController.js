const { body, validationResult } = require('express-validator');
const Message = require('../models/message');

exports.messageList = async (req, res, next) => {
  try {
    const messages = await Message.find({}, '-__v')
      .populate(
        'author',
        '-password -__v -firstName -lastName -email -isMember -messages -createdAt -updatedAt'
      )
      .sort({ createdAt: -1 })
      .exec();

    res.render('index', {
      title: 'Home',
      messages,
      message: null,
      errors: null,
    });
  } catch (error) {
    next(error);
  }
};

exports.messageCreatePost = [
  body('text', 'Message is required').trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      Message.find({})
        .populate(
          'author',
          '-password -__v -firstName -lastName -email -isMember -messages -createdAt -updatedAt'
        )
        .exec()
        .then((messages) => {
          res.render('index', {
            title: 'Home',
            messages: messages,
            message: { text: req.body.text },
            errors: null,
          });
        })
        .catch((err) => next(err));
    } else {
      const message = new Message({
        text: req.body.text,
        author: req.body.author,
      });

      message.save(async (err) => {
        if (err) {
          return next(err);
        }
        const messages = await Message.find({})
          .populate(
            'author',
            '-password -__v -firstName -lastName -email -isMember -messages -createdAt -updatedAt'
          )
          .exec();

        res.redirect('/');
      });
    }
  },
];

exports.messageDeletePost = async (req, res, next) => {
  const messageId = req.params.id;

  try {
    await Message.findByIdAndRemove(messageId);
    const messages = await Message.find({}, '-__v')
      .populate(
        'author',
        '-password -__v -firstName -lastName -email -isMember -messages -createdAt -updatedAt'
      )
      .sort({ createdAt: -1 })
      .exec();

    res.render('index', {
      title: 'Home',
      messages,
      message: null,
      errors: null,
    });
  } catch (error) {
    next(error);
  }
};
