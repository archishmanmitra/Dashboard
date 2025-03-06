import mongoose from "mongoose";
const connectDB = async () => {
    try{
        const connection= await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`\n MongoDB connected successfully! at:
            ${connection.connection.host}`);
    }
    catch(error){
        console.error("ERROR connecting to database: ", error);
        throw error;
    }
}

export default connectDB