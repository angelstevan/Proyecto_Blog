import { useState, useEffect } from "react";

interface Articulo {
    __id: number;
    titulo: string;
    contenido: string;
    autor: string;
    fecha: string;
    imagen: string;
} 

const Articulos = () => {

    const [articulos, setArticulos] = useState<Articulo[]>([]);

    useEffect(() => {
        fetchArticulos();
    }, []);

    async function fetchArticulos() {
        const ApiURL = "http://localhost:3900/api/listar/"; // Asegúrate de que esta URL sea correcta

        try {
        const peticion = await fetch(ApiURL, { method: "GET" });
        const datos = await peticion.json();

        console.log(datos);
        if (datos.status === "success") {
            setArticulos(datos.articulos);
        }
        } catch (error) {
        console.error("Error al cargar los artículos:", error);
        }
    }

    return (
    <>
      {
      
      articulos.length>=1?(
        
        articulos.map((articulo) => {
        return(
        <>
          <div key={articulo.__id} className="flex flex-col m-12">
            <div className="flex flex-col rounded-full sm:flex-row border border-gray-700 py-1 px-1 w-full text-center sm:text-left shadow-2xl">
              <div className="flex-shrink-0  m-4 w-16 h-16 rounded-full bg-gray-400 self-center"> <img src={articulo.imagen} alt={articulo.imagen} /></div>
              <div className="flex flex-col py-2 pr-2">
                <h4 className="text-lg font-light">{articulo.titulo}</h4>
                <h5 className="text-lg text-amber-500 font-light">{articulo.contenido}</h5>
                <p className="text-sm font-hairline">{articulo.fecha}</p>
              </div>
            </div>
          </div>
        </>);
      })

      ):(<h1>No hay Datos</h1>)
      
      
      
      
      
      
      
      }
    
    </>
  );
}
 
export default Articulos;