window.addEventListener('load', function () {
    /* -------------------------------------------------------------------------- */
    /*                              logica del login                              */
    /* -------------------------------------------------------------------------- */

    const formulario = this.document.forms[0];
    const inputEmail = this.document.querySelector('#inputEmail');
    const inputPassword = this.document.querySelector('#inputPassword');
    const apiUrl = 'https://ctd-todo-api.herokuapp.com/v1/users/login'
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();
        const checkbox = document.querySelector('#permanecerLog');
        const resultadoValidacion = validarNoVacio(inputEmail.value) && validarNoVacio(inputPassword.value);
        if (resultadoValidacion) {
            //desplegamos la logica de una validacion correcta
            const datosUsuario = normalizacionLogin(inputEmail.value, inputPassword.value)
            console.log(datosUsuario);
            fetchApiLogin(apiUrl, datosUsuario, checkbox.checked);
        } else {
            console.log("no pasó alguna validacion");
        }
        formulario.reset();
    });
});

/* -------------------------------------------------------------------------- */
/*                               funcionalidades                              */
/* -------------------------------------------------------------------------- */

function validarNoVacio(dato) {
    let restultado = true;
    // causales de que no pase la validacion
    if (dato === "") {
        restultado = false;
    }
    return restultado;
}

function normalizacionLogin(email, password) {
    const usuario = {
        email: email.toLowerCase().trim(),
        password: password.trim()
    }
    return usuario;
}

function fetchApiLogin(url, payload,infocheck) {
    
    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    }
    fetch(url, settings)
        .then(respuesta => respuesta.json())
        .then(data => {
            console.log(data);
            if (data.jwt) {
                // accionar pensando en que el resultado es un usuario y contraseña correctos
                if (infocheck) {
                    localStorage.setItem('token', data.jwt);
                } else {
                    sessionStorage.setItem('token', data.jwt);
                    
                }
                //redijo a la pantalla de tareas
                location.href = './mis-tareas.html';
            }
        });
}

