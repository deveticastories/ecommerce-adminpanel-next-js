"use client";

import { useState } from "react";
import { toast } from "sonner";
import ChoicePill from "@/components/common/ChoicePill";
import SectionLabel from "@/components/common/SectionLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import type { Audience, Category, Collection, Product, ProductInput, ProductStatus, Variant } from "@/types";
import { Colorways } from "@/utils/Colors";
import { AUDIENCES, AUDIENCE_LABELS, KID_SIZES, LADY_SIZES } from "@/utils/Constants";
import { Typography } from "@/utils/Fonts";
import { Layout } from "@/utils/Sizes";
import ImagePicker from "./ImagePicker";
import VariantMatrix, { stockKey } from "./VariantMatrix";

const sizesFor = (audience: Audience) => (audience === "ladies" ? LADY_SIZES : KID_SIZES);
const colorCode = (name: string) => Colorways.find((c) => c.name === name)?.code ?? name.slice(0, 3).toUpperCase();

/** Side sheet for adding or editing a product, including its variant stock matrix. */
export default function ProductFormSheet({
  open,
  onOpenChange,
  product,
  categories,
  collections,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  categories: Category[];
  collections: Collection[];
  /** Returns an error message, or null when saved. */
  onSubmit: (input: ProductInput) => string | null;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle className={Typography.sheetTitle}>{product ? "Edit product" : "Add product"}</SheetTitle>
        </SheetHeader>
        {/* Remount per product so the form starts from that product's values. */}
        <ProductForm
          key={product?.id ?? "new"}
          product={product}
          categories={categories}
          collections={collections}
          onCancel={() => onOpenChange(false)}
          onSubmit={onSubmit}
        />
      </SheetContent>
    </Sheet>
  );
}

function ProductForm({
  product,
  categories,
  collections,
  onCancel,
  onSubmit,
}: {
  product: Product | null;
  categories: Category[];
  collections: Collection[];
  onCancel: () => void;
  onSubmit: (input: ProductInput) => string | null;
}) {
  const [name, setName] = useState(product?.name ?? "");
  const [sku, setSku] = useState(product?.sku ?? "");
  const [status, setStatus] = useState<ProductStatus>(product?.status ?? "active");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [cost, setCost] = useState(product ? String(product.cost_price) : "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [categoryId, setCategoryId] = useState(product?.category_id ?? "");
  const [collectionId, setCollectionId] = useState(product?.collection_id ?? "");
  const [audience, setAudience] = useState<Audience>(product?.audience ?? "ladies");
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [activeSizes, setActiveSizes] = useState<Set<string>>(
    () => new Set(product ? product.variants.map((v) => v.size) : ["S", "M", "L"]),
  );
  const [activeColors, setActiveColors] = useState<string[]>(() =>
    product ? [...new Set(product.variants.map((v) => v.color))] : [Colorways[0].name],
  );
  const [stocks, setStocks] = useState<Record<string, number>>(() =>
    Object.fromEntries((product?.variants ?? []).map((v) => [stockKey(v.size, v.color), v.stock])),
  );

  const sizes = sizesFor(audience);

  const toggleSize = (s: string) =>
    setActiveSizes((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
  const toggleColor = (c: string) =>
    setActiveColors((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  function submit() {
    if (!name.trim() || !sku.trim() || !price) {
      toast.error("Name, SKU and price are required");
      return;
    }
    const variants: Variant[] = sizes
      .filter((s) => activeSizes.has(s))
      .flatMap((size) =>
        activeColors.map((color) => ({
          size,
          color,
          stock: stocks[stockKey(size, color)] ?? 0,
          sku: `${sku.trim()}-${size}-${colorCode(color)}`,
        })),
      );
    if (variants.length === 0) {
      toast.error("Pick at least one size and colour");
      return;
    }
    const failure = onSubmit({
      name: name.trim(),
      sku: sku.trim(),
      description,
      category_id: categoryId,
      collection_id: collectionId,
      audience,
      price: Number(price) || 0,
      cost_price: Number(cost) || 0,
      images,
      status,
      variants,
    });
    if (failure) toast.error(failure);
  }

  return (
    <div className={Layout.sheetBody}>
      <section className="space-y-3">
        <SectionLabel>Basics</SectionLabel>
        <div className="space-y-1.5">
          <Label htmlFor="product-name">Name</Label>
          <Input id="product-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Rani Pink Chanderi Anarkali" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="product-sku">SKU prefix</Label>
            <Input id="product-sku" value={sku} onChange={(e) => setSku(e.target.value.toUpperCase())} placeholder="AVY-ANR-001" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="product-status">Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as ProductStatus)}>
              <SelectTrigger id="product-status">
                <SelectValue>{(v) => (v === "draft" ? "Draft" : "Active")}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="product-price">Price (₹)</Label>
            <Input id="product-price" type="number" min={0} value={price} onChange={(e) => setPrice(e.target.value)} placeholder="4299" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="product-cost">Cost price (₹)</Label>
            <Input id="product-cost" type="number" min={0} value={cost} onChange={(e) => setCost(e.target.value)} placeholder="2100" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="product-description">Description</Label>
          <Textarea
            id="product-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Fabric, embroidery, fit notes…"
            rows={2}
          />
        </div>
      </section>

      <section className="space-y-3">
        <SectionLabel>Organise</SectionLabel>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Category</Label>
            <Select value={categoryId || "none"} onValueChange={(v) => setCategoryId(v === "none" ? "" : String(v))}>
              <SelectTrigger>
                <SelectValue>{(v) => categories.find((c) => c.id === v)?.name ?? "No category"}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No category</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Collection</Label>
            <Select value={collectionId || "none"} onValueChange={(v) => setCollectionId(v === "none" ? "" : String(v))}>
              <SelectTrigger>
                <SelectValue>{(v) => collections.find((c) => c.id === v)?.name ?? "No collection"}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No collection</SelectItem>
                {collections.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Audience</Label>
          <div className="flex flex-wrap gap-2">
            {AUDIENCES.map((a) => (
              <ChoicePill key={a} selected={audience === a} onClick={() => setAudience(a)}>
                {AUDIENCE_LABELS[a]}
              </ChoicePill>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <SectionLabel>Images</SectionLabel>
        <ImagePicker value={images} onChange={setImages} />
      </section>

      <section className="space-y-3">
        <SectionLabel>Variant matrix — sizes × colours</SectionLabel>
        <VariantMatrix
          sizes={sizes}
          activeSizes={activeSizes}
          activeColors={activeColors}
          stocks={stocks}
          onToggleSize={toggleSize}
          onToggleColor={toggleColor}
          onStockChange={(key, stock) => setStocks((prev) => ({ ...prev, [key]: stock }))}
        />
      </section>

      <div className="flex justify-end gap-2 border-t border-border pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={submit}>{product ? "Save changes" : "Add product"}</Button>
      </div>
    </div>
  );
}
