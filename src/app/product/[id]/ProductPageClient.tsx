"use client";

import ProductCard from "@/components/ProductCard";

export default function ProductPageClient({ productId }: { productId: string }) {
  return (
    <main className="p-4">
      <ProductCard productId={productId} />
    </main>
  );
}