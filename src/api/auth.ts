import { User } from '@/types/user';
import axios from 'axios';

export const logIn = async ({ email, password }: User) => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER}/auth/log-in`,
      {
        email,
        password,
      },
      { withCredentials: true },
    );
  } catch (error) {
    throw new Error();
  }
};

export const logOut = async () => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/auth/log-out`, {
      withCredentials: true,
    });
  } catch (error) {
    throw new Error();
  }
};

export const signUp = async ({ email, password }: User) => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER}/auth/sign-up`,
      {
        email,
        password,
      },
      { withCredentials: true },
    );
  } catch (error) {
    throw new Error();
  }
};

export const getToken = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER}/auth/refresh-token`,
      { withCredentials: true },
    );
    return data;
  } catch (error) {
    throw new Error();
  }
};
