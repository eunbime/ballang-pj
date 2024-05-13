'use client';
import { useModal } from '@/contexts/modal-context/ModalContext';
import Link from 'next/link';
import React from 'react';
import LoginModal from '../modal/login-modal';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getToken, logOut } from '@/api/auth';

const Header = () => {
  const { open } = useModal();

  const { data: accessToken } = useQuery({
    queryKey: ['accessToken'],
    queryFn: getToken,
  });

  const { mutate: logOutMutate } = useMutation({
    mutationFn: logOut,
    onError: (error) => {
      throw new Error('로그아웃 중 오류가 발생했습니다.', error);
    },
  });

  const handleOpenLoginModal = () => open(<LoginModal />);

  const handleLogout = () => {
    logOutMutate();
  };

  return (
    <header className="bg-white sticky top-0 h-16 border-b flex items-center px-5 lg:px-8 z-10 shrink-0">
      <nav className="flex w-full justify-between items-center p-5">
        <div className="flex items-center">
          <Link href={'/'} className="font-bold text-2xl">
            발랑
          </Link>
          <Link href={'/brands'} className="ml-20 text-[15px] font-medium">
            BRANDS
          </Link>
        </div>
        <div className="flex items-center gap-x-4 text-[15px] font-medium ">
          <Link
            href={accessToken?.success ? '/cart' : '/sign-up'}
            className="text-gray-800 hover:text-black transition"
          >
            {accessToken?.success ? '장바구니' : '회원가입'}
          </Link>
          <button
            className="text-gray-800 hover:text-black transition"
            onClick={accessToken?.success ? handleLogout : handleOpenLoginModal}
          >
            {accessToken?.success ? '로그아웃' : '로그인'}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
