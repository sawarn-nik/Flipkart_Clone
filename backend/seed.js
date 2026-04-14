const pool = require("./config/db");

async function seed() {
  const conn = await pool.getConnection();
  try {
    console.log("🌱 Seeding database...");

    // Insert default user (no auth — assume this user is always logged in)
    await conn.query(`
      INSERT IGNORE INTO users (id, name, email) VALUES (1, 'Rahul Sharma', 'rahul@example.com')
    `);

    // Insert categories
    const categories = [
      "Electronics",
      "Mobiles",
      "Fashion",
      "Home & Furniture",
      "Appliances",
      "Books",
    ];
    for (const cat of categories) {
      await conn.query(`INSERT IGNORE INTO categories (name) VALUES (?)`, [cat]);
    }

    // Get category IDs
    const [cats] = await conn.query(`SELECT id, name FROM categories`);
    const catMap = {};
    cats.forEach((c) => (catMap[c.name] = c.id));

    // Products data
    const products = [
      // Mobiles
      {
        name: "Samsung Galaxy S24 Ultra",
        description:
          "The Samsung Galaxy S24 Ultra features a 6.8-inch Dynamic AMOLED display, Snapdragon 8 Gen 3 processor, and a 200MP camera system. Built for power users who demand the best.",
        price: 124999,
        original_price: 134999,
        stock: 50,
        category: "Mobiles",
        brand: "Samsung",
        rating: 4.5,
        rating_count: 2341,
        images: [
          "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500",
          "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500",
        ],
        specs: [
          ["Display", "6.8-inch Dynamic AMOLED 2X"],
          ["Processor", "Snapdragon 8 Gen 3"],
          ["RAM", "12 GB"],
          ["Storage", "256 GB"],
          ["Camera", "200MP + 12MP + 10MP + 10MP"],
          ["Battery", "5000 mAh"],
        ],
      },
      {
        name: "iPhone 15 Pro Max",
        description:
          "Apple iPhone 15 Pro Max with A17 Pro chip, titanium design, and a 48MP main camera with 5x optical zoom. The most powerful iPhone ever.",
        price: 159900,
        original_price: 164900,
        stock: 30,
        category: "Mobiles",
        brand: "Apple",
        rating: 4.7,
        rating_count: 5678,
        images: [
          "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500",
          "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
        ],
        specs: [
          ["Display", "6.7-inch Super Retina XDR"],
          ["Processor", "A17 Pro"],
          ["RAM", "8 GB"],
          ["Storage", "256 GB"],
          ["Camera", "48MP + 12MP + 12MP"],
          ["Battery", "4422 mAh"],
        ],
      },
      {
        name: "OnePlus 12",
        description:
          "OnePlus 12 with Snapdragon 8 Gen 3, Hasselblad camera system, and 100W SUPERVOOC charging. Flagship performance at a competitive price.",
        price: 64999,
        original_price: 69999,
        stock: 75,
        category: "Mobiles",
        brand: "OnePlus",
        rating: 4.4,
        rating_count: 1892,
        images: [
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
          "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500",
        ],
        specs: [
          ["Display", "6.82-inch LTPO AMOLED"],
          ["Processor", "Snapdragon 8 Gen 3"],
          ["RAM", "12 GB"],
          ["Storage", "256 GB"],
          ["Camera", "50MP + 48MP + 64MP"],
          ["Battery", "5400 mAh"],
        ],
      },
      {
        name: "Redmi Note 13 Pro",
        description:
          "Redmi Note 13 Pro with 200MP camera, 120Hz AMOLED display, and 67W turbo charging. Best camera phone in its segment.",
        price: 26999,
        original_price: 29999,
        stock: 120,
        category: "Mobiles",
        brand: "Redmi",
        rating: 4.3,
        rating_count: 3421,
        images: [
          "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500",
          "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500",
        ],
        specs: [
          ["Display", "6.67-inch AMOLED 120Hz"],
          ["Processor", "Snapdragon 7s Gen 2"],
          ["RAM", "8 GB"],
          ["Storage", "128 GB"],
          ["Camera", "200MP + 8MP + 2MP"],
          ["Battery", "5100 mAh"],
        ],
      },
      // Electronics
      {
        name: "Sony WH-1000XM5 Headphones",
        description:
          "Industry-leading noise cancellation with 30-hour battery life. Crystal clear hands-free calling and Alexa voice control built in.",
        price: 26990,
        original_price: 34990,
        stock: 45,
        category: "Electronics",
        brand: "Sony",
        rating: 4.6,
        rating_count: 4521,
        images: [
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
          "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500",
        ],
        specs: [
          ["Type", "Over-ear Wireless"],
          ["Noise Cancellation", "Yes, Industry Leading"],
          ["Battery Life", "30 hours"],
          ["Connectivity", "Bluetooth 5.2"],
          ["Weight", "250g"],
        ],
      },
      {
        name: "Dell XPS 15 Laptop",
        description:
          "Dell XPS 15 with Intel Core i7-13700H, 16GB RAM, 512GB SSD, and a stunning 15.6-inch OLED display. Perfect for creators and professionals.",
        price: 149990,
        original_price: 169990,
        stock: 20,
        category: "Electronics",
        brand: "Dell",
        rating: 4.5,
        rating_count: 987,
        images: [
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
          "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500",
        ],
        specs: [
          ["Processor", "Intel Core i7-13700H"],
          ["RAM", "16 GB DDR5"],
          ["Storage", "512 GB NVMe SSD"],
          ["Display", "15.6-inch OLED 3.5K"],
          ["Graphics", "NVIDIA RTX 4060"],
          ["Battery", "86 WHr"],
        ],
      },
      {
        name: "boAt Airdopes 141",
        description:
          "boAt Airdopes 141 TWS earbuds with 42H total playback, ENx technology for clear calls, and IPX4 water resistance.",
        price: 1299,
        original_price: 4490,
        stock: 200,
        category: "Electronics",
        brand: "boAt",
        rating: 4.1,
        rating_count: 89234,
        images: [
          "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
          "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500",
        ],
        specs: [
          ["Type", "True Wireless (TWS)"],
          ["Battery", "42 hours total"],
          ["Water Resistance", "IPX4"],
          ["Connectivity", "Bluetooth 5.2"],
          ["Driver Size", "8mm"],
        ],
      },
      // Fashion
      {
        name: "Levi's 511 Slim Fit Jeans",
        description:
          "Classic Levi's 511 slim fit jeans in dark wash denim. Sits below waist with slim fit through thigh and leg opening.",
        price: 2999,
        original_price: 4999,
        stock: 150,
        category: "Fashion",
        brand: "Levi's",
        rating: 4.3,
        rating_count: 12456,
        images: [
          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
          "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=500",
        ],
        specs: [
          ["Fit", "Slim"],
          ["Material", "99% Cotton, 1% Elastane"],
          ["Wash", "Dark Indigo"],
          ["Closure", "Zip fly with button"],
        ],
      },
      {
        name: "Nike Air Max 270",
        description:
          "Nike Air Max 270 with the largest Air unit yet for all-day comfort. Lightweight mesh upper with foam midsole.",
        price: 10795,
        original_price: 12995,
        stock: 80,
        category: "Fashion",
        brand: "Nike",
        rating: 4.5,
        rating_count: 7823,
        images: [
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
          "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
        ],
        specs: [
          ["Type", "Running / Lifestyle"],
          ["Upper", "Mesh + Synthetic"],
          ["Sole", "Rubber"],
          ["Closure", "Lace-up"],
          ["Air Unit", "270° Max Air"],
        ],
      },
      // Home & Furniture
      {
        name: "Godrej Interio Slimline Bookshelf",
        description:
          "5-shelf bookcase with a slim profile, perfect for small spaces. Made from engineered wood with a walnut finish.",
        price: 8499,
        original_price: 11999,
        stock: 35,
        category: "Home & Furniture",
        brand: "Godrej Interio",
        rating: 4.2,
        rating_count: 1234,
        images: [
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500",
        ],
        specs: [
          ["Material", "Engineered Wood"],
          ["Shelves", "5"],
          ["Finish", "Walnut"],
          ["Dimensions", "180 x 60 x 30 cm"],
          ["Weight Capacity", "15 kg per shelf"],
        ],
      },
      // Appliances
      {
        name: "LG 1.5 Ton 5 Star Inverter AC",
        description:
          "LG 5-star inverter split AC with dual inverter compressor, 4-way swing, and auto clean function. Cools faster and saves energy.",
        price: 42990,
        original_price: 55990,
        stock: 25,
        category: "Appliances",
        brand: "LG",
        rating: 4.4,
        rating_count: 3456,
        images: [
          "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500",
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
        ],
        specs: [
          ["Capacity", "1.5 Ton"],
          ["Star Rating", "5 Star"],
          ["Type", "Split AC"],
          ["Compressor", "Dual Inverter"],
          ["Refrigerant", "R32"],
          ["Annual Energy", "840.14 units"],
        ],
      },
      // Books
      {
        name: "Atomic Habits by James Clear",
        description:
          "The #1 New York Times bestseller. Tiny changes, remarkable results. An easy and proven way to build good habits and break bad ones.",
        price: 499,
        original_price: 799,
        stock: 300,
        category: "Books",
        brand: "Penguin Random House",
        rating: 4.8,
        rating_count: 45678,
        images: [
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500",
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
        ],
        specs: [
          ["Author", "James Clear"],
          ["Publisher", "Penguin Random House"],
          ["Pages", "320"],
          ["Language", "English"],
          ["ISBN", "978-0735211292"],
        ],
      },
      {
        name: "The Psychology of Money",
        description:
          "Timeless lessons on wealth, greed, and happiness by Morgan Housel. 19 short stories exploring the strange ways people think about money.",
        price: 349,
        original_price: 599,
        stock: 250,
        category: "Books",
        brand: "Jaico Publishing",
        rating: 4.7,
        rating_count: 32145,
        images: [
          "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500",
          "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500",
        ],
        specs: [
          ["Author", "Morgan Housel"],
          ["Publisher", "Jaico Publishing"],
          ["Pages", "256"],
          ["Language", "English"],
          ["ISBN", "978-9391165130"],
        ],
      },
    ];

    // Insert each product
    for (const p of products) {
      const [result] = await conn.query(
        `INSERT INTO products (name, description, price, original_price, stock, category_id, brand, rating, rating_count)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          p.name,
          p.description,
          p.price,
          p.original_price,
          p.stock,
          catMap[p.category],
          p.brand,
          p.rating,
          p.rating_count,
        ]
      );
      const productId = result.insertId;

      // Insert images
      for (let i = 0; i < p.images.length; i++) {
        await conn.query(
          `INSERT INTO product_images (product_id, image_url, is_primary) VALUES (?, ?, ?)`,
          [productId, p.images[i], i === 0]
        );
      }

      // Insert specs
      for (const [key, value] of p.specs) {
        await conn.query(
          `INSERT INTO product_specs (product_id, spec_key, spec_value) VALUES (?, ?, ?)`,
          [productId, key, value]
        );
      }
    }

    console.log("✅ Database seeded successfully!");
    console.log(`   - ${categories.length} categories`);
    console.log(`   - ${products.length} products`);
  } catch (err) {
    console.error("❌ Seed error:", err.message);
  } finally {
    conn.release();
    process.exit(0);
  }
}

seed();
