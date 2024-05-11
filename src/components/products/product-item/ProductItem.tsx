import { Product } from '@/types/projects';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ProductProps {
  product: Product;
}

const ProductItem = ({ product }: ProductProps) => {
  return (
    <li>
      <Link href={`/products/${product.id}`}>
        <div className="aspect-[3/4] relative mb-4">
          <Image
            src={product.imgSrc}
            alt={product.name}
            fill
            objectFit="cover"
            className="absolute"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="text-sm font-bold">{product.brand.nameEn}</span>
          <h6 className="text-[15px]">{product.name}</h6>
          <div className="flex flex-col text-sm sm:flex-row items-baseline gap-1.5">
            <span className="text-red-500 line-through font-semibold">
              ₩{product.originalPrice}
            </span>
            <span className="font-bold">₩{product.price}</span>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ProductItem;
