const key = localStorage.getItem('token')||sessionStorage.getItem('token');
const url = 'https://ctd-todo-api.herokuapp.com/v1';

window.addEventListener('load', function () {
    const form = this.document.forms[0];
    const inputText = this.document.querySelector('#nuevaTarea');
    const botonCierreSesion = this.document.querySelector('#closeApp');
    obtenerDatosUsuario(`${url}/users/getMe`, key)
    traerTareasUsuario(`${url}/tasks`, key);
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        fetchApiTareaPost(`${url}/tasks`, inputText.value, key);
        form.reset()
    })
    botonCierreSesion.addEventListener('click', function () {
        resultadoConfirm = confirm('¿Realmente quieres cerrar la sesión?')
        if (resultadoConfirm) {
            cerrarSesion()
        }
    })
});

function cerrarSesion() {
    localStorage.clear();
    sessionStorage.clear();
    location.href = "./index.html"
}

function obtenerDatosUsuario(url) {
    const settings = {
        method: 'GET',
        headers: {
            Authorization: key
        },
    }
    fetch(url, settings)
        .then(respuesta => respuesta.json())
        .then(data => {
            console.log(data);
            if (!data.id) {
                location.href = "./index.html"
            }
            document.querySelector(".user-info p").innerHTML = data.firstName + " " + data.lastName
        })
        .catch(error => {
            window.location.href = "./index.html"
        });
}

function fetchApiTareaPost(url, text) {
    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: key
        },
        body: JSON.stringify(
            {
                description: text,
                completed: false
            }
        )
    }
    fetch(url, settings)
        .then(respuesta => respuesta.json())
        .then(data => {
            console.log(data);
            traerTareasUsuario(url)
        });
}

function traerTareasUsuario(url) {
    const settings = {
        method: 'GET',
        headers: {
            Authorization: key
        },
    }
    fetch(url, settings)
        .then(respuesta => respuesta.json())
        .then(data => {
            armarListadoTareas(data);
        })
}

function armarListadoTareas(arrayTareas) {
    tareasPendientes = "";
    tareasCompletas = "";
    const pendientes = document.querySelector('.tareas-pendientes');
    const completas = document.querySelector('.tareas-terminadas');
    arrayTareas.forEach(tarea => {
        let fecha = new Date(tarea.createdAt);
        if (tarea.completed) {
            tareasCompletas += ` 
            <li class="tarea">
            <div class="done"></div>
            <div class="descripcion">
            <p class="nombre">${tarea.description}</p>
            <div>
            <button><i id="${tarea.id}" class="fas
            fa-undo-alt change"></i></button>
            <button><i id="${tarea.id}" class="far
            fa-trash-alt"></i></button>
            </div>
            </div>
            </li>
            `
        } else {
            tareasPendientes += ` 
            <li class="tarea">
            <div class="not-done" id ="${tarea.id}"></div>
            <div class="descripcion">
            <p class="nombre">${tarea.description}</p>
            <p class="timestamp">${fecha.toLocaleDateString()}</p>
            </div>
        </li>
        `
        }
    });
    pendientes.innerHTML = tareasPendientes;
    completas.innerHTML = tareasCompletas;
    const botonTaskDone = document.querySelectorAll('.not-done');
    const botonTaskUndo = document.querySelectorAll('.fa-undo-alt');
    const botonTaskTrash = document.querySelectorAll('.fa-trash-alt');
    botonTaskDone.forEach(boton => {
        boton.addEventListener('click', function (e) {
            resultadoConfirm = confirm('¿Has completado la tarea?')
            if (resultadoConfirm) {
                let tareaId = e.target.id
                actualizarEstadoTareaHecho(tareaId);
            }
        })
    });
    botonTaskUndo.forEach(boton => {
        boton.addEventListener('click', function (e) {
            resultadoConfirm = confirm('¿Quieres volver a poner esta tarea como pendiente?')
            if (resultadoConfirm) {
                let tareaId = e.target.id
                actualizarEstadoTareaPendiente(tareaId);
            }
        })
    });
    botonTaskTrash.forEach(boton => {
        boton.addEventListener('click', function (e) {
            resultadoConfirm = confirm('¿Deseas borrar la tarea?')
            if (resultadoConfirm) {
                let tareaId = e.target.id
                borrarTarea(tareaId);
            }
        })
    });

}

function actualizarEstadoTareaHecho(id) {
    const settings = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: key
        },
        body: JSON.stringify(
            {
                completed: true
            }
        )
    }
    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, settings)
        .then(respuesta => respuesta.json())
        .then(data => {
            console.log(data);
            traerTareasUsuario("https://ctd-todo-api.herokuapp.com/v1/tasks", key)
        });
}

function actualizarEstadoTareaPendiente(id) {
    const settings = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: key
        },
        body: JSON.stringify(
            {
                completed: false
            }
        )
    }
    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, settings)
        .then(respuesta => respuesta.json())
        .then(data => {
            console.log(data);
            traerTareasUsuario("https://ctd-todo-api.herokuapp.com/v1/tasks", key)
        });
}

function borrarTarea(id) {
    const settings = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: key
        },
        body: JSON.stringify(
            {
                completed: false
            }
        )
    }
    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, settings)
        .then(respuesta => respuesta.json())
        .then(data => {
            console.log(data);
            traerTareasUsuario("https://ctd-todo-api.herokuapp.com/v1/tasks", key)
        });
}

