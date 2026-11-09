import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react"
import { useCart } from "../hooks/useCart"

export default function Cart() {

    // STATES
    const { user, apiRequest } = useAuth()
    const { fetchCart, cart, cartCount, updateCart } = useCart()
    const [quantity, setQuantity] = useState()

    // HOOKS
    const navigate = useNavigate()


    // USEEFFECTS
    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
        fetchCart()
    }, [])

    // FUNCTIONS
    async function quantityDecrease(item) {
        updateCart(item.variant.id, item.quantity - 1)
    }

    async function quantityIncrease(item) {
        updateCart(item.variant.id, item.quantity + 1)
    }
    console.log("CART:", cart)
    // RETURN
    return (
        <>
            <Header />

            {cart && Array.isArray(cart.items) && cartCount > 0 ? <h2 className="cartHeading">CART</h2> : ""}
            {cart && Array.isArray(cart.items) && cartCount > 0 ? <div className="cartView">

                <div className="cartItems">

                    {cart.items.map((item) => (
                        <div className="cartItem">
                            <div className="cartItemLeft">

                                <img src={item.variant.product.image} alt="cart Item Img" className="cartItemImg" />
                                <div className="cartItemInfo">
                                    <span className="cartItemName" onClick={() => navigate(`/products/${item.variant.product.slug}`)}>{item.variant.product.name}</span>
                                    <span className="cartItemVariant">{item.variant.name}</span>
                                    <span className="cartItemPrice">{item.variant.price} <span className="mutedText">PKR</span></span>
                                </div>
                            </div>
                            <div className="cartItemRight">
                                <div className="quantityControl">
                                    <span className="decreaseQuantity" onClick={() => quantityDecrease(item)}>-</span>
                                    <span className="quantity">{item.quantity}</span>
                                    <span className="increaseQuantity" onClick={() => quantityIncrease(item)}>+</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                <div className="orderSummary">

                    <div className="orderPaymentInfo">

                        <span className="subtotal">
                            Subtotal <span className="subtotalValue">{cart.subtotal} PKR</span>
                        </span>
                        <span className="deliveryCharge">
                            Delivery Charge <span className="subtotalValue">{cart.delivery_charge ? cart.delivery_charge : "FREE"}{cart.delivery_charge ? <span className="mutedText">PKR</span> : ""}</span>
                        </span>
                        <hr />
                        <span className="total">
                            Total <span className="subtotalValue">{cart.total} PKR</span>
                        </span>
                    </div>


                    <button className="checkoutBtn">PROCEED TO CHECKOUT</button>
                </div>
            </div> : <div className="emptyCartMsg">Your bag is empty!</div>}
        </>
    )
}