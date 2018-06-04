const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const postSchema = new Schema({
    category:{
      type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    }

})

module.export = mongoose.model('posts', postSchema)