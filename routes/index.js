var express = require('express');
var router = express.Router();

// we can handle differnet http methods on this route -- localhost:3001/
/* GET home page. */
router.get('/', function(req, res, next) {
  // Let's render the template -- index.pug
  res.render('index', { title: 'Express JS REST API' });
});

module.exports = router;

