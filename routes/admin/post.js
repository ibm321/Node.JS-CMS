var express = require('express');
const mongoose = require('mongoose')
const bodyparser = require('body-parser')

var router = express.Router();

require('../../models/post');
require('../../models/Category');
const Post = mongoose.model('posts');


const category = mongoose.model('Category');


router.use(bodyparser.json());

router.all('/*', (req, res, next) =>{
    req.app.locals.layout = 'admin'
    next()
})

/* GET users listing. */
router.get('/', function(req, res, next) {
    Post.find({})
        .populate('category')
        .then(posts =>{
        res.render('admin/posts/index', {posts: posts})
    })

});

router.get('/create', function(req, res, next) {

    category.find({})
        .then(cats =>{
            res.render('admin/posts/create',{cats:cats})
        })


});

router.get('/edit/:id', function(req, res, next) {

    Post.findOne({_id: req.params.id}).then(post =>{

       res.render('admin/posts/edit', {post:post})
    })

});

router.post('/create', (req, res) =>{
   const newPost = new Post({
       category: req.body.category,
        title: req.body.title,
        body: req.body.body

    })
    newPost.save()
        .then(post =>{
            res.redirect('/admin/posts')
    })
})

router.put('/edit/:id', (req, res)=>{
    Post.findOne({_id: req.params.id}).then(post =>{
        post.title= req.body.title
        post.body = req.body.body
        post.category = req.body.category

        post.save().then(updatedpost =>{
            res.redirect('/admin/posts')
        })

    })
})

router.delete('/:id', (req, res) =>{
    // res.send("it works")
    Post.remove({_id: req.params.id})
        .then(result =>{
            res.redirect('/admin/posts')
        })
})





module.exports = router;
