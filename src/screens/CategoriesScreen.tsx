"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import TaxonomyDialog from "@/components/categories/TaxonomyDialog";
import TaxonomyTable, { type TaxonomyRow } from "@/components/categories/TaxonomyTable";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBoutiqueStore } from "@/store/useBoutiqueStore";
import type { TaxonomyInput } from "@/types";

type Kind = "category" | "collection";

export default function CategoriesScreen() {
  const categories = useBoutiqueStore((s) => s.categories);
  const collections = useBoutiqueStore((s) => s.collections);
  const saveCategory = useBoutiqueStore((s) => s.saveCategory);
  const saveCollection = useBoutiqueStore((s) => s.saveCollection);
  const deleteCategory = useBoutiqueStore((s) => s.deleteCategory);
  const deleteCollection = useBoutiqueStore((s) => s.deleteCollection);

  const [tab, setTab] = useState<"categories" | "collections">("categories");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<TaxonomyRow | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TaxonomyRow | null>(null);

  const kind: Kind = tab === "categories" ? "category" : "collection";
  const rows: TaxonomyRow[] = kind === "category" ? categories : collections;

  const openDialog = (row: TaxonomyRow | null) => {
    setEditing(row);
    setDialogOpen(true);
  };

  function save(input: TaxonomyInput) {
    if (!input.name) {
      toast.error("Name is required");
      return;
    }
    const result = kind === "category" ? saveCategory(input, editing?.id) : saveCollection(input, editing?.id);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success(kind === "category" ? "Category saved" : "Collection saved");
    setDialogOpen(false);
  }

  return (
    <PageContainer>
      <PageHeader
        title="Categories & Collections"
        subtitle="How the boutique is organised on the storefront."
        action={
          <Button onClick={() => openDialog(null)}>
            <Plus className="h-4 w-4" />
            {kind === "category" ? "Add Category" : "Add Collection"}
          </Button>
        }
      />

      <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
        <TabsList>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
        </TabsList>
      </Tabs>

      <TaxonomyTable rows={rows} showAudience={kind === "category"} onEdit={openDialog} onDelete={setDeleteTarget} />

      <TaxonomyDialog
        open={dialogOpen}
        kind={kind}
        initial={
          editing
            ? { name: editing.name, description: editing.description, audience: editing.audience ?? "all", active: editing.active }
            : null
        }
        onClose={() => setDialogOpen(false)}
        onSave={save}
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        title={`Delete ${kind}?`}
        description={<>{deleteTarget?.name} will be removed. Products stay but lose this label.</>}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) (kind === "category" ? deleteCategory : deleteCollection)(deleteTarget.id);
          toast.success("Deleted");
          setDeleteTarget(null);
        }}
      />
    </PageContainer>
  );
}
