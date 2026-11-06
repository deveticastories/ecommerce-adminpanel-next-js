"use client";

import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { useBoutiqueStore } from "@/store/useBoutiqueStore";
import type { Product } from "@/types";

/** Products joined with their category/collection names and total stock. */
export function useProducts(): Product[] {
  const { products, categories, collections } = useBoutiqueStore(
    useShallow((s) => ({ products: s.products, categories: s.categories, collections: s.collections })),
  );
  return useMemo(() => {
    const catName = new Map(categories.map((c) => [c.id, c.name]));
    const colName = new Map(collections.map((c) => [c.id, c.name]));
    return products.map((p) => ({
      ...p,
      category_name: catName.get(p.category_id) ?? "",
      collection_name: colName.get(p.collection_id) ?? "",
      total_stock: p.variants.reduce((acc, v) => acc + v.stock, 0),
    }));
  }, [products, categories, collections]);
}
