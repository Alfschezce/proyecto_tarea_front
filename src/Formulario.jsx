
import { useEffect, useState } from 'react'//importamos los hooks de react
//desglosamos el componente formulario
function Formulario({ crearTarea }) {

    //definimos un estado  del texto
    let [textoTemporal, setTextoTemporal] = useState("")



    return (
        <>

            <form onSubmit={evento => {
                evento.preventDefault()//prevenimos que se envie el formulario directamente
                //hacemos una peticion con el metodo POST para crear la tarea
                fetch("https://proyecto-tarea-back.onrender.com/api-tareas/crear", {
                    method: "POST",
                    body: JSON.stringify({ tarea: textoTemporal.trim() }),// Enviamos la tarea al servidor después de quitar los espacios en blanco al principio y al final
                    headers: { "Content-type": "application/json" }
                })
                    .then(respuesta => respuesta.json())// Convertimos la respuesta a JSON
                    .then(({ id }) => {
                        //Si la respuesta del servidor tiene el id, llamo a la función crearTarea con un objeto que llevara el texto temporal, el estado terminada y el id
                        if (id) {
                            crearTarea({ tarea: textoTemporal, terminada: false, id })


                            //reestablecemos el texto a vacio
                            return setTextoTemporal("")
                        }//si hay error
                        console.log("error")
                    })

            }}
            >
                <input type="text" placeholder="¿Qué hay que hacer?"
                    value={textoTemporal}
                    //actualizamos el estado de textoTemporal
                    onChange={evento => setTextoTemporal(evento.target.value)} />
                <input type="submit" value="Crear tarea" />
            </form>
        </>
    )
}

export default Formulario; //exportamos el componente formulario


