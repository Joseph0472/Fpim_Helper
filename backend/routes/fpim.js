const express = require('express')
const router = express.Router()
const FPIMItem = require('../models/fpim')
const OnelinkItem = require('../models/onelink')


//Getting All
router.get('/', async (req, res) => {
    try {
        const allItems = await FPIMItem.find()
        await console.log(allItems.length)
        res.json(allItems)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Getting Ones
 router.get('/query', async (req, res) => {
    try {
        var param = req.query;
        var regex = (key) => { return new RegExp("\.\*" + param[key] + "\.\*", 'i') }
        const matchedItems = await FPIMItem.find({
            $and: [
                {"manufacturerPartNum": regex("manufacturerPartNum")},
                {"functionalName" : regex("functionalName")},
                {"variant": regex("variant")},
                {"subBrandName": regex("subBrandName")},
                {"brandName": regex("brandName")},
            ]
        }) // keyword in a string: /.*keyword.*/i
        const matchedOnelinkItems = await OnelinkItem.find({
            $or: [
                {"manufacturerPartNum": regex("manufacturerPartNum")},
                {"onelinkCode" : regex("manufacturerPartNum")}, // manu can refer to diff columns
            ]
        })//   keyword in a string: /.*keyword.*/i
        await console.log(matchedItems.length)
        res.json({fpim: matchedItems, onelink: matchedOnelinkItems})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})



//Creating One
router.post('/', async (req, res) => {
    const item = new FPIMItem({
        itemNumber: req.body.itemNumber
    })
    try {
        const newItem = await item.save()
        res.status(201).json(newItem)
    } catch (err) {
        res.status(400)
    }
})
//Updating One
//Deleting One

module.exports = router