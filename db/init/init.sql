-- ============================================================
-- RETAIL MANAGEMENT DATABASE
-- ============================================================

-- ============================================================
-- CATEGORY
-- ============================================================
CREATE TABLE IF NOT EXISTS category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    active BOOLEAN NOT NULL DEFAULT TRUE
);

-- ============================================================
-- SUPPLIER
-- ============================================================
CREATE TABLE IF NOT EXISTS supplier (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    cnpj VARCHAR(14) NOT NULL UNIQUE,
    phone VARCHAR(20),
    email VARCHAR(100),
    contact VARCHAR(100),

    address TEXT,
    city VARCHAR(50),
    state VARCHAR(2),
    zip_code VARCHAR(8),

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    active BOOLEAN NOT NULL DEFAULT TRUE
);

-- ============================================================
-- USERS
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    username VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(256) NOT NULL,
    role VARCHAR(20) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    last_login TIMESTAMP
);

-- ============================================================
-- PRODUCT
-- ============================================================
CREATE TABLE IF NOT EXISTS product (
    id SERIAL PRIMARY KEY,

    product_code VARCHAR(30) NOT NULL UNIQUE,
    barcode VARCHAR(14) UNIQUE,

    name VARCHAR(100) NOT NULL,
    description TEXT,

    category_id INT NOT NULL,
    supplier_id INT,

    cost_price NUMERIC(10,2) NOT NULL,
    sale_price NUMERIC(10,2) NOT NULL,

    unit VARCHAR(10) NOT NULL DEFAULT 'UN',
    stock_quantity INT NOT NULL DEFAULT 0,
    minimum_stock INT NOT NULL DEFAULT 0,
    stock_control BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP,
    active BOOLEAN NOT NULL DEFAULT TRUE,

    FOREIGN KEY (category_id) REFERENCES category(id),
    FOREIGN KEY (supplier_id) REFERENCES supplier(id)
);

-- ============================================================
-- INVENTORY MOVEMENT
-- ============================================================
CREATE TABLE IF NOT EXISTS inventory_movement (
    id SERIAL PRIMARY KEY,

    product_id INT NOT NULL,
    movement_type VARCHAR(20) NOT NULL CHECK (movement_type IN ('IN','OUT','ADJUSTMENT')),
    quantity INT NOT NULL CHECK (quantity > 0),

    movement_date TIMESTAMP NOT NULL DEFAULT NOW(),
    notes TEXT,
    user_id INT,

    FOREIGN KEY (product_id) REFERENCES product(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ============================================================
-- CUSTOMER
-- ============================================================
CREATE TABLE IF NOT EXISTS customer (
    id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) UNIQUE,
    phone VARCHAR(20),
    email VARCHAR(100),

    address TEXT,
    city VARCHAR(50),
    state VARCHAR(2),
    zip_code VARCHAR(8),

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    active BOOLEAN NOT NULL DEFAULT TRUE
);

-- ============================================================
-- CASH REGISTER
-- ============================================================
CREATE TABLE IF NOT EXISTS cash_register (
    id SERIAL PRIMARY KEY,

    opening_date TIMESTAMP NOT NULL,
    closing_date TIMESTAMP,

    opening_amount NUMERIC(10,2) NOT NULL,
    closing_amount NUMERIC(10,2),

    status CHAR(1) NOT NULL CHECK (status IN ('O','C')),

    user_id INT NOT NULL,

    withdrawal_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
    deposit_amount NUMERIC(10,2) NOT NULL DEFAULT 0,

    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ============================================================
-- SALE
-- ============================================================
CREATE TABLE IF NOT EXISTS sale (
    id SERIAL PRIMARY KEY,

    sale_date TIMESTAMP NOT NULL DEFAULT NOW(),

    gross_amount NUMERIC(10,2) NOT NULL,
    discount NUMERIC(10,2) NOT NULL DEFAULT 0,
    total_amount NUMERIC(10,2) NOT NULL,

    status VARCHAR(20) NOT NULL CHECK (status IN ('OPEN','PAID','CANCELLED')),

    customer_id INT,
    user_id INT NOT NULL,
    cash_register_id INT NOT NULL,

    FOREIGN KEY (customer_id) REFERENCES customer(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (cash_register_id) REFERENCES cash_register(id)
);

-- ============================================================
-- SALE ITEM
-- ============================================================
CREATE TABLE IF NOT EXISTS sale_item (
    id SERIAL PRIMARY KEY,

    sale_id INT NOT NULL,
    product_id INT NOT NULL,

    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10,2) NOT NULL,
    subtotal NUMERIC(10,2) NOT NULL,
    unit_cost NUMERIC(10,2) NOT NULL,

    FOREIGN KEY (sale_id) REFERENCES sale(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);

-- ============================================================
-- PAYMENT METHOD
-- ============================================================
CREATE TABLE IF NOT EXISTS payment_method (
    id SERIAL PRIMARY KEY,
    description VARCHAR(30) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE
);

-- ============================================================
-- PAYMENT
-- ============================================================
CREATE TABLE IF NOT EXISTS payment (
    id SERIAL PRIMARY KEY,

    sale_id INT NOT NULL,
    payment_method_id INT NOT NULL,

    amount_paid NUMERIC(10,2) NOT NULL,
    payment_date TIMESTAMP NOT NULL DEFAULT NOW(),

    FOREIGN KEY (sale_id) REFERENCES sale(id),
    FOREIGN KEY (payment_method_id) REFERENCES payment_method(id)
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX IF NOT EXIST idx_product_category ON product(category_id);
CREATE INDEX IF NOT EXIST idx_product_supplier ON product(supplier_id);

CREATE INDEX IF NOT EXIST idx_sale_customer ON sale(customer_id);
CREATE INDEX IF NOT EXIST idx_sale_user ON sale(user_id);

CREATE INDEX IF NOT EXIST idx_sale_item_sale ON sale_item(sale_id);
CREATE INDEX IF NOT EXIST idx_sale_item_product ON sale_item(product_id);

CREATE INDEX IF NOT EXIST idx_inventory_product ON inventory_movement(product_id);