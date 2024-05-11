import BrandList from '@/components/brands/brand-list/BrandList';
import Products from '@/components/products';
import ProductList from '@/components/products/product-list';
import React from 'react';

const BrandsPage = () => {
  return (
    <main className="px-5 lg:px-8 py-6 lg:py-10 mx-auto max-w-screen-lg flex flex-col grow w-full items-stretch">
      <h2 className="font-bold text-3xl text-center my-12">Brands</h2>
      <BrandList />
      <Products />
    </main>
  );
};

export default BrandsPage;
