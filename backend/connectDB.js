import mongoose from "mongoose"

const connectMongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database is connected : ${conn}`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

export default connectMongoDB;