import axios from 'axios';

export const getProducts = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER}/products`,
  );
  return data.result;
};
