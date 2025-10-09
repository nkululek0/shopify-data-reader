import type { Product } from "../../types";

type ProductListingProps = { products: Product[] };

import { Product as Item } from '../ProductListing';

import styles from './styles.module.css';

export function ProductListing(props: ProductListingProps) {
    const { products } = props;

    return (
        <>
            <section className={ styles['products-wrapper'] }>
                {
                    products.map((product) => (
                        <Item product={ product }/>
                    ))
                }
            </section>
        </>
    );
}