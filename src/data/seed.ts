// Seed data for the demo boutique, captured from the reference design. Timestamps are stored
// relative to "now" so the 30-day dashboard window always has data on a fresh install.
import type { AdminUser, Category, Collection, Coupon, CustomerProfile, Order, ProductRecord, ShopSettings } from "@/types";
import { ProductImages } from "@/utils/Images";
import { dateFromToday, daysAgo } from "@/utils/Format";

export const SEED_ADMIN: AdminUser = {
  id: "23fd86af-1dd4-4c67-aadc-b96ab6843a31",
  email: "admin@aavya.boutique",
  name: "Meera Kapoor"
};

export const SEED_ADMIN_PASSWORD = "Boutique@2026";

export const SEED_SETTINGS: ShopSettings = {
  id: "shop",
  store_name: "Aavya Heritage & Bachpan Boutique",
  tagline: "Handcrafted ethnic wear for ladies & kids",
  phone: "+91 98200 12345",
  email: "care@aavya.boutique",
  gstin: "27AADCB2234P1Z3",
  address: "12, Linking Road, Bandra West, Mumbai 400050",
  low_stock_threshold: 5,
  shipping_fee: 99,
  free_shipping_above: 1999
};

export const SEED_CATEGORIES: Category[] = [
  {
    id: "919a3828-6368-468f-9d92-63805a35afa1",
    name: "Co-ord Sets",
    slug: "co-ord-sets",
    audience: "all",
    description: "Matching top-bottom sets for women and kids",
    active: true,
    created_at: daysAgo(60)
  },
  {
    id: "cdde62c4-c743-4ee4-993d-9a8dc4150c7c",
    name: "Festive Dhotis & Kurtas",
    slug: "festive-dhotis-kurtas",
    audience: "boys",
    description: "Traditional dhoti-kurta and kurta-pyjama sets",
    active: true,
    created_at: daysAgo(60)
  },
  {
    id: "454d0792-ba22-4821-a940-fbaeb2455355",
    name: "Frocks & Dresses",
    slug: "frocks-dresses",
    audience: "girls",
    description: "Party and everyday frocks for little divas",
    active: true,
    created_at: daysAgo(60)
  },
  {
    id: "80c521b8-713d-4bc9-b4fb-5cd51525f1b7",
    name: "Kurtis & Tunics",
    slug: "kurtis-tunics",
    audience: "ladies",
    description: "Straight cuts, anarkali kurtis and festive tunics",
    active: true,
    created_at: daysAgo(60)
  },
  {
    id: "13a7f00d-907d-4ad2-b5c5-aa140b9d15fa",
    name: "Lehengas & Anarkalis",
    slug: "lehengas-anarkalis",
    audience: "ladies",
    description: "Occasion-wear lehengas, ghagras and anarkalis",
    active: true,
    created_at: daysAgo(60)
  },
  {
    id: "c7665d7c-42df-4226-bbb4-f3ccd4a59fd7",
    name: "Nightwear & Loungewear",
    slug: "nightwear-loungewear",
    audience: "ladies",
    description: "Soft cotton night suits and lounge sets",
    active: true,
    created_at: daysAgo(60)
  }
];

export const SEED_COLLECTIONS: Collection[] = [
  {
    id: "b4e5e8f6-9407-4c48-af6b-9cf46d768458",
    name: "Everyday Comfort Cotton",
    slug: "everyday-comfort-cotton",
    description: "Soft cottons for daily wear and school",
    active: true,
    created_at: daysAgo(55)
  },
  {
    id: "76dc4dd2-d88e-46c2-8c8c-646c3e538589",
    name: "Little Princess Partywear",
    slug: "little-princess-partywear",
    description: "Frocks, ghagras and gowns for the little ones",
    active: true,
    created_at: daysAgo(55)
  },
  {
    id: "2d4c93a8-5544-4c67-94cb-4aae63e99227",
    name: "Royal Chanderi Festive",
    slug: "royal-chanderi-festive",
    description: "Handwoven chanderi silks for the festive season",
    active: true,
    created_at: daysAgo(55)
  },
  {
    id: "689568fe-0897-41f8-b76b-b59c6856dae0",
    name: "Summer Floral '25",
    slug: "summer-floral-25",
    description: "Breathable florals for the summer weddings",
    active: true,
    created_at: daysAgo(55)
  }
];

