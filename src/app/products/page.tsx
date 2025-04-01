"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  "https://rybjxjexydgviguafwwp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5Ymp4amV4eWRndmlndWFmd3dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MTM1MDMsImV4cCI6MjA1OTA4OTUwM30.ScwCcZ8l9TYfaPsxBe7T71E6PJTr5v-D0mK8IxT7fb8"
);

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
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
          <li key={product.id} className="border rounded p-3 hover:bg-gray-100">
            <Link href={`/product/${product.id}`}>
              <div className="font-semibold">{product.name}</div>
              <div className="text-sm text-gray-600">{product.brand || "Brak marki"}</div>
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="text-sm text-gray-500">Brak wyników dla podanej frazy.</p>
      )}
    </div>
  );
}
