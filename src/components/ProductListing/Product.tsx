import type { Product } from '../../types';

type ProductProps = Product;

export function Product(props: ProductProps) {
    const { title } = props;

    return (
        <div className="product-item-container"></div>
    );
};