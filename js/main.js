let web = document.querySelector('body');
const diversionOffline = document.getElementById('offline-video');

window.addEventListener('offline', event => {
    console.log('Estoy Offline!!');
  
})

window.addEventListener('online', event => {
    console.log('Estoy online!!');

})

if (!navigator.onLine){
    console.log('Estoy sin conexion, profe!');
    body.style.background = 'grey';
    diversionOffline.style.display ='block';


    
}



const button = document.getElementById('sendButton');
const inputElement = document.getElementById('search');
const resultDiv = document.getElementById('main');
let favorito = [];

const constructorDeQueryDeRM = personaje => `query {
    characters(filter:{name:"${personaje}"}) {
   
        results {
            id
            name
            image
            gender
            species
            episode{name}
            
          }
      
        }
      }`





button.addEventListener('click', ()=>{
    const valorDeInput = inputElement.value;
    
  if (inputElement.value.length == 0) {
    alert("Por favor escriba el nombre del personaje que desaea buscar");
  } else {
    showSpinner();setTimeout(() => { this.spinner.hide(); }, 20000,);

      inputElement.value = "";
  }


    const options = {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: constructorDeQueryDeRM(valorDeInput)
        })
    }

    fetch('https://rickandmortyapi.com/graphql', options)
    .then(function (response){
        console.log('response cruda', response);

        return response.json();
    }).then(datos=> {
        createPersonaje(datos);
        spinner.style.display="none";
    }).catch(function (err){
        console.log('Algo fallo', err);
    })
});




const createPersonaje = datos => {
    

    resultDiv.innerHTML = '';
    for (let dato of datos.data.characters.results) {
        let lista = document.createElement ('li');
        let figure = document.createElement ('figure');
        let imagen = document.createElement ('img');
        let nombre = document.createElement ('h3');
        let sexo = document.createElement ('p');
        let especie = document.createElement('p');

        let episodio = document.createElement('p');
        let episodios =JSON.stringify(dato.episode) ;
            episodio.innerHTML += 'Participa de:'+' '+ episodios.length + ' ' + 'Episodios';


        let btn = document.createElement ('button');
        btn.innerHTML ='Añadir a Favoritos';
        nombre.innerHTML = dato.name;
        imagen.src = dato.image;
        especie.innerHTML += 'Su especie es: ' + ' ' + dato.species;

        if(dato.species == 'Human'){
           dato.species = 'Humano';
        }else if (dato.species == 'Humanoid') {
            dato.species = 'Humanoide';
        }else if (dato.species == 'Alien') {
            dato.species = 'Alien';
        }else {
            dato.species = 'Cronenberg';
        }

        if(dato.gender == 'Male'){
            dato.gender = 'Masculino';
         }else if (dato.gender == 'Female') {
             dato.gender = 'Femenino';
         }else if (dato.gender == 'Genderless') {
             dato.gender = 'Sin género';
         }else {
             dato.gender = 'Desconocido';
         }
 


        sexo.innerHTML += 'El sexo es:' + ' ' + dato.gender;
        figure.append(imagen, nombre, sexo, especie, episodio, btn);
        lista.append(figure);
        resultDiv.appendChild(lista);
        figure.className='mx-auto'
        lista.className='card-sm col-sm-1 card-md col-md-3 mx-auto'

        btn.className='btnFavorito';
        btn.dataset.id=dato.id;
    }

    let agregar = document.querySelectorAll('.btnFavorito');
    for (let boton of agregar) {
        boton.addEventListener('click', e => {
            let id = e.target.dataset.id;
    
            if (favorito.indexOf(id) == -1) {
                favorito.push(id);
                localStorage.setItem('id', JSON.stringify(favorito));
            }
        });
    }
    
}


function showSpinner() {
    spinner.classList.toggle('d-none');
}



