import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { AuthContext } from "../context/context";
import { useLocation, useNavigate } from "react-router-dom";
import { GiGraduateCap } from "react-icons/gi";
import PrimaryButton from "../components/PrimaryButton";
import Toast from "../components/Toast";
import { Bounce, toast } from "react-toastify";
export default function ResetPassword() { 
    const location = useLocation();
    const [submitting, setSubmitting] = useState(false);
    const [credentials, setCredentials] = useState({email: '', otp: '', newPassword: '', cpassword: ''});
    const {user} = location.state; 
    const navigate = useNavigate()
    const getOTP = async () => { 
        await fetch(`https://edu-master-psi.vercel.app/user/forgot-password`, { 
            method: 'POST',
            body: JSON.stringify({
                email: user?.email
            }),
            headers: {
                'content-type': 'application/json'
            }
        })  
    }

    useEffect(() => {
            getOTP();
    }, [])

    const handleSubmit = async (e) => { 
        setSubmitting(true);
        e.preventDefault();
        const res = await fetch(`https://edu-master-psi.vercel.app/user/reset-password`, { 
            method: 'POST',
            body: JSON.stringify(credentials), 
            headers: {
                'content-type': 'application/json'
            }
        })
        const result = await res.json();
        if (result) { 
            toast(`${result?.message}`, { 
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        })
    }
    if (result.success) { 
        setTimeout(() => {
            navigate('/profile')
        }, 2000);
    }
    setSubmitting(false);
    }
    return ( 
        <>
            <Header /> 
            <main className="flex min-h-[85dvh] items-center justify-center">
                <Toast />
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 w-[420px] shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="text-gray-50 bg-[var(--primary)] p-3 w-15 h-15 flex items-center justify-center rounded-lg">
                        <GiGraduateCap className="text-white w-10 h-10" />
                        </div>
                        <div className="text-lg font-bold">EduMaster</div>
                    </div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="">Email</label>
                    <input type="email" className="mt-1 mb-4 w-full p-3 rounded-xl bg-gray-100" placeholder="Enter your email"
                    onChange={(e) => setCredentials((prevState) => ({...prevState, email: e.target.value}))}
                    />
    
                    <label className="block text-sm font-medium text-gray-700" htmlFor="">OTP</label>
                    <input type="number" className="mt-1 mb-4 w-full p-3 rounded-xl bg-gray-100" placeholder="Enter OTP sent to your email"
                    onChange={(e) => setCredentials((prevState) => ({...prevState, otp: e.target.value}))}
                    />
    
                    <label className="block text-sm font-medium text-gray-700" htmlFor="">Password</label>
                    <input type="password" className="mt-1 mb-4 w-full p-3 rounded-xl bg-gray-100" placeholder="Enter your password"
                    onChange={(e) => setCredentials((prevState) => ({...prevState, newPassword: e.target.value}))}
                    />
    
                    <label className="block text-sm font-medium text-gray-700" htmlFor="">Confirm Passowrd</label>
                    <input type="password" className="mt-1 mb-4 w-full p-3 rounded-xl bg-gray-100" placeholder="Confirm your password"
                    onChange={(e) => setCredentials((prevState) => ({...prevState, cpassword: e.target.value}))}
                    />
                    <div className="flex items-center justify-center"> 
                        <PrimaryButton label={submitting ? 'Submitting request...' : 'Reset Passowrd'} />
                    </div>
                </form>
            </main>
            <Footer />
        </>
    )
}