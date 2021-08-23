const mongoose = require('mongoose')

const DHBSchema = new mongoose.Schema({
    // 6 column
    itemComment: {
        type: String,
    },
    manufacturerPartNum: {
        type: String,
    },
    evidence: {
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

module.exports = mongoose.model('DHBItem', DHBSchema)