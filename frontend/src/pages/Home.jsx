import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import { CgShoppingBag, CgMenu } from "react-icons/cg"
import { Link } from "react-router-dom"

export default function Home() {

    // STATES
    const [products, setProducts] = useState(null)
    const [discount, setDiscount] = useState(10)

    // UseEFFECT
    useEffect(() => {
        fetchProducts()
    }, [])


    //FUNCTIONS
    async function fetchProducts() {
        const response = await fetch("/api/products/")

        if (response.ok) {
            const data = await response.json()
            console.log(data)
            setProducts(data)
        }
    }




    return (
        <>
            <div className="hero">
                {discount && <div className="discountBanner">{discount}% OFF SUMMER SALE</div>}
                <div className="header">
                    <CgMenu className="icon menuIcon" />
                    <div className="logo">
                        <img src="/logo.svg" alt="logo" />
                        <h1>GOODWEAR</h1>
                    </div>
                    <CgShoppingBag className="icon" />
                </div>

                <div className="navBar">
                    <Link className="navLinks">CASUAL SHIRTS</Link>
                    <Link className="navLinks">T-SHIRTS</Link>
                    <Link className="navLinks">JACKETS</Link>
                    <Link className="navLinks">PANTS</Link>
                </div>
                <div className="promo">
                    <img src="/images/promo.webp" alt="Promo" className="promoImg" />
                </div>

            </div>
            <div className="catalog">
                <h1>Products</h1>
                {products && <div className="productContainer">

                    {products.map((product) => (
                        <ProductCard product={product} key={product.id} />
                    ))}

                </div>}
            </div>
        </>
    )
}