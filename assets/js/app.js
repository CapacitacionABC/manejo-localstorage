/*+**********************************************************************************
* El contenido de este archivo está sujeto a la Licencia Pública MTI
* Las porciones creadas por el desrrollador son propiedad de IteraSoft S.A.S.
* Todos los derechos reservados.
*  ********************************************************************************
*  Proyecto     : Nombre del Proyecto
*  Version      : 1.0.0
*  Creacion     : 2018-07-17
*  Author       : IteraSoft S.A.S, Alfredo Bravo Cuero
*  Last change  : 2018-07-20
************************************************************************************/

// 1- Variables
const listaApunte = document.getElementById('lista-apuntes');

// 2- Event Listeners

eventListeners();

function eventListeners() {
    // Cuando se envia al formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    // Borrar Tweets
    listaApunte.addEventListener('click', borrarTweet);

    // Contenido Cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}

// 3- Funciones

// Añadir tweet del formulario
function agregarTweet(e) {
    e.preventDefault();
    // leer el valor del textarea
    const tweet = document.getElementById('tweet').value;
    // crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'x';

    // Crear elemento y añadirlo a la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    // Añade el boton borrar al tweet
    li.appendChild(botonBorrar);
    // Añade el tweet a la lista
    listaApunte.appendChild(li);

    // Añadir a Local Storage
    agregarTweetLocalStorage(tweet);
}

// Eliminar Tweet del DOM
function borrarTweet(e){
    e.preventDefault();

    // Por Delegation obtengo el padre de elemento (a) y lo borro
    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.textContent);
    }
}

// Mostrar datos de Local Storage en la Lista
function localStorageListo(){
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach( tweet => {
        // crear boton de eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'x';

        // Crear elemento y añadirlo a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        // Añade el boton borrar al tweet
        li.appendChild(botonBorrar);
        // Añade el tweet a la lista
        listaApunte.appendChild(li);

    });
    
}

// Agregar tweet a Local Storage
function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage(); 

    // Añadir el nuevo tweet
    tweets.push(tweet);

    // Convertir de string a arreglo para local storage y Agregar a Local Storage
    localStorage.setItem('tweets', JSON.stringify(tweets) );

}

// Comprobar que hayan elementos en el localstorage, retornar un arreglo
function obtenerTweetsLocalStorage() {
    let tweets;
    // Revisamos los valores de Local Storage
    if(localStorage.getItem('tweets') === null) {
        tweets = [];
    }else{
        tweets = JSON.parse(localStorage.getItem('tweets') );
    }
    return tweets;
}

// Eliminar tweet de Local Storage
function borrarTweetLocalStorage(tweet) {
    let tweets, tweetBorrar;
    // Elimina la X del tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach( (tweet, index) => {
        if(tweetBorrar === tweet){
            tweets.splice(index, 1)
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets) );
    
    
}