'use client';
import { signUp } from '@/api/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const SignUpPage = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate: signUpMutate } = useMutation({
    mutationFn: signUp,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
      verifiedPassword: '',
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FieldValues> = async ({
    email,
    password,
    verifiedPassword,
  }) => {
    if (verifiedPassword !== password) {
      alert('비밀번호가 일치하지 않습니다.');
    } else {
      signUpMutate(
        { email, password },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['accessToken'] });
            router.push('/');
          },
          onError: () => {
            alert('이미 사용중인 아이디입니다.');
          },
        },
      );
    }
  };

  return (
    <section>
      <h2 className="font-bold text-3xl text-center my-12">회원가입</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-y-4 max-w-sm mx-auto w-full"
      >
        <div className="grid gap-y-1.5 w-full ">
          <label htmlFor="email" className="text-sm font-medium text-gray-800">
            이메일
          </label>
          <input
            id="email"
            type="email"
            className="block border w-full px-6 py-3 rounded focus:border-black outline-none transition border-slate-300"
            {...register('email', {
              required: {
                value: true,
                message: '이메일을 입력해주세요',
              },
            })}
          />
        </div>
        {errors.email && (
          <p className="flex w-full items-start text-rose-500 text-sm">
            {String(errors.email.message)}
          </p>
        )}
        <div className="grid gap-y-1.5 w-full">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-800"
          >
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            className="block border w-full px-6 py-3 rounded focus:border-black outline-none transition border-slate-300"
            {...register('password', {
              required: {
                value: true,
                message: '비밀번호를 입력해주세요',
              },
            })}
          />
        </div>
        {errors.password && (
          <p className="flex w-full items-start text-rose-500 text-sm">
            {String(errors.password.message)}
          </p>
        )}
        <div className="grid gap-y-1.5 w-full">
          <label
            htmlFor="verifiedPassword"
            className="text-sm font-medium text-gray-800"
          >
            비밀번호 확인
          </label>
          <input
            id="verifiedPassword"
            type="password"
            className="block border w-full px-6 py-3 rounded focus:border-black outline-none transition border-slate-300"
            {...register('verifiedPassword', {
              required: {
                value: true,
                message: '비밀번호 확인을 입력해주세요',
              },
            })}
          />
        </div>
        {errors.verifiedPassword && (
          <p className="flex w-full items-start text-rose-500 text-sm">
            {String(errors.verifiedPassword.message)}
          </p>
        )}

        <button
          type="submit"
          className="mt-3 border border-slate-700 py-4 px-12 text-[15px] font-semibold bg-white transition hover:-translate-y-1 active:translate-y-0 hover:drop-shadow w-full data-[color=black]:bg-black data-[color=black]:text-white "
          data-color="black"
        >
          회원가입
        </button>
      </form>
    </section>
  );
};

export default SignUpPage;
