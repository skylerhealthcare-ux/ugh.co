-- Database Schema for Neon PostgreSQL
-- Run this SQL in your Neon database to create the required tables

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100),
    category_name VARCHAR(100),
    image VARCHAR(500),
    description TEXT,
    stock INTEGER DEFAULT 5,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer JSONB NOT NULL,
    items JSONB NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    vat DECIMAL(10, 2) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    payment_status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customers Table
CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(50),
    is_verified BOOLEAN DEFAULT FALSE,
    otp VARCHAR(10),
    otp_expires TIMESTAMP,
    waitlist_products JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample products
INSERT INTO products (name, price, category, category_name, image, description, stock) VALUES
('Coach Teri Blue', 30000, 'teri', 'Coach Bags', 'img1/download.jfif', 'Coach Teri without charms. Perfect for work or weekend outings.', 5),
('Coach Teri Brown', 35000, 'teri', 'Coach Bags', 'img1/download (1).jfif', 'Light Pretty Blue very solid material.', 5),
('Boxed Pillow Coach', 45000, 'Pillow coach', 'Pillow Coach', 'img1/download (2).jfif', 'Denim Coach Teri without charm. Luxurious quilted design.', 5),
('Boxed Denim Pillow Coach', 45000, 'Pillow coach', 'Pillow Coach', 'img1/download (3).jfif', 'Casual and comfortable canvas tote perfect for everyday use.', 5),
('Quilitted Coach Tabby', 50000, 'tabby', 'Coach Tabby', 'img1/Coach Bag.jfif', 'Trendy chain strap adds glamour to this compact crossbody bag.', 5),
('Pink Pillow Coach', 50000, 'pillow', 'Pillow Coach', 'img1/download (5).jfif', 'Coach Tabby comes boxed. Premium leather crossbody with multiple compartments.', 5),
('Dark Brown Pillow', 45000, 'Pillow coach', 'Pillow Coach', 'img1/download (6).jfif', 'Cute mini size perfect for nights out and casual dates.', 5),
('Pink-Brown Bow Pillow', 50000, 'Pillow coach', 'Pillow Coach', 'img1/download (7).jfif', 'Adjustable wide strap for maximum comfort and style with a touch of cuteness.', 5),
('Half Crescent Brown', 50000, 'halfcrescent', 'Half Crescent', 'img1/download (12).jfif', 'Stylish mini purse with exquisite charm detailing for a touch of elegance.', 5),
('Half Crescent Teal', 45000, 'halfcrescent', 'Half Crescent', 'img1/download (13).jfif', 'Genuine solid leather very portable.', 5),
('Uneven Sway Coach', 45000, 'uneven', 'Uneven Sway', 'img1/download (14).jfif', 'Stylish and Comfortable.', 5),
('White Coach Teri', 30000, 'teri', 'Coach Teri', 'img1/Teri Shoulder Bag In Signature Canvas _ COACH OUTLET.jfif', 'Purity and simpicity.', 5),
('Denim Coach Teri', 45000, 'Coach Teri', 'Coach Teri', 'img1/90s Style Denim Style Teri Bag With Charms - Etsy.jfif', 'Gives the 90s.', 5),
('Trumpet Chanel Mini', 25000, 'Mini', 'Chanel Mini', 'img1/download (8).jfif', 'Stunning hand-beaded clutch with intricate floral pattern.', 5),
('Matte Black Chanel', 25000, 'Mini', 'Chanel Mini', 'img1/Chanel.jfif', 'Modern envelope style clutch with magnetic closure.', 5),
('Symphony Dior Clutch', 45000, 'Mini', 'Dior Mini', 'img1/symdior.jfif', 'Dazzling crystal-embellished clutch for special occasions.', 5),
('Glossy Ysl Bag', 25000, 'ysl', 'YSL', 'img1/ysl.jfif', 'Elegant Gucci belt bag in pink.', 5),
('Embroidery LadyDior', 60000, 'ladydior', 'Lady Dior', 'img1/ladydior.jfif', 'Luxury Coach bag.', 5),
('Flip Matte Chanel', 45000, 'chanel', 'Chanel', 'img1/Bigchanel.jfif', 'Classic Louis Vuitton Speedy bag.', 5),
('Gucci Ophidia Boxed', 35000, 'gucci', 'Gucci', 'img1/gucci.jfif', 'Saint Laurent Niki Baby in black.', 5);
