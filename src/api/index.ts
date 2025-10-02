const shop = 'vuyo-client-test-store.myshopify.com';
const accessToken = '36537f5e508deeec4959fd9a6e35075b';
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

export const useProducts = () => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': accessToken,
      },
      body: JSON.stringify({
        query: query,
      }),
    });;
};