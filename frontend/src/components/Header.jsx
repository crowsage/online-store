import { CgMenu, CgShoppingBag } from "react-icons/cg"
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Header() {

    const discount = null;
    const navigate = useNavigate()
    const { fetchCartCount, cartCount } = useCart()
    const { user } = useAuth()

    useEffect(() => {
        fetchCartCount()
    }, [user])
    return (
        <>
            {discount && <div className="discountBanner">{discount}% OFF SUMMER SALE</div>}
            <div className="header">
                <CgMenu className="icon menuIcon" />
                <div className="logo" onClick={() => navigate("/")}>
                    <img src="/logo.svg" alt="logo" />
                    <h1>GOODWEAR</h1>
                </div>
                <span>
                    <span className="cartCount">{cartCount}</span>
                    <CgShoppingBag className="icon" onClick={() => navigate("/cart")} />
                </span>
            </div>
        </>
    )

}