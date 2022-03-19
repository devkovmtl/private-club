exports.signupGet = (req, res, next) => {
  res.render('signup', { title: 'Sign Up' });
};

exports.signupPost = (req, res, next) => {
  res.send('Signup POST');
};

exports.signinGet = (req, res, next) => {
  res.render('signin', { title: 'Sign In' });
};

exports.signinPost = (req, res, next) => {
  res.send('SignIn GET');
};

exports.logout = (req, res, next) => {
  res.send('LOGOUT');
};
