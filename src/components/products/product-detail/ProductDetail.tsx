'use client';
import { getToken } from '@/api/auth';
import { addItemToCart, clearItemInCart, getCart } from '@/api/cart';
import { getProduct } from '@/api/products';
import LoginModal from '@/components/modal/login-modal';
import { useModal } from '@/contexts/modal-context/ModalContext';
import { Cart } from '@/types/cart';
import { Product } from '@/types/projects';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ProductDetailProps {
  params: { productId: string };
}

const ProductDetail = ({ params }: ProductDetailProps) => {
  const queryClient = useQueryClient();

  const { open } = useModal();
  const handleOpenLoginModal = () => open(<LoginModal />);

  const { data: product } = useQuery<unknown, Error, Product>({
    queryKey: ['product'],
    queryFn: () => getProduct(params.productId),
  });

  const { data: accessToken } = useQuery({
    queryKey: ['accessToken'],
    queryFn: getToken,
  });

  const { data: cartProducts } = useQuery<unknown, Error, Cart[]>({
    queryKey: ['cartProducts'],
    queryFn: getCart,
  });

  const { mutate: addItemCartMutate } = useMutation({
    mutationFn: addItemToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartProducts'] });
    },
  });

  const { mutate: clearItemInCartMutate } = useMutation({
    mutationFn: clearItemInCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartProducts'] });
    },
  });

  const isCart = cartProducts?.some(
    (item: Cart) => item.productId === product?.id,
  );

  const handleOnclickCartButton = () => {
    // 비로그인 시
    if (!accessToken?.result) {
      handleOpenLoginModal();
    }

    if (isCart) {
      // 장바구니 빼기
      clearItemInCartMutate(String(product?.id), {
        onSuccess: () => {
          alert('장바구니에서 상품이 제거 되었습니다.');
        },
        onError: (error) => {
          console.log(error);
        },
      });
    } else {
      // 장바구니 담기
      addItemCartMutate(String(product?.id), {
        onSuccess: () => {
          alert('장바구니에 상품이 담겼습니다.');
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
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
          <button
            className="border border-slate-700 py-4 px-12 text-[15px] font-semibold bg-black transition hover:-translate-y-1 active:translate-y-0 hover:drop-shadow w-full  text-white"
            onClick={handleOnclickCartButton}
          >
            {!accessToken?.result
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
