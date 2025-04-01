"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProductCard({ productId }: { productId: string }) {
  type Variant = {
    id: string;
    size: string;
    stock_quantity: number;
  };
  
  type Product = {
    id: string;
    name: string;
    brand?: string;
    invoice_name?: string;
    purchase_date?: string;
  };
  
  const [product, setProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<Variant[]>([]);

  console.log("🔍 Product ID:", productId); // debug #1

  useEffect(() => {
    async function fetchData() {
      console.log("📡 Fetching product by ID:", productId); // debug #2

      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      const { data: variantData, error: variantError } = await supabase
        .from("variants")
        .select("*")
        .eq("product_id", productId);

      if (productError) console.error("❌ Product fetch error:", productError);
      if (variantError) console.error("❌ Variant fetch error:", variantError);

      setProduct(productData);
      setVariants(variantData || []);
    }

    if (productId) fetchData();
  }, [productId]);

  if (!product) return <p>⏳ Ładowanie produktu...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 border rounded-xl shadow bg-white">
      <h2 className="text-xl font-bold mb-4">{product.name}</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block font-medium text-sm">Marka</label>
          <input className="border p-2 rounded w-full" value={product.brand || ""} disabled />
        </div>
        <div>
          <label className="block font-medium text-sm">Nazwa faktury</label>
          <input className="border p-2 rounded w-full" value={product.invoice_name || ""} disabled />
        </div>
        <div>
          <label className="block font-medium text-sm">Data zakupu</label>
          <input className="border p-2 rounded w-full" value={product.purchase_date || ""} disabled />
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2">Warianty:</h3>
      {variants.map((variant) => (
        <div key={variant.id} className="grid grid-cols-2 gap-4 mb-2">
          <div>
            <label className="text-sm font-medium">Rozmiar</label>
            <input className="border p-2 rounded w-full" value={variant.size} disabled />
          </div>
          <div>
            <label className="text-sm font-medium">Ilość sztuk</label>
            <input className="border p-2 rounded w-full" value={variant.stock_quantity} disabled />
          </div>
        </div>
      ))}

      {/* Debug – usuń później */}
      <pre className="mt-6 bg-gray-100 p-2 text-xs">
        {JSON.stringify(product, null, 2)}
      </pre>
    </div>
  );
}