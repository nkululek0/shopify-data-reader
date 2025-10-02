export type Product = {
  title: string
  imageUrl: string
  imageAlt: string
  price: number
  currencyCode: string
};

export type Products = Array<Product>;

type FetchedImageNode = {
  altText: string
  url: string
};

export type FetchedProduct = {
  title: string
  images: {
    nodes: Array<FetchedImageNode>
  }
  priceRange: {
    maxVariantPrice: {
      amount: number
      currencyCode: string
    }
  }
};

export type FetchedProducts = Array<FetchedProduct>;