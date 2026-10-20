import { useState } from "react"
import { Link } from "react-router-dom"

export default function Signup() {

    // FORM STATES===========|
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [error, setError] = useState("")



    // FUNCTIONS============|
    function handleSubmit(e) {
        e.preventDefault()
        setError("")

        // BASIC CHECKS
        if (username.length < 3) {
            setError("Username must be atleast 3 characters");
            return;
        }

        if (password.length < 8) {
            setError("Password must be atleast 8 characters");
            return;
        }

        if (password !== confirmPassword) {
            setError("Confirm password doesn't match");
            return;
        }


    }


    // RETURN===============|
    return (
        <div className="AuthFormContainer">

            <img src="/logo.svg" alt="shop" className="logo" />
            <h1>Create an account.</h1>
            {error && <span className="errorBox">{error}</span>}

            <form className="authForm" onSubmit={handleSubmit}>
                <div className="formInputContainer">
                    <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button type="submit">Sign up</button>
                <span>Already have an account? <Link className="link" to={"login"}>Login</Link></span>
            </form>
        </div>



    )
}