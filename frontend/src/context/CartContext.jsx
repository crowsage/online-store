import { createContext, useContext, useState } from "react";

const CartContext = createContext()

export function CartProvider({ children }) {

    const [cart, setCart] = useState(null)
    const [cartCount, setCartCount] = useState(0)

    //RETURNING...
    return (
        <CartContext.Provider value={{ cart, setCart, cartCount, setCartCount }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCartContext() {
    return useContext(CartContext)
}