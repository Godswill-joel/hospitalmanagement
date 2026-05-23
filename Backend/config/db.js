import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect ("mongodb+srv://asuquog588_db_user:kzWfbZ6Z2wC9jbcM@cluster0.tjnavxe.mongodb.net/hospitalmanagement")
    .then(() =>{
        console.log("DB CONNECTED SUCCESSFULLY")
    })
}