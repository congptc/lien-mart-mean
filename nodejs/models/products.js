const mongoose = require('mongoose');

var enuStatus = {
    values: ['open', 'close']
  , message: "phải nhập 1 trong các giá trị 'open' hoặc 'close'"
  }

var Product = mongoose.model('Product',{
    name:{
        type: String, 
        required: [true,'là trường bắt buộc nhập'],
    },
    description:{type: String},
    price:{
        type: Number,
        required: [true,'là trường bắt buộc nhập'],
    },
    img:{type: String},
    status:{
        type:String,
        enum:enuStatus
    },
    createUser :{
        type: String,
        default: 'System',
    },
    createdDate:{
        type: Date,
        default: Date.now,
    },
});

module.exports = {Product: Product};