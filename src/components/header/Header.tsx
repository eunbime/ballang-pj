import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header className="fixed flex top-0 left-0 right-0 border border-gray-300">
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
            href={'/register'}
            className="text-gray-800 hover:text-black transition"
          >
            회원가입
          </Link>
          <Link
            href={'/login'}
            className="text-gray-800 hover:text-black transition"
          >
            로그인
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
