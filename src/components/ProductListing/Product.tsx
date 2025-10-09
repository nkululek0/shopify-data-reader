import type { Product } from '../../types';

type ProductProps = {
    product: Product
};

export function Product(props: ProductProps) {
    const { product } = props;
    const { title } = product;

    return (
        <div className="product-item-container">
            <p>{ title }</p>
        </div>
    );
};