'use client';
import { getProducts } from '@/api/products';
import { Products } from '@/types/projects';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import ProductItem from '../product-item';

const ProductList = () => {
  const { data: products } = useQuery<unknown, Error, Products>({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-8 gap-y-12">
      {products?.map((item) => <ProductItem key={item.id} product={item} />)}
    </ul>
  );
};

export default ProductList;
