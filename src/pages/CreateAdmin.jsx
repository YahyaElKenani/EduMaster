import { useContext, useState } from "react";
import PrimaryButton from "../components/PrimaryButton"
import { GiGraduateCap } from "react-icons/gi";
import { AuthContext } from "../context/context";
import { useNavigate } from "react-router-dom";
export default function CreateAdmin() {
    const [credentials, setCredentials] = useState({name: '', phoneNumber: '', email: '', password: '', cpassword: ''});
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const {token} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setSubmitting(true);
        const res = await fetch('https://edu-master-psi.vercel.app/admin/create-admin', { 
            method: 'POST', 
            body: JSON.stringify({ 
                fullName: credentials.name,
                email: credentials.email,
                phoneNumber: credentials.phoneNumber,
                password: credentials.password,
                cpassword: credentials.cpassword
            }),
            headers: { 
                token: token,
                'content-type': 'application/json'
            }
        })
        const result = await res.json(); 
        setSubmitting(false);
        if (result.success) { 
            navigate('/super-dashboard');
        } else { 
            setError(result.message || 'Login failed')
        }
        console.log(result);
    }
    return ( 
        <div className="min-h-[100dvh] bg-[var(--primary-bg)] flex items-center justify-center"> 
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 w-[420px] shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                    <div className="text-gray-50 bg-[var(--primary)] p-3 w-15 h-15 flex items-center justify-center rounded-lg">
                    <GiGraduateCap className="text-white w-10 h-10" />
                    </div>
                    <div className="text-lg font-bold">EduMaster</div>
                </div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="">Full Name</label>
                <input type="text" className="mt-1 mb-4 w-full p-3 rounded-xl bg-gray-100" placeholder="Enter your name"
                onChange={(e) => setCredentials((prevState) => ({...prevState, name: e.target.value}))}
                />

                <label className="block text-sm font-medium text-gray-700" htmlFor="">Phone Number</label>
                <input type="number" className="mt-1 mb-4 w-full p-3 rounded-xl bg-gray-100" placeholder="Enter your phone number"
                onChange={(e) => setCredentials((prevState) => ({...prevState, phoneNumber: e.target.value}))}
                />

                <label className="block text-sm font-medium text-gray-700" htmlFor="">Email</label>
                <input type="email" className="mt-1 mb-4 w-full p-3 rounded-xl bg-gray-100" placeholder="Enter your email"
                onChange={(e) => setCredentials((prevState) => ({...prevState, email: e.target.value}))}
                />

                <label className="block text-sm font-medium text-gray-700" htmlFor="">Password</label>
                <input type="password" className="mt-1 mb-4 w-full p-3 rounded-xl bg-gray-100" placeholder="Enter your password"
                onChange={(e) => setCredentials((prevState) => ({...prevState, password: e.target.value}))}
                />

                <label className="block text-sm font-medium text-gray-700" htmlFor="">Confirm Passowrd</label>
                <input type="password" className="mt-1 mb-4 w-full p-3 rounded-xl bg-gray-100" placeholder="Confirm your password"
                onChange={(e) => setCredentials((prevState) => ({...prevState, cpassword: e.target.value}))}
                />
                
                {error && <div className="text-red-600 mb-3">{error}</div>}

                <div className="flex items-center justify-center"> 
                    <PrimaryButton label={submitting ? 'Creating...' : 'Create admin'} />
                </div>

            </form>
        </div>
    )
}