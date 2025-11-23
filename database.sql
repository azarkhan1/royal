-- ============================================
-- فروشگاه آنلاین - ساختار دیتابیس MySQL
-- ============================================

-- ایجاد دیتابیس
CREATE DATABASE IF NOT EXISTS ecommerce_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ecommerce_db;

-- ============================================
-- جدول محصولات
-- ============================================

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    image VARCHAR(255) DEFAULT '📦',
    description TEXT,
    featured TINYINT(1) DEFAULT 0,
    active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_featured (featured),
    INDEX idx_active (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- جدول سفارشات
-- ============================================

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_address TEXT NOT NULL,
    total_amount DECIMAL(15, 2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- جدول آیتم‌های سفارش
-- ============================================

CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(15, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL,
    INDEX idx_order_id (order_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- داده‌های نمونه
-- ============================================

-- درج محصولات نمونه
INSERT INTO products (name, price, category, image, description, featured) VALUES
('گوشی موبایل سامسونگ', 15000000, 'electronics', '📱', 'گوشی موبایل سامسونگ با کیفیت بالا و دوربین عالی', 1),
('لپ‌تاپ اپل', 45000000, 'electronics', '💻', 'لپ‌تاپ اپل MacBook Pro با پردازنده قدرتمند', 1),
('تی‌شرت مردانه', 250000, 'clothing', '👕', 'تی‌شرت مردانه با کیفیت و راحت', 0),
('کتاب برنامه‌نویسی', 350000, 'books', '📚', 'کتاب آموزش برنامه‌نویسی جامع', 1),
('مبلمان راحتی', 12000000, 'home', '🛋️', 'مبلمان راحتی مدرن و شیک', 0),
('یخچال ساید بای ساید', 35000000, 'home', '❄️', 'یخچال ساید بای ساید بزرگ و مدرن', 1),
('کفش ورزشی', 1800000, 'clothing', '👟', 'کفش ورزشی راحت و با کیفیت', 0),
('کتاب داستان', 150000, 'books', '📖', 'کتاب داستان جذاب و خواندنی', 0),
('هدفون بلوتوث', 3500000, 'electronics', '🎧', 'هدفون بلوتوث با کیفیت صوتی عالی', 1),
('کتاب آشپزی', 280000, 'books', '🍳', 'کتاب آموزش آشپزی ایرانی', 0),
('کمد لباس', 8500000, 'home', '🚪', 'کمد لباس بزرگ و محکم', 0),
('شلوار جین', 1200000, 'clothing', '👖', 'شلوار جین با کیفیت و مد روز', 0);

-- ============================================
-- نمایش جداول
-- ============================================

SELECT '✅ دیتابیس با موفقیت ایجاد شد!' AS message;
SELECT COUNT(*) AS total_products FROM products;
SELECT COUNT(*) AS total_orders FROM orders;



