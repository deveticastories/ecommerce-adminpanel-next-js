// Locally hosted photography (public/images). Product shots are 1200px wide and the login hero
// 1800px so they stay crisp on retina screens; next/image serves resized variants.

export const ProductImages = {
  girlsFloralFrock: "/images/products/girls-floral-frock.jpg",
  banarasiSilkDrape: "/images/products/banarasi-silk-drape.jpg",
  kidsFestiveEnsemble: "/images/products/kids-festive-ensemble.jpg",
  crimsonGhagraCholi: "/images/products/crimson-ghagra-choli.jpg",
  ivoryChikankariKurti: "/images/products/ivory-chikankari-kurti.jpg",
  marigoldKurtaSet: "/images/products/marigold-kurta-set.jpg",
  royalBlueAnarkali: "/images/products/royal-blue-anarkali.jpg",
} as const;

export const Images = {
  loginHero: "/images/login-hero.jpg",
  /** Gallery offered in the product form's image picker. */
  productPresets: [
    ProductImages.ivoryChikankariKurti,
    ProductImages.royalBlueAnarkali,
    ProductImages.marigoldKurtaSet,
    ProductImages.girlsFloralFrock,
    ProductImages.crimsonGhagraCholi,
    ProductImages.kidsFestiveEnsemble,
    ProductImages.banarasiSilkDrape,
  ],
} as const;
