import dynamic from "next/dynamic";

// klientowy komponent – dynamiczny import (bez SSR)
const ProductCard = dynamic(() => import("@/components/ProductCard"), { ssr: false });

export default async function ProductPage({ params }: { params: { id: string } }) {
  return (
    <main className="p-4">
      <ProductCard productId={params.id} />
    </main>
  );
}