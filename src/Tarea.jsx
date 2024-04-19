import { useState } from "react";
//creamos la funcion tarea y le pasamos las props
function Tarea({ id, tarea, terminada, borrarTarea, actualizarEstado, actualizarTexto }) {

  //declaramos un estado y un actualizador de estado para editando y nuevatarea
  const [editando, setEditando] = useState(false);
  const [nuevaTarea, setNuevaTarea] = useState(tarea);
  //funcion actualizar que toma como parametro id
  function actualizar(id) {
    fetch(`https://proyecto-tarea-back.onrender.com/api-tareas/actualizar/${id}/1`, {
      method: "PUT",
      body: JSON.stringify({ tarea: nuevaTarea.trim() }),//hacemos trim para evitar espacios al principio y final
      headers: { "Content-type": "application/json" }//cabeceras del contenido json
    })
      .then((respuesta) => respuesta.json())//nos traemos la respuesta
      .then(({ resultado }) => {
        //si el resultado es ok, 
        if (resultado == "ok") {
          console.log("Tarea antes de actualizar:", nuevaTarea);
          actualizarTexto({ tarea: nuevaTarea, terminada: false, id })// Llamamos a la función actualizarTexto con los nuevos datos de la tarea
          setNuevaTarea(nuevaTarea)//actualizamos el valor de nuevaTarea
          setEditando(false);//cambiamos a false

          console.log("Nueva tarea:", nuevaTarea);


        }
      })//si hay error
      .catch((error) => {
        console.error("Error al actualizar:", error);
      });
  }


// ponemos la tarea para editar  o un input dependiendo del estado de edición
//si editando es true  mostramos el input para poder editar. el valor sera nuevaTarea y se actualizara el estado  con setNuevaTarea//
//si editando es false mostramos el h2 //

  return (
    <div className="tarea" key={id}>
      {editando ? (
        <input
          type="text"
          className="visible"
          value={nuevaTarea}
          onChange={(evento) => setNuevaTarea(evento.target.value)}
        />
      ) : (
        <h2 className={!editando ? "visible" : ""}>{tarea}</h2>
      )}
      <button
        className="boton"
        onClick={() => {
          if (editando) {// Si estamos editando
            actualizar(id);//llamamos la funcion actualizar pasandole el id

          } else {//si no estamos editando
            setNuevaTarea(tarea);// Ponemos  el valor original de la tarea
            setEditando(true);//volvemos a modo editar
          }
        }}
      >
        {editando ? "Guardar" : "Editar"}
      </button>
      {/* Botón para borrar la tarea */}
      <button className="boton" onClick={() => borrarTarea(id)}>
        Borrar
      </button>
      {/* Botón para marcar la tarea como terminada o no terminada */}
      <button
        className={`estado ${terminada ? "terminada" : ""}`}
        onClick={() => actualizarEstado(id)}
      >
        <span></span>
      </button>
    </div>
  );
}

export default Tarea;//exportamos el componente Tarea