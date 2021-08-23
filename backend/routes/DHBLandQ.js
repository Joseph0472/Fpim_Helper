const express = require('express')
const router = express.Router()
const DHBItem = require('../models/dhb')

//Getting All
router.get('/', async (req, res) => {
    try {
        const allItems = await DHBItem.find()
        await res.json(allItems)
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
router.patch('/', async(req, res) => {
    //req.body should be an array of objects
    try {
        console.log("patching req")
        //console.log(req.body[0]);
        for(let i=0; i<req.body.length; i++) {
            var changedOne = req.body[i]
            var changedOneID = req.body[i]._id;
            await DHBItem.findOneAndReplace({_id: changedOneID}, changedOne)  
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = router