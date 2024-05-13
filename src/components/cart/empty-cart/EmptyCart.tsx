import React from 'react';

const EmptyCart = () => {
  return (
    <section className="flex items-center justify-center flex-col">
      <h6>장바구니가 비어 있습니다.</h6>

      <div className="w-64 mt-8">
        <button className="border border-slate-700 py-4 px-12 text-[15px] font-semibold bg-white transition hover:-translate-y-1 active:translate-y-0 hover:drop-shadow w-full">
          쇼핑하러 가기
        </button>
      </div>
    </section>
  );
};

export default EmptyCart;
