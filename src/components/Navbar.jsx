import NavItem from "./NavItem";

const tabs = ['home', 'lessons', 'exams', 'profile'];
export default function Navbar({active, className}) { 
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