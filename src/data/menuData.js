// src/data/menuData.js

export const menuData = [
  // BEST SELLERS
  {
      id: 1,
      name: "Kanagara Signature Coffee",
      category: "Kopi Spesial",
      price: 35000,
      image_path: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1287&auto=format&fit=crop",
      description: "Racikan kopi spesial dengan biji kopi pilihan dan teknik seduh yang sempurna",
      tag: "Best Seller",
      is_available: true
  },
  {
      id: 2,
      name: "Caramel Macchiato",
      category: "Coffee",
      price: 32000,
      image_path: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1470&auto=format&fit=crop",
      description: "Espresso dengan steamed milk dan caramel syrup yang manis",
      tag: "Best Seller",
      is_available: true
  },
  {
      id: 3,
      name: "Nasi Gudeg Jogja",
      category: "Makanan Utama",
      price: 28000,
      image_path: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=1481&auto=format&fit=crop",
      description: "Gudeg khas Jogja dengan ayam, telur, dan sambal krecek",
      tag: "Best Seller",
      is_available: true
  },
  {
      id: 4,
      name: "Matcha Latte",
      category: "Non Coffee",
      price: 30000,
      image_path: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=1471&auto=format&fit=crop",
      description: "Matcha premium dengan susu yang creamy dan lembut",
      tag: "Best Seller",
      is_available: true
  },
  {
      id: 5,
      name: "Croffle Original",
      category: "Dessert",
      price: 25000,
      image_path: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1528&auto=format&fit=crop",
      description: "Croissant waffle dengan topping gula halus dan maple syrup",
      tag: "Best Seller",
      is_available: true
  },
  
  // ESPRESSO BASED
  { id: 6, category: "Espresso Based", name: "ESPRESSO", price: 18000, tag: "Regular", is_available: true },
  { id: 7, category: "Espresso Based", name: "SPLIT SHOT", price: 28000, tag: "Regular", is_available: true },
  { id: 8, category: "Espresso Based", name: "PICCOLO", price: 25000, tag: "Regular", is_available: true },
  { id: 9, category: "Espresso Based", name: "FLAT WHITE", price: 25000, tag: "Regular", is_available: true },
  { id: 10, category: "Espresso Based", name: "NUTELLA LATTE", price: 32000, tag: "Regular", is_available: true },
  { id: 11, category: "Espresso Based", name: "MOCHACCINO (HOT)", price: 25000, tag: "Regular", is_available: true },
  { id: 12, category: "Espresso Based", name: "AMERICANO (HOT)", price: 22000, tag: "Regular", is_available: true },
  { id: 13, category: "Espresso Based", name: "LONG BLACK", price: 24000, tag: "Regular", is_available: true },
  { id: 14, category: "Espresso Based", name: "CAPPUCINO", price: 26000, tag: "Regular", is_available: true },
  { id: 15, category: "Espresso Based", name: "CAFE LATTE (HOT)", price: 25000, tag: "Regular", is_available: true },
  { id: 16, category: "Espresso Based", name: "ICE LATTE", price: 26000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_ICE_LATTE" },
  { id: 17, category: "Espresso Based", name: "ICE MOCHACCINO", price: 28000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_ICE_MOCHACCINO" },
  { id: 18, category: "Espresso Based", name: "ICE AMERICANO", price: 24000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_ICE_AMERICANO" },
  
  // SIGNATURE COFFEE BASED
  { id: 19, category: "Signature Coffee Based", name: "VANILLA SWEET LATTE", price: 23000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_VANILLA_SWEET_LATTE" },
  { id: 20, category: "Signature Coffee Based", name: "TIRAMISU CREAM LATTE", price: 23000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_TIRAMISU_CREAM_LATTE" },
  { id: 21, category: "Signature Coffee Based", name: "MOCHA OATS LATTE", price: 27000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_MOCHA_OATS_LATTE" },
  { id: 22, category: "Signature Coffee Based", name: "MOCHA BRULEE LATTE", price: 25000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_MOCHA_BRULEE_LATTE" },
  { id: 23, category: "Signature Coffee Based", name: "RASPBERRY CANDY LATTE", price: 25000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_RASPBERRY_CANDY_LATTE" },
  { id: 24, category: "Signature Coffee Based", name: "HERITAGE PANDAN LATTE", price: 23000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_HERITAGE_PANDAN_LATTE" },
  { id: 25, category: "Signature Coffee Based", name: "BRULEE CARAMEL LATTE", price: 25000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_BRULEE_CARAMEL_LATTE" },
  { id: 26, category: "Signature Coffee Based", name: "BANANA MALTED LATTE", price: 25000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_BANANA_MALTED_LATTE" },
  { id: 27, category: "Signature Coffee Based", name: "CINNAMON BROWN SUGAR LATTE", price: 23000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_CINNAMON_BROWN_SUGAR" },
  { id: 28, category: "Signature Coffee Based", name: "CARAMEL DRIZZLE LATTE", price: 23000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_CARAMEL_DRIZZLE" },
  { id: 29, category: "Signature Coffee Based", name: "BUTTERSCOTCH CREAM LATTE", price: 23000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_BUTTERSCOTCH" },
  { id: 30, category: "Signature Coffee Based", name: "CHEESECAKE CREAM LATTE", price: 25000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_CHEESECAKE_LATTE" },
  
  // FRAPPE
  { id: 31, category: "Frappe", name: "GREENTEA FRAPPE", price: 34000, tag: "Regular", is_available: true },
  { id: 32, category: "Frappe", name: "CARAMEL FRAPPUCINO", price: 32000, tag: "Regular", is_available: true },
  { id: 33, category: "Frappe", name: "RASPBERRY FRAPPE", price: 30000, tag: "Regular", is_available: true },
  { id: 34, category: "Frappe", name: "JAVACHIP FRAPPUCINO", price: 34000, tag: "Regular", is_available: true },
  { id: 35, category: "Frappe", name: "NUTELLA FRAPPE", price: 34000, tag: "Regular", is_available: true },
  { id: 36, category: "Frappe", name: "BLACKFOREST FRAPPUCINO", price: 32000, tag: "Regular", is_available: true },

  // SIGNATURE WHITE
  { id: 37, category: "Signature White", name: "BANANA CHOCOLATE CREAM", price: 23000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_BANANA_CHOCO" },
  { id: 38, category: "Signature White", name: "CHOCOLATE CHEESECAKE CREAM", price: 25000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_CHOCO_CHEESECAKE" },
  { id: 39, category: "Signature White", name: "BUTTERSCOTCH CHOCOLATE CREAM", price: 23000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_BUTTERSCOTCH_CHOCO" },
  { id: 40, category: "Signature White", name: "VANILLA CHOCOLATE CREAM", price: 23000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_VANILLA_CHOCO" },
  { id: 41, category: "Signature White", name: "CINNAMON CHOCOLATE CREAM", price: 23000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_CINNAMON_CHOCO" },
  { id: 42, category: "Signature White", name: "GREENTEA CARAMEL CREAM", price: 25000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_GREENTEA_CARAMEL" },
  { id: 43, category: "Signature White", name: "CHOCOBERRY MATCHA", price: 30000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_CHOCOBERRY_MATCHA" },
  { id: 44, category: "Signature White", name: "PINK BERRIES CREAM", price: 25000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_PINK_BERRIES" },
  { id: 45, category: "Signature White", name: "STRAWBERRY MATCHA", price: 28000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_STRAWBERRY_MATCHA" },

  // REFRESHMENT
  { id: 46, category: "Refreshment", name: "COCONUT MATCHA", price: 25000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_COCONUT_MATCHA" },
  { id: 47, category: "Refreshment", name: "PINK GRAPEFRUIT BREEZE", price: 22000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_PINK_GRAPEFRUIT" },
  { id: 48, category: "Refreshment", name: "STRAWBERRY BREEZE", price: 22000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_STRAWBERRY_BREEZE" },
  { id: 49, category: "Refreshment", name: "TROPICAL PINEAPPLE", price: 25000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_TROPICAL_PINEAPPLE" },
  { id: 50, category: "Refreshment", name: "WATERMELON BREEZE", price: 22000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_WATERMELON_BREEZE" },
  { id: 51, category: "Refreshment", name: "LYCHEE BREEZE", price: 22000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_LYCHEE_BREEZE" },
  { id: 52, category: "Refreshment", name: "KANAGARA SUMMER", price: 22000, tag: "Regular", is_available: true },

  // SMOOTHIES
  { id: 53, category: "Smoothies", name: "MANGO STRAWBERRY SMOOTHIES", price: 30000, tag: "Regular", is_available: true },
  { id: 54, category: "Smoothies", name: "BANANA STRAWBERRY SMOOTHIES", price: 30000, tag: "Regular", is_available: true },
  
  // MIXOLOGY
  { id: 55, category: "Mixology", name: "STRAWBERRY POUNDCAKE", price: 25000, tag: "Regular", is_available: true },
  { id: 56, category: "Mixology", name: "BAHAMAS SUNSET", price: 25000, tag: "Regular", is_available: true },
  { id: 57, category: "Mixology", name: "CARAMEL CANDIA", price: 25000, tag: "Regular", is_available: true },
  { id: 58, category: "Mixology", name: "WHITE NOISE", price: 25000, tag: "Regular", is_available: true },
  { id: 59, category: "Mixology", name: "CANDY CLOUD", price: 25000, tag: "Regular", is_available: true },
  { id: 60, category: "Mixology", name: "BLACK RUSSIAN", price: 25000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_BLACK_RUSSIAN" },
  { id: 61, category: "Mixology", name: "JAPANESE OLD FASHIONED", price: 25000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_JAPANESE_OLD_FASHIONED" },

  // KANAPLATES
  { id: 62, category: "Kanaplates", name: "Beef Gyudon With Bulgogi Mushroom Sauce", price: 34000, description: "Shortplate beef gyudon mix with bulgogi mushroom sauce", tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_BEEF_GYUDON" },
  { id: 63, category: "Kanaplates", name: "AUTHENTIC CHICKEN SAMBAL MATAH", price: 32000, description: "Fried chicken with butter rice mix authentic sambal matah and sunny side up", tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_CHICKEN_MATAH" },
  { id: 64, category: "Kanaplates", name: "Dory Sambal Matah", price: 34000, description: "Fried dory with Sambal Matah served with rice", tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_DORY_MATAH" },
  
  // PASTA
  { id: 65, category: "Pasta", name: "Fettucine Alfredo", price: 32000, description: "Fettuccine tossed with butter and parmesan cheese with creamy mushroom sauce", tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_FETTUCINE_ALFREDO" },
  { id: 66, category: "Pasta", name: "Tuna Aglio E Olio", price: 32000, description: "This dish is made by sauteing sliced garlic in olive oil, with addition of red pepper flakes, and tuna.", tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_TUNA_AGLIO" },
  { id: 67, category: "Pasta", name: "Aglio E Olio With Prawn & Squid", price: 34000, description: "Made by sauteing sliced garlic in olive oil, with addition of red pepper, prawn & squid", tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_AGLIO_PRAWN" },
  
  // SNACKS
  { id: 68, category: "Snacks", name: "MIX PLATTER", price: 30000, tag: "Regular", is_available: true },
  { id: 69, category: "Snacks", name: "ONION RING WITH TAR TAR SAUCE", price: 18000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_ONION_RING" },
  { id: 70, category: "Snacks", name: "FRENCH FRIES WITH CHEESE SAUCE", price: 18000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_FRENCH_FRIES_CHEESE" },
  { id: 71, category: "Snacks", name: "GARLIC PARMESAN CHICKEN WINGS", price: 22000, tag: "Regular", is_available: true, imageUrl: "URL_GAMBAR_CHICKEN_WINGS" },
  { id: 72, category: "Snacks", name: "DIMSUM MENTAI", price: 22000, tag: "Regular", is_available: true },

  // MENU REGULER TAMBAHAN
  {
      id: 73,
      name: "Americano",
      category: "Coffee",
      price: 20000,
      image_path: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1287&auto=format&fit=crop",
      description: "Espresso dengan air panas, coffee klasik yang nikmat",
      tag: "Regular",
      is_available: true
  },
  {
      id: 74,
      name: "Cappuccino",
      category: "Coffee",
      price: 25000,
      image_path: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=1287&auto=format&fit=crop",
      description: "Espresso dengan steamed milk dan foam yang sempurna",
      tag: "Regular",
      is_available: true
  },
  {
      id: 75,
      name: "Latte",
      category: "Coffee",
      price: 28000,
      image_path: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=2537&auto=format&fit=crop",
      description: "Espresso dengan lebih banyak steamed milk, creamy dan smooth",
      tag: "Regular",
      is_available: true
  },
  {
      id: 76,
      name: "Chocolate Latte",
      category: "Non Coffee",
      price: 30000,
      image_path: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?q=80&w=1287&auto=format&fit=crop",
      description: "Cokelat hangat dengan susu yang creamy dan whipped cream",
      tag: "Regular",
      is_available: true
  },
  {
      id: 77,
      name: "Thai Tea",
      category: "Non Coffee",
      price: 22000,
      image_path: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1470&auto=format&fit=crop",
      description: "Thai tea autentik dengan susu kental manis",
      tag: "Regular",
      is_available: true
  },
  {
      id: 78,
      name: "Ayam Geprek Sambal Matah",
      category: "Makanan Utama",
      price: 35000,
      image_path: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=1473&auto=format&fit=crop",
      description: "Ayam crispy dengan sambal matah pedas dan nasi hangat",
      tag: "Regular",
      is_available: true
  },
  {
      id: 79,
      name: "Mie Ayam Pangsit",
      category: "Makanan Utama",
      price: 25000,
      image_path: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1480&auto=format&fit=crop",
      description: "Mie ayam dengan pangsit rebus dan pangsit goreng",
      tag: "Regular",
      is_available: true
  },
  {
      id: 80,
      name: "French Fries",
      category: "Snack",
      price: 18000,
      image_path: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1469&auto=format&fit=crop",
      description: "Kentang goreng crispy dengan saus samping",
      tag: "Regular",
      is_available: true
  },
  {
      id: 81,
      name: "Chicken Wings",
      category: "Snack",
      price: 30000,
      image_path: "https://images.unsplash.com/photo-1527477396560-dc2793bf9882?q=80&w=1253&auto=format&fit=crop",
      description: "Sayap ayam dengan bumbu spesial dan saus BBQ",
      tag: "Regular",
      is_available: true
  },
  {
      id: 82,
      name: "Tiramisu Cake",
      category: "Dessert",
      price: 28000,
      image_path: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1287&auto=format&fit=crop",
      description: "Kue tiramisu dengan lapisan krim mascarpone dan kopi",
      tag: "Regular",
      is_available: true
  },
  {
      id: 83,
      name: "Cheesecake Blueberry",
      category: "Dessert",
      price: 32000,
      image_path: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1470&auto=format&fit=crop",
      description: "Cheesecake lembut dengan topping blueberry segar",
      tag: "Regular",
      is_available: true
  }
];

export const menuCategories = ["All", ...new Set(menuData.map(item => item.category))];

export default menuData;
