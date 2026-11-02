import { createContext, useContext, useState } from "react";

const AuthContext = createContext()
export function AuthProvider({ children }) {

    // STATES...
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

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
            const userObj = {
                "username": username,
                "access": data.access,
                "refresh": data.refresh,
            }

            localStorage.setItem("user", JSON.stringify(userObj))

            setUser(userObj)

            return userObj
        }

        return null
    }
    // TO LOGOUT A USER AND REMOVE FROM LOCAL STORAGE
    function logout() {
        localStorage.removeItem("user")
    }

    // TO REFRESH ACCESS TOKEN
    async function refreshAccessToken() {

        if (!user.refresh) {
            return false
        }


        const response = await fetch("/api/users/token/refresh/", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh: user.refresh })
        })

        if (response.ok) {
            const data = await response.json()

            const userObj = {
                username: user.username,
                access: data.access,
            }

            setUser(userObj)
            localStorage.setItem("user", JSON.stringify(userObj))

            return data.access

        }

        return false
    }

    // TO SEND API REQUEST AND REFRESH TOKEN IF TOKEN HAS EXPIRED
    async function apiRequest(path, options = {}) {

        if (!user?.access) {
            logout()
            return false
        }

        options = {
            ...options, headers: {
                ...options.headers || {},
                "Authorization": `Bearer ${user.access}`
            }
        }

        const response = await fetch(path, options)

        // RETURN IF AUTHORIZED
        if (response.status !== 401) {
            return response
        }

        // REFRESH ACCESS TOKEN IF UNAUTHORIZED
        const newAccess = await refreshAccessToken()

        if (newAccess) {
            // RETRY
            options = {
                ...options, headers: {
                    ...options.headers || {},
                    "Authorization": `Bearer ${newAccess}`
                }
            }

            const reResponse = await fetch(path, options)
            if (reResponse.ok) {
                return reResponse
            }
        }

        logout()
        return false

    }


    //RETURNING...
    return (
        <AuthContext.Provider value={{ register, login, user, apiRequest }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}