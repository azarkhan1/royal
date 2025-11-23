/* ============================================
   فروشگاه آنلاین - JavaScript
   ============================================ */

// تنظیمات API
const API_BASE_URL = 'http://localhost:3000/api';

// ============================================
// مدیریت سبد خرید (LocalStorage)
// ============================================

class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.updateCartCount();
    }

    // بارگذاری سبد خرید از LocalStorage
    loadCart() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }

    // ذخیره سبد خرید در LocalStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartCount();
        this.updateCartDisplay();
    }

    // افزودن محصول به سبد خرید
    addToCart(productId, quantity = 1) {
        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            // دریافت اطلاعات محصول از API یا از المنت
            this.fetchProductAndAdd(productId, quantity);
            return;
        }
        
        this.saveCart();
        this.showNotification('محصول به سبد خرید اضافه شد', 'success');
    }

    // دریافت اطلاعات محصول و افزودن به سبد
    async fetchProductAndAdd(productId, quantity) {
        try {
            const response = await fetch(`${API_BASE_URL}/products/${productId}`);
            const product = await response.json();
            
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
            
            this.saveCart();
            this.showNotification('محصول به سبد خرید اضافه شد', 'success');
        } catch (error) {
            console.error('خطا در افزودن محصول:', error);
            this.showNotification('خطا در افزودن محصول', 'error');
        }
    }

    // حذف محصول از سبد خرید
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.showNotification('محصول از سبد خرید حذف شد', 'success');
    }

    // به‌روزرسانی تعداد محصول
    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
            }
        }
    }

    // محاسبه جمع کل
    getTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // به‌روزرسانی نمایش تعداد در هدر
    updateCartCount() {
        const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('#cart-count');
        cartCountElements.forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? 'inline-block' : 'none';
        });
    }

    // به‌روزرسانی نمایش سبد خرید
    updateCartDisplay() {
        if (document.getElementById('cart-items')) {
            this.renderCart();
        }
    }

    // نمایش سبد خرید
    renderCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        const emptyCart = document.getElementById('empty-cart');
        const checkoutSection = document.getElementById('checkout-section');
        
        if (this.cart.length === 0) {
            cartItemsContainer.style.display = 'none';
            if (emptyCart) emptyCart.style.display = 'block';
            if (checkoutSection) checkoutSection.style.display = 'none';
            return;
        }

        if (emptyCart) emptyCart.style.display = 'none';
        cartItemsContainer.style.display = 'block';
        
        cartItemsContainer.innerHTML = this.cart.map(item => `
            <div class="cart-item" data-product-id="${item.id}">
                <div class="cart-item-image">${item.image || '📦'}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${this.escapeHtml(item.name)}</div>
                    <div class="cart-item-price">${this.formatPrice(item.price)} تومان</div>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <button class="remove-item-btn" onclick="cartManager.removeFromCart(${item.id})">حذف</button>
                </div>
            </div>
        `).join('');

        // به‌روزرسانی خلاصه سفارش
        this.updateSummary();
    }

    // به‌روزرسانی خلاصه سفارش
    updateSummary() {
        const subtotal = this.getTotal();
        const total = subtotal; // هزینه ارسال رایگان
        
        document.getElementById('subtotal').textContent = this.formatPrice(subtotal) + ' تومان';
        document.getElementById('total').textContent = this.formatPrice(total) + ' تومان';
    }

    // فرمت قیمت
    formatPrice(price) {
        return new Intl.NumberFormat('fa-IR').format(price);
    }

    // جلوگیری از XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // نمایش نوتیفیکیشن
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = type === 'success' ? 'success-message' : 'error-message-global';
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.zIndex = '10000';
        notification.style.minWidth = '300px';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// ایجاد نمونه سبد خرید
const cartManager = new CartManager();

// ============================================
// مدیریت محصولات
// ============================================

