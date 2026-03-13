const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    isSubscribed: {
        type: Boolean,
        default: true
    },
    waitlistProducts: [{
        productId: Number,
        productName: String,
        addedAt: {
            type: Date,
            default: Date.now
        }
    }],
    otp: {
        code: String,
        expiresAt: Date
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Generate OTP
customerSchema.methods.generateOTP = function() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    this.otp = { code: otp, expiresAt };
    return otp;
};

// Verify OTP
customerSchema.methods.verifyOTP = function(otpCode) {
    if (!this.otp || !this.otp.code) return false;
    if (new Date() > this.otp.expiresAt) return false;
    return this.otp.code === otpCode;
};

customerSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Customer', customerSchema);
