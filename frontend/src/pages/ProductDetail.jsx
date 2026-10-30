import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header
    from "../components/Header";
export default function ProductDetail() {

    // STATES
    const [product, setProduct] = useState()
    const [selectedVariant, setSelectedVariant] = useState()

    // HOOKS
    const { slug } = useParams()
    const navigate = useNavigate()


    // USEEFFECT
    useEffect(() => {
        fetchProductDetail(slug)
    }, [slug])

    // FUNCTIONS

    async function fetchProductDetail(slug) {

        const response = await fetch(`/api/products/${slug}`)

        if (response.status === 404) {
            navigate("/404")
            return;
        }

        if (response.ok) {
            const data = await response.json()
            console.log(data)

            // select default variant
            const variant = data.variants.find(v => v.in_stock === true)
            setSelectedVariant(variant)

            // OFC
            setProduct(data)
        }
    }

    function selectVariant(v) {
        if (v && v.in_stock) {
            setSelectedVariant(v)
        }
    }


    return (
        <>
            <Header />
            {product ? <div className="productPageHeader">
                <div className="productImg">
                    <img src={product.image} alt="product image" />
                </div>
                <div className="productDetailContainer">
                    <div className="productInfo">
                        <h1 className="productName">{product.name}</h1>
                        <span className="productDesc">{product.description}</span>
                    </div>

                    <div className="productOptions">
                        <span className="productPrice"> RS. <span>{selectedVariant.price.slice(0, -3)}</span></span>
                        <div className="variantOptions">
                            {product.variants.map((v) => (
                                <div className={selectedVariant === v ? "variantOption selectedVariant" : "variantOption"}
                                    id={v.in_stock ? "" : "notInStock"}
                                    key={v.id}
                                    onClick={() => (selectVariant(v))}
                                >
                                    {v.name}
                                </div>

                            ))}
                        </div>
                        <button className="addToBagBtn">ADD TO BAG</button>
                    </div>
                </div>
            </div> : <span>Loading</span>}
        </>
    )
}
