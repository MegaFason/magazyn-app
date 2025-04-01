import dynamic from "next/dynamic";

// klientowy komponent – dynamiczny import (bez SSR)
const ProductCard = dynamic(() => import("@/components/ProductCard"), { ssr: false });

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return (
    <main className="p-4">
      <ProductCard productId={params.id} />
    </main>
  );
}