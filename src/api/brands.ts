import axios from 'axios';

export const getBrands = () => {
  const data = axios.get(`${process.env.NEXT_PUBLIC_SERVER}/brands`);
  return data;
};
