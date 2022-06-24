if ('serviceWorker' in navigator){
    navigator.serviceWorker.register("../sw.js").then((message)=>{
        console.log('Preparate que el SW esta andando!');
    });
} else {
    console.log('Service worker no es soportado, pero rick y morty estan a punto!');
}