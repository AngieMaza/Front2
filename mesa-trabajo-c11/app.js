
const formulario = document.querySelector('form');
const nombre = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#pass');
const checkTerminos = document.querySelector('#Terms');
const registrar = document.querySelector('#registrar');
const loguear = document.querySelector('#loguear');

registrar.addEventListener('click',function (event) {

    if (!checkTerminos.checked) {
        alert('Debes aceptar los terminos y condiciones para loguear o registrarte')    
        event.preventDefault();
    }
    console.log (normalizar(nombre.value, email.value, password.value));
})

formulario.addEventListener('submit', function (event) {
    event.preventDefault();
});

function normalizar(nomb, correo, pass) {
    const datos = {
        name: nomb,
        email: correo,
        password: pass
    };
    return datos
}

