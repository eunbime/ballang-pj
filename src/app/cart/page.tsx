'use client';
import { getCart } from '@/api/cart';
import CartList from '@/components/cart/cart-list';
import EmptyCart from '@/components/cart/empty-cart';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const CartPage = () => {
  const { data: cartProducts } = useQuery({
    queryKey: ['cartProducts'],
    queryFn: getCart,
  });

  console.log(cartProducts);
  return (
    <main className="px-5 lg:px-8 py-6 lg:py-10 mx-auto max-w-screen-lg flex flex-col grow w-full items-stretch">
      <h2 className="font-bold text-3xl text-center my-12">장바구니</h2>
      {!cartProducts ? <EmptyCart /> : <CartList />}
    </main>
  );
};

export default CartPage;
