var express = require('express');
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
var router = express.Router();
require('../models/post')
const Post = mongoose.model('posts')
require('../models/Category')
const Cat = mongoose.model('Category')
// router.use(bodyparser.json())

router.all('/*', (req, res, next) =>{
    req.app.locals.layout = 'layout'
    next()
})

/* GET home page. */
router.get('/', function(req, res, next) {
    Post.find({}).then(posts =>{
        Cat.find({})
            .then(cats =>{
                res.render('home/index', {posts:posts, cats:cats});
            })

    })


});

router.get('/about', function(req, res, next) {
    res.render('home/about');
});

router.get('/login', function(req, res, next) {
    res.render('home/login');
});

router.get('/register', function(req, res, next) {
    res.render('home/register');
});

// router.get('/post', function(req, res, next) {
//     res.render('home/post');
// });

router.post('/read/:id', function(req, res, next) {
    Post.findOne({_id: req.params.id}).then(post =>{
        res.render('home/post', {post:post});
    })
});


module.exports = router;
