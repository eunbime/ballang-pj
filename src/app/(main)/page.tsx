import Header from '@/components/header';
import Products from '@/components/products';
import ProductList from '@/components/products/product-list';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';

axios.defaults.withCredentials = true;

const MainPage = () => {
  return (
    <div>
      <Header />
      <main className="flex flex-col grow w-full items-stretch px-5 lg-px-8 py-6 lg:py-10 mx-auto max-w-screen-lg ">
        <h2 className="font-bold text-3xl text-center my-12">Trending</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-8 gap-y-12">
          <li></li>
        </ul>
        <Products />
      </main>
    </div>
  );
};

export default MainPage;
