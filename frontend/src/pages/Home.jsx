import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import { Link } from "react-router-dom"
import Header from "../components/Header"

export default function Home() {

    // STATES
    const [products, setProducts] = useState(null)

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
                <Header />
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