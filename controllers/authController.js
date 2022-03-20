const { body, validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');
const Message = require('../models/message');
const { createUsername } = require('../utils/createUsername');

exports.signupGet = (req, res, next) => {
  res.render('signup', { title: 'Sign Up', errors: null, user: null });
};

exports.signupPost = [
  body('firstName', 'First Name is required')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('lastName', 'Last Name is required')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('email', 'Email is required')
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('Enter a valid email')
    .normalizeEmail(),
  body('password', 'Password is required')
    .isLength({ min: 8 })
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@_$!%*#?&])[A-Za-z\d@$!_%*#?&]{8,}/)
    .withMessage(
      'Minimum eight characters, at least one letter, one number and one special character (@_$!%*#?&)'
    ),
  check(
    'cPassword',
    'Password Confirmation field must have the same value as the password field'
  )
    .exists()
    .custom((value, { req }) => value === req.body.password),
  (req, res, next) => {
    // extract validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('signup', {
        title: 'Sign Up',
        user: { ...req.body, password: '', cPassword: '' },
        errors: errors.array(),
      });
    } else {
      User.findOne({ email: req.body.email })
        .then((user) => {
          if (user) {
            console.log('Email already used ');
            res.render('signup', {
              title: 'Sign Up',
              user: { ...req.body, password: '', cPassword: '' },
              errors: [{ msg: 'Email already used.' }],
            });
          } else {
            bcrypt.hash(req.body.password, 12, (err, hashedPassword) => {
              if (err) {
                return next(err);
              }
              // create the usernmae from email
              let username = createUsername(req.body.email);
              // create a user with the sanitize
              const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email.toLowerCase(),
                username,
                password: hashedPassword,
              });

              user.save((err) => {
                if (err) {
                  return next(err);
                }
                res.redirect('/auth/signin');
              });
            });
          }
        })
        .catch((err) => next(err));
    }
  },
];

exports.signinGet = (req, res, next) => {
  res.render('signin', {
    title: 'Sign In',
    user: null,
    errors: req.flash('error'),
  });
};

exports.signinPost = passport.authenticate('local', {
  failureFlash: true,
  failureRedirect: '/auth/signin',
  successRedirect: '/',
});

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect('/');
};

exports.adminGet = (req, res, next) => {
  res.render('admin', { title: 'Admin', errors: null });
};

exports.adminPost = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    user.isAdmin = true;
    await user.save();
    const messages = await Message.find({}, '-__v')
      .populate(
        'author',
        '-password -__v -firstName -lastName -email -isMember -messages -createdAt -updatedAt'
      )
      .sort({ createdAt: -1 })
      .exec();

    res.render('index', {
      title: 'Home',
      title: 'Home',
      messages,
      message: null,
      errors: null,
    });
  } catch (error) {
    next(error);
  }
};
