export default function Header({ imageSrc, title}) {
    return (
        <header className="header">
            <img 
                src={imageSrc} 
                alt="Logo"
                className="logo"
            />
            <h1>{title}</h1>
        </header>
    )
}