const { Router } = require('express');
const router = Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.redirect('/messages');
});

module.exports = router;
