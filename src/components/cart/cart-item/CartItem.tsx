'use client';
import { addItemToCart, removeItemFromCart } from '@/api/cart';
import { Cart } from '@/types/cart';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CartItemProps {
  product: Cart;
}

const CartItem = ({ product }: CartItemProps) => {
  const queryClient = useQueryClient();

  const { mutate: addItemToCartMutate } = useMutation({
    mutationFn: addItemToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartProducts'] });
    },
  });

  const { mutate: removeItemFromCartMutate } = useMutation({
    mutationFn: removeItemFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartProducts'] });
    },
  });

  const handleOnClickPlusCart = () => {
    addItemToCartMutate(String(product?.productId), {
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const handleOnClickMinusCart = () => {
    removeItemFromCartMutate(String(product?.productId), {
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <li>
      <Link
        href={`/products/${[product.productId]}`}
        className="flex h-40 sm:h-56 border-t py-5 gap-x-5"
      >
        <div className="relative aspect-[3/4]">
          <Image
            src={product.product.imgSrc}
            alt=""
            fill
            objectFit="cover"
            className="absolute"
          />
        </div>
        <div className="flex flex-col gap-y-1 sm:gap-y-2.5 grow">
          <p className="text-sm sm:text-base font-bold">
            {product.product.brand.nameKr} / {product.product.brand.nameEn}
          </p>
          <h6 className="text-sm sm:text-lg">{product.product.name}</h6>

          <div className="flex gap-x-2.5 items-center text-sm sm:text-base ">
            <span className="line-through text-red-500">
              ₩{product.product.originalPrice.toLocaleString()}
            </span>
            <span className="font-bold">
              ₩{product.product.price.toLocaleString()}
            </span>
          </div>
          <div className="flex text-xs sm:text-sm">
            <p>
              {product.product.deliveryType} | 잔여재고{' '}
              {product.product.onlineStock}ea
            </p>
          </div>
        </div>
        {/* button */}
        <div
          onClick={(e) => e.preventDefault()}
          className="grid grid-cols-3 border border-black self-center h-4 w-12 sm:h-8 sm:w-24 items-stretch shrink-0"
        >
          <button
            onClick={handleOnClickMinusCart}
            className="bg-black text-white flex items-center justify-center text-lg font-bold"
          >
            -
          </button>
          <span className="flex items-center justify-center text-[15px] font-bold">
            {product.quantity}
          </span>
          <button
            onClick={handleOnClickPlusCart}
            className="bg-black text-white flex items-center justify-center text-lg font-bold"
          >
            +
          </button>
        </div>
      </Link>
    </li>
  );
};

export default CartItem;
