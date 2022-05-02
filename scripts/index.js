// Esta es la base de datos de nuestros usuarios
const baseDeDatos = {
  usuarios: [
    {
      id: 1,
      name: "Steve Jobs",
      email: "steve@jobs.com",
      password: "Steve123",
    },
    {
      id: 2,
      name: "Ervin Howell",
      email: "shanna@melissa.tv",
      password: "Ervin345",
    },
    {
      id: 3,
      name: "Clementine Bauch",
      email: "nathan@yesenia.net",
      password: "Floppy39876",
    },
    {
      id: 4,
      name: "Patricia Lebsack",
      email: "julianne.oconner@kory.org",
      password: "MysuperPassword345",
    },
  ],
};

// ACTIVIDAD

// Paso a paso:

const iniciarSesion = document.querySelector('.login-btn');
const errorCont = document.querySelector('#error-container');

window.addEventListener('load', () => {
  if(localStorage.getItem('usuario')!=null){
    accesoConcedido();
  }else{
    iniciarSesion.addEventListener('click',tiempoIniciandoSesion);

    function tiempoIniciandoSesion(){
      iniciarSesion.removeEventListener('click', tiempoIniciandoSesion)
      document.querySelector('#loader').classList.remove('hidden')
      setTimeout(verificar, 3000); 
      errorCont.classList.add('hidden') 
    }
  }

  function verificar() { 
    
    let inputEmail = document.getElementById('email-input').value;
    let inputPassword = document.getElementById('password-input').value;
    let email = inputEmail.toLowerCase();

      for (let i = 0; i < baseDeDatos.usuarios.length; i++) {
        if(email === baseDeDatos.usuarios[i].email && inputPassword === baseDeDatos.usuarios[i].password){
          acceso = true
          posicion = i
          break;
        }else{
          acceso = false
        } 
      }

      if(acceso == true){
        let datosUsuario = { name: baseDeDatos.usuarios[posicion].name, email: baseDeDatos.usuarios[posicion].email };
        document.querySelector('#loader').classList.add('hidden')
        localStorage.setItem('usuario', JSON.stringify(datosUsuario))
        accesoConcedido()
      }else{
        accesoDenegado(email, inputPassword);
      } 
  }



  function accesoDenegado(email,inputPassword) {
    document.querySelector('#loader').classList.add('hidden')
    errorCont.classList.remove('hidden')        
    errorCont.innerHTML =`<small>Alguno de los datos ingresados son incorrectos</small>`;
    errorCont.style.color ='#c21736'
    errorCont.style.textAlign ='center' 
    errorCont.style.fontSize ='13px'
    errorCont.style.flexWrap = 'wrap';
    let errores = []
    if(inputPassword.length < 5){
      errores.unshift('La contraseña debe tener al menos 5 caracteres')
    }
    let regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if(!regex.test(email)){
      errores.unshift('El email no es válido')
    }
    if(errores.length > 0){ 
      var lista= document.createElement('ul');
      errorCont.appendChild(lista);
        errores.forEach(element => {
        lista.innerHTML += `<li>${element}</li>`;
      });
    }
  }

  function accesoConcedido() {
    let formu = document.querySelector('form')
    let titulo = document.querySelector('h1')
    formu.classList.add('hidden')
    titulo.classList.add('hidden')
    let ppl = document.querySelector('main')
    let bienvenido = document.createElement('h1');
    ppl.appendChild(bienvenido)
    usuario = JSON.parse(localStorage.getItem('usuario'));
    bienvenido.innerHTML = `Bienvenido al sitio 😀 ${usuario.name}`
    bienvenido.style.color='#ec183f'
    ppl.innerHTML += `<button type='button' class="login-btn cerrarSesion">Cerrar sesion<button/>`
    let cerrarSesion = document.querySelector('.cerrarSesion')
    cerrarSesion.addEventListener('click', (e)=>{
      localStorage.clear();
      window.location.reload();
    })
  }
});





// 1) Al momento de que la persona inicia sesión, si las validaciones que ya tenemos implementadas
// han sido exitosas, deberemos almacenar la información del usuario en el LocalStorage.

// 2) Al mensaje de bienvenida que ya teníamos implementado, deberemos agregarle el nombre de la
// persona y un botón de "Cerrar Sesión".

// 3) Una vez iniciada la sesión, la misma se deberá mantener en ese estado para el caso de que la persona
// recargue la página. Para ello, deberás validar si existe información del usuario al momento en
// que se produce la carga de la página, y en base a dicha condción decidir que elementos mostrar.

// 3) Para el caso de que la persona haga click en el botón "Cerrar Sesión", se deberá eliminar
// la información del usuario, mostrar un mensaje indicando que se ha cerrado la sesión, y recargar
// la página para mostrar nuevamente el formulario de login.

/* 
TIPS:
  - Para lograr los objetivos de este ejercicio, deberás valerte de algunos eventos y métodos que vimos en
    las clases anteriores. Te invitamos a que revises los recursos en caso de que tengas dudas, ya que allí
    encontrarás todas las respuestas que necesitas para completar la actividad.

  - Recuerda que puedes seleccionar y manipular los elementos del archivo index.html, usando los
    recursos que Javascript te ofrece para ello. Además, en el archivo styles.css tiene algunas clases y 
    estilos predefinidos para ayudarte a completar la actividad.

  - Al momento de guardar información del usuario en el navegador, recuerda que debemos almacenar solo la 
    información necesaria, y EN NINGUN CASO DEBEMOS GUARDAR LA CONTRASEÑA. Por ello, deberás seleccionar y
    separar la información que tienes que almacenar, a partir del objeto que contiene la información del 
    usuario.

   ¡Manos a la obra!
 */
