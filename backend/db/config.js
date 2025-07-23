import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect("mongodb+srv://databaseuser1:Passw0rd@cluster0.nvot6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Database Connected");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    process.exit(1);
    }
}

export default connectDB;
