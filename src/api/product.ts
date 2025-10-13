const shop = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const accessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const url = `https://${shop}/api/2025-07/graphql.json`;
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

export const fetchProducts = () => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': accessToken,
      },
      body: JSON.stringify({
        query: query,
      }),
    });
};