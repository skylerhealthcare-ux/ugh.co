



// ==================== PRODUCTS ROUTES ====================
// Note: Products are served from frontend app.js (local array)
// For database products, add PostgreSQL table and uncomment below

// Get all products (from local array - frontend handles this)
// router.get('/products', async (req, res) => { ... }

// Get single product (from local array - frontend handles this)
// router.get('/products/:id', async (req, res) => { ... }

// ==================== ORDER ROUTES (MongoDB) ====================

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

        // Generate order number
        const date = new Date();
        const timestamp = date.getTime().toString().slice(-6);
        const random = Math.random().toString(36).substr(2, 4).toUpperCase();
        const orderNumber = `UGHB-${timestamp}${random}`;
        
        // Create order in MongoDB
        const order = new Order({
            orderNumber,
            customer,
            items,
            paymentMethod,
            subtotal,
            vat,
            total,
            notes: notes || '',
            status: 'pending',
            paymentStatus: 'pending'
        });

        await order.save();

        res.status(201).json({
            success: true,
            data: order,
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
        
        // Build query
        const query = {};
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

// ==================== CUSTOMER ROUTES (MongoDB) ====================

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
        
        // Only send email in production/development with valid credentials
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await sendOTPEmail(email, otp, 'verification');
        }

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
        
        // Only send email if configured
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await sendOTPEmail(email, otp, 'verification');
        }

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

        // Send waitlist confirmation if email is configured
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await sendWaitlistNotification(email, productName);
        }

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