export const SEED_PRODUCTS: ProductRecord[] = [
  {
    id: "548745e4-7d58-46c3-ba51-16da0394710e",
    name: "Sunflower Summer Girls Frock",
    sku: "AVY-FRK-012",
    description: "Sunflower-yellow summer frock in soft voile — coming soon colourway.",
    category_id: "454d0792-ba22-4821-a940-fbaeb2455355",
    collection_id: "689568fe-0897-41f8-b76b-b59c6856dae0",
    audience: "girls",
    price: 1499,
    cost_price: 700,
    images: [
      ProductImages.girlsFloralFrock
    ],
    variants: [
      {
        size: "1-2Y",
        color: "Mustard",
        stock: 4,
        sku: "AVY-FRK-012-1-2Y-MUS"
      },
      {
        size: "2-3Y",
        color: "Mustard",
        stock: 6,
        sku: "AVY-FRK-012-2-3Y-MUS"
      },
      {
        size: "3-4Y",
        color: "Mustard",
        stock: 8,
        sku: "AVY-FRK-012-3-4Y-MUS"
      },
      {
        size: "4-5Y",
        color: "Mustard",
        stock: 7,
        sku: "AVY-FRK-012-4-5Y-MUS"
      },
      {
        size: "5-6Y",
        color: "Mustard",
        stock: 5,
        sku: "AVY-FRK-012-5-6Y-MUS"
      },
      {
        size: "7-8Y",
        color: "Mustard",
        stock: 3,
        sku: "AVY-FRK-012-7-8Y-MUS"
      },
      {
        size: "9-10Y",
        color: "Mustard",
        stock: 2,
        sku: "AVY-FRK-012-9-10Y-MUS"
      },
      {
        size: "11-12Y",
        color: "Mustard",
        stock: 1,
        sku: "AVY-FRK-012-11-12Y-MUS"
      }
    ],
    status: "active",
    created_at: daysAgo(29),
    updated_at: daysAgo(0)
  },
  {
    id: "dce16e8c-fc08-4df4-aace-f7f9561b4c9a",
    name: "Blush Floral Night Suit Set",
    sku: "AVY-NIT-011",
    description: "Blush floral-printed cotton night suit with piping detail.",
    category_id: "c7665d7c-42df-4226-bbb4-f3ccd4a59fd7",
    collection_id: "b4e5e8f6-9407-4c48-af6b-9cf46d768458",
    audience: "ladies",
    price: 1299,
    cost_price: 600,
    images: [
      ProductImages.banarasiSilkDrape
    ],
    variants: [
      {
        size: "XS",
        color: "Blush",
        stock: 9,
        sku: "AVY-NIT-011-XS-BLS"
      },
      {
        size: "S",
        color: "Blush",
        stock: 11,
        sku: "AVY-NIT-011-S-BLS"
      },
      {
        size: "M",
        color: "Blush",
        stock: 13,
        sku: "AVY-NIT-011-M-BLS"
      },
      {
        size: "L",
        color: "Blush",
        stock: 12,
        sku: "AVY-NIT-011-L-BLS"
      },
      {
        size: "XL",
        color: "Blush",
        stock: 10,
        sku: "AVY-NIT-011-XL-BLS"
      },
      {
        size: "XXL",
        color: "Blush",
        stock: 8,
        sku: "AVY-NIT-011-XXL-BLS"
      }
    ],
    status: "active",
    created_at: daysAgo(30),
    updated_at: daysAgo(30)
  },
  {
    id: "23bcf78e-25e5-42ff-b732-96e579342ebf",
    name: "Emerald Silk Co-ord Set",
    sku: "AVY-CRD-010",
    description: "Emerald raw-silk co-ord with a short kurta and palazzo — festive ease.",
    category_id: "919a3828-6368-468f-9d92-63805a35afa1",
    collection_id: "2d4c93a8-5544-4c67-94cb-4aae63e99227",
    audience: "ladies",
    price: 3199,
    cost_price: 1550,
    images: [
      ProductImages.banarasiSilkDrape
    ],
    variants: [
      {
        size: "XS",
        color: "Emerald Green",
        stock: 6,
        sku: "AVY-CRD-010-XS-EMR"
      },
      {
        size: "S",
        color: "Emerald Green",
        stock: 9,
        sku: "AVY-CRD-010-S-EMR"
      },
      {
        size: "M",
        color: "Emerald Green",
        stock: 12,
        sku: "AVY-CRD-010-M-EMR"
      },
      {
        size: "L",
        color: "Emerald Green",
        stock: 10,
        sku: "AVY-CRD-010-L-EMR"
      },
      {
        size: "XL",
        color: "Emerald Green",
        stock: 8,
        sku: "AVY-CRD-010-XL-EMR"
      },
      {
        size: "XXL",
        color: "Emerald Green",
        stock: 5,
        sku: "AVY-CRD-010-XXL-EMR"
      }
    ],
    status: "active",
    created_at: daysAgo(31),
    updated_at: daysAgo(31)
  },
  {
    id: "d5499642-d360-4a59-8ab1-8f1d32af19f0",
    name: "Boys Ivory Cotton Kurta Pyjama",
    sku: "AVY-BDY-009",
    description: "Soft ivory kurta-pyjama set in breathable cotton for summer pandals.",
    category_id: "cdde62c4-c743-4ee4-993d-9a8dc4150c7c",
    collection_id: "689568fe-0897-41f8-b76b-b59c6856dae0",
    audience: "boys",
    price: 1599,
    cost_price: 780,
    images: [
      ProductImages.kidsFestiveEnsemble
    ],
    variants: [
      {
        size: "1-2Y",
        color: "Ivory Gold",
        stock: 7,
        sku: "AVY-BDY-009-1-2Y-IVG"
      },
      {
        size: "2-3Y",
        color: "Ivory Gold",
        stock: 9,
        sku: "AVY-BDY-009-2-3Y-IVG"
      },
      {
        size: "3-4Y",
        color: "Ivory Gold",
        stock: 11,
        sku: "AVY-BDY-009-3-4Y-IVG"
      },
      {
        size: "4-5Y",
        color: "Ivory Gold",
        stock: 10,
        sku: "AVY-BDY-009-4-5Y-IVG"
      },
      {
        size: "5-6Y",
        color: "Ivory Gold",
        stock: 8,
        sku: "AVY-BDY-009-5-6Y-IVG"
      },
      {
        size: "7-8Y",
        color: "Ivory Gold",
        stock: 6,
        sku: "AVY-BDY-009-7-8Y-IVG"
      },
      {
        size: "9-10Y",
        color: "Ivory Gold",
        stock: 5,
        sku: "AVY-BDY-009-9-10Y-IVG"
      },
      {
        size: "11-12Y",
        color: "Ivory Gold",
        stock: 0,
        sku: "AVY-BDY-009-11-12Y-IVG"
      }
    ],
    status: "active",
    created_at: daysAgo(32),
    updated_at: daysAgo(32)
  },
  {
    id: "c7e850d9-1016-498e-80a8-42cb23e6a9b8",
    name: "Unisex Block-print Romper",
    sku: "AVY-ROM-008",
    description: "Emerald block-print romper in skin-friendly cotton, snap buttons for quick changes.",
    category_id: "919a3828-6368-468f-9d92-63805a35afa1",
    collection_id: "b4e5e8f6-9407-4c48-af6b-9cf46d768458",
    audience: "kids-neutral",
    price: 999,
    cost_price: 450,
    images: [
      ProductImages.kidsFestiveEnsemble
    ],
    variants: [
      {
        size: "1-2Y",
        color: "Emerald Green",
        stock: 12,
        sku: "AVY-ROM-008-1-2Y-EMR"
      },
      {
        size: "2-3Y",
        color: "Emerald Green",
        stock: 15,
        sku: "AVY-ROM-008-2-3Y-EMR"
      },
      {
        size: "3-4Y",
        color: "Emerald Green",
        stock: 14,
        sku: "AVY-ROM-008-3-4Y-EMR"
      },
      {
        size: "4-5Y",
        color: "Emerald Green",
        stock: 11,
        sku: "AVY-ROM-008-4-5Y-EMR"
      },
      {
        size: "5-6Y",
        color: "Emerald Green",
        stock: 9,
        sku: "AVY-ROM-008-5-6Y-EMR"
      },
      {
        size: "7-8Y",
        color: "Emerald Green",
        stock: 8,
        sku: "AVY-ROM-008-7-8Y-EMR"
      },
      {
        size: "9-10Y",
        color: "Emerald Green",
        stock: 6,
        sku: "AVY-ROM-008-9-10Y-EMR"
      },
      {
        size: "11-12Y",
        color: "Emerald Green",
        stock: 4,
        sku: "AVY-ROM-008-11-12Y-EMR"
      }
    ],
    status: "active",
    created_at: daysAgo(33),
    updated_at: daysAgo(33)
  },
  {
    id: "9e809bbe-31c5-4f7b-89f9-f493d9fd1310",
    name: "Boys Festive Dhoti-Kurta Set",
    sku: "AVY-BDY-007",
    description: "Mustard kurta with an ivory dhoti — pocket-friendly festive pick.",
    category_id: "cdde62c4-c743-4ee4-993d-9a8dc4150c7c",
    collection_id: "b4e5e8f6-9407-4c48-af6b-9cf46d768458",
    audience: "boys",
    price: 1499,
    cost_price: 700,
    images: [
      ProductImages.kidsFestiveEnsemble
    ],
    variants: [
      {
        size: "1-2Y",
        color: "Mustard",
        stock: 5,
        sku: "AVY-BDY-007-1-2Y-MUS"
      },
      {
        size: "2-3Y",
        color: "Mustard",
        stock: 7,
        sku: "AVY-BDY-007-2-3Y-MUS"
      },
      {
        size: "3-4Y",
        color: "Mustard",
        stock: 9,
        sku: "AVY-BDY-007-3-4Y-MUS"
      },
      {
        size: "4-5Y",
        color: "Mustard",
        stock: 8,
        sku: "AVY-BDY-007-4-5Y-MUS"
      },
      {
        size: "5-6Y",
        color: "Mustard",
        stock: 6,
        sku: "AVY-BDY-007-5-6Y-MUS"
      },
      {
        size: "7-8Y",
        color: "Mustard",
        stock: 4,
        sku: "AVY-BDY-007-7-8Y-MUS"
      },
      {
        size: "9-10Y",
        color: "Mustard",
        stock: 3,
        sku: "AVY-BDY-007-9-10Y-MUS"
      },
      {
        size: "11-12Y",
        color: "Mustard",
        stock: 2,
        sku: "AVY-BDY-007-11-12Y-MUS"
      }
    ],
    status: "active",
    created_at: daysAgo(34),
    updated_at: daysAgo(34)
  },
  {
    id: "93a03e44-c73d-428c-bc0c-74669fe622c7",
    name: "Crimson Ghagra Choli Set",
    sku: "AVY-LNG-006",
    description: "Festive crimson ghagra-choli with mirror-work and a matching dupatta.",
    category_id: "13a7f00d-907d-4ad2-b5c5-aa140b9d15fa",
    collection_id: "76dc4dd2-d88e-46c2-8c8c-646c3e538589",
    audience: "girls",
    price: 2499,
    cost_price: 1200,
    images: [
      ProductImages.crimsonGhagraCholi
    ],
    variants: [
      {
        size: "1-2Y",
        color: "Crimson",
        stock: 3,
        sku: "AVY-LNG-006-1-2Y-CRM"
      },
      {
        size: "2-3Y",
        color: "Crimson",
        stock: 1,
        sku: "AVY-LNG-006-2-3Y-CRM"
      },
      {
        size: "3-4Y",
        color: "Crimson",
        stock: 4,
        sku: "AVY-LNG-006-3-4Y-CRM"
      },
      {
        size: "4-5Y",
        color: "Crimson",
        stock: 2,
        sku: "AVY-LNG-006-4-5Y-CRM"
      },
      {
        size: "5-6Y",
        color: "Crimson",
        stock: 0,
        sku: "AVY-LNG-006-5-6Y-CRM"
      },
      {
        size: "7-8Y",
        color: "Crimson",
        stock: 3,
        sku: "AVY-LNG-006-7-8Y-CRM"
      },
      {
        size: "9-10Y",
        color: "Crimson",
        stock: 2,
        sku: "AVY-LNG-006-9-10Y-CRM"
      },
      {
        size: "11-12Y",
        color: "Crimson",
        stock: 1,
        sku: "AVY-LNG-006-11-12Y-CRM"
      }
    ],
    status: "active",
    created_at: daysAgo(35),
    updated_at: daysAgo(35)
  },
  {
    id: "05ac19a4-e003-4086-b3d2-fc0fae098a76",
    name: "Turquoise Handblock Girls Frock",
    sku: "AVY-FRK-005",
    description: "Peach and turquoise handblock-printed cotton frock with a twirl skirt.",
    category_id: "454d0792-ba22-4821-a940-fbaeb2455355",
    collection_id: "76dc4dd2-d88e-46c2-8c8c-646c3e538589",
    audience: "girls",
    price: 1899,
    cost_price: 900,
    images: [
      ProductImages.girlsFloralFrock
    ],
    variants: [
      {
        size: "1-2Y",
        color: "Turquoise",
        stock: 6,
        sku: "AVY-FRK-005-1-2Y-TRQ"
      },
      {
        size: "2-3Y",
        color: "Turquoise",
        stock: 8,
        sku: "AVY-FRK-005-2-3Y-TRQ"
      },
      {
        size: "3-4Y",
        color: "Turquoise",
        stock: 10,
        sku: "AVY-FRK-005-3-4Y-TRQ"
      },
      {
        size: "4-5Y",
        color: "Turquoise",
        stock: 9,
        sku: "AVY-FRK-005-4-5Y-TRQ"
      },
      {
        size: "5-6Y",
        color: "Turquoise",
        stock: 7,
        sku: "AVY-FRK-005-5-6Y-TRQ"
      },
      {
        size: "7-8Y",
        color: "Turquoise",
        stock: 5,
        sku: "AVY-FRK-005-7-8Y-TRQ"
      },
      {
        size: "9-10Y",
        color: "Turquoise",
        stock: 4,
        sku: "AVY-FRK-005-9-10Y-TRQ"
      },
      {
        size: "11-12Y",
        color: "Turquoise",
        stock: 3,
        sku: "AVY-FRK-005-11-12Y-TRQ"
      }
    ],
    status: "active",
    created_at: daysAgo(36),
    updated_at: daysAgo(36)
  },
  {
    id: "4274a9c1-5c9f-4cb8-98ea-aacf0fb1af1b",
    name: "Ivory Chikankari Straight Kurti",
    sku: "AVY-KRT-004",
    description: "Lucknowi chikankari on breathable ivory cotton — an everyday classic.",
    category_id: "80c521b8-713d-4bc9-b4fb-5cd51525f1b7",
    collection_id: "b4e5e8f6-9407-4c48-af6b-9cf46d768458",
    audience: "ladies",
    price: 1799,
    cost_price: 850,
    images: [
      ProductImages.ivoryChikankariKurti
    ],
    variants: [
      {
        size: "XS",
        color: "Ivory Gold",
        stock: 8,
        sku: "AVY-KRT-004-XS-IVG"
      },
      {
        size: "S",
        color: "Ivory Gold",
        stock: 10,
        sku: "AVY-KRT-004-S-IVG"
      },
      {
        size: "M",
        color: "Ivory Gold",
        stock: 12,
        sku: "AVY-KRT-004-M-IVG"
      },
      {
        size: "L",
        color: "Ivory Gold",
        stock: 11,
        sku: "AVY-KRT-004-L-IVG"
      },
      {
        size: "XL",
        color: "Ivory Gold",
        stock: 9,
        sku: "AVY-KRT-004-XL-IVG"
      },
      {
        size: "XXL",
        color: "Ivory Gold",
        stock: 5,
        sku: "AVY-KRT-004-XXL-IVG"
      }
    ],
    status: "active",
    created_at: daysAgo(37),
    updated_at: daysAgo(37)
  },
  {
    id: "d1f1a32c-df38-4e58-adf4-4ef7c5fb65ca",
    name: "Marigold Embroidered Kurta Set",
    sku: "AVY-KRT-003",
    description: "Festive tiered kurta set in marigold with hand-embroidered bodice.",
    category_id: "80c521b8-713d-4bc9-b4fb-5cd51525f1b7",
    collection_id: "689568fe-0897-41f8-b76b-b59c6856dae0",
    audience: "ladies",
    price: 2899,
    cost_price: 1400,
    images: [
      ProductImages.marigoldKurtaSet
    ],
    variants: [
      {
        size: "XS",
        color: "Mustard",
        stock: 2,
        sku: "AVY-KRT-003-XS-MUS"
      },
      {
        size: "S",
        color: "Mustard",
        stock: 4,
        sku: "AVY-KRT-003-S-MUS"
      },
      {
        size: "M",
        color: "Mustard",
        stock: 3,
        sku: "AVY-KRT-003-M-MUS"
      },
      {
        size: "L",
        color: "Mustard",
        stock: 5,
        sku: "AVY-KRT-003-L-MUS"
      },
      {
        size: "XL",
        color: "Mustard",
        stock: 2,
        sku: "AVY-KRT-003-XL-MUS"
      },
      {
        size: "XXL",
        color: "Mustard",
        stock: 0,
        sku: "AVY-KRT-003-XXL-MUS"
      }
    ],
    status: "active",
    created_at: daysAgo(38),
    updated_at: daysAgo(38)
  },
  {
    id: "e1cef246-51f1-4000-8ef7-ab942863d2ee",
    name: "Royal Blue Paisley Anarkali Kurti",
    sku: "AVY-ANR-002",
    description: "Indigo paisley-printed anarkali kurti with gota detailing on the yoke.",
    category_id: "80c521b8-713d-4bc9-b4fb-5cd51525f1b7",
    collection_id: "2d4c93a8-5544-4c67-94cb-4aae63e99227",
    audience: "ladies",
    price: 3499,
    cost_price: 1750,
    images: [
      ProductImages.royalBlueAnarkali
    ],
    variants: [
      {
        size: "XS",
        color: "Royal Blue",
        stock: 10,
        sku: "AVY-ANR-002-XS-RBL"
      },
      {
        size: "S",
        color: "Royal Blue",
        stock: 12,
        sku: "AVY-ANR-002-S-RBL"
      },
      {
        size: "M",
        color: "Royal Blue",
        stock: 14,
        sku: "AVY-ANR-002-M-RBL"
      },
      {
        size: "L",
        color: "Royal Blue",
        stock: 13,
        sku: "AVY-ANR-002-L-RBL"
      },
      {
        size: "XL",
        color: "Royal Blue",
        stock: 11,
        sku: "AVY-ANR-002-XL-RBL"
      },
      {
        size: "XXL",
        color: "Royal Blue",
        stock: 7,
        sku: "AVY-ANR-002-XXL-RBL"
      }
    ],
    status: "active",
    created_at: daysAgo(39),
    updated_at: daysAgo(39)
  }
];

