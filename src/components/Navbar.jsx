import { useLocation } from "react-router-dom";
import NavItem from "./NavItem";
import { useEffect, useState } from "react";

const tabs = ['home', 'lessons', 'exams', 'profile'];
export default function Navbar({className}) { 
    const [active, setActive] = useState();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/') { 
            setActive('home');
        } else { 
            setActive(location.pathname.slice(1).toLocaleLowerCase());
        }
    }, [location])
    return ( 
        <nav className={`gap-5 p-3 bg-[var(--primary-bg)] rounded-4xl text-[var(--primary)] ${className}`}> 
            { 
                tabs.map((item, index) => ( 
                    <NavItem id={item} key={index} active={active}>
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                    </NavItem>
                ))
            }
        </nav>
    )
}