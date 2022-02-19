const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var promotionSchema= new Schema({
    postId:{
        type:Schema.Types.ObjectId,
        ref:'Post'
    },
    paymentStatus:{
        type:String,
        enum:["done","pending"]
    },
    expiryDate:Date
})

var Promotion=new mongoose.model("Promotion", promotionSchema);
module.exports=Promotion;