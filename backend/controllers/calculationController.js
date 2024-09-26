const Calculation = require('../models/calculation');

const addCalculation = async(req,res)=>{
    const {expression, result}=req.body;
    const newCalculation = new Calculation({userId:req.user.id,expression,result});
    await newCalculation.save();
    res.status(201).json({message:'Calculation saved successfully',newCalculation});
}

const getCalculation = async(req,res)=>{
    try{
        const data = Calculation.findOne(req.user.id);
        res.status(201).json({message:'All calculations'},data);
    }catch(err){
        res.status(500).json({message:'Error fetching data'},err);
    }
}

module.exports= {
    addCalculation,
    getCalculation
}