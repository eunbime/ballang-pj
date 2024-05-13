'use client';
import React from 'react';
import CartItem from '../cart-item';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '@/api/cart';
import { Cart } from '@/types/cart';

const CartList = () => {
  const { data: cartProducts } = useQuery<unknown, Error, Cart[]>({
    queryKey: ['cartProducts'],
    queryFn: getCart,
  });

  return (
    <section>
      <ul className="border-b">
        {cartProducts?.map((item: Cart) => (
          <CartItem key={item.id} product={item} />
        ))}
      </ul>
    </section>
  );
};

export default CartList;
