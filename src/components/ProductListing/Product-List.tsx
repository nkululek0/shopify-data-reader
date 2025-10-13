import { useState, useEffect } from 'react';

import type { Products } from "./types";

import { getProducts } from './utils/api-requests/product';
import { Product as ProductComponent } from '../ProductListing';

import styles from './styles.module.css';

export function ProductListing() {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<Products>([]);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            const fetchProducts = await getProducts();
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
                products.length > 0 ?
                    <section className={ styles['products-wrapper'] }>
                        {
                            products.map((product) => (
                                <ProductComponent product={ product }/>
                            ))
                        }
                    </section> : (
                    <p>No products found</p>
                    )
                )
            }
        </>
    );
};