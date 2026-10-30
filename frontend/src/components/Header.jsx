import { CgMenu, CgShoppingBag } from "react-icons/cg"
import { useNavigate } from "react-router-dom";


export default function Header() {

    const discount = null;
    const navigate = useNavigate()

    return (
        <>
            {discount && <div className="discountBanner">{discount}% OFF SUMMER SALE</div>}
            <div className="header">
                <CgMenu className="icon menuIcon" />
                <div className="logo" onClick={() => navigate("/")}>
                    <img src="/logo.svg" alt="logo" />
                    <h1>GOODWEAR</h1>
                </div>
                <CgShoppingBag className="icon" onClick={() => navigate("/cart")} />
            </div>
        </>
    )

}