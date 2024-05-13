import { User } from '@/types/user';
import axios from 'axios';

export const logIn = async ({ email, password }: User) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER}/auth/log-in`,
      {
        email,
        password,
      },
    );

    console.log('login', data);
  } catch (error) {
    throw new Error();
  }
};

export const logOut = async () => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/auth/log-out`);
  } catch (error) {
    throw new Error();
  }
};

export const signUp = async ({ email, password }: User) => {
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/auth/sign-up`, {
      email,
      password,
    });
  } catch (error) {
    throw new Error();
  }
};

export const getToken = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER}/auth/refresh-token`,
    );
    console.log('token', data);
    return data;
  } catch (error) {
    throw new Error();
  }
};
