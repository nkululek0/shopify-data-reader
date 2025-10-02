import { useState, useEffect } from 'react';

import type { Product, Products, FetchedProducts } from './types';

const query = `#graphql
  {
    products(first: 10) {
      nodes {
        title
        images(first: 10) {
          nodes {
            altText
            url
          }
        }
        priceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

const shop = 'vuyo-client-test-store.myshopify.com';
const accessToken = '36537f5e508deeec4959fd9a6e35075b';
const url = `https://${shop}/api/2025-07/graphql.json`;

const getProducts = async () => {
  let products: Products = [];

  try {
    const request = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': accessToken,
      },
      body: JSON.stringify({
        query: query,
      }),
    });
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

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Products>([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      let fetchProducts = await getProducts();
      setProducts(fetchProducts);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {
        isLoading && (
          <p>Loading...</p>
        )
      }
      {
        !isLoading && (
          products.length > 0 ? (
            products.map((product, index) => (
            <p key={index}>
              <span>{ product.title }</span>
            </p>
          ))
          ) : (
            <p>No products found</p>
          )
        )
      }
    </>
  );
}

export default App;