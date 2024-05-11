'use client';
import { getBrands } from '@/api/brands';
import { Brands } from '@/types/brands';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';

const BrandList = () => {
  const { data: brands } = useQuery<unknown, Error, Brands>({
    queryKey: ['brands'],
    queryFn: getBrands,
  });

  return (
    <nav className="mx-auto max-w-screen-lg mb-16">
      <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-y-5 justify-items-center gap-x-4 text-sm">
        <li className="col-span-3 sm:col-span-4 md:col-span-6 mb-6">
          <Link
            href={'/brands'}
            className="text-slate-700 active:text-black active:font-semibold hover:text-black transition-all"
          >
            ALL
          </Link>
        </li>
        {brands?.map((item) => (
          <li key={item.id}>
            <Link
              href={{ pathname: '/brands', query: { brandId: item.id } }}
              className="text-slate-700 active:text-black active:font-semibold hover:text-black transition-all"
            >
              {item.nameKr}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BrandList;
