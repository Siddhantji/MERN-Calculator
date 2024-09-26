const mongoose = require('mongoose');

const calculationSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'User',
        required:true
    },
    expression:{
        type:String,
    },
    result:{
        type:Number
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

});
module.exports= mongoose.model('Calculation',calculationSchema);