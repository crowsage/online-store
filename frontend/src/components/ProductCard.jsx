export default function ProductCard({ product }) {




    return (
        <div className="productCard">
            <img src={product.image} alt={`${product.name}-image`} />
            <div className="productInfo">
                <span className="productName">
                    {product.name}
                </span>
                <span className="productPrice">
                    RS. {product.min_price}
                </span>
            </div>
        </div>
    )
}