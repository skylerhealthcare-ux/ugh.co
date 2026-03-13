const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true
    },
    customer: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        zipCode: { type: String, required: true }
    },
    items: [{
        id: Number,
        name: String,
        price: Number,
        image: String,
        quantity: Number
    }],
    paymentMethod: {
        type: String,
        enum: ['bank_transfer', 'paypal'],
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    vat: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    notes: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Generate order number before saving
orderSchema.pre('save', async function(next) {
    if (!this.orderNumber) {
        const date = new Date();
        const timestamp = date.getTime().toString().slice(-6);
        const random = Math.random().toString(36).substr(2, 4).toUpperCase();
        this.orderNumber = `UGHB-${timestamp}${random}`;
    }
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Order', orderSchema);
