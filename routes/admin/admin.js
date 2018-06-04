var express = require('express');
var router = express.Router();

router.all('/*', (req, res, next) =>{
    req.app.locals.layout = 'admin'
    next()
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/admin')
});





module.exports = router;
