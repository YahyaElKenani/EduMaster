const activeTabStyles = 
`text-gray-50 bg-[var(--primary)] rounded-4xl cursor-not-allowed`
export default function NavItem({active, children, id}) { 
    return ( 
        <div className={`${active === id ? activeTabStyles : 'hover-tab' } p-3 text-center`}>{children}</div>
    )
}