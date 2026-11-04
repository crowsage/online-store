import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useCartContext } from "../context/CartContext"

export function useCart() {

    // Context
    const { apiRequest, user } = useAuth()
    const { cart, setCart, cartCount, setCartCount } = useCartContext()




    // Calculate number of items in the cart
    function getCartCount(cartData) {
        if (!user || !cartData) return


        const count = cartData.items.reduce((sum, item) => sum + item.quantity, 0)
        setCartCount(count)
    }

    // Fetch current user's cart
    async function fetchCart() {

        const response = await apiRequest(`/api/cart/`, { method: "GET" })

        if (response?.ok) {
            const data = await response.json()
            console.log(data)
            setCart(data)
            getCartCount(data)
            return data
        }

    }



    // Add, Remove and update quantity of items in cart
    async function updateCart(variantId, quantity = 1) {

        const response = await apiRequest(`/api/cart/update/${variantId}/`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ quantity }) })
        if (response.ok) {
            const data = await response.json()
            console.log(data)
            setCart(data)
            getCartCount(data)
        }
    }

    return ({ fetchCart, cart, cartCount, updateCart })
}