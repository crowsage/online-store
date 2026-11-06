import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../hooks/useCart";

export default function ProductDetail() {
    // CONTENT
    const { user, apiRequest } = useAuth()

    // STATES
    const [product, setProduct] = useState()
    const [selectedVariant, setSelectedVariant] = useState()
    const { updateCart, cart } = useCart()
    const [inCart, setInCart] = useState(false)
    const [variantsInCart, setVariantsInCart] = useState([])

    // HOOKS
    const { slug } = useParams()
    const navigate = useNavigate()


    // USEEFFECT
    useEffect(() => {
        fetchProductDetail(slug)
    }, [slug])


    useEffect(() => {
        productInCart()
    }, [cart, product, selectedVariant])
    // FUNCTIONS

    function productInCart() {

        if (!cart || !product) return;
        const inCartIds = cart.items?.filter(item =>
            product.variants?.some(v => v.id === item.variant.id)
        )
        console.log("this", inCartIds)

    }


    async function fetchProductDetail(slug) {

        const response = await fetch(`/api/products/${slug}`)

        if (response.status === 404) {
            navigate("/404")
            return;
        }

        if (response.ok) {
            const data = await response.json()

            // select default variant
            const variant = data.variants.find(v => v.in_stock === true)
            setSelectedVariant(variant)

            console.log(data)

            // OFC
            setProduct(data)
        }
    }


    function selectVariant(v) {
        if (v && v.in_stock) {
            setSelectedVariant(v)
            console.log(selectedVariant)
        }
    }


    // TO ADD TO CART
    async function addToCart() {
        // LOGIN BEFORE ADDING TO CART
        if (!user) {
            navigate('/login')
            return
        }

        updateCart(selectedVariant.id)
    }


    async function quantityDecrease(item) {
        updateCart(item.id, item.quantity - 1)
    }

    async function quantityIncrease(item) {
        updateCart(item.id, item.quantity + 1)
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
                        {inCart ? <div className="quantity">


                            <button onClick={() => quantityDecrease(selectedVariant)}>-</button>
                            {selectedVariant.quantity}
                            <button onClick={() => quantityIncrease(selectedVariant)}>+</button>
                        </div> : <button className="addToBagBtn" onClick={addToCart}>ADD TO BAG</button>}
                    </div>
                </div>
            </div> : <span>Loading</span>}
        </>
    )
}
