// // const express= require('express');
// // const router=express.Router();
// // let items=[];

// // //GET
// // router.get('/items',(req,res)=>{
// //     res.json(items);
// // });

// // //POST
// // router.post('/items',(req,res)=>{
// //     const newItem={
// //         name:req.body.name,
// //         price:req.body.price
// //     };
// //     items.push(newItem);
// //     res.status(201),json({message:'Item added',item:newItem});
// // });

// // //PUT
// // router.put('/item/:id',(req,res)=>{
// //     const itemId=req.parmas.id;
// //     const updatedItem={
// //         name:req.body.item,
// //         price:req.body.price
// //     };
// //     if(items[itemId]){
// //         items[itemId]=updatedItem;
// //         res.json({message:'Item Updated',item:updatedItem});
// //     }
// //     else{
// //         res.status(404).json({message:'Item not found'});
// //     }
// // });
// // router.delete('/items/:id',(req,res)=>{
// //     const itemId = req.params.id;
// //     if(items[itemId]){
// //         const deletedItem=items.splice(itemId,1);
// //         res.json({message: 'Item deleted', item: deletedItem });
// //     }
// //     else{
// //         res.status(404).json({message: 'Item not found'});
// // }
// // });
// //  module.exports=router;


// const express = require('express');
// const router=express.Router();
// const mongoose=require('mongoose');
// const itemSchema= new mongoose.Schema(
// {
//     name:{
//         type:String,
//         require:true
//     },
//     price:{
//         type:Number,
//         required:true
//     }
// }
// )
// let items=mongoose.Model('items',itemSchema);

// //GET
// router.get('/items', async (req, res) => {
//     try {
//         const items = await Item.find();
//         res.json(items);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching items', error });
//     }
// });

// // POST a new item
// router.post('/items', async (req, res) => {
//     try {
//         const newItem = new Item({
//             name: req.body.name,
//             price: req.body.price
//         });
//         await newItem.save();
//         res.status(201).json({ message: 'Item added', item: newItem });
//     } catch (error) {
//         res.status(500).json({ message: 'Error adding item', error });
//     }
// });

// // PUT (update) an existing item
// router.put('/items/:id', async (req, res) => {
//     try {
//         const updatedItem = await Item.findByIdAndUpdate(
//             req.params.id,
//             { name: req.body.name, price: req.body.price },
//             { new: true }
//         );
//         if (updatedItem) {
//             res.json({ message: 'Item updated', item: updatedItem });
//         } else {
//             res.status(404).json({ message: 'Item not found' });
//         }
//     }
// catch (error) {
//         res.status(500).json({ message: 'Error updating item', error });
//     }
// });
// //DELETE
// router.delete('/items/:id',(req,res)=>{
//     const itemId = req.params.id;
//     if(items[itemId]){
//         const deletedItem=items.splice(itemId,1);
//         res.json({message: 'Item deleted', item: deletedItem });
//     }
//     else{
//         res.status(404).json({message: 'Item not found'});
//     }
// });

// module.exports= router;

const express = require('express');
const qus = express.Router();
const mongoose = require('mongoose');

// Define the schema
const QuesSchema = new mongoose.Schema({
    Question: {
        type: String,
        required: true  
    },
    Qup: {
        type: String, 
        required: true
    },
    Qdo: {
        type: String, 
        required: true
    },
    answer:{
        type:String,
        required:true
    }
});


// Create the model

const Q = mongoose.model('Q', QuesSchema);

// GET all items
qus.get('/qs', async (req, res) => {
    try {
        const qs = await Q.find();
        res.json(qs);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving ques", error });
    }
});

// POST a new item

qus.post('/qs', async (req, res) => {
    try {
        const newq = new Q({
            Question: req.body.Question,
            Qup: req.body.Qup,
            Qdo: req.body.Qdo,
            answer: req.body.answer
        });
        await newq.save();
        res.status(201).json({ message: 'ques added', Q: newq });
    } catch (error) {
        res.status(500).json({ message: 'Error adding ques', error });
    }
});

// PUT (update) an existing item

qus.put('/qs/:id', async (req, res) => {
    try {
        const updatedq = await Q.findByIdAndUpdate(
            req.params.id,
            {  Question: req.body.Question,
                Qup: req.body.Qup,
                Qdo: req.body.Qdo,
                answer: req.body.answer },
            { new: true }
        );
        if (updatedq) {
            res.json({ message: 'ques updated', item: updatedPost });
        } else {
            res.status(404).json({ message: 'ques not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating ques', error });
    }
});

// DELETE an item
' '

qus.delete('/qs/:id', async (req, res) => {
    try {
        const deletedq = await Q.findByIdAndDelete(req.params.id);
        if (deletedq) {
            res.json({ message: 'Post deleted', Q: deletedq });
        } else {
            res.status(404).json({ message: 'ques not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting ques', error });
    }
});

module.exports = qus;