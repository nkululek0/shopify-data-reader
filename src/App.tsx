import { useState, useEffect } from 'react';

type Product = {
  title: string
};

type Products = Array<Product>;

const query = `#graphql
  {
    products(first: 10) {
      nodes {
        title
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
    products = response.data.products.nodes;
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
            <p key={index}>{ product.title }</p>
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