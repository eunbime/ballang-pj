import { getProduct } from '@/api/products';
import ProductDetail from '@/components/products/product-detail/ProductDetail';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface ProductDetailPageProps {
  params: { productId: string };
}

export const revalidate = 0;

export default async function PostsPage({ params }: ProductDetailPageProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['product'],
    queryFn: () => getProduct(params.productId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetail params={params} />
    </HydrationBoundary>
  );
}
