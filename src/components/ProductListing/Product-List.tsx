import type { Product } from "../../types";

type ProductListingProps = { products: Product[] };

import { Product as Item } from '../ProductListing';

export function ProductListing(props: ProductListingProps) {
    const { products } = props;

    return (
        <>
            {
                products.map((product) => (
                    <Item product={ product }/>
                ))
            }
        </>
    );
}