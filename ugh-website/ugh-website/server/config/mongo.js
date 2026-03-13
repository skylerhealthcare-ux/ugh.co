const mongoose = require('mongoose');

const connectMongoDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ughbags';
        
        await mongoose.connect(mongoUri);
        
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        console.log('Customer features (OTP, waitlist) will not work without MongoDB');
    }
};

module.exports = { connectMongoDB };
