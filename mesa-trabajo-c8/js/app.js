let section = document.querySelector(".contenedor");
noticias.map(articleMapping).forEach(noticia => render(section, noticia));

function articleMapping(noticia) {
    let tipo = "Internacional";
    if (noticia.tipoNacional) {
        tipo = "Nacional"
    }
    return `<article>
        <div class="fecha">${noticia.fecha}</div>
        <h2>${noticia.titulo}</h2>
        <p>
        ${noticia.descripcion}
        </p>
        <img src="${noticia.imgUrl}"alt="">
        <div class ="${tipo}">${tipo}</div>
    </article>`
}
function render(where, what) {
    if (typeof what != "object") {
        what = [what]
    }
    what.forEach(that => where.innerHTML += that)
}