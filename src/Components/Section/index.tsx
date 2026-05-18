type SectionProps ={
    children: React.ReactNode;
    className?: string;
}

export function Section({children, className}:SectionProps){
    return(
        <section className={`w-full p-4 md:px-16 lg:px-25 ${className}`}>
            {children}
        </section>
    )
}