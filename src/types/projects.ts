export type Products = Product[];

export interface Product {
  id: number;
  name: string;
  imgSrc: string;
  onlineStock: number;
  price: number;
  originalPrice: number;
  deliveryType: string;
  brandId: number;
  brand: Brand;
}

export interface Brand {
  id: number;
  nameKr: string;
  nameEn: string;
}
