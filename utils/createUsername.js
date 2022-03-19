exports.createUsername = (email) => {
  let username = '';
  if (!email) {
    return username;
  }
  username = email.split('@')[0];
  username = username.split(/[!#$%&'*+-/=?^_`{|}~]+/);
  return username.map((e) => `${e[0].toUpperCase() + e.slice(1)}`).join('');
};
