# Ugh! Bags - E-Commerce Website Specification

## 1. Project Overview

**Project Name:** Ugh! Bags - Pink E-Commerce Website  
**Project Type:** Multi-page E-Commerce Website  
**Core Functionality:** A full-featured online store for bags with category-based navigation, product listings, shopping cart, and checkout - mirroring Bumpa App functionality with a pink theme.  
**Target Users:** Online shoppers looking to purchase bags

---

## 2. UI/UX Specification

### Color Palette (Pink Theme)
- **Primary Pink:** #FF69B4 (Hot Pink)
- **Secondary Pink:** #FF1493 (Deep Pink)
- **Light Pink:** #FFB6C1 (Light Pink)
- **Pale Pink:** #FFE4E1 (Misty Rose)
- **Dark Pink:** #C71585 (Medium Violet Red)
- **White:** #FFFFFF
- **Off-White:** #FFF5F5
- **Dark Text:** #2D2D2D
- **Light Text:** #666666

### Typography
- **Headings:** 'Playfair Display', serif (elegant, luxury feel)
- **Body Text:** 'Quicksand', sans-serif (modern, readable)
- **Logo/Brand:** 'Pacifico', cursive (fun, memorable)

### Layout Structure

#### Header (All Pages)
- Logo on left ("Ugh! Bags" in Pacifico font, pink)
- Navigation: Home, Shop All, Categories dropdown, About, Contact
- Cart icon with item count badge on right
- Sticky header with white background, subtle shadow

#### Homepage
1. **Hero Slideshow**
   - Full-width slideshow (100vw width, 70vh height)
   - Auto-rotate every 5 seconds with smooth transitions
   - Navigation dots at bottom
   - 3 slides showcasing different bag categories
   - Overlay text with category name and "Shop Now" button

2. **Category Grid**
   - 4 category cards in 2x2 grid
   - Categories: Tote Bags, Crossbody Bags, Backpacks, Clutches
   - Each card: Image, category name, item count
   - Hover effect: scale up, pink border glow

3. **Featured Products Section**
   - "New Arrivals" title
   - 4 product cards in row
   - Product card: Image, name, price, "Add to Cart" button

4. **Footer**
   - Brand info, Quick Links, Contact, Social Media
   - Pink gradient background

#### Category Page
- Breadcrumb navigation
- Category title and description
- Filter/sort options (price, color)
- Product grid (3 columns desktop, 2 tablet, 1 mobile)
- Pagination

#### Product Detail Page
- Large product image
- Product name, price, description
- Color/size options (if applicable)
- Quantity selector
- "Add to Cart" button
- "Add to Wishlist" heart icon
- Related products section

#### Shopping Cart (Slide-out Panel)
- Slide-in from right
- List of cart items with images, names, prices
- Quantity adjusters (+/-)
- Remove item button
- Subtotal
- "Checkout" button

### Responsive Breakpoints
- **Desktop:** > 1024px
- **Tablet:** 768px - 1024px
- **Mobile:** < 768px

### Animations & Effects
- Hero slideshow fade transition (1s ease)
- Category cards hover: transform scale(1.05), box-shadow
- Product cards hover: lift effect with shadow
- Buttons: background color transition (0.3s)
- Cart slide-in: transform translateX (0.4s ease)
- Page load: staggered fade-in for sections
- Smooth scroll behavior

---

## 3. Functionality Specification

### Core Features

1. **Slideshow**
   - Auto-advances every 5 seconds
   - Manual navigation with dots
   - Pause on hover
   - Infinite loop

2. **Category Navigation**
   - Click category to go to category page
   - Categories: Tote Bags, Crossbody Bags, Backpacks, Clutches

3. **Product Display**
   - Product grid with images
   - Price display
   - Add to cart functionality

4. **Shopping Cart**
   - Add products to cart
   - Update quantities
   - Remove items
   - Calculate subtotal
   - Persist cart in localStorage

5. **Product Filtering**
   - Filter by category
   - Sort by price (low-high, high-low)

### User Interactions
- Click slideshow → Navigate to category
- Click category card → Go to category page
- Click product → Go to product detail
- Click "Add to Cart" → Add item, show cart notification
- Click cart icon → Open cart panel
- Click +/- in cart → Adjust quantity

### Data Handling
- Products stored in JavaScript array
- Cart stored in localStorage
- No backend required (static demo)

### Sample Products Data
Each category will have 4 products with:
- ID, name, price, category, image (placeholder URLs), description

---

## 4. Pages Structure

1. **index.html** - Homepage
2. **category.html** - Category listing page (uses URL params)
3. **product.html** - Product detail page (uses URL params)
4. **styles.css** - All styles
5. **app.js** - All JavaScript functionality

---

## 5. Acceptance Criteria

- [ ] Homepage loads with pink-themed slideshow
- [ ] Slideshow auto-rotates and has working navigation
- [ ] Category cards display and link to category pages
- [ ] Clicking category shows products for that category
- [ ] Products can be added to cart
- [ ] Cart panel opens/closes smoothly
- [ ] Cart quantities can be adjusted
- [ ] Cart subtotal calculates correctly
- [ ] Cart persists on page refresh
- [ ] All pages are responsive
- [ ] Pink color theme is consistent throughout
- [ ] All hover effects and animations work
