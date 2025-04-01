import ProductPageClient from "./ProductPageClient";

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  return <ProductPageClient productId={id} />;
}