export const SEED_CUSTOMERS: CustomerProfile[] = [
  {
    id: "721ea771-53f7-4a46-9f17-ae01e1b280de",
    name: "Ritika Verma",
    email: "ritika.verma@yahoo.in",
    phone: "+91 98110 33445",
    city: "Jaipur",
    state: "Rajasthan",
    address: "8,Civil Lines, Near Ram Niwas Bagh, Jaipur 302006"
  },
  {
    id: "057df5b8-e656-4f8c-b4fd-a49ac182e281",
    name: "Sneha Malhotra",
    email: "sneha.m@gmail.com",
    phone: "+91 98730 99881",
    city: "New Delhi",
    state: "Delhi",
    address: "A-9, Green Park Extension, New Delhi 110016"
  },
  {
    id: "7e5fdcdb-081a-42da-9f8b-08b2f00838a1",
    name: "Priya Iyer",
    email: "priya.iyer@outlook.com",
    phone: "+91 99010 45678",
    city: "Bengaluru",
    state: "Karnataka",
    address: "17, 4th Cross, Jayanagar 3rd Block, Bengaluru 560011"
  },
  {
    id: "c0a2a207-bdee-4bc3-93c4-ff2210ec5c5c",
    name: "Ananya Sharma",
    email: "ananya.sharma@gmail.com",
    phone: "+91 98200 11223",
    city: "Mumbai",
    state: "Maharashtra",
    address: "402, Sea Breeze Apartments, Khar West, Mumbai 400052"
  },
  {
    id: "43936d68-0b9a-48b4-b528-e4e567c87a79",
    name: "Kavya Nair",
    email: "kavya.nair@gmail.com",
    phone: "+91 99400 55667",
    city: "Kochi",
    state: "Kerala",
    address: "5, Kaloor Road, Near Lissy Square, Kochi 682017"
  },
  {
    id: "f3c93102-b737-4aff-a362-081a7cb63746",
    name: "Divya Agarwal",
    email: "divya.ag@gmail.com",
    phone: "+91 91670 22119",
    city: "Indore",
    state: "Madhya Pradesh",
    address: "301, Silver Springs, Vijay Nagar, Indore 452010"
  }
];

