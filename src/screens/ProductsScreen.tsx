"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import ProductFilters, { type ProductFilterState, type ProductView } from "@/components/products/ProductFilters";
import ProductFormSheet from "@/components/products/ProductFormSheet";
import ProductGrid from "@/components/products/ProductGrid";
import ProductTable from "@/components/products/ProductTable";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProducts } from "@/hooks/useProducts";
import { useBoutiqueStore } from "@/store/useBoutiqueStore";
import type { Product } from "@/types";
import { fadeIn } from "@/utils/Animations";
import { AUDIENCES, AUDIENCE_LABELS } from "@/utils/Constants";

const NO_FILTERS: ProductFilterState = { search: "", category: "all", collection: "all", status: "all" };

export default function ProductsScreen() {
  const products = useProducts();
  const categories = useBoutiqueStore((s) => s.categories);
  const collections = useBoutiqueStore((s) => s.collections);
  const threshold = useBoutiqueStore((s) => s.settings.low_stock_threshold);
  const saveProduct = useBoutiqueStore((s) => s.saveProduct);
  const deleteProduct = useBoutiqueStore((s) => s.deleteProduct);
  const consumeNewProductRequest = useBoutiqueStore((s) => s.consumeNewProductRequest);
  const pendingNewProduct = useBoutiqueStore((s) => s.pendingNewProduct);

  const [audience, setAudience] = useState("all");
  const [filters, setFilters] = useState<ProductFilterState>(NO_FILTERS);
  const [view, setView] = useState<ProductView>("table");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const openEditor = (product: Product | null) => {
    setEditing(product);
    setSheetOpen(true);
  };

  // The header's "Add Product" button leaves a one-shot request in the store.
  useEffect(() => {
    if (pendingNewProduct && consumeNewProductRequest()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reacting to an external one-shot request
      openEditor(null);
    }
  }, [pendingNewProduct, consumeNewProductRequest]);

  const filtered = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return products.filter(
      (p) =>
        (audience === "all" || p.audience === audience) &&
        (filters.category === "all" || p.category_id === filters.category) &&
        (filters.collection === "all" || p.collection_id === filters.collection) &&
        (filters.status === "all" || p.status === filters.status) &&
        (!q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)),
    );
  }, [products, audience, filters]);

  return (
    <PageContainer>
      <PageHeader
        title="Products"
        subtitle={<>{products.length} styles in the boutique — kurtis, frocks, lehengas &amp; more.</>}
        action={
          <Button onClick={() => openEditor(null)}>
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        }
      />

      <Tabs value={audience} onValueChange={(v) => setAudience(String(v))}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          {AUDIENCES.map((a) => (
            <TabsTrigger key={a} value={a}>
              {AUDIENCE_LABELS[a]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <ProductFilters
        value={filters}
        onChange={setFilters}
        categories={categories}
        collections={collections}
        view={view}
        onViewChange={setView}
      />

      <AnimatePresence mode="wait">
        <motion.div key={`${view}-${audience}`} variants={fadeIn} initial="hidden" animate="show" exit="hidden">
          {view === "table" ? (
            <ProductTable products={filtered} threshold={threshold} onEdit={openEditor} onDelete={setDeleteTarget} />
          ) : (
            <ProductGrid products={filtered} threshold={threshold} onEdit={openEditor} onDelete={setDeleteTarget} />
          )}
        </motion.div>
      </AnimatePresence>

      <ProductFormSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        product={editing}
        categories={categories}
        collections={collections}
        onSubmit={(input) => {
          const result = saveProduct(input, editing?.id);
          if (!result.ok) return result.error;
          toast.success(editing ? "Product updated" : "Product added to the boutique");
          setSheetOpen(false);
          return null;
        }}
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete product?"
        description={<>{deleteTarget?.name} will be removed from the boutique. Past orders keep their history.</>}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) deleteProduct(deleteTarget.id);
          toast.success("Product deleted");
          setDeleteTarget(null);
        }}
      />
    </PageContainer>
  );
}
