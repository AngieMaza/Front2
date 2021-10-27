window.addEventListener('load', function () {
    /* -------------------------------------------------------------------------- /
    /                                Logica Singup                               /
    / -------------------------------------------------------------------------- */
    const formulario = this.document.forms[0];
    const arrNodosInput = this.document.querySelectorAll('input');
    const url = 'https://ctd-todo-api.herokuapp.com/v1/users';
    formulario.addEventListener('submit', function (e) {

        e.preventDefault();
        const inputName = document.querySelector(".name");
        const inputLastName = document.querySelector(".lastName");
        const inputEmail = document.querySelector(".email");
        const inputPass = document.querySelector(".pass");
        const inputConfirmPass = document.querySelector(".confirPass");
        const datoUsuario = normalizacionSingUp(inputName, inputLastName, inputEmail, inputPass);
        const resultadoValidacion = validacionContrasenias(inputPass, inputConfirmPass) && camposVacios(arrNodosInput);
        console.log(datoUsuario);
        if (resultadoValidacion) {
            fetchApiSingUp(url, datoUsuario);
        }
        formulario.reset();
    })
})


function validacionContrasenias(password, password2) {
    const error = document.querySelector('.error');
    let resultado = false;
    if (password.value == password2.value) {
        error.classList.add('oculto');
        resultado = true;
    } else {
        error.classList.remove('oculto');
        resultado = false;
    }
    return resultado;
}
function camposVacios(array) {
    const vacio = document.querySelectorAll('.vacio');
    const esVacio = true;
    array.forEach((campo, i) => {
        if (campo.value) {
            vacio[i].classList.add('oculto');
        } else {
            vacio[i].classList.remove('oculto');
        }
    })
    return esVacio;
}
function normalizacionSingUp(nombre, apellido, email, password) {

    const datosUsuario = {
        firstName: nombre.value.trim(),
        lastName: apellido.value.trim(),
        email: email.value.toLowerCase().trim(),
        password: password.value.trim()
    }
    return datosUsuario;
}

function fetchApiSingUp(url, payload) {
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
                // accionar pensando en que el resultado de registro es valido
                localStorage.setItem('token', data.jwt);
                //redijo a la pantalla de loguin
                location.href = './index.html'
            }
        });
}