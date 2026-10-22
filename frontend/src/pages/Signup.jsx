import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { InfoCircle, Eye, EyeClosed } from "iconoir-react"

export default function Signup() {

    // FORM STATES===========|
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [showPassword, setShowPassword] = useState(false)

    const [error, setError] = useState("")
    // CONTEXT
    const { register } = useAuth()

    // Navigation
    const navigate = useNavigate()

    // FUNCTIONS============|
    function formatErrors(errors) {
        if (errors.username) {
            if (errors.username[0].includes("already")) {
                return "Username already exists."
            } else {
                return "Invalid username."
            }
        } else if (errors.email) {
            if (errors.email[0].includes("already")) {
                return "Email already registered."
            } else {
                return "Invalid email."
            }
        } else if (errors.password) {
            return "Invalid password."
        }
    }


    async function handleSubmit(e) {
        e.preventDefault()
        setError("")


        // BASIC CHECKS
        if (username.length < 3) {
            setError("Username is too short.");
            return;
        }

        if (email.length < 8) {
            setError("Invalid email.");
            return;
        }

        if (password.length < 8) {
            setError("Password is too short.");
            return;
        }

        const response = await register(username, email, password)

        if (response.success) {
            navigate("/login")
            return
        }

        console.log(response.errors)

        // HANDLE ERRORS
        setError(formatErrors(response.errors));

    }

    function toggleShowPassword() {
        showPassword ? setShowPassword(false) : setShowPassword(true)
    }


    // RETURN===============|
    return (
        <div className="AuthFormContainer">

            <img src="/logo2.svg" alt="shop" className="logo" />
            <h1>Get Started</h1>
            <span className={error ? "error visible" : "error"}><InfoCircle />{error}</span>
            <form className="authForm" onSubmit={handleSubmit}>
                <div className="formInputContainer">
                    <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className={error.toLowerCase().includes("username") ? "errorField" : ""} />
                    <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={error.toLowerCase().includes("email") ? "errorField" : ""} />

                    <span className={error.toLowerCase().includes("password") ? "passwordContainer errorField" : "passwordContainer"}>
                        <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={toggleShowPassword} type="button" className="showPassBtn">
                            {showPassword ? <EyeClosed className="passIcon" /> : <Eye className="passIcon" />}
                        </button>
                    </span>

                </div>
                <button type="submit" className="signupBtn">Sign up</button>
                <span>Already have an account? <Link className="link" to={"/login"}>Login</Link></span>
            </form>
        </div>



    )
}