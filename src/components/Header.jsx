import { useEffect, useState } from "react"
import { IoMenuOutline } from "react-icons/io5";
import Navbar from "./Navbar";
import { RiCloseLargeLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";
export default function Header() { 
    const [active, setActive] = useState();
    const [showNav, setShowNav] = useState(false);
    const location = useLocation();
    useEffect(() => { 
        if (location.pathname === '/') {
            setActive('home');
        } else { 
            setActive(location.pathname.slice(1))
        }
    }, [location])
    return ( 
        <header className="flex w-full justify-between items-center px-12 py-4">
            <div className="flex items-center gap-3"> 
                <div className="text-gray-50 bg-[var(--primary)] p-3 w-10 h-10 flex items-center justify-center rounded-lg">
                    E
                </div>
                <div className="text-lg font-bold">
                    EduMaster
                </div>
            </div>
            {/* desktop navbar */}
            <Navbar active={active} className='md:flex hidden'/>

            {/* mobile navbar */}
            <div className="md:hidden flex text-4xl border-1 border-[var(--border-color)] rounded-lg p-1 hover:bg-[var(--primary)] hover:text-gray-50 transition-all duration-200 ease-linear cursor-pointer" onClick={() => setShowNav((prevState) => !prevState)}> 
                { 
                    showNav ? 
                    <RiCloseLargeLine /> 
                    : 
                    <IoMenuOutline/>   
                }
            </div>
            { 
                showNav &&
                <Navbar active={active} className='md:hidden flex flex-col absolute w-40 md:w-fit right-3 top-20 z-10' /> 
            }
        </header>
    )
}