class ProductManager {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
    }

    // بارگذاری محصولات از API
    async loadProducts() {
        try {
            const response = await fetch(`${API_BASE_URL}/products`);
            this.products = await response.json();
            this.filteredProducts = [...this.products];
            return this.products;
        } catch (error) {
            console.error('خطا در بارگذاری محصولات:', error);
            // در صورت خطا، از داده‌های نمونه استفاده می‌شود
            this.products = this.getSampleProducts();
            this.filteredProducts = [...this.products];
            return this.products;
        }
    }

    // محصولات نمونه (در صورت عدم دسترسی به API)
    getSampleProducts() {
        return [
            { id: 1, name: 'گوشی موبایل سامسونگ', price: 15000000, category: 'electronics', image: '📱', featured: true },
            { id: 2, name: 'لپ‌تاپ اپل', price: 45000000, category: 'electronics', image: '💻', featured: true },
            { id: 3, name: 'تی‌شرت مردانه', price: 250000, category: 'clothing', image: '👕', featured: false },
            { id: 4, name: 'کتاب برنامه‌نویسی', price: 350000, category: 'books', image: '📚', featured: true },
            { id: 5, name: 'مبلمان راحتی', price: 12000000, category: 'home', image: '🛋️', featured: false },
            { id: 6, name: 'یخچال ساید بای ساید', price: 35000000, category: 'home', image: '❄️', featured: true },
            { id: 7, name: 'کفش ورزشی', price: 1800000, category: 'clothing', image: '👟', featured: false },
            { id: 8, name: 'کتاب داستان', price: 150000, category: 'books', image: '📖', featured: false }
        ];
    }

    // فیلتر محصولات
    filterProducts(filters) {
        this.filteredProducts = this.products.filter(product => {
            // فیلتر دسته‌بندی
            if (filters.categories && filters.categories.length > 0 && !filters.categories.includes('all')) {
                if (!filters.categories.includes(product.category)) return false;
            }

            // فیلتر قیمت
            if (filters.minPrice !== undefined && product.price < filters.minPrice) return false;
            if (filters.maxPrice !== undefined && product.price > filters.maxPrice) return false;

            // فیلتر جستجو
            if (filters.search) {
                const searchTerm = filters.search.toLowerCase();
                if (!product.name.toLowerCase().includes(searchTerm)) return false;
            }

            return true;
        });

        // مرتب‌سازی
        if (filters.sort) {
            this.sortProducts(filters.sort);
        }

        return this.filteredProducts;
    }

    // مرتب‌سازی محصولات
    sortProducts(sortType) {
        switch (sortType) {
            case 'price-asc':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'popularity':
                // در اینجا می‌توانید از داده‌های واقعی استفاده کنید
                this.filteredProducts.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
                break;
            default:
                // مرتب‌سازی پیش‌فرض
                break;
        }
    }

    // نمایش محصولات
    renderProducts(containerId, products = null) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const productsToRender = products || this.filteredProducts;

        if (productsToRender.length === 0) {
            const noProducts = document.getElementById('no-products');
            if (noProducts) noProducts.style.display = 'block';
            container.innerHTML = '';
            return;
        }

        const noProducts = document.getElementById('no-products');
        if (noProducts) noProducts.style.display = 'none';

        container.innerHTML = productsToRender.map(product => `
            <div class="product-card">
                <div class="product-image">${product.image || '📦'}</div>
                <div class="product-info">
                    <div class="product-name">${this.escapeHtml(product.name)}</div>
                    <div class="product-price">${this.formatPrice(product.price)} تومان</div>
                    <div class="product-actions">
                        <input type="number" class="quantity-input" value="1" min="1" id="qty-${product.id}">
                        <button class="add-to-cart-btn" onclick="addProductToCart(${product.id})">
                            افزودن به سبد
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // نمایش محصولات ویژه
    renderFeaturedProducts() {
        const featured = this.products.filter(p => p.featured).slice(0, 4);
        this.renderProducts('featured-products', featured);
    }

    // نمایش آخرین محصولات
    renderLatestProducts() {
        const latest = [...this.products].reverse().slice(0, 4);
        this.renderProducts('latest-products', latest);
    }

    // فرمت قیمت
    formatPrice(price) {
        return new Intl.NumberFormat('fa-IR').format(price);
    }

    // جلوگیری از XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// ایجاد نمونه مدیریت محصولات
const productManager = new ProductManager();

// ============================================
// تابع افزودن محصول به سبد خرید
// ============================================

function addProductToCart(productId) {
    const quantityInput = document.getElementById(`qty-${productId}`);
    const quantity = parseInt(quantityInput?.value || 1);
    cartManager.addToCart(productId, quantity);
}

// ============================================
// مدیریت فیلترها (صفحه محصولات)
// ============================================

class FilterManager {
    constructor() {
        this.filters = {
            categories: ['all'],
            minPrice: 0,
            maxPrice: 10000000,
            search: '',
            sort: 'default'
        };
        this.init();
    }

    init() {
        // رویداد جستجو
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filters.search = e.target.value;
                this.applyFilters();
            });
        }

        // رویداد دسته‌بندی
        const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
        categoryCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateCategories();
                this.applyFilters();
            });
        });

        // رویداد محدوده قیمت
        const priceMin = document.getElementById('price-min');
        const priceMax = document.getElementById('price-max');
        if (priceMin && priceMax) {
            priceMin.addEventListener('input', (e) => {
                this.filters.minPrice = parseInt(e.target.value);
                document.getElementById('price-min-value').textContent = 
                    new Intl.NumberFormat('fa-IR').format(e.target.value);
                this.applyFilters();
            });

            priceMax.addEventListener('input', (e) => {
                this.filters.maxPrice = parseInt(e.target.value);
                document.getElementById('price-max-value').textContent = 
                    new Intl.NumberFormat('fa-IR').format(e.target.value);
                this.applyFilters();
            });
        }

        // رویداد مرتب‌سازی
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.filters.sort = e.target.value;
                this.applyFilters();
            });
        }

        // دکمه پاک کردن فیلترها
        const resetBtn = document.getElementById('reset-filters');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetFilters();
            });
        }
    }

    updateCategories() {
        const checked = Array.from(document.querySelectorAll('input[name="category"]:checked'))
            .map(cb => cb.value);
        this.filters.categories = checked.length > 0 ? checked : ['all'];
    }

    applyFilters() {
        const filtered = productManager.filterProducts(this.filters);
        productManager.renderProducts('products-grid', filtered);
        
        // به‌روزرسانی تعداد محصولات
        const countEl = document.getElementById('products-count');
        if (countEl) {
            countEl.textContent = `${filtered.length} محصول یافت شد`;
        }
    }

    resetFilters() {
        this.filters = {
            categories: ['all'],
            minPrice: 0,
            maxPrice: 10000000,
            search: '',
            sort: 'default'
        };

        // بازنشانی فرم
        document.getElementById('search-input').value = '';
        document.querySelectorAll('input[name="category"]').forEach(cb => {
            cb.checked = cb.value === 'all';
        });
        document.getElementById('price-min').value = 0;
        document.getElementById('price-max').value = 10000000;
        document.getElementById('price-min-value').textContent = '0';
        document.getElementById('price-max-value').textContent = '10,000,000';
        document.getElementById('sort-select').value = 'default';

        this.applyFilters();
    }
}

// ============================================
// مدیریت فرم تسویه حساب
// ============================================

class CheckoutManager {
    constructor() {
        this.init();
    }

    init() {
        const checkoutBtn = document.getElementById('checkout-btn');
        const cancelBtn = document.getElementById('cancel-checkout');
        const checkoutForm = document.getElementById('checkout-form');

        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (cartManager.cart.length === 0) {
                    cartManager.showNotification('سبد خرید شما خالی است', 'error');
                    return;
                }
                this.showCheckoutForm();
            });
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                this.hideCheckoutForm();
            });
        }

        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitOrder();
            });
        }

        // اعتبارسنجی فرم
        this.initValidation();
    }

    showCheckoutForm() {
        const checkoutSection = document.getElementById('checkout-section');
        if (checkoutSection) {
            checkoutSection.style.display = 'block';
            checkoutSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    hideCheckoutForm() {
        const checkoutSection = document.getElementById('checkout-section');
        if (checkoutSection) {
            checkoutSection.style.display = 'none';
        }
    }

    initValidation() {
        const form = document.getElementById('checkout-form');
        if (!form) return;

        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                this.clearError(input);
            });
        });
    }

    validateField(field) {
        const errorEl = document.getElementById(`${field.id}-error`);
        
        // پاک کردن خطاهای قبلی
        this.clearError(field);

        // اعتبارسنجی نام
        if (field.id === 'full-name') {
            if (field.value.trim().length < 3) {
                this.showError(field, 'نام باید حداقل ۳ کاراکتر باشد');
                return false;
            }
        }

        // اعتبارسنجی شماره تماس
        if (field.id === 'phone') {
            const phoneRegex = /^09\d{9}$/;
            if (!phoneRegex.test(field.value)) {
                this.showError(field, 'شماره تماس باید ۱۱ رقم و با ۰۹ شروع شود');
                return false;
            }
        }

        // اعتبارسنجی آدرس
        if (field.id === 'address') {
            if (field.value.trim().length < 10) {
                this.showError(field, 'آدرس باید حداقل ۱۰ کاراکتر باشد');
                return false;
            }
        }

        return true;
    }

    showError(field, message) {
        const errorEl = document.getElementById(`${field.id}-error`);
        if (errorEl) {
            errorEl.textContent = message;
        }
        field.style.borderColor = '#e74c3c';
    }

    clearError(field) {
        const errorEl = document.getElementById(`${field.id}-error`);
        if (errorEl) {
            errorEl.textContent = '';
        }
        field.style.borderColor = '';
    }

    validateForm() {
        const form = document.getElementById('checkout-form');
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    async submitOrder() {
        if (!this.validateForm()) {
            cartManager.showNotification('لطفاً تمام فیلدها را به درستی پر کنید', 'error');
            return;
        }

        const form = document.getElementById('checkout-form');
        const formData = new FormData(form);
        
        const orderData = {
            fullName: formData.get('fullName'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            items: cartManager.cart,
            total: cartManager.getTotal(),
            date: new Date().toISOString()
        };

        try {
            // ارسال به سرور
            const response = await fetch(`${API_BASE_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                const order = await response.json();
                
                // ارسال به واتساپ
                this.sendToWhatsApp(orderData);
                
                // پاک کردن سبد خرید
                cartManager.cart = [];
                cartManager.saveCart();
                
                // نمایش پیام موفقیت
                cartManager.showNotification('سفارش شما با موفقیت ثبت شد!', 'success');
                
                // پاک کردن فرم
                form.reset();
                this.hideCheckoutForm();
                
                // هدایت به صفحه اصلی بعد از ۳ ثانیه
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 3000);
            } else {
                throw new Error('خطا در ثبت سفارش');
            }
        } catch (error) {
            console.error('خطا در ثبت سفارش:', error);
            // حتی در صورت خطا، به واتساپ ارسال می‌شود
            this.sendToWhatsApp(orderData);
            cartManager.showNotification('سفارش شما به واتساپ ارسال شد', 'success');
        }
    }

    // ارسال سفارش به واتساپ
    sendToWhatsApp(orderData) {
        // شماره واتساپ ادمین (باید تغییر دهید)
        const adminPhone = '989123456789'; // فرمت: 989123456789 (بدون +)
        
        // ساخت پیام
        let message = `📦 *سفارش جدید*\n\n`;
        message += `👤 *مشتری:* ${orderData.fullName}\n`;
        message += `📞 *تماس:* ${orderData.phone}\n`;
        message += `📍 *آدرس:* ${orderData.address}\n\n`;
        message += `*محصولات:*\n`;
        
        orderData.items.forEach((item, index) => {
            message += `${index + 1}. ${item.name}\n`;
            message += `   تعداد: ${item.quantity} | قیمت: ${new Intl.NumberFormat('fa-IR').format(item.price)} تومان\n`;
        });
        
        message += `\n💰 *جمع کل: ${new Intl.NumberFormat('fa-IR').format(orderData.total)} تومان*`;
        
        // کدگذاری URL
        const encodedMessage = encodeURIComponent(message);
        
        // لینک واتساپ
        const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodedMessage}`;
        
        // باز کردن واتساپ در تب جدید
        window.open(whatsappUrl, '_blank');
    }
}

// ============================================
// مقداردهی اولیه صفحه
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
    // بارگذاری محصولات
    await productManager.loadProducts();

    // نمایش محصولات در صفحه اصلی
    if (document.getElementById('featured-products')) {
        productManager.renderFeaturedProducts();
        productManager.renderLatestProducts();
    }

    // نمایش محصولات در صفحه محصولات
    if (document.getElementById('products-grid')) {
        productManager.renderProducts('products-grid');
        new FilterManager();
        document.getElementById('products-count').textContent = 
            `${productManager.filteredProducts.length} محصول یافت شد`;
    }

    // نمایش سبد خرید
    if (document.getElementById('cart-items')) {
        cartManager.renderCart();
        new CheckoutManager();
    }

    // منوی موبایل
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // کلیک روی دسته‌بندی‌ها
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            window.location.href = `products.html?category=${category}`;
        });
    });

    // بارگذاری دسته‌بندی از URL
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category && document.getElementById('products-grid')) {
        const checkbox = document.querySelector(`input[name="category"][value="${category}"]`);
        if (checkbox) {
            document.querySelector('input[name="category"][value="all"]').checked = false;
            checkbox.checked = true;
            const filterManager = new FilterManager();
            filterManager.updateCategories();
            filterManager.applyFilters();
        }
    }
});



