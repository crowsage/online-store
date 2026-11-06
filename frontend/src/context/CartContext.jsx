import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useCart } from "../hooks/useCart";



const CartContext = createContext()
export function CartProvider({ children }) {


    //CONTEXT
    const { apiRequest, user } = useAuth()

    //STATES
    const [cart, setCart] = useState(null)
    const [cartCount, setCartCount] = useState(0)

    // USEEFFECT
    useEffect(() => {
        fetchCart()
    }, [])


    // Fetch current user's cart

    // Calculate number of items in the cart
    function getCartCount(cartData) {
        if (!user || !cartData) return


        const count = cartData.items.reduce((sum, item) => sum + item.quantity, 0)
        setCartCount(count)
    }

    // FetchCart
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

    //RETURNING...
    return (
        <CartContext.Provider value={{ cart, setCart, cartCount, setCartCount, fetchCart, getCartCount }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCartContext() {
    return useContext(CartContext)
}