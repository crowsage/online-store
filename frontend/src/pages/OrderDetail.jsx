import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function OrderDetail() {

    // Hooks
    const { id } = useParams()
    const { apiRequest } = useAuth()

    // STATES
    const [orderDetails, setOrderDetails] = useState(null)

    // USEEFFECTS
    useEffect(() => {
        fetchOrder()
    }, [id])

    // Functions
    async function fetchOrder() {
        const response = await apiRequest(`/api/orders/${id}`)
        if (response.ok) {
            const data = await response.json()
            setOrderDetails(data)
            console.log("order-return:", data)
        }
    }


    return (
        <>
            {orderDetails &&
                <div className="orderDetailContainer">
                    <h1>Order Info</h1>

                    <div className="orderInfo">

                        <h2>About Order</h2>
                        <span className="orderId">
                            <span className="orderIdLabel orderInfoLabel">Order Id</span>
                            <span className="orderIdValue">{orderDetails.id}</span>
                        </span>

                        <span className="orderCreatedDate">
                            <span className="orderCreatedDateLabel orderInfoLabel">Order Created</span>
                            <span className="orderCreatedDateValue">{orderDetails.created_at}</span>
                        </span>

                        <span className="orderPaymentMethod">
                            <span className="orderPaymentMethodLabel orderInfoLabel">Payment Method</span>
                            <span className="orderPaymentMethodValue">{orderDetails.payment_method}</span>
                        </span>

                        <span className="orderPaymentStatus">
                            <span className="orderPaymentStatusLabel orderInfoLabel">Payment Status</span>
                            <span className="orderPaymentStatusValue">{orderDetails.payment_status}</span>
                        </span>

                        <span className="orderStatus">
                            <span className="orderStatusLabel orderInfoLabel">Order Status</span>
                            <span className="orderStatusValue">{orderDetails.status}</span>
                        </span>

                        <span className="orderSubtotal">
                            <span className="orderSubtotalLabel orderInfoLabel">Subtotal</span>
                            <span className="orderSubtotalValue">{orderDetails.subtotal}</span>
                        </span>

                        <span className="orderDeliveryCharge">
                            <span className="orderDeliveryChargeLabel orderInfoLabel">Delivery Charge</span>
                            <span className="orderDeliveryChargeValue">{orderDetails.delivery_charge}</span>
                        </span>
                        <span className="orderTotal">
                            <span className="orderTotalLabel orderInfoLabel">Total</span>
                            <span className="orderTotalValue">{orderDetails.total}</span>
                        </span>
                    </div>
                    <div className="customerInfo"></div>
                </div>


            }
        </>
    )
}