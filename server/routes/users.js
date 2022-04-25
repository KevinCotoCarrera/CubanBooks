var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:userName', function(req, res, next) {
  res.send(`respond with a resource ${req.params.userName}`);
});
router.get('/cool', function(req, res, next) {
  res.send('You\'re cool!');
});

module.exports = router;
