import { useState } from "react"
import { InfoCircle, EyeClosed, Eye } from "iconoir-react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export default function Login() {


    // STATES
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [showPassword, setShowPassword] = useState("")
    const [error, setError] = useState("")

    //CONTEXT
    const { login } = useAuth()

    // NAVIGATION
    const navigate = useNavigate()

    // FUNCTIONS
    async function handleSubmit(e) {
        e.preventDefault()
        setError("")

        const success = await login(username, password)

        if (success) {
            navigate("/")
            return
        }

        setError("Wrong Username or Password.")
    }

    function toggleShowPassword() {
        showPassword ? setShowPassword(false) : setShowPassword(true)
    }

    return (
        <div className="AuthFormContainer">

            <img src="/logo2.svg" alt="shop" className="logo" />
            <h1>Welcome Back</h1>
            <span className={error ? "error visible" : "error"}><InfoCircle />{error}</span>
            <form className="authForm" onSubmit={handleSubmit}>
                <div className="formInputContainer">
                    <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <span className="passwordContainer">
                        <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={toggleShowPassword} type="button" className="showPassBtn">
                            {showPassword ? <EyeClosed className="passIcon" /> : <Eye className="passIcon" />}
                        </button>
                    </span>

                </div>
                <button type="submit" className="signupBtn">Login</button>
                <span>Don't have an account? <Link className="link" to={"/signup"}>Sign up</Link></span>
            </form>
        </div>
    )
}