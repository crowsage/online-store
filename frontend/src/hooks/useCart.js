import { useState } from "react"
import { useAuth } from "../context/AuthContext"

export function useCart() {
    // Context
    const { apiRequest, user } = useAuth()

    // States
    const [cart, setCart] = useState(null)
    const [cartCount, setCartCount] = useState(0)

    // Fetch current user's cart
    async function fetchCart() {

        const response = await apiRequest(`/api/cart/`, { method: "GET" })

        if (response?.ok) {
            const data = await response.json()
            console.log(data)
            setCart(data)
            return data
        }

    }


    // Calculate number of items in the cart
    async function fetchCartCount() {
        if (!user) {
            return
        }

        const cartReturn = await fetchCart()
        if (cartReturn) {
            const count = cartReturn.items.reduce((sum, item) => sum + item.quantity, 0)
            setCartCount(count)
        }
    }

    // Add, Remove and update quantity of items in cart
    async function updateCart(variantId, quantity = 1) {

        const response = await apiRequest(`/api/cart/update/${variantId}/`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ quantity }) })
        if (response.ok) {
            const data = await response.json()
            setCart(data)
        }
    }

    return ({ fetchCart, cart, fetchCartCount, cartCount, updateCart })
}