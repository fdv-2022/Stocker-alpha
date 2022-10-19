import {usernameForm,inicio,menu} from '../main.js';

const inputUsername = (e) => { /* Guardamos el nombre de usuario ingresado y no volvemos a mostrar el menu inicial. */
    e.preventDefault()
    localStorage.setItem('username', usernameForm.children[1].value.toUpperCase());

    inicio.className = "menu hidden";
    menu.className = "menu";
    menu.children[0].textContent = `Bienvenido ${usernameForm.children[1].value.toUpperCase()}`;
}

export { inputUsername};