export const SEED_ORDERS: Order[] = [
  {
    id: "6b54c3be-cfb0-4761-b473-813a4d78bf63",
    order_no: "ORD-8190",
    customer_id: "057df5b8-e656-4f8c-b4fd-a49ac182e281",
    customer_name: "Sneha Malhotra",
    customer_phone: "+91 98730 99881",
    customer_city: "New Delhi",
    items: [
      {
        product_id: "d1f1a32c-df38-4e58-adf4-4ef7c5fb65ca",
        product_name: "Marigold Embroidered Kurta Set",
        image: ProductImages.marigoldKurtaSet,
        size: "L",
        color: "Mustard",
        qty: 1,
        unit_price: 2899,
        audience: "ladies"
      },
      {
        product_id: "4274a9c1-5c9f-4cb8-98ea-aacf0fb1af1b",
        product_name: "Ivory Chikankari Straight Kurti",
        image: ProductImages.ivoryChikankariKurti,
        size: "XL",
        color: "Ivory Gold",
        qty: 1,
        unit_price: 1799,
        audience: "ladies"
      }
    ],
    subtotal: 4698.0,
    discount: 0.0,
    coupon_code: "",
    shipping_fee: 0.0,
    tax: 234.9,
    total: 4932.9,
    payment_method: "upi",
    status: "delivered",
    courier: "",
    awb: "",
    created_at: daysAgo(0),
    updated_at: daysAgo(0)
  },
  {
    id: "7a7adf77-abdf-4a69-96a0-db7a147eedd0",
    order_no: "ORD-8181",
    customer_id: "721ea771-53f7-4a46-9f17-ae01e1b280de",
    customer_name: "Ritika Verma",
    customer_phone: "+91 98110 33445",
    customer_city: "Jaipur",
    items: [
      {
        product_id: "23bcf78e-25e5-42ff-b732-96e579342ebf",
        product_name: "Emerald Silk Co-ord Set",
        image: ProductImages.banarasiSilkDrape,
        size: "S",
        color: "Emerald Green",
        qty: 1,
        unit_price: 3199,
        audience: "ladies"
      },
      {
        product_id: "9e809bbe-31c5-4f7b-89f9-f493d9fd1310",
        product_name: "Boys Festive Dhoti-Kurta Set",
        image: ProductImages.kidsFestiveEnsemble,
        size: "5-6Y",
        color: "Mustard",
        qty: 1,
        unit_price: 1499,
        audience: "boys"
      }
    ],
    subtotal: 4698.0,
    discount: 0.0,
    coupon_code: "",
    shipping_fee: 0.0,
    tax: 234.9,
    total: 4932.9,
    payment_method: "card",
    status: "confirmed",
    courier: "",
    awb: "",
    created_at: daysAgo(1),
    updated_at: daysAgo(0)
  },
  {
    id: "43896887-27fe-40af-9e6c-425f3899c9ce",
    order_no: "ORD-8175",
    customer_id: "7e5fdcdb-081a-42da-9f8b-08b2f00838a1",
    customer_name: "Priya Iyer",
    customer_phone: "+91 99010 45678",
    customer_city: "Bengaluru",
    items: [
      {
        product_id: "4274a9c1-5c9f-4cb8-98ea-aacf0fb1af1b",
        product_name: "Ivory Chikankari Straight Kurti",
        image: ProductImages.ivoryChikankariKurti,
        size: "XL",
        color: "Ivory Gold",
        qty: 1,
        unit_price: 1799,
        audience: "ladies"
      }
    ],
    subtotal: 1799.0,
    discount: 0.0,
    coupon_code: "",
    shipping_fee: 99.0,
    tax: 89.95,
    total: 1987.95,
    payment_method: "upi",
    status: "pending",
    courier: "",
    awb: "",
    created_at: daysAgo(2),
    updated_at: daysAgo(1)
  },
  {
    id: "cb3e927c-d350-4b20-a8ea-3694bade1660",
    order_no: "ORD-8168",
    customer_id: "c0a2a207-bdee-4bc3-93c4-ff2210ec5c5c",
    customer_name: "Ananya Sharma",
    customer_phone: "+91 98200 11223",
    customer_city: "Mumbai",
    items: [
      {
        product_id: "d5499642-d360-4a59-8ab1-8f1d32af19f0",
        product_name: "Boys Ivory Cotton Kurta Pyjama",
        image: ProductImages.kidsFestiveEnsemble,
        size: "7-8Y",
        color: "Ivory Gold",
        qty: 1,
        unit_price: 1599,
        audience: "boys"
      }
    ],
    subtotal: 1599.0,
    discount: 0.0,
    coupon_code: "",
    shipping_fee: 99.0,
    tax: 79.95,
    total: 1777.95,
    payment_method: "cod",
    status: "cancelled",
    courier: "",
    awb: "",
    created_at: daysAgo(4),
    updated_at: daysAgo(3)
  },
  {
    id: "5847b221-68e2-4043-b37f-4cd15d460e61",
    order_no: "ORD-8163",
    customer_id: "f3c93102-b737-4aff-a362-081a7cb63746",
    customer_name: "Divya Agarwal",
    customer_phone: "+91 91670 22119",
    customer_city: "Indore",
    items: [
      {
        product_id: "05ac19a4-e003-4086-b3d2-fc0fae098a76",
        product_name: "Turquoise Handblock Girls Frock",
        image: ProductImages.girlsFloralFrock,
        size: "6-7Y",
        color: "Turquoise",
        qty: 2,
        unit_price: 1899,
        audience: "girls"
      },
      {
        product_id: "dce16e8c-fc08-4df4-aace-f7f9561b4c9a",
        product_name: "Blush Floral Night Suit Set",
        image: ProductImages.banarasiSilkDrape,
        size: "M",
        color: "Blush",
        qty: 1,
        unit_price: 1299,
        audience: "ladies"
      }
    ],
    subtotal: 5097.0,
    discount: 764.55,
    coupon_code: "PRINCESS15",
    shipping_fee: 0.0,
    tax: 216.62,
    total: 4549.07,
    payment_method: "upi",
    status: "confirmed",
    courier: "Blue Dart",
    awb: "BD-44120",
    created_at: daysAgo(5),
    updated_at: daysAgo(0)
  },
  {
    id: "d6b2d449-1ba3-4ce6-ae9c-de9a45f52e4a",
    order_no: "ORD-8155",
    customer_id: "43936d68-0b9a-48b4-b528-e4e567c87a79",
    customer_name: "Kavya Nair",
    customer_phone: "+91 99400 55667",
    customer_city: "Kochi",
    items: [
      {
        product_id: "93a03e44-c73d-428c-bc0c-74669fe622c7",
        product_name: "Crimson Ghagra Choli Set",
        image: ProductImages.crimsonGhagraCholi,
        size: "5-6Y",
        color: "Crimson",
        qty: 1,
        unit_price: 2499,
        audience: "girls"
      },
      {
        product_id: "c7e850d9-1016-498e-80a8-42cb23e6a9b8",
        product_name: "Unisex Block-print Romper",
        image: ProductImages.kidsFestiveEnsemble,
        size: "3-4Y",
        color: "Emerald Green",
        qty: 2,
        unit_price: 999,
        audience: "kids-neutral"
      }
    ],
    subtotal: 4497.0,
    discount: 0.0,
    coupon_code: "",
    shipping_fee: 0.0,
    tax: 224.85,
    total: 4721.85,
    payment_method: "cod",
    status: "pending",
    courier: "",
    awb: "",
    created_at: daysAgo(8),
    updated_at: daysAgo(7)
  },
  {
    id: "aa420dde-e9d2-4b48-b743-1c9ef2da267e",
    order_no: "ORD-8144",
    customer_id: "057df5b8-e656-4f8c-b4fd-a49ac182e281",
    customer_name: "Sneha Malhotra",
    customer_phone: "+91 98730 99881",
    customer_city: "New Delhi",
    items: [
      {
        product_id: "d1f1a32c-df38-4e58-adf4-4ef7c5fb65ca",
        product_name: "Marigold Embroidered Kurta Set",
        image: ProductImages.marigoldKurtaSet,
        size: "M",
        color: "Mustard",
        qty: 1,
        unit_price: 2899,
        audience: "ladies"
      },
      {
        product_id: "dce16e8c-fc08-4df4-aace-f7f9561b4c9a",
        product_name: "Blush Floral Night Suit Set",
        image: ProductImages.banarasiSilkDrape,
        size: "L",
        color: "Blush",
        qty: 1,
        unit_price: 1299,
        audience: "ladies"
      }
    ],
    subtotal: 4198.0,
    discount: 0.0,
    coupon_code: "",
    shipping_fee: 0.0,
    tax: 209.9,
    total: 4407.9,
    payment_method: "netbanking",
    status: "confirmed",
    courier: "",
    awb: "",
    created_at: daysAgo(12),
    updated_at: daysAgo(11)
  },
  {
    id: "76bf14b4-dc33-41bc-8dc3-8985604fd8bd",
    order_no: "ORD-8131",
    customer_id: "721ea771-53f7-4a46-9f17-ae01e1b280de",
    customer_name: "Ritika Verma",
    customer_phone: "+91 98110 33445",
    customer_city: "Jaipur",
    items: [
      {
        product_id: "d434bf5d-07c6-4178-9ac2-b5295378f812",
        product_name: "Rani Pink Chanderi Silk Anarkali",
        image: ProductImages.ivoryChikankariKurti,
        size: "S",
        color: "Ivory Gold",
        qty: 1,
        unit_price: 4299,
        audience: "ladies"
      },
      {
        product_id: "23bcf78e-25e5-42ff-b732-96e579342ebf",
        product_name: "Emerald Silk Co-ord Set",
        image: ProductImages.banarasiSilkDrape,
        size: "M",
        color: "Emerald Green",
        qty: 1,
        unit_price: 3199,
        audience: "ladies"
      }
    ],
    subtotal: 7498.0,
    discount: 1499.6,
    coupon_code: "FESTIVE20",
    shipping_fee: 0.0,
    tax: 299.92,
    total: 6298.32,
    payment_method: "upi",
    status: "shipped",
    courier: "Delhivery",
    awb: "DLV-88213",
    created_at: daysAgo(15),
    updated_at: daysAgo(14)
  },
  {
    id: "c5b911f6-e3b4-4d15-adb2-7e90397cda86",
    order_no: "ORD-8117",
    customer_id: "7e5fdcdb-081a-42da-9f8b-08b2f00838a1",
    customer_name: "Priya Iyer",
    customer_phone: "+91 99010 45678",
    customer_city: "Bengaluru",
    items: [
      {
        product_id: "e1cef246-51f1-4000-8ef7-ab942863d2ee",
        product_name: "Royal Blue Paisley Anarkali Kurti",
        image: ProductImages.royalBlueAnarkali,
        size: "L",
        color: "Royal Blue",
        qty: 2,
        unit_price: 3499,
        audience: "ladies"
      }
    ],
    subtotal: 6998.0,
    discount: 0.0,
    coupon_code: "",
    shipping_fee: 0.0,
    tax: 349.9,
    total: 7347.9,
    payment_method: "card",
    status: "delivered",
    courier: "",
    awb: "",
    created_at: daysAgo(20),
    updated_at: daysAgo(19)
  },
  {
    id: "55067241-9dbc-4a69-9830-864c17f4188d",
    order_no: "ORD-8102",
    customer_id: "c0a2a207-bdee-4bc3-93c4-ff2210ec5c5c",
    customer_name: "Ananya Sharma",
    customer_phone: "+91 98200 11223",
    customer_city: "Mumbai",
    items: [
      {
        product_id: "d434bf5d-07c6-4178-9ac2-b5295378f812",
        product_name: "Rani Pink Chanderi Silk Anarkali",
        image: ProductImages.ivoryChikankariKurti,
        size: "M",
        color: "Rani Pink",
        qty: 1,
        unit_price: 4299,
        audience: "ladies"
      },
      {
        product_id: "05ac19a4-e003-4086-b3d2-fc0fae098a76",
        product_name: "Turquoise Handblock Girls Frock",
        image: ProductImages.girlsFloralFrock,
        size: "4-5Y",
        color: "Turquoise",
        qty: 1,
        unit_price: 1899,
        audience: "girls"
      }
    ],
    subtotal: 6198.0,
    discount: 0.0,
    coupon_code: "",
    shipping_fee: 0.0,
    tax: 309.9,
    total: 6507.9,
    payment_method: "upi",
    status: "delivered",
    courier: "",
    awb: "",
    created_at: daysAgo(26),
    updated_at: daysAgo(25)
  }
];

