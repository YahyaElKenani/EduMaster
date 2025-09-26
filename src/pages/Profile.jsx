import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { CgProfile } from "react-icons/cg";
import { AuthContext } from "../context/context";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
const inputStyles = `mt-1 mb-4 w-full p-3 rounded-xl bg-gray-100`
export default function Profile() { 
    const [user, setUser] = useState();
    const [newUser, setNewUser] = useState({fullName: '', email: '', phoneNumber: '', classLevel: ''});
    const [classLevels, setClassLevels] = useState(['Grade 1 Secondary', 'Grade 2 Secondary', 'Grade 3 Secondary']);
    const navigate = useNavigate();
    const {token} = useContext(AuthContext);
    const getUser = async () => { 
        const res = await fetch(`https://edu-master-psi.vercel.app/user/`, { 
            method: 'GET',
            headers: {
                token: token
            }
        })
        const result = await res.json();
        setUser(result?.data);
    }

    useEffect(() => {getUser()}, []);
    useEffect(() => {
        if (user) { 
            setNewUser({
                fullName: user?.fullName,
                email: user?.email,
                phoneNumber: user?.phoneNumber,
                classLevel: user?.classLevel
            })
        }
        const filteredClassLevels = classLevels.filter((item) => item !== user?.classLevel);
        setClassLevels(filteredClassLevels);
    }, [user]);

    const handleSubmit = async (e) => { 
        e.preventDefault(); 
        const res = await fetch (`https://edu-master-psi.vercel.app/user/${user?._id}`, {
            method: 'PUT',
            body: JSON.stringify(newUser),
            headers: { 
                'content-type': 'application/json',
                token: token
            }
        })
        const result = await res.json();
    }

    return ( 
        <> 
            <Header />
            <main>
                <div className="bg-[var(--primary-bg)] p-12 flex flex-col items-center md:flex-row md:justify-between w-full gap-4"> 
                    <div className="w-full flex items-center justify-between"> 
                        <div className="flex items-center gap-3"> 
                            <CgProfile size={24} />
                            <h1 className="text-2xl font-bold">Profile</h1>
                        </div>
                    </div>
                </div>

                {
                    user && 
                        <div className="w-full flex justify-center p-12">
                            <form onSubmit={handleSubmit} className="flex flex-col p-5 rounded-2xl border-2 border-[var(--border-color)] w-[50dvw]">
                                <label>Full Name</label>
                                <input type="text" placeholder={user?.fullName} className={inputStyles} 
                                onChange={(e) => setNewUser((prevState) => ({...prevState, fullName: e.target.value}))}
                                />

                                <label>Email Address</label>
                                <input type="email" placeholder={user?.email} className={inputStyles} 
                                onChange={(e) => setNewUser((prevState) => ({...prevState, email: e.target.value}))}
                                />

                                <label>Phone Number</label>
                                <input type="number" placeholder={user?.phoneNumber} className={inputStyles}
                                onChange={(e) => setNewUser((prevState) => ({...prevState, phoneNumber: e.target.value}))}
                                />
                                

                                <div className="flex flex-col gap-1 text-lg">
                                    <label>Class Level</label>
                                    <select name="class-level" id="class-level" className={inputStyles}
                                    onChange={(e) => setNewUser((prevState) => ({...prevState, classLevel: e.target.value}))}
                                    >
                                        <option value={user?.classLevel}>{user?.classLevel}</option>
                                        { 
                                            classLevels.map((item) => (
                                                <option value={item}>{item}</option>
                                            ))
                                        }   
                                    </select>
                                </div>
                                
                                <PrimaryButton label={'Submit Changes'} className={'self-center'} />
                                <p 
                                onClick={() => navigate('/reset-password', {state: {user: user}})} 
                                className="text-[var(--primary)] self-center mt-2 hover:text-[var(--primary-hover)] 
                                transition-all duration-200 ease-linear cursor-pointer">
                                    Reset password?
                                    </p>
                            </form>
                        </div>
                }
            </main>
            <Footer />
        </>
    )
}