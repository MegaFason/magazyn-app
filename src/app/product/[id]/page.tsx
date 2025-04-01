import ProductPageClient from "./ProductPageClient";

export default function ProductPage({ params }: { params: { id: string } }) {
  return <ProductPageClient productId={params.id} />;
}