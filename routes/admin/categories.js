var express = require('express');
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
var router = express.Router();
require('../../models/Category')
const category = mongoose.model('Category')

router.use(bodyparser.json())

router.all('/*', (req, res, next) =>{
    req.app.locals.layout = 'admin'
    next()
})

router.get('/', (req, res) =>{
    category.find({}).then(categories =>{
        res.render('admin/Categories/index', {categories: categories})
    })

})

router.post('/create', (req, res) =>{
    newitem = new category({
        name: req.body.name
    })
    newitem.save()
        .then(cat =>{
            res.redirect('/admin/category')
        })
})

router.get('/edit/:id', (req,res) =>{
    category.findOne({_id: req.params.id})
        .then(category =>{
            res.render('admin/Categories/edit', {category:category})
        })
})

router.delete('/delete/:id', (req, res) =>{
    category.remove({_id: req.params.id})
        .then(result =>{
            res.redirect('/admin/category')
        })
})

router.put('/update/:id', (req, res)=>{
    category.findOne({_id: req.params.id}).then(cat =>{
        cat.name = req.body.name

        cat.save().then(updatedpost =>{
            res.redirect('/admin/category')
        })

    })
})





module.exports = router;