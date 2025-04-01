import ProductPageClient from "./ProductPageClient";

export default async function ProductPage({ params }: { params: { id: string } }) {
  return <ProductPageClient productId={params.id} />;
}