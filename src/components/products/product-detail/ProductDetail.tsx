'use client';
import { getToken } from '@/api/auth';
import { getProduct } from '@/api/products';
import { Product } from '@/types/projects';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ProductDetailProps {
  params: { productId: string };
}

const ProductDetail = ({ params }: ProductDetailProps) => {
  const { data: product } = useQuery<unknown, Error, Product>({
    queryKey: ['product'],
    queryFn: () => getProduct(params.productId),
  });

  const { data: accessToken } = useQuery({
    queryKey: ['accessToken'],
    queryFn: getToken,
  });

  const isCart = true;

  const handleOnclickCartButton = () => {
    // 장바구니 담기
    // 장바구니 빼기
  };

  return (
    <main className="px-5 lg:px-8 py-6 lg:py-10 mx-auto max-w-screen-lg flex flex-col grow w-full items-stretch">
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
        <div className="relative aspect-[3/4]">
          <Image
            src={product?.imgSrc!}
            alt={product?.name!}
            fill
            objectFit="cover"
            className="absolute"
          />
        </div>
        <div className="py-8 flex flex-col">
          <Link
            href={'/brands'}
            className="text-[15px] border-b pb-2.5 mb-2.5  font-bold"
          >
            <h2>
              {product?.brand.nameKr} / {product?.brand.nameEn}
            </h2>
          </Link>
          <h1 className="text-lg">{product?.name}</h1>
          <div className="grid grid-cols-5 my-12 gap-y-5 text-[15px]">
            <span className="text-slate-900 font-bold">정가</span>
            <span className="col-span-4 line-through text-red-500">
              ₩{Number(product?.originalPrice).toLocaleString()}
            </span>
            <span className="text-slate-900 font-bold">판매가</span>
            <span className="col-span-4 font-semibold">
              ₩{Number(product?.price).toLocaleString()}
            </span>
            <span className="text-slate-900 font-bold">배송</span>
            <span className="col-span-4">{product?.deliveryType}</span>
            <span className="text-slate-900 font-bold">잔여 재고</span>
            <span className="col-span-4">{product?.onlineStock}</span>
          </div>
          <button className="border border-slate-700 py-4 px-12 text-[15px] font-semibold bg-black transition hover:-translate-y-1 active:translate-y-0 hover:drop-shadow w-full  text-white">
            {!accessToken.success
              ? '장바구니에 담기'
              : isCart
                ? '장바구니에서 빼기'
                : '장바구니에 담기'}
          </button>
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
