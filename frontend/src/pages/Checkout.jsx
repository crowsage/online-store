import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../hooks/useCart"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"

export default function Checkout() {

    // CONTEXT
    const { user, apiRequest } = useAuth()

    // HOOKS
    const { cart } = useCart()
    const navigate = useNavigate()

    // STATES
    const [fullNameInput, setFullNameInput] = useState("")
    const [phoneInput, setPhoneInput] = useState("")
    const [cityInput, setCityInput] = useState("")
    const [addressInput, setAddressInput] = useState("")
    const [noteInput, setNoteInput] = useState("")


    // UseEffect
    useEffect(() => {
        if (!user) navigate("/login")
        // if (cartCount <= 0) navigate("/")
    }, [user])


    // Function
    async function handleSubmit(e) {
        e.preventDefault()

        const orderCreated = await createOrder()
        if (orderCreated) {
            window.alert("Order Created!")
        } else {
            window.alert("Order Failed!")
        }
    }

    async function createOrder() {


        const requestBody = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                full_name: fullNameInput,
                phone_number: phoneInput,
                city: cityInput,
                address: addressInput,
                note: noteInput,
                payment_method: "cod",
            })
        }

        const response = await apiRequest("/api/orders/create/", requestBody)

        const data = await response.json()

        console.log("STATUS:", response.status)
        console.log("RESPONSE:", data)

        return response.ok



    }

    console.log(cart)
    return (
        <>
            <Header />

            {cart && Array.isArray(cart.items) && cart.items.length > 0 > 0 ? <h2 className="checkoutHeading">CHECKOUT</h2> : ""}
            <div className="checkoutContainer">
                <form className="orderDetail" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Full name" className="fullNameInput" required value={fullNameInput} onChange={(e) => setFullNameInput(e.target.value)} />
                    <input type="text" placeholder="Phone" className="phoneNumberContainer" required value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} />
                    <input type="text" placeholder="City" className="cityInput" required value={cityInput} onChange={(e) => setCityInput(e.target.value)} />
                    <input type="text" placeholder="Address" className="addressInput" required value={addressInput} onChange={(e) => setAddressInput(e.target.value)} />
                    <textarea type="text" placeholder="Note (Optional)" className="noteInput" value={noteInput} onChange={(e) => setNoteInput(e.target.value)} />

                    <button type="submit" className="placeOrderBtn">PLACE ORDER</button>
                </form>
                <div className="orderSummary">
                    <span className="cartItemList">

                        {cart && cart.items.map((item) => (

                            <span className="cartItemDetail">
                                <span className="cartItemName">{item.quantity} x {item.variant.product.name} - {item.variant.name}</span>
                                <span className="cartItemName">{item.variant.price}</span>
                            </span>
                        ))}
                    </span>
                    <span className="orderInfo">
                        <span className="subtotal">
                            Subtotal <span className="subtotalValue">{cart?.subtotal} PKR</span>
                        </span>
                        <span className="deliveryCharge">
                            Delivery Charge <span className="subtotalValue">{cart?.delivery_charge ? cart?.delivery_charge : "FREE"}{cart?.delivery_charge ? <span className="mutedText">PKR</span> : ""}</span>
                        </span>
                        <hr />
                        <span className="total">
                            Total <span className="subtotalValue">{cart?.total} PKR</span>
                        </span>
                    </span>
                </div>
            </div>
        </>
    )
}