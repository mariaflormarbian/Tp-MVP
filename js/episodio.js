var navbar = document.getElementById('navbar');

window.addEventListener('offline', event => {
    console.log('Estoy Offline!!');
    navbar.classList.add('bg-dark');
})

window.addEventListener('online', event => {
    console.log('Estoy online!!');
    navbar.classList.remove('bg-dark');
})

if (!navigator.onLine){
    console.log('Estoy sin conexion, profe!');
}



const button = document.getElementById('sendButton');
const inputElement = document.getElementById('search');
const results = document.getElementById('epis');






button.addEventListener('click', ()=>{
    const valorDeInput = inputElement.value;
    
  if (inputElement.value.length == 0) {
    alert("Por favor escriba el número del capítulo que desee buscar");
  }else if (isNaN(inputElement.value) || inputElement.value == "" || inputElement.value == undefined){
    alert("Ingrese valores numéricos");
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
        query: constructorDeQueryDeEp(valorDeInput)
    })
}

fetch('https://rickandmortyapi.com/graphql', options)
.then(function (response){
    console.log('response cruda', response);

    return response.json();
}).then(datos=> {
    createEpisodio(datos);
    spinner.style.display="none";
}).catch(function (err){
    console.log('Algo fallo', err);
})
});






const constructorDeQueryDeEp = episodio => `query {
  
    episodesByIds(ids: [${episodio}]) {
      name
      air_date
      episode
    }
  }`











  const createEpisodio = datos => {
    
    for (let dato of datos.data.episodesByIds) {
        let contenedor = document.createElement ('div');
        let lista = document.createElement ('li');
        let name = document.createElement ('h2');
        let date = document.createElement ('p');
        let ep = document.createElement ('p');
       
        name.innerHTML += 'El nombre del capítulo es:' + ' ' + dato.name;
        date.innerHTML += 'El día que se estrenó fue el:' + ' ' + dato.air_date;
        ep.innerHTML += 'Su código de episodio es:' + ' ' + dato.episode;
        contenedor.append(name, date, ep);
        lista.append(contenedor);
        results.appendChild(lista);
 
    }

    
}





function showSpinner() {
    spinner.classList.toggle('d-none');
}


