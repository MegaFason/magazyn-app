"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://rybjxjexydgviguafwwp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5Ymp4amV4eWRndmlndWFmd3dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MTM1MDMsImV4cCI6MjA1OTA4OTUwM30.ScwCcZ8l9TYfaPsxBe7T71E6PJTr5v-D0mK8IxT7fb8"
);

export default function ProductCard({ productId }) {
  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data: productData } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      const { data: variantData } = await supabase
        .from("variants")
        .select("*")
        .eq("product_id", productId);

      setProduct(productData);
      setVariants(variantData);
    }

    if (productId) fetchData();
  }, [productId]);

  if (!product) return <p>Ładowanie produktu...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 border rounded-2xl shadow bg-white">
      <div className="space-y-4">
        <h2 className="text-xl font-bold">{product.name}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-sm">Marka</label>
            <input
              className="border p-2 rounded w-full"
              value={product.brand || ""}
              disabled
            />
          </div>
          <div>
            <label className="font-semibold text-sm">Nazwa faktury</label>
            <input
              className="border p-2 rounded w-full"
              value={product.invoice_name || ""}
              disabled
            />
          </div>
          <div>
            <label className="font-semibold text-sm">Data zakupu</label>
            <input
              className="border p-2 rounded w-full"
              value={product.purchase_date || ""}
              disabled
            />
          </div>
        </div>

        <h3 className="text-lg font-semibold pt-4">Warianty:</h3>
        {variants.map((variant) => (
          <div key={variant.id} className="grid grid-cols-2 gap-4 border-t pt-2">
            <div>
              <label className="font-semibold text-sm">Rozmiar</label>
              <input
                className="border p-2 rounded w-full"
                value={variant.size}
                disabled
              />
            </div>
            <div>
              <label className="font-semibold text-sm">Ilość sztuk</label>
              <input
                className="border p-2 rounded w-full"
                value={variant.stock_quantity}
                disabled
              />
            </div>
          </div>
        ))}

        <button
          className="mt-4 px-4 py-2 bg-gray-300 rounded"
          disabled
        >
          Edytuj (wkrótce)
        </button>
      </div>
    </div>
  );
}
