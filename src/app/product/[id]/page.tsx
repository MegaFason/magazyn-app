import ProductCard from "../../../components/ProductCard";

type Props = {
  params: {
    id: string;
  };
};

export default function ProductPage({ params }: Props) {
  return (
    <main className="p-4">
      <ProductCard productId={params.id} />
    </main>
  );
}