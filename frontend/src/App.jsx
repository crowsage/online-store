import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { AuthProvider } from "./context/AuthContext"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import { CartProvider } from "./context/CartContext"

export default function App() {


  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/products/:slug", element: <ProductDetail /> },
    { path: "/cart", element: <Cart /> },
  ])


  return (
    <AuthProvider>
      <CartProvider>

        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  )
}