export const SEED_COUPONS: Coupon[] = [
  {
    id: "a9b7f9e9-4d1e-4060-a140-3a0e67e40adf",
    code: "PRINCESS15",
    discount_type: "percent",
    value: 15,
    min_order_value: 1999,
    expiry: dateFromToday(14),
    usage_limit: 50,
    times_used: 8,
    active: true,
    created_at: daysAgo(40)
  },
  {
    id: "1b6c89bc-693c-4fa8-97ca-7a5e2ec6c95f",
    code: "FIRSTBUY",
    discount_type: "flat",
    value: 250,
    min_order_value: 1499,
    expiry: dateFromToday(90),
    usage_limit: 0,
    times_used: 12,
    active: true,
    created_at: daysAgo(45)
  },
  {
    id: "22c93895-53e5-4d0a-9a19-5fdccd96e53d",
    code: "FESTIVE20",
    discount_type: "percent",
    value: 20,
    min_order_value: 2499,
    expiry: dateFromToday(45),
    usage_limit: 100,
    times_used: 34,
    active: true,
    created_at: daysAgo(50)
  },
  {
    id: "f9e53000-75cc-48c5-a77c-bccc949dd271",
    code: "SUMMER10",
    discount_type: "percent",
    value: 10,
    min_order_value: 999,
    expiry: dateFromToday(-10),
    usage_limit: 200,
    times_used: 41,
    active: false,
    created_at: daysAgo(120)
  }
];
