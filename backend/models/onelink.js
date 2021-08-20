const mongoose = require('mongoose')

const onelinkItemSchema = new mongoose.Schema({
    // 6 columns
    itemNumber: {
        type: String,
        required: true
    },
    onelinkCode: {
        type: String,
    },
    manufacturerPartNum: {
        type: String,
    },
    description: {
        type: String,
    },
    brandName: {
        type: String
    },
    netContent: {
        type: String
    }
})

module.exports = mongoose.model('OnelinkItem', onelinkItemSchema)