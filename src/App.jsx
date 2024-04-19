import { useEffect, useState } from 'react';//importamos los hooks
import './estilo.css';//nos traemos el css 
import Formulario from './Formulario.jsx';//importamos el componente formulario
import Tarea from './Tarea.jsx';//importamos el componente Tarea
//creamos el componente App
function App() {
  const [tareas, setTareas] = useState([]);//definimos el estado tareas donde inicialmemte es un array vacio

  //para que se ejecute una vez que aparezca el componente
  useEffect(() => {
    fetch(`https://proyecto-tarea-back.onrender.com/api-tareas`)//hacemos la solicitud  para traernos las tareas
      .then(respuesta => respuesta.json())//nos traemos la respuesta en json
      .then(respuesta => {
        setTareas(respuesta);//actualizamos con la funcion actualizadora
      });
  }, []);
  //funcion para crear la tarea por parte del usuario
  function crearTarea(tarea) {
    setTareas([...tareas, tarea]);//añadimos la tarea creada al array de tareas


  }
  //funcion para borrar la tarea por parte del usuario
  function borrarTarea(id) {
    fetch(`https://proyecto-tarea-back.onrender.com/api-tareas/borrar/` + id, {
      method: "DELETE"
    })
      .then(respuesta => respuesta.json())
      .then(({ resultado }) => {
        console.log(resultado)
        if (resultado == "ok") {
          return setTareas(tareas.filter(tarea => tarea.id != id))//actualizamos las tareas con el filter quitando el id que hemos dado
        }
        console.log("error usuario")
      })
  }


  //funcion para actualizar estado por parte del usuario
  
  function actualizarEstado(id) {
    return fetch(`https://proyecto-tarea-back.onrender.com/api-tareas/actualizar/${id}/2`, {
      method: "PUT"
    })
      .then(respuesta => respuesta.json())
      .then(({ resultado }) => {
        console.log(resultado);
        if (resultado == "ok") {
           // Creamos un nuevo array de tareas actualizando el estado de la tarea correspondiente
          let nuevoEstado = tareas.map(tarea => {
            if (tarea.id == id) {
              tarea.terminada = !tarea.terminada;//actualizamos el estado de terminada a no terminada
            }
            return tarea;//retornamos la tarea despues de actualizar el estado
          });

          setTareas(nuevoEstado); // Actualizamos el estado con el nuevo array
        }
        return tareas; // Retornamos las tareas
      })
      .catch(error => {
        console.error('Hubo un error al actualizar el estado:', error);
        return tareas; // Retorna el array original en caso de error
      });
  }



  //funcion para actualizar texto por parte del usuario
  function actualizarTexto(nuevaTarea) {
    setTareas(tareas.map(tarea => {
      if (tarea.id == nuevaTarea.id) {// Compruebo si la tarea actual coincide con la nueva tarea por su id//
        tarea.tarea = nuevaTarea.tarea;// Actualiza el texto de la tarea actual con el texto de la nueva tarea//
        tarea.terminada = nuevaTarea.terminada;// Actualiza el estado de finalización de la tarea actual con el estado de la nueva tarea//
      }
      return tarea;// Retorna la tarea actual, ya sea actualizada o sin cambios//
    }));
  }

//retornamos
  return (
    <>
      <Formulario crearTarea={crearTarea} />
      <section className='tareas'>
        {tareas.length > 0 && tareas.map(tarea => (
          <Tarea
            key={tarea.id}//asignamos una clave unica a cada tarea
            id={tarea.id}// damos el id de la tarea como prop
            tarea={tarea.tarea}//pasamos la tarea como prop
            terminada={tarea.terminada}//pasamos el estado terminada como prop
            borrarTarea={borrarTarea}//pasamos la fncion borrarTarea
            actualizarEstado={actualizarEstado}//pasamos la funcion actualizarEstado
            actualizarTexto={actualizarTexto}//pasamos la funcion Actualizar Texto





          />
        ))}
      </section>
    </>
  );
}

export default App;//exportamos la App