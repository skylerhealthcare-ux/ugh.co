const express = require('express');
const router = express.Router();
const { query: dbQuery } = require('../config/db');
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const { sendOTPEmail, sendWaitlistNotification } = require('../services/emailService');

// ==================== PRODUCTS ROUTES ====================

// Get all products
router.get('/products', async (req, res) => {
    try {
        const { category } = req.query;
        let sql = 'SELECT * FROM products';
        let params = [];
        
        if (category && category !== 'all') {
            sql += ' WHERE category = $1';
            params.push(category);
        }
        
        sql += ' ORDER BY id';
        
        const result = await dbQuery(sql, params);
        
        res.json({
            success: true,
            data: result.rows
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message
        });
    }
});

// Get single product
router.get('/products/:id', async (req, res) => {
    try {
        const result = await dbQuery(
            'SELECT * FROM products WHERE id = $1',
            [req.params.id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        res.json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching product',
            error: error.message
        });
    }
});

// ==================== ORDER ROUTES ====================

// Create new order
router.post('/orders', async (req, res) => {
    try {
        const { customer, items, paymentMethod, subtotal, vat, total, notes } = req.body;

        // Validate required fields
        if (!customer || !items || !paymentMethod || !subtotal || !vat || !total) {
            return res.status(400).json({ 
                success: false, 
                message: 'Missing required fields' 
            });
        }

        const orderNumber = 'UGHB-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        
        // Insert order into database
        const result = await dbQuery(
            `INSERT INTO orders (order_number, customer, items, payment_method, subtotal, vat, total, notes, status, payment_status, created_at) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW()) 
             RETURNING *`,
            [orderNumber, JSON.stringify(customer), JSON.stringify(items), paymentMethod, subtotal, vat, total, notes || '', 'pending', 'pending']
        );

        res.status(201).json({
            success: true,
            data: result.rows[0],
            message: 'Order created successfully'
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating order',
            error: error.message
        });
    }
});

// Get all orders
router.get('/orders', async (req, res) => {
    try {
        const { status, paymentStatus, page = 1, limit = 20 } = req.query;
        
        let query = {};
        if (status) query.status = status;
        if (paymentStatus) query.paymentStatus = paymentStatus;

        const orders = await Order.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Order.countDocuments(query);

        res.json({
            success: true,
            data: orders,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: count,
                pages: Math.ceil(count / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error.message
        });
    }
});

// Get single order
router.get('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findOne({ orderNumber: req.params.id });
        
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.json({
            success: true,
            data: order
        });
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching order',
            error: error.message
        });
    }
});

// Update order status
router.patch('/orders/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        
        const order = await Order.findOneAndUpdate(
            { orderNumber: req.params.id },
            { status, updatedAt: Date.now() },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.json({
            success: true,
            data: order,
            message: 'Order status updated'
        });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating order status',
            error: error.message
        });
    }
});

// Update payment status
router.patch('/orders/:id/payment', async (req, res) => {
    try {
        const { paymentStatus } = req.body;
        
        const order = await Order.findOneAndUpdate(
            { orderNumber: req.params.id },
            { paymentStatus, updatedAt: Date.now() },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.json({
            success: true,
            data: order,
            message: 'Payment status updated'
        });
    } catch (error) {
        console.error('Error updating payment status:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating payment status',
            error: error.message
        });
    }
});

// ==================== CUSTOMER ROUTES ====================

// Register/Subscribe customer
router.post('/customers', async (req, res) => {
    try {
        const { email, firstName, lastName, phone } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        // Check if customer exists
        let customer = await Customer.findOne({ email });

        if (customer) {
            // Update existing customer
            customer.firstName = firstName || customer.firstName;
            customer.lastName = lastName || customer.lastName;
            customer.phone = phone || customer.phone;
            await customer.save();
        } else {
            // Create new customer
            customer = new Customer({
                email,
                firstName,
                lastName,
                phone
            });
            await customer.save();
        }

        // Generate and send OTP
        const otp = customer.generateOTP();
        await customer.save();
        await sendOTPEmail(email, otp, 'verification');

        res.status(201).json({
            success: true,
            message: 'Customer registered. OTP sent to email.',
            data: { email: customer.email, isVerified: customer.isVerified }
        });
    } catch (error) {
        console.error('Error registering customer:', error);
        res.status(500).json({
            success: false,
            message: 'Error registering customer',
            error: error.message
        });
    }
});

// Verify OTP
router.post('/customers/verify', async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: 'Email and OTP are required'
            });
        }

        const customer = await Customer.findOne({ email });

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: 'Customer not found'
            });
        }

        if (customer.isVerified) {
            return res.json({
                success: true,
                message: 'Email already verified',
                data: { isVerified: true }
            });
        }

        if (customer.verifyOTP(otp)) {
            customer.isVerified = true;
            customer.otp = undefined;
            await customer.save();

            res.json({
                success: true,
                message: 'Email verified successfully',
                data: { isVerified: true }
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Invalid or expired OTP'
            });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({
            success: false,
            message: 'Error verifying OTP',
            error: error.message
        });
    }
});

// Resend OTP
router.post('/customers/resend-otp', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        const customer = await Customer.findOne({ email });

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: 'Customer not found'
            });
        }

        if (customer.isVerified) {
            return res.json({
                success: true,
                message: 'Email already verified'
            });
        }

        // Generate new OTP
        const otp = customer.generateOTP();
        await customer.save();
        await sendOTPEmail(email, otp, 'verification');

        res.json({
            success: true,
            message: 'OTP resent successfully'
        });
    } catch (error) {
        console.error('Error resending OTP:', error);
        res.status(500).json({
            success: false,
            message: 'Error resending OTP',
            error: error.message
        });
    }
});

// Add to waitlist
router.post('/waitlist', async (req, res) => {
    try {
        const { email, productId, productName } = req.body;

        if (!email || !productId || !productName) {
            return res.status(400).json({
                success: false,
                message: 'Email, productId, and productName are required'
            });
        }

        // Find or create customer
        let customer = await Customer.findOne({ email });
        
        if (!customer) {
            customer = new Customer({ email });
        }

        // Check if already on waitlist for this product
        const alreadyOnList = customer.waitlistProducts.some(
            p => p.productId === productId
        );

        if (alreadyOnList) {
            return res.json({
                success: true,
                message: 'Already on waitlist for this product'
            });
        }

        // Add to waitlist
        customer.waitlistProducts.push({ productId, productName });
        await customer.save();

        // Send waitlist confirmation
        await sendWaitlistNotification(email, productName);

        res.status(201).json({
            success: true,
            message: 'Added to waitlist'
        });
    } catch (error) {
        console.error('Error adding to waitlist:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding to waitlist',
            error: error.message
        });
    }
});

// Get customer by email
router.get('/customers/:email', async (req, res) => {
    try {
        const customer = await Customer.findOne({ email: req.params.email });

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: 'Customer not found'
            });
        }

        res.json({
            success: true,
            data: {
                email: customer.email,
                firstName: customer.firstName,
                lastName: customer.lastName,
                phone: customer.phone,
                isVerified: customer.isVerified,
                waitlistProducts: customer.waitlistProducts
            }
        });
    } catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching customer',
            error: error.message
        });
    }
});

module.exports = router;
