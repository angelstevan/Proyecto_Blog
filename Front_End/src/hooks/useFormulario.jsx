import { useState } from "react";

const useFormulario = (objetoDatos = {}) => {

    const [Formulario, setFormulario] = useState(objetoDatos);


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




    return ( { Formulario, obtenerDatos, cambiado } );
}
 
export default useFormulario;