import axios from 'axios';

export const getCart = async () => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/cart`, {
      withCredentials: true,
    });
    return data.result.items;
  } catch (error) {
    throw new Error();
  }
};

export const addItemToCart = async (productId: string) => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER}/cart/products/${productId}`,
      { productId },
      { withCredentials: true },
    );
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const removeItemFromCart = async (productId: string) => {
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER}/cart/products/${productId}`,
      { withCredentials: true },
    );
  } catch (error) {
    throw new Error();
  }
};

export const clearItemInCart = async (productId: string) => {
  await axios.delete(
    `${process.env.NEXT_PUBLIC_SERVER}/cart/products/${productId}/clear`,
    { withCredentials: true },
  );
};
