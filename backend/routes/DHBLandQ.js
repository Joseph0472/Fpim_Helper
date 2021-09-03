const express = require('express')
const router = express.Router()
const DHBItem = require('../models/dhb')
const FPIMItem = require('../models/fpim')


//Getting All
router.get('/', async (req, res) => {
    try {
        const allItems = await DHBItem.find().sort({brandName:1})
        await res.json(allItems)
        // const cataItems = await FPIMItem.find()
        // allItems.forEach(element => {
        //     if(element.)
        // });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Creating One
router.post('/', async (req, res) => {
    const item = new DHBItem({
        itemComment: req.body.itemComment
    })
    try {
        const newItem = await item.save()
        res.status(201).json(newItem)
    } catch (err) {
        res.status(400)
    }
})

// Modifying the entire file
router.patch('/', async (req, res) => {
    //req.body should be an array of objects
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    try {
        console.log("Saving at: " + time)
        //console.log(req.body[0]);
        for(let i=0; i<req.body.length; i++) {
            var changedOne = req.body[i]
            var changedOneID = req.body[i]._id;
            await DHBItem.findOneAndReplace({_id: changedOneID}, changedOne)  
        }
        await res.status(204)
        await res.send("Successfully saved")
        await console.log("Saved")
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = router