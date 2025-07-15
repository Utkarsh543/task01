import mongoose, { Schema } from "mongoose";

const historySchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    points:{
        type:Number,
        required:true
    },
    time:{
        type:Date,
        default:Date.now
    }
})

const History = mongoose.model('History', historySchema);
export default History;