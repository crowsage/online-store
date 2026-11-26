import { useEffect, useState } from "react"
import ProductCarousel from "../components/ProductCarousel"
import { Link } from "react-router-dom"

import { CgShoppingBag } from "react-icons/cg"

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

            <div className="homePageHeader">
                <span className="homePageDecorativeHeading">GOOD CLOTHING</span>
                <CgShoppingBag className="cartIcon" />
            </div>

            <div className="homePageHeading">
                <h1>GOODWEAR</h1>
                <span className="homePageSubheading">STREETWEAR MADE ON STREETS</span>
            </div>
            {products && <div className="homePageProductSection">
                <ProductCarousel products={products} />
            </div>}
        </>
    )
}