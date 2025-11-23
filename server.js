/* ============================================
   فروشگاه آنلاین - Backend (Node.js/Express)
   ============================================ */

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// میدلورها
// ============================================

// فعال‌سازی CORS برای دسترسی از frontend
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// سرو فایل‌های استاتیک (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// ============================================
// اتصال به دیتابیس MySQL
// ============================================

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ecommerce_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

let pool;

// تابع اتصال به دیتابیس
async function connectDB() {
    try {
        pool = mysql.createPool(dbConfig);
        
        // تست اتصال
        const connection = await pool.getConnection();
        console.log('✅ اتصال به دیتابیس MySQL برقرار شد');
        connection.release();
    } catch (error) {
        console.error('❌ خطا در اتصال به دیتابیس:', error.message);
        console.log('⚠️  سرور بدون دیتابیس اجرا می‌شود (از داده‌های نمونه استفاده می‌کند)');
    }
}

// ============================================
// میدلور امنیتی - جلوگیری از SQL Injection و XSS
// ============================================

// پاکسازی ورودی‌ها
function sanitizeInput(input) {
    if (typeof input === 'string') {
        // حذف کاراکترهای خطرناک
        return input.replace(/[<>'"]/g, '');
    }
    return input;
}

// اعتبارسنجی ورودی‌ها
function validateInput(data, rules) {
    const errors = [];
    
    for (const [field, rule] of Object.entries(rules)) {
        const value = data[field];
        
        if (rule.required && (!value || value.trim() === '')) {
            errors.push(`${field} الزامی است`);
        }
        
        if (value && rule.type === 'number' && isNaN(value)) {
            errors.push(`${field} باید عدد باشد`);
        }
        
        if (value && rule.minLength && value.length < rule.minLength) {
            errors.push(`${field} باید حداقل ${rule.minLength} کاراکتر باشد`);
        }
        
        if (value && rule.pattern && !rule.pattern.test(value)) {
            errors.push(`${field} فرمت نامعتبر است`);
        }
    }
    
    return errors;
}

// ============================================
// API Routes - محصولات
// ============================================

// دریافت همه محصولات
app.get('/api/products', async (req, res) => {
    try {
        if (pool) {
            const [products] = await pool.execute(
                'SELECT * FROM products WHERE active = 1 ORDER BY created_at DESC'
            );
            res.json(products);
        } else {
            // داده‌های نمونه در صورت عدم اتصال به دیتابیس
            res.json(getSampleProducts());
        }
    } catch (error) {
        console.error('خطا در دریافت محصولات:', error);
        res.status(500).json({ error: 'خطا در دریافت محصولات' });
    }
});

// دریافت یک محصول
app.get('/api/products/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        
        if (pool) {
            const [products] = await pool.execute(
                'SELECT * FROM products WHERE id = ? AND active = 1',
                [productId]
            );
            
            if (products.length === 0) {
                return res.status(404).json({ error: 'محصول یافت نشد' });
            }
            
            res.json(products[0]);
        } else {
            // داده‌های نمونه
            const products = getSampleProducts();
            const product = products.find(p => p.id === productId);
            
            if (!product) {
                return res.status(404).json({ error: 'محصول یافت نشد' });
            }
            
            res.json(product);
        }
    } catch (error) {
        console.error('خطا در دریافت محصول:', error);
        res.status(500).json({ error: 'خطا در دریافت محصول' });
    }
});

// افزودن محصول جدید (فقط برای ادمین)
app.post('/api/products', async (req, res) => {
    try {
        const errors = validateInput(req.body, {
            name: { required: true, minLength: 3 },
            price: { required: true, type: 'number' },
            category: { required: true }
        });
        
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        
        const { name, price, category, image, description, featured } = req.body;
        
        if (pool) {
            const [result] = await pool.execute(
                'INSERT INTO products (name, price, category, image, description, featured) VALUES (?, ?, ?, ?, ?, ?)',
                [sanitizeInput(name), price, category, image || '📦', description || '', featured || 0]
            );
            
            res.json({ id: result.insertId, message: 'محصول با موفقیت افزوده شد' });
        } else {
            res.status(503).json({ error: 'دیتابیس در دسترس نیست' });
        }
    } catch (error) {
        console.error('خطا در افزودن محصول:', error);
        res.status(500).json({ error: 'خطا در افزودن محصول' });
    }
});

