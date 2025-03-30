import mongoose from "mongoose";

const connectDB = async (database: string): Promise<void> => {
    try {
        console.log("Connecting to Database...");
        await mongoose.connect(database);
        console.log("Connected to Database");
    } catch (error) {
        console.error("Connection failed to Database:", error);
        process.exit(1); // Exit with failure
    }
};

export default connectDB;
