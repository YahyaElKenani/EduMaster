import { useLocation } from "react-router-dom"

export default function VerifyPayment() {
    const location = useLocation();
    const {paymentUrl} = location.state || {}; 
    return ( 
        <> 
            <a href={paymentUrl} className="text-3xl font-bold">Verify Payment</a>
        </>
    )
}