import { createContext, useContext, useState } from "react";
import { API_URL } from "/config"
const AuthContext = createContext()

export function AuthProvider({ children }) {

    // STATES...
    const [user, setUser] = useState()



    // FUNCTIONS...
    async function register(username, email, password) {

        const response = await fetch(`${API_URL}/api/users/register/`, {
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

    //RETURNING...
    return (
        <AuthContext.Provider value={{ register }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}