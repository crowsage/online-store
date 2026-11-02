import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react"
import { useCart } from "../hooks/useCart"

export default function Cart() {

    // STATES
    const { user, apiRequest } = useAuth()
    const { fetchCart, cart, cartCount, fetchCartCount, updateCart } = useCart()
    const [quantity, setQuantity] = useState()

    // HOOKS
    const navigate = useNavigate()


    // USEEFFECTS
    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
        fetchCart()
        fetchCartCount()
    }, [])

    // FUNCTIONS
    async function quantityDecrease(item) {
        updateCart(item.variant.id, item.quantity - 1)
        fetchCart()
    }

    async function quantityIncrease(item) {
        updateCart(item.variant.id, item.quantity + 1)
    }

    // RETURN
    return (
        <>
            <Header />
            {cart && cartCount > 0 && <h1 className="cartHeading">Your Cart</h1>}
            {cart && cartCount > 0 ? <div className="cartView">

                <table className="cartItems">
                    <tbody>

                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                        {cart.items.map((item) => (
                            <tr className="cartItem" key={item.id}>
                                <td>
                                    <div className="product">

                                        <img src={item.variant.product.image} alt="product image" />
                                        <div className="productInfo">
                                            <span className="name">{item.variant.product.name}</span>
                                            <span className="variant">{item.variant.name}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="quantity">


                                        <button onClick={() => quantityDecrease(item)}>-</button>
                                        {item.quantity}
                                        <button onClick={() => quantityIncrease(item)}>+</button>
                                    </div>
                                </td>
                                <td className="subtotal">
                                    {Number(item.quantity) * Number(item.variant.price)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


                <div className="orderSummary">
                    <h4>Order Summary</h4>

                    <div className="orderPaymentInfo">

                        <span className="subtotal">
                            Subtotal: <span className="subtotalValue">{cart.subtotal}</span>
                        </span>
                        <span className="deliveryCharge">
                            Delivery Charge: <span className="subtotalValue">{cart.delivery_charge ? cart.delivery_charge : "FREE"}</span>
                        </span>
                        <hr />
                        <span className="total">
                            Total: <span className="subtotalValue">{cart.total}</span>
                        </span>
                    </div>


                    <button className="checkoutBtn">Proceed to Checkout</button>
                </div>
            </div> : <span>Nothing to see here.</span>}
        </>
    )
}