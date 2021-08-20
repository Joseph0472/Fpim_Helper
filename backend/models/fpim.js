const mongoose = require('mongoose')

const fpimSchema = new mongoose.Schema({
    // 8 column
    itemNumber: {
        type: String,
        required: true
    },
    itemDescription: {
        type: String,
    },
    manufacturerPartNum: {
        type: String,
    },
    functionalName: {
        type: String
    },
    variant: {
        type: String
    },
    subBrandName: {
        type: String
    },
    brandName: {
        type: String
    },
    netContent: {
        type: String
    }
})

module.exports = mongoose.model('FPIMItem', fpimSchema)