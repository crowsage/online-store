import { createContext, useContext, useState } from "react";
const AuthContext = createContext()

export function AuthProvider({ children }) {

    // STATES...
    const [user, setUser] = useState(null)



    // FUNCTIONS...

    // REGISTERING FUNCTION
    async function register(username, email, password) {

        const response = await fetch("/api/users/register/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        })

        if (!response.ok) {
            const errors = await response.json()
            return {
                "success": false,
                "errors": errors,
            }
        }
        return {
            "success": true,
        }
    }


    // LOGIN FUNCTION
    async function login(username, password) {

        const response = await fetch("/api/users/token/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        })


        if (response.ok) {

            const data = await response.json()

            setUser({
                "username": username,
                "accessToken": data.accessToken,
                "refreshToken": data.refreshToken,
            })

            return user
        }

        return null
    }


    //RETURNING...
    return (
        <AuthContext.Provider value={{ register, login, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}