import { Product } from '../types/Product';

export const getProductsPrice = (products: Product[]) => {
  const sumOfPrices = products.reduce(
    (accumulator, product) => {
      const prices = product.price;

      const valueUSD = prices[0].value;
      const valueUAH = prices[1].value;

      accumulator.priceUSD += valueUSD;
      accumulator.priceUAH += valueUAH;

      if (products.length > 2) {
        console.log(accumulator);
      }

      return accumulator;
    },
    { priceUSD: 0, priceUAH: 0 },
  );

  return sumOfPrices;
};
