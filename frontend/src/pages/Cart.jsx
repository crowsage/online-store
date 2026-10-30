import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react"

export default function Cart() {

    // STATES
    const { user } = useAuth()

    // HOOKS
    const navigate = useNavigate()


    // USEEFFECTS
    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [])

    // RETURN
    return (
        <>
            <Header />
        </>
    )
}