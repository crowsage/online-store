import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useCartContext } from "../context/CartContext"

export function useCart() {

    // Context
    const { apiRequest } = useAuth()
    const { cart, setCart, cartCount, setCartCount, fetchCart, getCartCount } = useCartContext()




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

    return ({ cart, setCart, cartCount, setCartCount, fetchCart, updateCart })
}