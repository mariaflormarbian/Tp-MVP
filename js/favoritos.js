let idFavoritos = JSON.parse(localStorage.getItem("id"));

let personaje;
if (idFavoritos !== null) {
  for (let id of idFavoritos) {
    personaje = id + ",";
    let favoritos = document.querySelector("#favoritos");

    fetch(`https://rickandmortyapi.com/api/character/${personaje}`)
      .then((response) => response.json())
      .then((data) => {
        for (let dato of data) {
          let lista = document.createElement("li");
          let figure = document.createElement("figure");
          let imagen = document.createElement("img");
          let nombre = document.createElement("h3");
          let borrar = document.createElement("button");
          borrar.innerHTML = "Borrar";
          nombre.innerHTML = dato.name;
          imagen.src = dato.image;
          figure.append(imagen, nombre, borrar);
          lista.append(figure);
          figure.className = "mx-auto";
          lista.className = "card-sm col-sm-1 card-md col-md-3 mx-auto";
          borrar.innerHTML = "Borrar";
          borrar.dataset.id = dato.id;
          borrar.classList = "btnBorrar";
          favoritos.appendChild(lista);

          borrar.addEventListener("click", (e) => {
          
            let nuevoFav = (idFavoritos = idFavoritos.filter((id) => id !== e.target.dataset.id));
            localStorage.setItem("id", JSON.stringify(nuevoFav));
            lista.style.display = "none";
          });
        }
      })
      .catch((err) => console.log(err));
  }
}

if (idFavoritos.length === 0) {
    let noFavoritos = document.querySelector("#no-favoritos");
  noFavoritos.innerHTML = "No tenes ningún <span>FAVORITO</span>";
}
