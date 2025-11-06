import { useState } from "react";
import { Form } from "react-router-dom";

const FormularioBase = () => {

    const [Formulario, setFormulario] = useState({});


    const serializarFormulario = (Formulario) => {

        const formData = new FormData(Formulario);

        const objetosDatos = {}

        for (let [name, value] of formData) {

            objetosDatos[name] = value;
            
        }

        return objetosDatos;

    }

    const obtenerDatos = (e) => {

        e.preventDefault();
        
        const datos = serializarFormulario(e.target);

        setFormulario(datos);

    }

    const cambiado = ({target}) => {

        const [name, value] = target;
        setFormulario(
            {
                ...Formulario,[name]: value,
            }
        )

    }



    //render del componente
    return ( 
        <>

            <div className="bg-white border border-4 rounded-lg shadow relative m-10">

                <div className="flex items-start justify-between p-5 border-b rounded-t">
                    <h3 className="text-xl font-semibold">
                        Agregar Articulo
                    </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="product-modal">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <form onSubmit={obtenerDatos} action="#">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label className="text-sm font-medium text-gray-900 block mb-2">Titulo</label>
                                <input type="text" name="titulo" id="titulo" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Titulo" required/>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label className="text-sm font-medium text-gray-900 block mb-2">Fecha</label>
                                <input type="text" name="fecha" id="fecha" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Fecha" required/>
                            </div>
                            <div className="col-span-full">
                                <label className="text-sm font-medium text-gray-900 block mb-2">Contenido</label>
                                <textarea id="contenido" name="contenido" onChange={cambiado} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Detalles"></textarea>
                            </div>
                            <div className="rounded-md border border-indigo-500 bg-gray-50 p-4 shadow-md w-36 justify-center">
                                <label className="flex flex-col items-center gap-2 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 fill-white stroke-indigo-500" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="text-gray-600 font-medium">Subir Imagen</span>
                                </label>
                                <input id="imagen" name="imagen" type="file" className="hidden" onChange={cambiado}/>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 rounded-b">
                            <button type="submit" className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Agregar</button>
                        </div>
                    </form>
                </div>

            </div>

        </>
    );

}
 
export default FormularioBase;