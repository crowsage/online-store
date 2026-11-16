import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../hooks/useCart"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"

export default function Checkout() {

    // CONTEXT
    const { user } = useAuth()

    // HOOKS
    const { cart } = useCart()
    const navigate = useNavigate()


    // UseEffect
    useEffect(() => {
        if (!user) navigate("/login")
        // if (cartCount <= 0) navigate("/")
    }, [user])


    // Function
    function handleSubmit(e) {
        e.preventDefault()
    }

    console.log(cart)
    return (
        <>
            <Header />

            {cart && Array.isArray(cart.items) > 0 ? <h2 className="checkoutHeading">CHECKOUT</h2> : ""}
            <div className="checkoutContainer">
                <form className="orderDetail" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Full name" className="fullNameInput" required />
                    <input type="tel" placeholder="Phone" className="phoneNumberContainer" required />
                    <input type="text" placeholder="City" className="cityInput" required />
                    <input type="text" placeholder="Address" className="addressInput" required />
                    <textarea type="text" placeholder="Note (Optional)" className="noteInput" />

                    <button type="submit" className="placeOrderBtn">PLACE ORDER</button>
                </form>
                <div className="orderSummary">
                    {cart && cart.items.map((item) => (
                        <span>{item.variant.product.name}</span>
                    ))}
                </div>
            </div>
        </>
    )
}