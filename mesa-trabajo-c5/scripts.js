function cambiarTema() {
  const tema = document.body.classList.toggle('dark');

  const boton = document.querySelector('.theme button');
  if(tema){
    boton.innerHTML = 'Cambiar tema <i class="fas fa-sun"></i>';
  }else{
    boton.innerHTML = 'Cambiar tema <i class="fas fa-moon"></i>';
  }
}

  
let contenedor = document.querySelector('.contenedor');
function renderizarItems() {

  listadoFelinos.forEach(felino => {
    const plantilla = `
<div class="item">
<img src=${felino.imgUrl}>
<h2>${felino.title}</h2>
<p>
  ${felino.description}
</p>
</div>
`
    contenedor.innerHTML += plantilla

  });

}

renderizarItems();