# Ugh! Bags Backend Server

Node.js + MongoDB backend for Ugh! Bags e-commerce website.

## Features

- **Order Management**: Create, read, update orders
- **Customer Management**: Customer registration and verification
- **Email Notifications**:
  - Order Confirmation emails
  - OTP (One-Time Password) for verification
  - Waitlist notifications

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Navigate to the server directory:
```
bash
cd server
```

2. Install dependencies:
```
bash
npm install
```

3. Configure environment variables:
```
bash
cp .env.example .env
```

4. Edit `.env` file with your settings:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ughbags
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Running the Server

### Development Mode
```
bash
npm run dev
```

### Production Mode
```
bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `PATCH /api/orders/:id/status` - Update order status
- `PATCH /api/orders/:id/payment` - Update payment status

### Customers
- `POST /api/customers` - Register customer (sends OTP)
- `POST /api/customers/verify` - Verify email with OTP
- `POST /api/customers/resend-otp` - Resend OTP
- `GET /api/customers/:email` - Get customer details

### Waitlist
- `POST /api/waitlist` - Add to waitlist

## Email Setup

### Gmail
1. Go to Google Account > Security
2. Enable 2-Step Verification
3. Go to App Passwords
4. Generate new app password for "Mail"
5. Use that password in EMAIL_PASS

### SendGrid (Alternative)
```
bash
npm install @sendgrid/mail
```

Update `emailService.js` to use SendGrid instead.

## MongoDB Setup

### Local MongoDB
1. Install MongoDB Community Server
2. Run: `mongod`
3. Database will be created automatically

### MongoDB Atlas (Cloud)
1. Create account at mongodb.com
2. Create cluster and database
3. Get connection string
4. Update MONGODB_URI in .env

## Frontend Integration

Update your frontend `app.js` to call the API:

```
javascript
// Replace localStorage order saving with API call
async function processOrder(formData) {
    const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    });
    return response.json();
}
