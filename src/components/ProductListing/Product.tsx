import type { Product } from '../../types';

type ProductProps = {
    product: Product
};

import styles from './styles.module.css';

export function Product(props: ProductProps) {
    const { product } = props;
    const { imageUrl, imageAlt, title, currencyCode, price } = product;

    return (
        <article className={ styles['product-item-wrapper'] }>
            <img src={ imageUrl } alt={ imageAlt } className={ styles['product-item-image'] } />
            <section className={ styles['product-item-content'] }>
                <p>{ title }</p>
                <p>
                    <span>{ currencyCode }</span>
                    <span>{ price }</span>
                </p>
            </section>
        </article>
    );
};