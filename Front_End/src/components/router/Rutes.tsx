/* import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "../layout/Header";
import Nav from "../layout/Nav";
import Footer from "../layout/Footer";
import Sidebar from "../layout/SideBar";
import Articulo from "../pages/Articulos";
import CrearArticulos from "../pages/CrearArticulos"; */
import FormularioBase from "../pages/FormularioBase";

const Rutas = () => {
  return (
    /* <BrowserRouter>
      <Header />
      <Nav />
      <section className="flex flex-row flex-wrap h-lvh p-2">
        <article className="flex flex-wrap flex-col basis-3/4">
          <Routes>

            <Route path="/articulo" element={<Articulo />}></Route>
            <Route path="/crearArticulos" element={<CrearArticulos />}></Route>
          </Routes>
        </article>
        <aside className="w-full lg:w-80 h-full sticky top-0">
          <Sidebar /> 
        </aside>
      </section>
      <Footer />
    </BrowserRouter> */

    <FormularioBase/>
  );
};

export default Rutas;
