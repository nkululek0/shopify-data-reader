import type { Product, Products, FetchedProducts } from '@/components/ProductListing/types';

import { fetchProducts } from '@/api/product';

export const getProducts = async () => {
  let products: Products = [];

  try {
    const request = await fetchProducts();
    const response = await request.json();
    const fetchedProducts: FetchedProducts = response.data.products.nodes;

    fetchedProducts.forEach((product) => {
      let transformedProduct: Product = {
        title: product.title,
        imageUrl: product.images.nodes[0].url,
        imageAlt: product.images.nodes[0].altText,
        price: Number(product.priceRange.maxVariantPrice.amount),
        currencyCode: product.priceRange.maxVariantPrice.currencyCode
      };

      products.push(transformedProduct);
    });
  } catch (error) {
    console.log(error);
  }

  return products;
};