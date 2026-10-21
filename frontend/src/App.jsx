import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { AuthProvider } from "./context/AuthContext"

export default function App() {


  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
  ])


  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}