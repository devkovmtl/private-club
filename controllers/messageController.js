exports.messageList = (req, res, next) => {
  res.send('Get - Message List');
};

exports.messageCreateGet = (req, res, next) => {
  res.send('Get - Message Create');
};

exports.messageCreatePost = (req, res, next) => {
  res.send('Post - Message Create');
};

exports.messageDeleteGet = (req, res, next) => {
  res.send('Get - Message Delete');
};

exports.messageDeletePost = (req, res, next) => {
  res.send('Post - Message Delete');
};
