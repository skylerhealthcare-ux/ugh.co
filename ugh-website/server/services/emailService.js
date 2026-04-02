const nodemailer = require('nodemailer');

// Email configuration
// In production, use environment variables for credentials
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail', // Or use 'smtp.mailtrap.io', 'sendgrid', etc.
        auth: {
            user: process.env.EMAIL_USER || 'your-email@gmail.com',
            pass: process.env.EMAIL_PASS || 'your-app-password'
        }
    });
};

// Send Order Confirmation Email
const sendOrderConfirmation = async (order) => {
    const transporter = createTransporter();
    
    const itemsList = order.items.map(item => 
        `<li>${item.name} x${item.quantity} - ₦${item.price.toLocaleString()}</li>`
    ).join('');

    const mailOptions = {
        from: process.env.EMAIL_FROM || '"Ugh! Bags" <noreply@ughbags.com>',
        to: order.customer.email,
        subject: `Order Confirmation - ${order.orderNumber}`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #ff69b4; color: white; padding: 20px; text-align: center; }
                    .content { padding: 20px; background: #f9f9f9; }
                    .order-details { margin: 20px 0; }
                    .items { list-style: none; padding: 0; }
                    .items li { padding: 8px 0; border-bottom: 1px solid #eee; }
                    .total { font-size: 18px; font-weight: bold; color: #ff69b4; }
                    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Ugh! Bags</h1>
                        <p>Order Confirmation</p>
                    </div>
                    <div class="content">
                        <h2>Thank you for your order, ${order.customer.firstName}!</h2>
                        <p>Your order has been received and is being processed.</p>
                        
                        <div class="order-details">
                            <p><strong>Order Number:</strong> ${order.orderNumber}</p>
                            <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        
                        <h3>Order Items:</h3>
                        <ul class="items">
                            ${itemsList}
                        </ul>
                        
                        <div class="order-details">
                            <p>Subtotal: ₦${order.subtotal.toLocaleString()}</p>
                            <p>VAT (7.5%): ₦${order.vat.toLocaleString()}</p>
                            <p class="total">Total: ₦${order.total.toLocaleString()}</p>
                        </div>
                        
                        <h3>Shipping Address:</h3>
                        <p>
                            ${order.customer.firstName} ${order.customer.lastName}<br>
                            ${order.customer.address}<br>
                            ${order.customer.city}, ${order.customer.zipCode}
                        </p>
                        
                        <h3>Payment Method:</h3>
                        <p>${order.paymentMethod === 'bank_transfer' ? 'Bank Transfer' : 'PayPal'}</p>
                        
                        ${order.paymentMethod === 'bank_transfer' ? `
                        <div style="background: #fff3cd; padding: 15px; border-radius: 5px;">
                            <p><strong>Bank Transfer Details:</strong></p>
                            <p>Bank: Palmpay<br>
                            Account Name: Destiny Okoro<br>
                            Account Number: 7044105703<br>
                            Reference: ${order.orderNumber}</p>
                        </div>
                        ` : ''}
                    </div>
                    <div class="footer">
                        <p>&copy; 2024 Ugh! Bags. All rights reserved.</p>
                        <p>Questions? Contact us at hello@ughbags.com</p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Order confirmation email sent to ${order.customer.email}`);
        return true;
    } catch (error) {
        console.error('Error sending order confirmation email:', error);
        return false;
    }
};

// Send OTP Email
const sendOTPEmail = async (email, otp, purpose = 'verification') => {
    const transporter = createTransporter();
    
    const purposeText = purpose === 'verification' ? 'email verification' : 
                       purpose === 'password_reset' ? 'password reset' : 'login verification';
    
    const mailOptions = {
        from: process.env.EMAIL_FROM || '"Ugh! Bags" <noreply@ughbags.com>',
        to: email,
        subject: `Your OTP for ${purposeText} - Ugh! Bags`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #ff69b4; color: white; padding: 20px; text-align: center; }
                    .content { padding: 20px; background: #f9f9f9; }
                    .otp { font-size: 32px; font-weight: bold; letter-spacing: 5px; text-align: center; padding: 20px; background: white; border: 2px dashed #ff69b4; }
                    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Ugh! Bags</h1>
                        <p>OTP ${purposeText}</p>
                    </div>
                    <div class="content">
                        <h2>Hello!</h2>
                        <p>Your One-Time Password (OTP) for ${purposeText} is:</p>
                        <div class="otp">${otp}</div>
                        <p>This OTP will expire in 10 minutes.</p>
                        <p>If you did not request this, please ignore this email.</p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2024 Ugh! Bags. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP email sent to ${email}`);
        return true;
    } catch (error) {
        console.error('Error sending OTP email:', error);
        return false;
    }
};

// Send Waitlist Notification Email
const sendWaitlistNotification = async (email, productName) => {
    const transporter = createTransporter();
    
    const mailOptions = {
        from: process.env.EMAIL_FROM || '"Ugh! Bags" <noreply@ughbags.com>',
        to: email,
        subject: `You're on the Waitlist - ${productName}`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #ff69b4; color: white; padding: 20px; text-align: center; }
                    .content { padding: 20px; background: #f9f9f9; }
                    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Ugh! Bags</h1>
                        <p>Waitlist Notification</p>
                    </div>
                    <div class="content">
                        <h2>Good News!</h2>
                        <p>You've been added to the waitlist for <strong>${productName}</strong>.</p>
                        <p>We'll notify you as soon as it's back in stock!</p>
                        <p>In the meantime, feel free to browse our other products.</p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2024 Ugh! Bags. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Waitlist notification sent to ${email}`);
        return true;
    } catch (error) {
        console.error('Error sending waitlist email:', error);
        return false;
    }
};


    sendOrderConfirmation,
    sendOTPEmail,
    sendWaitlistNotification
};
