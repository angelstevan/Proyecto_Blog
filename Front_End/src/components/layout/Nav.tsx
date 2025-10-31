import { NavLink } from "react-router-dom";
const Nav = () => {
    return (
        <nav className="flex bg-gray-200 h-auto p-2 text-gray-600 justify-evenly mb-1.5">
            <ul className="flex gap-12">
                <li>
                    <NavLink to="/articulo">
                        Articulos
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/crearArticulos">
                        Crear Articulos
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
