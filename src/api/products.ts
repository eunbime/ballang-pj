import axios from 'axios';

export const getProducts = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER}/products`,
  );
  return data.result;
};

export const getProduct = async (productId: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER}/products/${productId}`,
  );
  return data.result;
};
