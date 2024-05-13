import Header from '@/components/header';
import Products from '@/components/products';
import ProductList from '@/components/products/product-list';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';

const MainPage = () => {
  return (
    <div>
      <main className="flex flex-col grow w-full items-stretch px-5 lg-px-8 py-6 lg:py-10 mx-auto max-w-screen-lg ">
        <h2 className="font-bold text-3xl text-center my-12">Trending</h2>
        <Products />
      </main>
    </div>
  );
};

export default MainPage;
