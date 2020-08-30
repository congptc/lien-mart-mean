const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Product } = require('../models/products');




router.get('/',(req,res) => {
    Product.find((err,docs) => {
        if(!err){
            res.send(docs);
        }else{
            res.send(err.message);
            console.log('Error in retriving products: ' + JSON.stringify(err,undefined,2));
        }
    });
});

router.get('/:id',(req,res) => {

    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    Product.findById(req.params.id,(err,doc) => {
        console.log(err);
        if(!err)
            res.send(doc);
        else
            console.log('Error in retriving products: ' + JSON.stringify(err,undefined,2));
    })
});


router.post('/',(req,res)=>{
    var prod = new Product( {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        img: req.body.img,
        status: req.body.status,
    });

    prod.save((err,doc)=>{
        if(!err)
            res.send(doc);
        else{
            res.send(err.message);
            console.log('Error in save products: ' + JSON.stringify(err,undefined,2)); 
        }
    });
});


router.put('/:id',(req,res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    var prod = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        img: req.body.img,
        status: req.body.status,
    };

    Product.findByIdAndUpdate(req.params.id,{ $set: prod },{new: true,runValidators:true},(err,doc)=>{
        if(!err)
            res.send(doc);
        else{
            res.status(400).send(err.message);
            console.log('Error in product update: ' + JSON.stringify(err,undefined,2)); 
        }
    });
});


router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    Product.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err)
            res.send(doc);
        else{
            res.status(400).send(err.message);
            console.log('Error in product delete: ' + JSON.stringify(err,undefined,2)); 
        }
    });
});


module.exports = router;


