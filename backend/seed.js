const pool = require("./config/db");

async function seed() {
  const conn = await pool.getConnection();
  try {
    console.log("🌱 Seeding database...");

    await conn.query(`INSERT IGNORE INTO users (id, name, email) VALUES (1, 'Rahul Sharma', 'rahul@example.com')`);

    const categoryNames = [
      "Fashion", "Mobiles", "Beauty", "Electronics",
      "Home", "Appliances", "Toys", "Food", "Auto", "2 Wheelers",
      "Sports", "Books", "Furniture", "Home & Furniture"
    ];
    for (const cat of categoryNames) {
      await conn.query(`INSERT IGNORE INTO categories (name) VALUES (?)`, [cat]);
    }

    const [cats] = await conn.query(`SELECT id, name FROM categories`);
    const catMap = {};
    cats.forEach((c) => (catMap[c.name] = c.id));

    const products = [

      // ── FASHION (10) ──
      { name:"Levi's 511 Slim Fit Jeans", desc:"Classic slim fit jeans in dark wash denim.", price:2999, orig:4999, stock:150, cat:"Fashion", brand:"Levi's", rating:4.3, rc:12456, img:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=500" },
      { name:"Nike Air Max 270", desc:"Lightweight mesh upper with Max Air unit for all-day comfort.", price:10795, orig:12995, stock:80, cat:"Fashion", brand:"Nike", rating:4.5, rc:7823, img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" },
      { name:"Allen Solly Men's Formal Shirt", desc:"Regular fit formal shirt in solid colour, perfect for office wear.", price:1299, orig:2199, stock:200, cat:"Fashion", brand:"Allen Solly", rating:4.2, rc:9341, img:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500" },
      { name:"Puma Women's Running Shoes", desc:"Lightweight running shoes with cushioned sole and breathable mesh upper.", price:3499, orig:5999, stock:120, cat:"Fashion", brand:"Puma", rating:4.4, rc:5621, img:"https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500" },
      { name:"Roadster Men's Bomber Jacket", desc:"Stylish bomber jacket with ribbed cuffs and hem, zip closure.", price:1799, orig:3499, stock:90, cat:"Fashion", brand:"Roadster", rating:4.1, rc:4312, img:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500" },
      { name:"W Women's Kurta", desc:"Printed straight kurta with 3/4 sleeves, perfect for casual and festive wear.", price:899, orig:1799, stock:180, cat:"Fashion", brand:"W", rating:4.3, rc:8901, img:"https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500" },
      { name:"Fastrack Analog Watch", desc:"Casual analog watch with stainless steel case and leather strap.", price:1295, orig:2495, stock:100, cat:"Fashion", brand:"Fastrack", rating:4.2, rc:6723, img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
      { name:"Adidas Originals Cap", desc:"Classic 6-panel cap with embroidered Adidas logo and adjustable strap.", price:799, orig:1299, stock:250, cat:"Fashion", brand:"Adidas", rating:4.4, rc:3412, img:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500" },
      { name:"Lavie Women's Handbag", desc:"Spacious handbag with multiple compartments and zip closure.", price:1499, orig:2999, stock:70, cat:"Fashion", brand:"Lavie", rating:4.1, rc:5234, img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500" },
      { name:"Woodland Men's Leather Boots", desc:"Genuine leather boots with rubber sole, water resistant and durable.", price:4999, orig:7999, stock:60, cat:"Fashion", brand:"Woodland", rating:4.5, rc:4891, img:"https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500" },

      // ── MOBILES (10) ──
      { name:"Samsung Galaxy S24 Ultra", desc:"6.8-inch Dynamic AMOLED, Snapdragon 8 Gen 3, 200MP camera.", price:124999, orig:134999, stock:50, cat:"Mobiles", brand:"Samsung", rating:4.5, rc:2341, img:"https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500" },
      { name:"iPhone 15 Pro Max", desc:"A17 Pro chip, titanium design, 48MP main camera with 5x optical zoom.", price:159900, orig:164900, stock:30, cat:"Mobiles", brand:"Apple", rating:4.7, rc:5678, img:"https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500" },
      { name:"OnePlus 12", desc:"Snapdragon 8 Gen 3, Hasselblad camera, 100W SUPERVOOC charging.", price:64999, orig:69999, stock:75, cat:"Mobiles", brand:"OnePlus", rating:4.4, rc:1892, img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500" },
      { name:"Redmi Note 13 Pro", desc:"200MP camera, 120Hz AMOLED display, 67W turbo charging.", price:26999, orig:29999, stock:120, cat:"Mobiles", brand:"Redmi", rating:4.3, rc:3421, img:"https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500" },
      { name:"Vivo V30 Pro", desc:"50MP Sony IMX920 camera, 5000mAh battery, 80W FlashCharge.", price:39999, orig:44999, stock:85, cat:"Mobiles", brand:"Vivo", rating:4.2, rc:2134, img:"https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500" },
      { name:"Realme GT 6", desc:"Snapdragon 8s Gen 3, 5500mAh battery, 120W charging, 6.78-inch display.", price:34999, orig:39999, stock:95, cat:"Mobiles", brand:"Realme", rating:4.3, rc:1876, img:"https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500" },
      { name:"Google Pixel 8a", desc:"Google Tensor G3 chip, 64MP camera, 7 years of OS updates.", price:52999, orig:59999, stock:40, cat:"Mobiles", brand:"Google", rating:4.6, rc:1234, img:"https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500" },
      { name:"Motorola Edge 50 Pro", desc:"144Hz pOLED display, 50MP camera, 125W TurboPower charging.", price:31999, orig:35999, stock:65, cat:"Mobiles", brand:"Motorola", rating:4.2, rc:987, img:"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500" },
      { name:"Nothing Phone 2a", desc:"MediaTek Dimensity 7200 Pro, Glyph Interface, 50MP dual camera.", price:23999, orig:27999, stock:110, cat:"Mobiles", brand:"Nothing", rating:4.4, rc:3456, img:"https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=500" },
      { name:"iQOO Z9 5G", desc:"Snapdragon 7 Gen 3, 50MP OIS camera, 5000mAh with 44W charging.", price:19999, orig:22999, stock:130, cat:"Mobiles", brand:"iQOO", rating:4.3, rc:2789, img:"https://images.unsplash.com/photo-1567581935884-3349723552ca?w=500" },

      // ── BEAUTY (10) ──
      { name:"Lakme Absolute Skin Natural Mousse", desc:"Lightweight mousse foundation with SPF 8, natural finish.", price:399, orig:699, stock:300, cat:"Beauty", brand:"Lakme", rating:4.2, rc:15234, img:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500" },
      { name:"Maybelline Fit Me Matte Foundation", desc:"Matte and poreless foundation, controls shine all day.", price:449, orig:699, stock:250, cat:"Beauty", brand:"Maybelline", rating:4.3, rc:22341, img:"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500" },
      { name:"L'Oreal Paris Revitalift Serum", desc:"1.5% pure hyaluronic acid serum for intense hydration.", price:799, orig:1299, stock:180, cat:"Beauty", brand:"L'Oreal", rating:4.4, rc:8923, img:"https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500" },
      { name:"Biotique Bio Papaya Scrub", desc:"Exfoliating face scrub with papaya enzymes for glowing skin.", price:199, orig:349, stock:400, cat:"Beauty", brand:"Biotique", rating:4.1, rc:12456, img:"https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500" },
      { name:"Dove Intense Repair Shampoo 650ml", desc:"Keratin actives repair damaged hair from root to tip.", price:349, orig:499, stock:350, cat:"Beauty", brand:"Dove", rating:4.3, rc:34521, img:"https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=500" },
      { name:"Nykaa Cosmetics Matte Lipstick", desc:"Long-lasting matte lipstick with rich pigment, 12-hour wear.", price:299, orig:499, stock:500, cat:"Beauty", brand:"Nykaa", rating:4.2, rc:18923, img:"https://images.unsplash.com/photo-1586495777744-4e6232bf2f9a?w=500" },
      { name:"Plum Goodness Vitamin C Moisturizer", desc:"Lightweight gel moisturizer with Vitamin C for bright skin.", price:549, orig:849, stock:220, cat:"Beauty", brand:"Plum", rating:4.5, rc:9234, img:"https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=500" },
      { name:"Himalaya Purifying Neem Face Wash", desc:"Neem and turmeric face wash for clear, pimple-free skin.", price:175, orig:250, stock:600, cat:"Beauty", brand:"Himalaya", rating:4.4, rc:56789, img:"https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500" },
      { name:"Mamaearth Onion Hair Oil 250ml", desc:"Onion oil with redensyl for hair fall control and regrowth.", price:349, orig:599, stock:280, cat:"Beauty", brand:"Mamaearth", rating:4.3, rc:23456, img:"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500" },
      { name:"Sugar Cosmetics Kohl of Honour Kajal", desc:"Intense black kajal with 24-hour stay and smudge-proof formula.", price:349, orig:499, stock:320, cat:"Beauty", brand:"Sugar", rating:4.4, rc:14567, img:"https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500" },

      // ── ELECTRONICS (10) ──
      { name:"Sony WH-1000XM5 Headphones", desc:"Industry-leading noise cancellation, 30-hour battery.", price:26990, orig:34990, stock:45, cat:"Electronics", brand:"Sony", rating:4.6, rc:4521, img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
      { name:"Dell XPS 15 Laptop", desc:"Intel Core i7-13700H, 16GB RAM, 512GB SSD, 15.6-inch OLED.", price:149990, orig:169990, stock:20, cat:"Electronics", brand:"Dell", rating:4.5, rc:987, img:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500" },
      { name:"boAt Airdopes 141 TWS", desc:"42H total playback, ENx technology, IPX4 water resistance.", price:1299, orig:4490, stock:200, cat:"Electronics", brand:"boAt", rating:4.1, rc:89234, img:"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500" },
      { name:"Samsung 55-inch 4K QLED TV", desc:"Quantum Dot technology, 120Hz refresh rate, Tizen OS.", price:74990, orig:99990, stock:25, cat:"Electronics", brand:"Samsung", rating:4.5, rc:3421, img:"https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=500" },
      { name:"Canon EOS R50 Mirrorless Camera", desc:"24.2MP APS-C sensor, 4K video, dual pixel autofocus.", price:69990, orig:79990, stock:30, cat:"Electronics", brand:"Canon", rating:4.6, rc:1234, img:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500" },
      { name:"Apple iPad Air 5th Gen", desc:"M1 chip, 10.9-inch Liquid Retina display, 5G capable.", price:59900, orig:64900, stock:40, cat:"Electronics", brand:"Apple", rating:4.7, rc:5678, img:"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500" },
      { name:"JBL Charge 5 Bluetooth Speaker", desc:"30W output, 20-hour battery, IP67 waterproof, powerbank feature.", price:13999, orig:17999, stock:80, cat:"Electronics", brand:"JBL", rating:4.5, rc:8923, img:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500" },
      { name:"Logitech MX Master 3S Mouse", desc:"8K DPI sensor, quiet clicks, MagSpeed scroll, USB-C charging.", price:9995, orig:12995, stock:60, cat:"Electronics", brand:"Logitech", rating:4.7, rc:6234, img:"https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500" },
      { name:"Kindle Paperwhite 11th Gen", desc:"6.8-inch display, adjustable warm light, 10-week battery, IPX8.", price:13999, orig:16999, stock:90, cat:"Electronics", brand:"Amazon", rating:4.6, rc:12345, img:"https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=500" },
      { name:"GoPro Hero 12 Black", desc:"5.3K video, HyperSmooth 6.0, waterproof to 10m, HDR video.", price:39990, orig:49990, stock:35, cat:"Electronics", brand:"GoPro", rating:4.5, rc:2341, img:"https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500" },

      // ── HOME (10) ──
      { name:"Milton Thermosteel Flask 500ml", desc:"Keeps hot 24hr, cold 24hr. Leak-proof stainless steel.", price:599, orig:999, stock:300, cat:"Home", brand:"Milton", rating:4.4, rc:34521, img:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500" },
      { name:"Prestige Svachh Pressure Cooker 5L", desc:"Deep lid spillage control, stainless steel body, 5 litre.", price:1899, orig:2999, stock:150, cat:"Home", brand:"Prestige", rating:4.5, rc:23456, img:"https://images.unsplash.com/photo-1585515320310-259814833e62?w=500" },
      { name:"Solimo Microfibre Bedsheet Set", desc:"Double bedsheet with 2 pillow covers, 300 GSM microfibre.", price:699, orig:1299, stock:400, cat:"Home", brand:"Solimo", rating:4.2, rc:18923, img:"https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500" },
      { name:"Pigeon Healthifry Digital Air Fryer", desc:"1200W, 4.2L capacity, 8 preset menus, digital display.", price:3499, orig:5999, stock:80, cat:"Home", brand:"Pigeon", rating:4.3, rc:9234, img:"https://images.unsplash.com/photo-1648170645898-e0a0e3e5e1e1?w=500" },
      { name:"Cello Opalware Dinner Set 18pcs", desc:"Opalware dinner set with 6 plates, 6 bowls, 6 side plates.", price:1299, orig:2499, stock:120, cat:"Home", brand:"Cello", rating:4.4, rc:12345, img:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500" },
      { name:"Philips LED Bulb 9W Pack of 4", desc:"9W LED bulb, 950 lumens, cool daylight, 15000 hours life.", price:299, orig:499, stock:500, cat:"Home", brand:"Philips", rating:4.5, rc:45678, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Amazon Basics Non-Stick Cookware Set", desc:"3-piece non-stick set: fry pan, saucepan, kadai. PFOA free.", price:1499, orig:2999, stock:100, cat:"Home", brand:"Amazon Basics", rating:4.2, rc:8923, img:"https://images.unsplash.com/photo-1584990347449-a2d4ef6b7b41?w=500" },
      { name:"Kuber Industries Storage Box Set of 6", desc:"Foldable fabric storage boxes with lid, 30L each.", price:899, orig:1799, stock:200, cat:"Home", brand:"Kuber Industries", rating:4.1, rc:6234, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Wonderchef Nutri-Blend Mixer 400W", desc:"400W motor, 3 jars, stainless steel blades, 2-year warranty.", price:2299, orig:3999, stock:90, cat:"Home", brand:"Wonderchef", rating:4.4, rc:15678, img:"https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500" },
      { name:"Story@Home Blackout Curtains Set of 2", desc:"7ft blackout curtains, eyelet top, blocks 99% light.", price:999, orig:1999, stock:160, cat:"Home", brand:"Story@Home", rating:4.3, rc:7891, img:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500" },

      // ── APPLIANCES (10) ──
      { name:"LG 1.5 Ton 5 Star Inverter AC", desc:"Dual inverter compressor, 4-way swing, auto clean.", price:42990, orig:55990, stock:25, cat:"Appliances", brand:"LG", rating:4.4, rc:3456, img:"https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500" },
      { name:"Samsung 8kg Front Load Washing Machine", desc:"Eco Bubble technology, 1400 RPM, AI control, steam wash.", price:44990, orig:59990, stock:20, cat:"Appliances", brand:"Samsung", rating:4.5, rc:2341, img:"https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500" },
      { name:"Whirlpool 265L Double Door Refrigerator", desc:"Intellifresh technology, 6th sense, frost free, 2-star rating.", price:28990, orig:38990, stock:18, cat:"Appliances", brand:"Whirlpool", rating:4.3, rc:4567, img:"https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500" },
      { name:"Philips HL7756 Mixer Grinder 750W", desc:"750W motor, 3 jars, stainless steel blades, 5-year warranty.", price:3299, orig:4999, stock:80, cat:"Appliances", brand:"Philips", rating:4.4, rc:18923, img:"https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500" },
      { name:"Bajaj Majesty 1000W Room Heater", desc:"1000W fan heater with 2 heat settings and cool air mode.", price:1799, orig:2999, stock:100, cat:"Appliances", brand:"Bajaj", rating:4.2, rc:9234, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Havells Cista 1200mm Ceiling Fan", desc:"BLDC motor, 5-star rated, remote control, 28W power.", price:4999, orig:6999, stock:60, cat:"Appliances", brand:"Havells", rating:4.5, rc:6789, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Morphy Richards 1500W Dry Iron", desc:"Soleplate with non-stick coating, 1500W, 2-year warranty.", price:999, orig:1799, stock:150, cat:"Appliances", brand:"Morphy Richards", rating:4.3, rc:12345, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Eureka Forbes Aquaguard Enhance RO+UV", desc:"8L storage, 7-stage purification, TDS controller.", price:14999, orig:19999, stock:35, cat:"Appliances", brand:"Eureka Forbes", rating:4.4, rc:5678, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Panasonic 23L Convection Microwave", desc:"23L capacity, 360° heat wrap, 101 auto cook menus.", price:11990, orig:15990, stock:40, cat:"Appliances", brand:"Panasonic", rating:4.3, rc:4321, img:"https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500" },
      { name:"Dyson V12 Detect Slim Vacuum", desc:"Laser dust detection, 60-min runtime, HEPA filtration.", price:52900, orig:62900, stock:15, cat:"Appliances", brand:"Dyson", rating:4.7, rc:1234, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },

      // ── TOYS (10) ──
      { name:"LEGO Classic Creative Bricks 484pcs", desc:"484 colourful bricks for open-ended creative building.", price:2499, orig:3499, stock:100, cat:"Toys", brand:"LEGO", rating:4.7, rc:8923, img:"https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500" },
      { name:"Remote Control Monster Truck 4WD", desc:"2.4GHz RC truck, 25km/h, shock absorbers, all terrain.", price:799, orig:2499, stock:120, cat:"Toys", brand:"Generic", rating:4.0, rc:12043, img:"https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500" },
      { name:"Funskool Monopoly Board Game", desc:"Classic Monopoly with Indian properties, 2-8 players.", price:699, orig:999, stock:150, cat:"Toys", brand:"Funskool", rating:4.5, rc:15678, img:"https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=500" },
      { name:"Hot Wheels 20-Car Gift Pack", desc:"20 die-cast 1:64 scale cars in assorted styles.", price:999, orig:1499, stock:200, cat:"Toys", brand:"Hot Wheels", rating:4.6, rc:23456, img:"https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=500" },
      { name:"Barbie Dreamhouse Playset", desc:"3-storey dollhouse with 70+ accessories and 8 rooms.", price:8999, orig:12999, stock:30, cat:"Toys", brand:"Barbie", rating:4.5, rc:5678, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Nerf Elite 2.0 Commander Blaster", desc:"6-dart rotating drum, 27m range, includes 12 darts.", price:1299, orig:1999, stock:80, cat:"Toys", brand:"Nerf", rating:4.3, rc:9234, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Play-Doh Kitchen Creations Set", desc:"15 cans of Play-Doh with kitchen-themed moulds and tools.", price:1499, orig:2199, stock:90, cat:"Toys", brand:"Play-Doh", rating:4.4, rc:7891, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Rubik's Cube 3x3 Original", desc:"Original Rubik's Cube with smooth rotation mechanism.", price:399, orig:599, stock:300, cat:"Toys", brand:"Rubik's", rating:4.5, rc:34567, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Fisher-Price Baby Gym Playmat", desc:"Soft playmat with 5 hanging toys, music and lights.", price:2499, orig:3999, stock:60, cat:"Toys", brand:"Fisher-Price", rating:4.6, rc:4567, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Drone with Camera HD 720P", desc:"Altitude hold, headless mode, 20-min flight time, foldable.", price:3999, orig:6999, stock:45, cat:"Toys", brand:"Syma", rating:4.1, rc:6789, img:"https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500" },

      // ── FOOD (10) ──
      { name:"Tata Tea Gold 500g", desc:"Premium blend of long and short leaf tea for rich taste.", price:249, orig:299, stock:500, cat:"Food", brand:"Tata Tea", rating:4.5, rc:45678, img:"https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500" },
      { name:"Nescafe Classic Coffee 200g", desc:"100% pure coffee, rich aroma, smooth taste.", price:399, orig:499, stock:400, cat:"Food", brand:"Nescafe", rating:4.4, rc:34567, img:"https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500" },
      { name:"Amul Butter 500g", desc:"Pasteurised butter made from fresh cream, rich taste.", price:275, orig:299, stock:600, cat:"Food", brand:"Amul", rating:4.6, rc:56789, img:"https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500" },
      { name:"Quaker Oats 2kg", desc:"100% whole grain oats, high in fibre, no added sugar.", price:349, orig:499, stock:350, cat:"Food", brand:"Quaker", rating:4.5, rc:23456, img:"https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=500" },
      { name:"Haldiram's Aloo Bhujia 400g", desc:"Crispy potato sev with spices, perfect tea-time snack.", price:149, orig:199, stock:700, cat:"Food", brand:"Haldiram's", rating:4.4, rc:67890, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Saffola Gold Oil 5L", desc:"Blended edible oil with Oryzanol, good for heart health.", price:899, orig:1099, stock:200, cat:"Food", brand:"Saffola", rating:4.3, rc:18923, img:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500" },
      { name:"Cadbury Dairy Milk Silk 250g", desc:"Smooth and creamy milk chocolate bar, premium quality.", price:299, orig:399, stock:400, cat:"Food", brand:"Cadbury", rating:4.7, rc:45678, img:"https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=500" },
      { name:"Yoga Bar Oats & Berries Muesli 700g", desc:"Whole grain oats with real berries, nuts and seeds.", price:449, orig:599, stock:250, cat:"Food", brand:"Yoga Bar", rating:4.4, rc:12345, img:"https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=500" },
      { name:"Patanjali Desi Ghee 1L", desc:"Pure cow ghee, traditional bilona method, rich aroma.", price:599, orig:799, stock:300, cat:"Food", brand:"Patanjali", rating:4.3, rc:23456, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Maggi 2-Minute Noodles 12-Pack", desc:"Classic masala flavour noodles, ready in 2 minutes.", price:199, orig:240, stock:800, cat:"Food", brand:"Maggi", rating:4.5, rc:89012, img:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500" },

      // ── AUTO (10) ──
      { name:"Bosch Car Battery 35Ah", desc:"Maintenance-free battery, 35Ah, fits hatchbacks and sedans.", price:3499, orig:4999, stock:60, cat:"Auto", brand:"Bosch", rating:4.4, rc:5678, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"3M Car Wax Polish 200g", desc:"Carnauba wax formula, deep shine, UV protection.", price:599, orig:899, stock:150, cat:"Auto", brand:"3M", rating:4.3, rc:8923, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Michelin Pilot Sport 4 Tyre 205/55R16", desc:"High performance tyre, excellent wet grip, sporty handling.", price:7999, orig:9999, stock:40, cat:"Auto", brand:"Michelin", rating:4.6, rc:2341, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Varta Car Dash Camera Full HD", desc:"Full HD 1080P, 170° wide angle, night vision, loop recording.", price:2999, orig:4999, stock:80, cat:"Auto", brand:"Varta", rating:4.2, rc:6789, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Amaron Car Battery 55Ah", desc:"High cranking power, 55Ah, fits sedans and SUVs.", price:4999, orig:6499, stock:45, cat:"Auto", brand:"Amaron", rating:4.5, rc:4567, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Meguiar's Ultimate Liquid Wax 473ml", desc:"Synthetic polymer wax, brilliant shine, 12-month protection.", price:1499, orig:2199, stock:100, cat:"Auto", brand:"Meguiar's", rating:4.5, rc:3456, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Garmin DriveSmart 55 GPS Navigator", desc:"5.5-inch display, live traffic, voice control, India maps.", price:12999, orig:17999, stock:30, cat:"Auto", brand:"Garmin", rating:4.4, rc:2345, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Kenwood Car Stereo with Bluetooth", desc:"Double DIN, 6.8-inch touchscreen, Apple CarPlay, Android Auto.", price:14999, orig:19999, stock:25, cat:"Auto", brand:"Kenwood", rating:4.3, rc:1890, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Hella LED Headlight Bulb H4 Pair", desc:"6000K white light, 3x brighter than halogen, plug and play.", price:1299, orig:1999, stock:120, cat:"Auto", brand:"Hella", rating:4.2, rc:7890, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Carmate Car Seat Cover Set", desc:"PU leather seat covers, universal fit, waterproof, full set.", price:2499, orig:3999, stock:70, cat:"Auto", brand:"Carmate", rating:4.1, rc:5678, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },

      // ── 2 WHEELERS (10) ──
      { name:"Vega Helmet Open Face Cruiser", desc:"ISI certified, open face helmet with scratch-resistant visor.", price:1299, orig:1999, stock:150, cat:"2 Wheelers", brand:"Vega", rating:4.3, rc:12345, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Studds Full Face Helmet Thunder", desc:"Full face helmet, ISI certified, aerodynamic design.", price:1799, orig:2499, stock:100, cat:"2 Wheelers", brand:"Studds", rating:4.4, rc:9234, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Bosch Bike Battery 12V 9Ah", desc:"Sealed maintenance-free battery for bikes and scooters.", price:1499, orig:1999, stock:80, cat:"2 Wheelers", brand:"Bosch", rating:4.3, rc:6789, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Michelin Pilot Street Tyre 100/80-17", desc:"Dual compound tyre for excellent grip in wet and dry.", price:3499, orig:4499, stock:50, cat:"2 Wheelers", brand:"Michelin", rating:4.5, rc:3456, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Motul 7100 Engine Oil 1L 10W-40", desc:"Fully synthetic 4T engine oil, ester technology.", price:699, orig:899, stock:200, cat:"2 Wheelers", brand:"Motul", rating:4.6, rc:15678, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Bike Chain Lubricant Spray 500ml", desc:"Penetrates deep, reduces friction, protects against rust.", price:299, orig:499, stock:300, cat:"2 Wheelers", brand:"WD-40", rating:4.4, rc:23456, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Saferide Riding Gloves Full Finger", desc:"Knuckle protection, breathable mesh, touchscreen compatible.", price:799, orig:1299, stock:120, cat:"2 Wheelers", brand:"Saferide", rating:4.2, rc:8901, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Rynox Tornado Pro Riding Jacket", desc:"CE Level 2 armour, waterproof, reflective panels.", price:7999, orig:10999, stock:30, cat:"2 Wheelers", brand:"Rynox", rating:4.6, rc:2345, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Bike USB Charger Handlebar Mount", desc:"Dual USB, 3.1A fast charge, waterproof, universal fit.", price:499, orig:799, stock:200, cat:"2 Wheelers", brand:"Generic", rating:4.1, rc:11234, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Moto Morini Windshield Visor Universal", desc:"Aerodynamic windshield, reduces wind blast, easy install.", price:1299, orig:1999, stock:60, cat:"2 Wheelers", brand:"Generic", rating:4.0, rc:4567, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },

      // ── SPORTS (10) ──
      { name:"Yonex Astrox 88S Badminton Racket", desc:"Steep attack racket, graphite shaft, 4U weight.", price:8999, orig:11999, stock:40, cat:"Sports", brand:"Yonex", rating:4.6, rc:3456, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Nivia Storm Football Size 5", desc:"32-panel machine stitched football, PVC material.", price:699, orig:999, stock:150, cat:"Sports", brand:"Nivia", rating:4.3, rc:12345, img:"https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500" },
      { name:"Cosco Cricket Bat Kashmir Willow", desc:"Full size Kashmir willow bat, 1200g, with grip.", price:1299, orig:1999, stock:80, cat:"Sports", brand:"Cosco", rating:4.2, rc:8923, img:"https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500" },
      { name:"Decathlon Kiprun Running Shoes", desc:"Lightweight, breathable mesh, cushioned midsole.", price:2999, orig:4499, stock:100, cat:"Sports", brand:"Decathlon", rating:4.4, rc:15678, img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" },
      { name:"Boldfit Resistance Bands Set of 5", desc:"5 resistance levels, latex bands for home workout.", price:499, orig:999, stock:300, cat:"Sports", brand:"Boldfit", rating:4.3, rc:23456, img:"https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500" },
      { name:"Strauss Yoga Mat 6mm Anti-Slip", desc:"6mm thick, anti-slip surface, carrying strap included.", price:799, orig:1299, stock:200, cat:"Sports", brand:"Strauss", rating:4.4, rc:34567, img:"https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500" },
      { name:"Nivia Carbonite Basketball Size 7", desc:"Rubber basketball, deep channel design, indoor/outdoor.", price:999, orig:1499, stock:90, cat:"Sports", brand:"Nivia", rating:4.2, rc:6789, img:"https://images.unsplash.com/photo-1546519638405-a9f9e8f7e7e7?w=500" },
      { name:"Adidas Predator Football Boots", desc:"Firm ground boots, synthetic upper, precision control.", price:4999, orig:6999, stock:50, cat:"Sports", brand:"Adidas", rating:4.5, rc:4567, img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" },
      { name:"Lifelong Adjustable Dumbbell Set 20kg", desc:"Adjustable weight plates, chrome handle, 20kg total.", price:2499, orig:3999, stock:60, cat:"Sports", brand:"Lifelong", rating:4.3, rc:9234, img:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500" },
      { name:"Speedo Fastskin Swimsuit", desc:"Chlorine resistant, UV50+ protection, competition fit.", price:3499, orig:4999, stock:35, cat:"Sports", brand:"Speedo", rating:4.5, rc:2345, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },

      // ── BOOKS (10) ──
      { name:"Atomic Habits by James Clear", desc:"Tiny changes, remarkable results. Build good habits.", price:499, orig:799, stock:300, cat:"Books", brand:"Penguin", rating:4.8, rc:45678, img:"https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500" },
      { name:"The Psychology of Money", desc:"19 short stories on wealth, greed and happiness.", price:349, orig:599, stock:250, cat:"Books", brand:"Jaico", rating:4.7, rc:32145, img:"https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500" },
      { name:"Rich Dad Poor Dad", desc:"What the rich teach their kids about money.", price:299, orig:499, stock:400, cat:"Books", brand:"Manjul", rating:4.6, rc:67890, img:"https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500" },
      { name:"The Alchemist by Paulo Coelho", desc:"A magical story about following your dreams.", price:249, orig:399, stock:350, cat:"Books", brand:"HarperCollins", rating:4.7, rc:89012, img:"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500" },
      { name:"Ikigai: The Japanese Secret", desc:"The Japanese secret to a long and happy life.", price:299, orig:499, stock:300, cat:"Books", brand:"Penguin", rating:4.5, rc:34567, img:"https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500" },
      { name:"Zero to One by Peter Thiel", desc:"Notes on startups, or how to build the future.", price:399, orig:599, stock:200, cat:"Books", brand:"Virgin Books", rating:4.5, rc:23456, img:"https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500" },
      { name:"Sapiens: A Brief History of Humankind", desc:"How Homo sapiens came to dominate the world.", price:499, orig:799, stock:250, cat:"Books", brand:"Vintage", rating:4.7, rc:45678, img:"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500" },
      { name:"The 5 AM Club by Robin Sharma", desc:"Own your morning, elevate your life.", price:349, orig:599, stock:280, cat:"Books", brand:"Jaico", rating:4.4, rc:28901, img:"https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500" },
      { name:"Deep Work by Cal Newport", desc:"Rules for focused success in a distracted world.", price:399, orig:599, stock:220, cat:"Books", brand:"Piatkus", rating:4.6, rc:19234, img:"https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500" },
      { name:"Think and Grow Rich", desc:"Napoleon Hill's classic on the philosophy of success.", price:199, orig:399, stock:400, cat:"Books", brand:"Fingerprint", rating:4.5, rc:56789, img:"https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500" },

      // ── FURNITURE (10) ──
      { name:"Wakefit Orthopaedic Memory Foam Mattress Queen", desc:"7-inch memory foam mattress, medium firm, 10-year warranty.", price:14999, orig:22999, stock:20, cat:"Furniture", brand:"Wakefit", rating:4.5, rc:8923, img:"https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500" },
      { name:"Nilkamal Plastic Chair Set of 4", desc:"Heavy duty plastic chairs, stackable, 150kg capacity each.", price:2999, orig:4499, stock:80, cat:"Furniture", brand:"Nilkamal", rating:4.2, rc:15678, img:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500" },
      { name:"Godrej Interio Slimline Bookshelf", desc:"5-shelf bookcase, engineered wood, walnut finish.", price:8499, orig:11999, stock:35, cat:"Furniture", brand:"Godrej Interio", rating:4.2, rc:1234, img:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500" },
      { name:"Durian Fabric 3-Seater Sofa", desc:"Premium fabric sofa, high-density foam, 5-year warranty.", price:24999, orig:34999, stock:15, cat:"Furniture", brand:"Durian", rating:4.4, rc:3456, img:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500" },
      { name:"Pepperfry Study Table with Drawer", desc:"Engineered wood study table, 2 drawers, walnut finish.", price:6999, orig:9999, stock:40, cat:"Furniture", brand:"Pepperfry", rating:4.3, rc:5678, img:"https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500" },
      { name:"Wooden Street King Size Bed", desc:"Sheesham wood king bed with storage, 5-year warranty.", price:34999, orig:49999, stock:10, cat:"Furniture", brand:"Wooden Street", rating:4.5, rc:2345, img:"https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500" },
      { name:"Featherlite Ergonomic Office Chair", desc:"Mesh back, lumbar support, adjustable armrests, 5-year warranty.", price:12999, orig:17999, stock:25, cat:"Furniture", brand:"Featherlite", rating:4.4, rc:4567, img:"https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=500" },
      { name:"Hometown 4-Door Wardrobe", desc:"Engineered wood wardrobe, 4 doors, mirror, 10 shelves.", price:18999, orig:26999, stock:12, cat:"Furniture", brand:"Hometown", rating:4.3, rc:3456, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
      { name:"Urban Ladder Dining Table 6-Seater", desc:"Solid wood dining table with 6 chairs, natural finish.", price:42999, orig:59999, stock:8, cat:"Furniture", brand:"Urban Ladder", rating:4.5, rc:1890, img:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500" },
      { name:"Spacewood TV Unit with Storage", desc:"Engineered wood TV unit, 2 cabinets, open shelves, 55-inch TV fit.", price:9999, orig:14999, stock:30, cat:"Furniture", brand:"Spacewood", rating:4.2, rc:6789, img:"https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=500" },
    ];

    for (const p of products) {
      const catId = catMap[p.cat];
      if (!catId) { console.warn(`⚠️  Category not found: ${p.cat}`); continue; }
      const [result] = await conn.query(
        `INSERT INTO products (name, description, price, original_price, stock, category_id, brand, rating, rating_count)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [p.name, p.desc, p.price, p.orig, p.stock, catId, p.brand, p.rating, p.rc]
      );
      await conn.query(
        `INSERT INTO product_images (product_id, image_url, is_primary) VALUES (?, ?, 1)`,
        [result.insertId, p.img]
      );
    }

    console.log(`✅ Seeded ${products.length} products across ${categoryNames.length} categories`);
  } catch (err) {
    console.error("❌ Seed error:", err.message);
  } finally {
    conn.release();
    process.exit(0);
  }
}

seed();
