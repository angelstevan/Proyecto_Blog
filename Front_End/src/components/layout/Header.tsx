import reactLogo from '../../assets/react.svg'

const Header = () => {
    return (
        <header className="flex bg-gray-300 text-black px-2 py-6 gap-6 basis-full mb-1 shadow-2xs">
            <img src={reactLogo} alt="logo react"/>
            <h1 className="text-4xl font-extrabold text-white drop-shadow">
                Examen
            </h1>  
        </header>
    );
};

export default Header;
