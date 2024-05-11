'use client';
import { getProduct } from '@/api/products';
import { Product } from '@/types/projects';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

const ProductDetailPage = () => {
  const { productId } = useParams();

  const { data: product } = useQuery<unknown, Error, Product>({
    queryKey: ['product'],
    queryFn: () => getProduct(String(productId)),
  });

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
          <button className="border border-slate-700 py-4 px-12 text-[15px] font-semibold bg-white transition hover:-translate-y-1 active:translate-y-0 hover:drop-shadow w-full data-[color=black]:bg-black data-[color=black]:text-white">
            장바구니에 담기
          </button>
        </div>
      </section>
    </main>
  );
};

export default ProductDetailPage;