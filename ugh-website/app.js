// ========================================
// Ugh! Bags - E-Commerce JavaScript
// ========================================

// ========================================
// Configuration
// ========================================
// Update this to your Railway backend URL after deployment
// Example: 'https://your-app.up.railway.app/api'


const CONFIG = {
    vatRate: 0.075, // 7.5% Nigerian Standard VAT
    currency: '₦',
    currencyCode: 'NGN',
    bankDetails: {
        bankName: 'Palmpay',
        accountName: 'Destiny Okoro',
        accountNumber: '7044105703',
        sortCode: 'N/A',
        reference: 'UGHB-{orderNumber}'
    }
};

// Format price with currency
function formatPrice(amount) {
    return `${CONFIG.currency}${amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Calculate VAT
function calculateVAT(amount) {
    return amount * CONFIG.vatRate;
}

// Get total with VAT
function getTotalWithVAT() {
    const subtotal = getCartTotal();
    const vat = calculateVAT(subtotal);
    return {
        subtotal: subtotal,
        vat: vat,
        total: subtotal + vat
    };
}

// ========================================
// Product Data
// ========================================
const products = [
// Teri Bags
    {
        id: 1,
        name: "Coach Teri Blue",
        price: 35000,
        category: "teri",
        categoryName: "Coach Bags",
        image: "img1/download.jfif",
        description: "Coach Teri without charms. Perfect for work or weekend outings.",
        stock: 5
    },
    {
        id: 2,
        name: "Coach Teri Brown ",
        price: 40000,
        category: "teri",
        categoryName: "Coach Bags",
        image: "img1/download (1).jfif",
        description: "Light Pretty Blue very solid material.",
        stock: 5
    },
    {
        id: 3,
        name: "Boxed Pillow Coach",
        price: 60000,
        category: "Pillow coach",
        categoryName: "Pillow Coach ",
        image: "img1/download (2).jfif",
        description: "Denim Coach Teri without charm. Luxurious quilted design."
    },
    {
        id: 4,
        name: "Boxed Denim Pillow Coach",
        price: 60000,
        category: "Pillow coach",
        categoryName: "Pillow Coach ",
        image: "img1/download (3).jfif",
        description: "Casual and comfortable canvas tote perfect for everyday use."
    },
    
    // Coach Tabby Bags
    {
        id: 5,
        name: "Quilitted Coach Tabby ",
        price: 50000,
        category: "tabby",
        categoryName: "Coach Tabby",
        image: "img1/Coach Bag.jfif",
        description: "Trendy chain strap adds glamour to this compact crossbody bag."
    },
    {
        id: 6,
        name: "Pink Pillow Coach",
        price: 50000,
        category: "pillow",
        categoryName: "Pillow Coach",
        image: "img1/download (5).jfif",
        description: "Coach Tabby comes boxed. Premium leather crossbody with multiple compartments."
    },
    {
        id: 7,
        name: "Dark Brown Pillow",
        price: 50000,
        category: "Pillow coach",
        categoryName: "Pillow Coach ",
        image: "img1/download (6).jfif",
        description: "Cute mini size perfect for nights out and casual dates."
    },
    {
        id: 8,
        name: "Pink-Brown Bow Pillow",
        price: 50000,
        category: "Pillow coach",
        categoryName: "Pillow Coach ",
        image: "img1/download (7).jfif",
        description: "Adjustable wide strap for maximum comfort and style with a touch of cuteness."
    },
    
    // Half Crescent
    {
        id: 9,
        name: "Half Crescent Brown",
        price: 50000,
        category: "halfcrescent",
        categoryName: "Half Crescent",
        image: "img1/download (12).jfif",
        description: "Stylish mini purse with exquisite charm detailing for a touch of elegance."
    },
    {
        id: 10,
        name: "Half Crescent Teal",
        price: 45000,
        category: "halfcrescent",
        categoryName: "Half Crescent",
        image: "img1/download (13).jfif",
        description: "Genuine solid leather very portable."
    },
    {
        id: 11,
        name: "Uneven Sway Coach",
        price: 45000,
        category: "uneven",
        categoryName: "Uneven Sway",
        image: "img1/download (14).jfif",
        description: "Stylish and Comfortable."
    },
    {
        id: 12,
        name: "White Coach Teri",
        price: 30000,
        category: "teri",
        categoryName: "Coach Teri",
        image: "img1/Teri Shoulder Bag In Signature Canvas _ COACH OUTLET.jfif",
        description: "Purity and simpicity."
    },
    
// Chanel
    {
        id: 13,
        name: "Denim Coach Teri",
        price: 45000,
        category: "Coach Teri",
        categoryName: "Coach Teri",
        image: "img1/90s Style Denim Style Teri Bag With Charms - Etsy.jfif",
        description: "Gives the 90's."
    },
    {
        id: 14,
        name: "Trumpet Chanel Mini ",
        price: 25000,
        category: "Mini",
        categoryName: "Chanel Mini",
        image: "img1/download (8).jfif",
        description: "Stunning hand-beaded clutch with intricate floral pattern."
    },
    {
        id: 15,
        name: "Matte Black Chanel",
        price: 25000,
        category: "Mini",
        categoryName: "Chanel Mini",
        image: "./img1/Chanel.jfif",
        description: "Modern envelope style clutch with magnetic closure."
    },
    {
        id: 16,
        name: "Symphony Dior Clutch",
        price: 45000,
        category: "Mini",
        categoryName: "Dior Mini",
        image: "img1/symdior.jfif",
        description: "Dazzling crystal-embellished clutch for special occasions."
    },
    
    // Additional Products
    {
        id: 17,
        name: "Glossy Ysl Bag",
        price: 25000,
        category: "ysl",
        categoryName: "YSL",
        image: "img1/ysl.jfif",
        description: "Elegant Gucci belt bag in pink."
    },
    {
        id: 18,
        name: "Embroidery LadyDior",
        price: 105000,
        category: "ladydior",
        categoryName: "Lady Dior",
        image: "img1/ladydior.jfif",
        description: "Luxury Coach bag."
    },
    {
        id: 19,
        name: "Flip Matte Chanel",
        price: 80000,
        category: "chanel",
        categoryName: "Chanel",
        image: "img1/Bigchanel.jfif",
        description: "Classic Louis Vuitton Speedy bag."
    },
    {
        id: 20,
        name:"Gucci Ophidia Boxed",
        price:35000,
        category: "gucci",
        categoryName: "Gucci",
        image: "img1/gucci.jfif",
        description: "Saint Laurent Niki Baby in black."
    }
];

// ========================================
// Cart Management
// ========================================
let cart = JSON.parse(localStorage.getItem('ughBagsCart')) || [];

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('ughBagsCart', JSON.stringify(cart));
    updateCartUI();
}

// Add item to cart
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    saveCart();
    showNotification(`${formatPrice(product.price)} ${product.name} added to cart!`);
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
}

// Update item quantity
function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
        }
    }
}

// Calculate cart total
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get cart item count
function getCartCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// ========================================
// Cart UI Functions
// ========================================
function updateCartUI() {
    // Update cart count badge
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = getCartCount();
    }
    
    // Update cart items
    const cartItemsEl = document.getElementById('cartItems');
    const cartTotalEl = document.getElementById('cartTotal');
    
    if (cartItemsEl) {
        if (cart.length === 0) {
            cartItemsEl.innerHTML = `
                <div class="cart-empty">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                    <p>Your cart is empty</p>
                </div>
            `;
        } else {
            cartItemsEl.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <p class="cart-item-price">${formatPrice(item.price)}</p>
                        <div class="cart-item-qty">
                            <button onclick="updateCartQuantity(${item.id}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateCartQuantity(${item.id}, 1)">+</button>
                        </div>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})">&times;</button>
                </div>
            `).join('');
        }
    }
    
    if (cartTotalEl) {
        cartTotalEl.textContent = formatPrice(getCartTotal());
    }
}

