window.addEventListener('load', function () {


    const form = this.document.forms[0]
    const key = localStorage.getItem('token');
    const url = 'https://ctd-todo-api.herokuapp.com/v1';
    const inputText = this.document.querySelector('#nuevaTarea');
    obtenerDatosUsuario(`${url}/users/getMe`,key)
    traerTareasUsuario(`${url}/tasks`, key);

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        fetchApiTareaPost(`${url}/tasks`, inputText.value, key);
        form.reset()
    })
})

function obtenerDatosUsuario(url,key) {
    const settings = {
        method: 'GET',
        headers: {
            Authorization: key
        },
        
    }
    fetch(url,settings)
    .then(respuesta => respuesta.json())
    .then(data =>{
        console.log(data);
    })
    
}

function fetchApiTareaPost(url, text, key) {
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
        });
}

function traerTareasUsuario(url, key) {
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
            <div class="not-done"></div>
            <div class="descripcion">
            <p class="nombre">${tarea.description}</p>
            <p class="timestamp">${fecha.toLocaleDateString()}</p>
            </div>
        </li>
        `
        } else {
            tareasPendientes += ` 
            <li class="tarea">
            <div class="not-done"></div>
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
}

