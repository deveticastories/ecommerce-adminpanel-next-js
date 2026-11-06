"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import { Images } from "@/utils/Images";

/** Pick from the boutique's photo library or add a custom image URL. */
export default function ImagePicker({ value, onChange }: { value: string[]; onChange: (images: string[]) => void }) {
  const [custom, setCustom] = useState("");
  const extras = value.filter((url) => !(Images.productPresets as readonly string[]).includes(url));
  const gallery = [...Images.productPresets, ...extras];

  const toggle = (url: string) => onChange(value.includes(url) ? value.filter((im) => im !== url) : [...value, url]);

  return (
    <>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
        {gallery.map((url) => {
          const selected = value.includes(url);
          return (
            <motion.button
              key={url}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => toggle(url)}
              aria-pressed={selected}
              className={cn(
                "relative h-16 overflow-hidden rounded-lg border-2 transition-colors",
                selected ? "border-primary" : "border-transparent hover:border-border",
              )}
            >
              <Image src={url} alt="" fill sizes="96px" unoptimized={!url.startsWith("/")} className="object-cover" />
              <AnimatePresence>
                {selected && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-primary text-white"
                  >
                    <Check className="h-3 w-3" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
      <div className="flex gap-2">
        <Input placeholder="Paste a custom image URL" value={custom} onChange={(e) => setCustom(e.target.value)} />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const url = custom.trim();
            if (url && !value.includes(url)) onChange([...value, url]);
            setCustom("");
          }}
        >
          Add
        </Button>
      </div>
    </>
  );
}