// به‌روزرسانی محصول
app.put('/api/products/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const { name, price, category, image, description, featured } = req.body;
        
        if (pool) {
            await pool.execute(
                'UPDATE products SET name = ?, price = ?, category = ?, image = ?, description = ?, featured = ? WHERE id = ?',
                [sanitizeInput(name), price, category, image, description, featured, productId]
            );
            
            res.json({ message: 'محصول با موفقیت به‌روزرسانی شد' });
        } else {
            res.status(503).json({ error: 'دیتابیس در دسترس نیست' });
        }
    } catch (error) {
        console.error('خطا در به‌روزرسانی محصول:', error);
        res.status(500).json({ error: 'خطا در به‌روزرسانی محصول' });
    }
});

// حذف محصول
app.delete('/api/products/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        
        if (pool) {
            // حذف نرم (غیرفعال کردن)
            await pool.execute(
                'UPDATE products SET active = 0 WHERE id = ?',
                [productId]
            );
            
            res.json({ message: 'محصول با موفقیت حذف شد' });
        } else {
            res.status(503).json({ error: 'دیتابیس در دسترس نیست' });
        }
    } catch (error) {
        console.error('خطا در حذف محصول:', error);
        res.status(500).json({ error: 'خطا در حذف محصول' });
    }
});

// ============================================
// API Routes - سفارشات
// ============================================

// ثبت سفارش جدید
app.post('/api/orders', async (req, res) => {
    try {
        const errors = validateInput(req.body, {
            fullName: { required: true, minLength: 3 },
            phone: { required: true, pattern: /^09\d{9}$/ },
            address: { required: true, minLength: 10 }
        });
        
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        
        const { fullName, phone, address, items, total } = req.body;
        
        if (pool) {
            // شروع تراکنش
            const connection = await pool.getConnection();
            await connection.beginTransaction();
            
            try {
                // ثبت سفارش
                const [orderResult] = await connection.execute(
                    'INSERT INTO orders (customer_name, customer_phone, customer_address, total_amount, status) VALUES (?, ?, ?, ?, ?)',
                    [sanitizeInput(fullName), phone, sanitizeInput(address), total, 'pending']
                );
                
                const orderId = orderResult.insertId;
                
                // ثبت آیتم‌های سفارش
                for (const item of items) {
                    await connection.execute(
                        'INSERT INTO order_items (order_id, product_id, product_name, quantity, price) VALUES (?, ?, ?, ?, ?)',
                        [orderId, item.id, sanitizeInput(item.name), item.quantity, item.price]
                    );
                }
                
                // تایید تراکنش
                await connection.commit();
                connection.release();
                
                res.json({ 
                    id: orderId, 
                    message: 'سفارش با موفقیت ثبت شد',
                    order: {
                        id: orderId,
                        customerName: fullName,
                        phone: phone,
                        address: address,
                        items: items,
                        total: total
                    }
                });
            } catch (error) {
                await connection.rollback();
                connection.release();
                throw error;
            }
        } else {
            // در صورت عدم اتصال به دیتابیس، فقط پاسخ موفقیت می‌دهیم
            res.json({ 
                id: Date.now(), 
                message: 'سفارش ثبت شد (بدون ذخیره در دیتابیس)',
                order: req.body
            });
        }
    } catch (error) {
        console.error('خطا در ثبت سفارش:', error);
        res.status(500).json({ error: 'خطا در ثبت سفارش' });
    }
});

// دریافت همه سفارشات (برای ادمین)
app.get('/api/orders', async (req, res) => {
    try {
        if (pool) {
            const [orders] = await pool.execute(
                `SELECT o.*, 
                 GROUP_CONCAT(oi.product_name, ' (', oi.quantity, ')') as items
                 FROM orders o
                 LEFT JOIN order_items oi ON o.id = oi.order_id
                 GROUP BY o.id
                 ORDER BY o.created_at DESC`
            );
            
            res.json(orders);
        } else {
            res.json([]);
        }
    } catch (error) {
        console.error('خطا در دریافت سفارشات:', error);
        res.status(500).json({ error: 'خطا در دریافت سفارشات' });
    }
});