// Open/Close cart panel
function toggleCart(open) {
    const cartPanel = document.getElementById('cartPanel');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (open === true) {
        cartPanel.classList.add('active');
        cartOverlay.classList.add('active');
    } else if (open === false) {
        cartPanel.classList.remove('active');
        cartOverlay.classList.remove('active');
    } else {
        cartPanel.classList.toggle('active');
        cartOverlay.classList.toggle('active');
    }
}

// ========================================
// Notification
// ========================================
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    if (notification && notificationText) {
        notificationText.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// ========================================
// Product Card Template
// ========================================
function createProductCard(product) {
    return `
        <div class="product-card">
            <div class="product-card-image">
                <a href="product.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                </a>
                <span class="product-badge">New</span>
            </div>
            <div class="product-card-content">
                <p class="product-card-category">${product.categoryName}</p>
                <h3 class="product-card-title">
                    <a href="product.html?id=${product.id}">${product.name}</a>
                </h3>
                <p class="product-card-price">${formatPrice(product.price)}</p>
                <button class="product-card-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `;
}

// ========================================
// Slideshow
// ========================================
let currentSlide = 0;
let slideInterval;

function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('slideshowDots');
    
    if (!slides.length) return;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `slideshow-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    // Auto-advance
    startSlideshow();
    
    // Pause on hover
    const slideshow = document.getElementById('slideshow');
    slideshow.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slideshow.addEventListener('mouseleave', startSlideshow);
}

function startSlideshow() {
    slideInterval = setInterval(() => {
        const slides = document.querySelectorAll('.slide');
        goToSlide((currentSlide + 1) % slides.length);
    }, 5000);
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slideshow-dot');
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// ========================================
// Featured Products (Homepage)
// ========================================
function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;
    
    // Show all 20 products
    const featured = products.slice(0, 20);
    container.innerHTML = featured.map(createProductCard).join('');
}

// ========================================
// Category Products
// ========================================
function loadCategoryProducts() {
    const container = document.getElementById('categoryProducts');
    if (!container) return;
    
    // Get category from URL
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat') || 'all';
    
    // Filter products
    let filteredProducts = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);
    
    // Update page elements
    const titleEl = document.getElementById('categoryTitle');
    const descEl = document.getElementById('categoryDesc');
    const countEl = document.getElementById('productCount');
    const breadcrumbEl = document.getElementById('breadcrumbCategory');
    
    const categoryNames = {
        'all': 'All Products',
        'teri': 'Coach Teri',
        'tabby': 'Coach Tabby',
        'pillow': 'Pillow Coach',
        'Pillow coach': 'Pillow Coach',
        'halfcrescent': 'Half Crescent',
        'mini': 'Chanel Mini',
        'Mini': 'Chanel Mini',
        'chanel': 'Chanel',
        'ysl': 'YSL',
        'ladydior': 'Lady Dior',
        'gucci': 'Gucci',
        'uneven': 'Uneven Sway'
    };
    
    const categoryDescs = {
        'all': 'Browse our complete collection of stylish bags',
        'teri': 'Discover our Coach Teri collection',
        'tabby': 'Find your perfect Coach Tabby bag',
        'pillow': 'Explore our Pillow Coach collection',
        'Pillow coach': 'Explore our Pillow Coach collection',
        'halfcrescent': 'Shop our Half Crescent bags',
        'mini': 'Chic Chanel Mini bags',
        'Mini': 'Chic Chanel Mini bags',
        'chanel': 'Classic Chanel collection',
        'ysl': 'Elegant YSL bags',
        'ladydior': 'Luxury Lady Dior bags',
        'gucci': 'Gucci collection',
        'uneven': 'Stylish Uneven Sway bags'
    };
    
    if (titleEl) titleEl.textContent = categoryNames[category] || 'Products';
    if (descEl) descEl.textContent = categoryDescs[category] || '';
    if (countEl) countEl.textContent = `${filteredProducts.length} Products`;
    if (breadcrumbEl) breadcrumbEl.textContent = categoryNames[category] || 'Products';
    
    // Sort functionality
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const sortBy = e.target.value;
            let sorted = [...filteredProducts];
            
            if (sortBy === 'price-low') {
                sorted.sort((a, b) => a.price - b.price);
            } else if (sortBy === 'price-high') {
                sorted.sort((a, b) => b.price - a.price);
            }
            
            container.innerHTML = sorted.map(createProductCard).join('');
        });
    }
    
    container.innerHTML = filteredProducts.map(createProductCard).join('');
}

// ========================================
// Product Detail
// ========================================
function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        window.location.href = 'category.html?cat=all';
        return;
    }
    
    // Update page elements
    document.getElementById('productImage').src = product.image;
    document.getElementById('productImage').alt = product.name;
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productPrice').textContent = formatPrice(product.price);
    document.getElementById('productDesc').textContent = product.description;
    document.getElementById('productCategory').textContent = product.categoryName;
    
    // Update breadcrumb
    document.getElementById('breadcrumbCat').href = `category.html?cat=${product.category}`;
    document.getElementById('breadcrumbCat').textContent = product.categoryName;
    document.getElementById('breadcrumbProduct').textContent = product.name;
    
    // Set page title
    document.title = `${product.name} - Ugh! Bags`;
    
    // Quantity controls
    const qtyInput = document.getElementById('qtyInput');
    const qtyMinus = document.getElementById('qtyMinus');
    const qtyPlus = document.getElementById('qtyPlus');
    
    qtyMinus.addEventListener('click', () => {
        if (qtyInput.value > 1) {
            qtyInput.value = parseInt(qtyInput.value) - 1;
        }
    });
    
    qtyPlus.addEventListener('click', () => {
        qtyInput.value = parseInt(qtyInput.value) + 1;
    });
    
    // Add to cart button
    document.getElementById('addToCartBtn').addEventListener('click', () => {
        const quantity = parseInt(qtyInput.value);
        addToCart(product.id, quantity);
    });
    
    // Wishlist button
    const wishlistBtn = document.getElementById('wishlistBtn');
    wishlistBtn.addEventListener('click', () => {
        showNotification('Added to wishlist!');
    });
    
    // Load similar products (recommendations - similar price range or complementary)
    const similarContainer = document.getElementById('similarProducts');
    if (similarContainer) {
        const similar = getSimilarProducts(product, products);
        similarContainer.innerHTML = similar.map(createProductCard).join('');
    }
}

// Get similar products based on price range and complementary categories
function getSimilarProducts(currentProduct, allProducts) {
    const priceRange = currentProduct.price * 0.3; // 30% price variance
    const minPrice = currentProduct.price - priceRange;
    const maxPrice = currentProduct.price + priceRange;
    
    // Filter products that are:
    // 1. Not the current product
    // 2. Either similar price OR from complementary categories
    const similarProducts = allProducts.filter(p => {
        if (p.id === currentProduct.id) return false;
        
        const isSimilarPrice = p.price >= minPrice && p.price <= maxPrice;
        const isComplementary = isComplementaryCategory(currentProduct.category, p.category);
        
        return isSimilarPrice || isComplementary;
    });
    
    // Shuffle and take 4 products
    const shuffled = similarProducts.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
}

// Check if categories are complementary (users who buy from one category might like the other)
function isComplementaryCategory(cat1, cat2) {
    const complementaryPairs = [
        ['teri', 'tabby'],
        ['teri', 'pillow'],
        ['tabby', 'pillow'],
        ['halfcrescent', 'mini'],
        ['halfcrescent', 'chanel'],
        ['mini', 'chanel'],
        ['gucci', 'chanel'],
        ['junie', 'teri'],
        ['pillow', 'tabby'],
        ['uneven', 'halfcrescent']
    ];
    
    return complementaryPairs.some(pair => 
        (pair[0] === cat1 && pair[1] === cat2) || 
        (pair[0] === cat2 && pair[1] === cat1)
    );
}

// ========================================
// Cart Event Listeners
// ========================================
function initCartListeners() {
    const cartBtn = document.getElementById('cartBtn');
    const cartClose = document.getElementById('cartClose');
    const cartOverlay = document.getElementById('cartOverlay');
    const checkoutBtn = document.querySelector('.btn-checkout');
    
    if (cartBtn) {
        cartBtn.addEventListener('click', () => toggleCart());
    }
    
    if (cartClose) {
        cartClose.addEventListener('click', () => toggleCart(false));
    }
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', () => toggleCart(false));
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', openCheckout);
    }
}

// ========================================
// Checkout Functions
// ========================================
function openCheckout() {
    toggleCart(false);
    const checkoutOverlay = document.getElementById('checkoutOverlay');
    if (!checkoutOverlay) return;
    
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    // Reset to step 1
    showCheckoutStep(1);
    populateOrderSummary();
    checkoutOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCheckout() {
    const checkoutOverlay = document.getElementById('checkoutOverlay');
    if (checkoutOverlay) {
        checkoutOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Show checkout step - kept for future multi-step checkout expansion
function showCheckoutStep(step) {
    // Single-page checkout for now
    console.log('Checkout step:', step);
}

// Populate order summary with VAT
function populateOrderSummary() {
    const summaryItems = document.getElementById('summaryItems');
    const summarySubtotal = document.getElementById('summarySubtotal');
    const summaryVat = document.getElementById('summaryVat');
    const summaryTotal = document.getElementById('summaryTotal');
    
    if (!summaryItems) return;
    
    const totals = getTotalWithVAT();
    
    summaryItems.innerHTML = cart.map(item => `
        <div class="summary-item">
            <div>
                <span class="summary-item-name">${item.name}</span>
                <span class="summary-item-qty">x${item.quantity}</span>
            </div>
            <span class="summary-item-price">${formatPrice(item.price * item.quantity)}</span>
        </div>
    `).join('');
    
    if (summarySubtotal) summarySubtotal.textContent = formatPrice(totals.subtotal);
    if (summaryVat) summaryVat.textContent = formatPrice(totals.vat) + ' (7.5% VAT)';
    if (summaryTotal) summaryTotal.textContent = formatPrice(totals.total);
}

// Populate bank transfer details from CONFIG
function populateBankDetails() {
    const bankNameEl = document.getElementById('bankName');
    const accountNameEl = document.getElementById('accountName');
    const accountNumberEl = document.getElementById('accountNumber');
    const sortCodeEl = document.getElementById('sortCode');
    const bankReferenceEl = document.getElementById('bankReference');
    const checkoutTotalEl = document.getElementById('checkoutTotal');
    const checkoutVatEl = document.getElementById('checkoutVat');
    
    const totals = getTotalWithVAT();
    
    if (bankNameEl) bankNameEl.textContent = CONFIG.bankDetails.bankName;
    if (accountNameEl) accountNameEl.textContent = CONFIG.bankDetails.accountName;
    if (accountNumberEl) accountNumberEl.textContent = CONFIG.bankDetails.accountNumber;
    if (sortCodeEl) sortCodeEl.textContent = CONFIG.bankDetails.sortCode;
    if (bankReferenceEl) bankReferenceEl.textContent = CONFIG.bankDetails.reference;
    if (checkoutTotalEl) checkoutTotalEl.textContent = formatPrice(totals.total);
    if (checkoutVatEl) checkoutVatEl.textContent = formatPrice(totals.vat);
}

// Show bank transfer details section
function showBankDetails() {
    const bankDetailsSection = document.getElementById('bankDetailsSection');
    if (bankDetailsSection) {
        bankDetailsSection.style.display = 'block';
    }
}

// Hide bank transfer details section
function hideBankDetails() {
    const bankDetailsSection = document.getElementById('bankDetailsSection');
    if (bankDetailsSection) {
        bankDetailsSection.style.display = 'none';
    }
}

// Validate payment amount for bank transfer
function validateBankPayment() {
    const paidAmount = document.getElementById('paidAmount');
    const paymentError = document.getElementById('paymentError');
    const totals = getTotalWithVAT();
    const expectedAmount = totals.total;
    
    if (paidAmount && paymentError) {
        const amount = parseFloat(paidAmount.value);
        
        if (isNaN(amount) || amount <= 0) {
            paymentError.textContent = 'Please enter a valid amount';
            paymentError.style.display = 'block';
            return false;
        }
        
        if (amount < expectedAmount) {
            paymentError.textContent = `Amount must be exactly ${formatPrice(expectedAmount)}. You entered ${formatPrice(amount)}`;
            paymentError.style.display = 'block';
            return false;
        }
        
        if (amount > expectedAmount) {
            paymentError.textContent = `Amount exceeds required. Please pay exactly ${formatPrice(expectedAmount)}. You entered ${formatPrice(amount)}`;
            paymentError.style.display = 'block';
            return false;
        }
        
        paymentError.style.display = 'none';
        return true;
    }
    return true;
}

// Handle payment method change
function handlePaymentMethodChange(paymentMethod) {
    if (paymentMethod === 'bank_transfer') {
        showBankDetails();
    } else {
        hideBankDetails();
    }
}


    const paymentMethod = formData.get('payment');
    const totals = getTotalWithVAT();
    
    const order = {
        orderNumber: orderNumber,
        customer: {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            city: formData.get('city'),
            zipCode: formData.get('zipCode'),
            notes: formData.get('orderNotes')
        },
        paymentMethod: paymentMethod,
        items: cart,
        subtotal: totals.subtotal,
        vat: totals.vat,
        total: totals.total,
        date: new Date().toISOString()
    };
    
    const orders = JSON.parse(localStorage.getItem('ughBagsOrders')) || [];
    orders.push(order);
    localStorage.setItem('ughBagsOrders', JSON.stringify(orders));
    
    return { order, paymentMethod };
}

function showConfirmation(order) {
    closeCheckout();
    cart = [];
    saveCart();
    
    const confirmationOverlay = document.getElementById('confirmationOverlay');
    if (!confirmationOverlay) return;
    
    document.getElementById('orderNumber').textContent = order.orderNumber;
    document.getElementById('confirmName').textContent = order.customer.firstName + ' ' + order.customer.lastName;
    document.getElementById('confirmEmail').textContent = order.customer.email;
    document.getElementById('confirmItems').textContent = order.items.length + ' item(s)';
    document.getElementById('confirmTotal').textContent = formatPrice(order.total);
    
    confirmationOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function initCheckoutListeners() {
    const checkoutOverlay = document.getElementById('checkoutOverlay');
    const checkoutClose = document.getElementById('checkoutClose');
    const checkoutForm = document.getElementById('checkoutForm');
    const continueShopping = document.getElementById('continueShopping');
    
    if (checkoutClose) {
        checkoutClose.addEventListener('click', closeCheckout);
    }
    
    if (checkoutOverlay) {
        checkoutOverlay.addEventListener('click', function(e) {
            if (e.target === checkoutOverlay) closeCheckout();
        });
    }
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var formData = new FormData(checkoutForm);
            var result = processOrder(formData);
            var order = result.order;
            var paymentMethod = result.paymentMethod;
            
            if (paymentMethod === 'bank_transfer') {
                showNotification('Order placed! Please transfer to: ' + CONFIG.bankDetails.accountNumber);
            } else if (paymentMethod === 'paypal') {
                showNotification('Redirecting to PayPal...');
            }
            
            setTimeout(function() {
                showConfirmation(order);
            }, 1500);
        });
    }
    
    if (continueShopping) {
        continueShopping.addEventListener('click', function() {
            var confirmationOverlay = document.getElementById('confirmationOverlay');
            if (confirmationOverlay) {
                confirmationOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Initialize payment method radio button listeners
function initPaymentMethodListeners() {
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            handlePaymentMethodChange(this.value);
        });
    });
}

// ========================================
// Initialize
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    updateCartUI();
    initCartListeners();
    initCheckoutListeners();
    initPaymentMethodListeners();
    initSlideshow();
    loadFeaturedProducts();
    populateBankDetails();
});

// Make functions globally available
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.toggleCart = toggleCart;
window.openCheckout = openCheckout;
window.closeCheckout = closeCheckout;
window.handlePaymentMethodChange = handlePaymentMethodChange;
window.validateBankPayment = validateBankPayment;
window.showCheckoutStep = showCheckoutStep;
