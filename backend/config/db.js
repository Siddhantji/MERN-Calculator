const mongoose = require('mongoose');


const connectDB = async()=>{
    try{
await mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true, useUnifiedTopology: true})
console.log('Connected with Database');
    }
catch(err){
    console.log(err.message);
    process.exit(1);
}
}

module.exports = connectDB;