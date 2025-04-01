"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

// Typ produktu
type Product = {
  id: string;
  name: string;
  brand?: string;
};

const supabase = createClient<{
  products: Product;
}>(
  "https://rybjxjexydgviguafwwp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
);

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from("products").select("*");
      setProducts(data || []);
    }

    fetchProducts();
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista produktów</h1>

      <input
        type="text"
        placeholder="Szukaj po nazwie..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border px-3 py-2 rounded w-full mb-4"
      />

      <ul className="space-y-2">
        {filtered.map((product) => (
          <li
            key={product.id}
            className="border rounded p-3 hover:bg-gray-100 transition"
          >
            <Link href={`/product/${product.id}`}>
              <div className="font-semibold">{product.name}</div>
              <div className="text-sm text-gray-600">
                {product.brand || "Brak marki"}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="text-sm text-gray-500">
          Brak wyników dla podanej frazy.
        </p>
      )}
    </div>
  );
}