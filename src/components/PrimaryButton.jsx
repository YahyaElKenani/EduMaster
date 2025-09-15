export default function PrimaryButton({label, fn, className}) { 
    return ( 
        <button className={`bg-[var(--primary)] min-w-[100px] p-3 rounded-xl text-white cursor-pointer hover:opacity-70 transition-all duration-200 ease-linear w-fit ${className}`}
        onClick={fn}
        >
            {label}
        </button> 
    )
}