// دریافت یک سفارش
app.get('/api/orders/:id', async (req, res) => {
    try {
        const orderId = parseInt(req.params.id);
        
        if (pool) {
            const [orders] = await pool.execute(
                'SELECT * FROM orders WHERE id = ?',
                [orderId]
            );
            
            if (orders.length === 0) {
                return res.status(404).json({ error: 'سفارش یافت نشد' });
            }
            
            const [items] = await pool.execute(
                'SELECT * FROM order_items WHERE order_id = ?',
                [orderId]
            );
            
            res.json({ ...orders[0], items });
        } else {
            res.status(404).json({ error: 'سفارش یافت نشد' });
        }
    } catch (error) {
        console.error('خطا در دریافت سفارش:', error);
        res.status(500).json({ error: 'خطا در دریافت سفارش' });
    }
});

// به‌روزرسانی وضعیت سفارش
app.put('/api/orders/:id/status', async (req, res) => {
    try {
        const orderId = parseInt(req.params.id);
        const { status } = req.body;
        
        const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'وضعیت نامعتبر' });
        }
        
        if (pool) {
            await pool.execute(
                'UPDATE orders SET status = ? WHERE id = ?',
                [status, orderId]
            );
            
            res.json({ message: 'وضعیت سفارش به‌روزرسانی شد' });
        } else {
            res.status(503).json({ error: 'دیتابیس در دسترس نیست' });
        }
    } catch (error) {
        console.error('خطا در به‌روزرسانی وضعیت:', error);
        res.status(500).json({ error: 'خطا در به‌روزرسانی وضعیت' });
    }
});

// ============================================
// داده‌های نمونه (برای تست بدون دیتابیس)
// ============================================

function getSampleProducts() {
    return [
        { id: 1, name: 'گوشی موبایل سامسونگ', price: 15000000, category: 'electronics', image: '📱', description: 'گوشی موبایل سامسونگ با کیفیت بالا', featured: 1, active: 1 },
        { id: 2, name: 'لپ‌تاپ اپل', price: 45000000, category: 'electronics', image: '💻', description: 'لپ‌تاپ اپل MacBook Pro', featured: 1, active: 1 },
        { id: 3, name: 'تی‌شرت مردانه', price: 250000, category: 'clothing', image: '👕', description: 'تی‌شرت مردانه با کیفیت', featured: 0, active: 1 },
        { id: 4, name: 'کتاب برنامه‌نویسی', price: 350000, category: 'books', image: '📚', description: 'کتاب آموزش برنامه‌نویسی', featured: 1, active: 1 },
        { id: 5, name: 'مبلمان راحتی', price: 12000000, category: 'home', image: '🛋️', description: 'مبلمان راحتی مدرن', featured: 0, active: 1 },
        { id: 6, name: 'یخچال ساید بای ساید', price: 35000000, category: 'home', image: '❄️', description: 'یخچال ساید بای ساید بزرگ', featured: 1, active: 1 },
        { id: 7, name: 'کفش ورزشی', price: 1800000, category: 'clothing', image: '👟', description: 'کفش ورزشی راحت', featured: 0, active: 1 },
        { id: 8, name: 'کتاب داستان', price: 150000, category: 'books', image: '📖', description: 'کتاب داستان جذاب', featured: 0, active: 1 }
    ];
}

// ============================================
// Route برای صفحه اصلی
// ============================================

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ============================================
// راه‌اندازی سرور
// ============================================

async function startServer() {
    await connectDB();
    
    app.listen(PORT, () => {
        console.log(`🚀 سرور در حال اجرا است: http://localhost:${PORT}`);
        console.log(`📦 API در دسترس است: http://localhost:${PORT}/api`);
    });
}

startServer().catch(console.error);

// ============================================
// مدیریت خطاها
// ============================================

process.on('unhandledRejection', (error) => {
    console.error('خطای مدیریت نشده:', error);
});

process.on('SIGTERM', async () => {
    console.log('دریافت SIGTERM، بستن سرور...');
    if (pool) {
        await pool.end();
    }
    process.exit(0);
});



