import axios from 'axios';

export const getBrands = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/brands`);
  return data.result;
};
