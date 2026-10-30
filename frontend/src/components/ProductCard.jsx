import { useNavigate } from "react-router-dom"

export default function ProductCard({ product }) {

    const navigate = useNavigate()


    return (
        <div className="productCard" onClick={() => { navigate(`/products/${product.slug}`) }}>
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