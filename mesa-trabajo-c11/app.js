
const formulario = document.querySelector('form');
const nombre = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#pass');
const checkTerminos = document.querySelector('#Terms');
const registrar = document.querySelector('#registrar');
const loguear = document.querySelector('#loguear');
const nombError = document.querySelector('#errorNombre');
const mailError = document.querySelector('#errorEmail');
const passError = document.querySelector('#errorPass');

registrar.addEventListener('click',function (event) {

    if (!checkTerminos.checked) {
        alert('Debes aceptar los terminos y condiciones para loguear o registrarte')    
        event.preventDefault();
    }

    if(!validarNombre(nombre.value)){
        nombError.classList.remove('oculto')
        nombre.classList.add('error')
        event.preventDefault();
    }else{
        nombError.classList.add('oculto')
        nombre.classList.remove('error')
    }

    if (!validacionMail(email.value)) {
        mailError.classList.remove('oculto')
        email.classList.add('error')
        event.preventDefault();
    }else{
        mailError.classList.add('oculto')
        email.classList.remove('error')
    }

    if (!validacionContrasenia(password.value)) {
        passError.classList.remove('oculto')
        password.classList.add('error')
        event.preventDefault();
    }else{
        passError.classList.add('oculto')
        password.classList.remove('error')
    }

    if(nombre.value.lenght == 0 ||email.value.lenght == 0||password.value.lenght == 0) {
        alert('Debes complerar los campor para loguearte');
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

 function validarNombre(nom) {
     nombreValido = true;
     //validacion de menos de 25 caracteres
     let caracteresInvalidos = [ "0","1","2","3","4","5","6","7","8","9",".","-",","];
     if(nom.lenght>26){
        nombreValido = false;
     }
     caracteresInvalidos.forEach( caracter =>{
        if(nom.includes(caracter)){
            nombreValido = false;
        }
    });
    return nombreValido;
 }

function validacionMail(correo) {
    emailValido = true;
    if(!correo.includes('@') && !correo.includes('.com')){
        emailValido = false;
    }
}

function validacionContrasenia(pass) {
    contraseniaValida= true;
    if(pass > 20 || pass < 8) {
        contraseniaValida = false;
    }
    
}