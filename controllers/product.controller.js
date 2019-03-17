const joi = require('joi');
const Product = require('../models/product.model');

async function test(req, res) {
    res.send('Greetings from the Test controller!');
}

async function list(req, res) {
  const data = await Product.find();
  res.json(data);
}

async function product_create(req,res){
    try{
    const joiSchema = joi.object().keys({
        name: joi.string().required().error(new Error('please enter correct name')),
        price: joi.number().integer().min(60).required().error(new Error('please give valid price'))
      });
      console.log("hi");  
    joi.validate(req.body, joiSchema); 
    }
   catch(error)       
    {
      console.log("bug");
      res.status(404).send("joi error found");
      return next();
    }

   let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );
     console.log('bye');
    data = await product.save();
    res.send(data);
}

async function product_details(req, res ,next) {
    product = await Product.findById(req.params.id);
    if(!product){
    res.status(400).send("please give correct id");
    console.log('id not found in data base');
     return next();
    }
    res.send("product details" + product);
 }

async function product_update(req,res){
    product = await Product.findByIdAndUpdate(req.params.id, {$set: req.body})
    if(!product){
        res.status(400).send("please give correct id");
        console.log('id not found in data base');
         return next();
        }
    res.send("product updated\n\n" + product);
    }

async function product_delete(req,res){
    product = await Product.findByIdAndRemove(req.params.id);
    if(!product){
        res.status(400).send("please give correct id");
        console.log('id not found in data base');
         return next();
        }
    res.send("product deleted\n\n" + product);
    }

exports.test = test;
exports.list = list;
exports.product_delete = product_delete;
exports.product_details = product_details;
exports.product_update = product_update;
exports.product_create = product_create;