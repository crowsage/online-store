import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function ProductCarousel({ products }) {

    // STATES AND VARIABLES
    const navigate = useNavigate()
    const [previousProduct, setPreviousProduct] = useState(null)
    const [currProduct, setCurrProduct] = useState({})
    const [nextProduct, setNextProduct] = useState({})


    // USEEFFECT
    useEffect(() => {

        if (products) {
            setPreviousProduct(products[0])
            setCurrProduct(products[1])
            setNextProduct(products[2])

        }



    }, [products])

    return (

        <div className="productCarouselContainer">
            {previousProduct && <div className="previousProductSlide">
                <img src={previousProduct.image} alt="product image" />
            </div>}

            <div className="currProductSlide">
                <img src={currProduct.image} alt="product image" />
                <div className="currProductInfo">

                    <span>{currProduct.name}</span>
                    <span>{currProduct.min_price}
                        <span className="currencyLabel"> PKR</span>
                    </span>
                </div>
            </div>

            {nextProduct && <div className="nextProductSlide">
                <img src={nextProduct.image} alt="product image" />
            </div>}
        </div>
    )
}