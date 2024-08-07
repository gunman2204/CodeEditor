const mongoose=require('mongoose')
const codeModel=require('../models/Codes')

exports.saveNewCode=async(req,res)=>{
    // console.log(code);
    const {encodedCode}=req.body;
    try {
        const newCode=await codeModel.create({encodedCode})
        console.log('successfully created code document',encodedCode,req.body);
        // res.status(200).json
    } catch (error) {
        res.status(500).json({message:error.message});
        console.log('failed loading codes at backend'); 
    }
}
