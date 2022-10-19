/*Inicializacion de variables que se guardan en el localStorage*/
let username = localStorage.getItem('username') || ''; /* Validacion del username.*/

/* Formularios */
const form = document.querySelector('#stock-form'); /* Selecciono el formulario del primer menu */
const usernameForm = document.getElementById('username-form'); /* Form del username */

/*Contenedores*/
const containerDeStock = document.querySelector(`#grid-stock`) /*Stock*/
const inicio = document.getElementById('grid-inicio'); /*Menu inicial*/
const menu = document.getElementById('grid-menu'); /*Menu Principal*/
const menu1 = document.getElementById('grid-menu-1'); /*Menu Principal-1*/
const menu2 = document.getElementById('grid-menu-2'); /*Menu Principal-2*/
const menu3 = document.getElementById('grid-menu-3'); /*Menu Principal-3*/
const menu4 = document.getElementById('grid-menu-4'); /*Menu Principal-4*/
const menu5 = document.getElementById('grid-menu-5'); /*Menu Principal-4*/

/*Botones*/
const btnMenu1 = document.getElementById('menu-option1'); /*Primer opcion del menu*/
const btnMenu2 = document.getElementById('menu-option2'); /*Segunda opcion del menu*/
const btnMenu3 = document.getElementById('menu-option3'); /* Tercera opcion del menu */
const btnMenu4 = document.getElementById('menu-option4'); /* Cuarta opcion del menu */
const btnMenu5 = document.getElementById('menu-option5'); /* Quinta opcion del menu */
const btnReturnMenu1 = document.getElementById('form-return'); /*Return primer opcion*/
const btnReturnMenu2 = document.getElementById('menu2-return'); /*Return segunda opcion*/
const btnReturnMenu3 = document.getElementById('menu3-return'); /*Return tercera opcion */
const btnReturnMenu4 = document.getElementById('menu4-return'); /*Return tercera opcion */
const btnReturnMenu5 = document.getElementById('menu5-return'); /*Return tercera opcion */

/* Modulos Import*/
import { inputUsername } from './modules/menuInicial.js';
import { renderInicial } from './modules/funcionesAuxiliares.js';
import { menuOpcion1, menuOpcion2, menuOpcion3,
    menuOpcion4, menuOpcion5, menuReturn1, menuReturn2, menuReturn3, menuReturn4, menuReturn5} from './modules/transiciones.js';
import { agregarStock,loadInitialStock } from './modules/funcionalidadesStock.js';

/* Render Inicial*/
addEventListener('DOMContentLoaded', (event) => {renderInicial()})

/* Event listener del menu inicial.*/
usernameForm.addEventListener(`submit`, inputUsername);
usernameForm.addEventListener(`submit`, loadInitialStock);

/*Event listeners del menu principal. */
btnMenu1.addEventListener(`click`, menuOpcion1);
btnMenu2.addEventListener(`click`, menuOpcion2);
btnMenu3.addEventListener(`click`, menuOpcion3);
btnMenu4.addEventListener(`click`, menuOpcion4);
btnMenu5.addEventListener(`click`, menuOpcion5);

/* Event listeners de la primer opcion del menu principal*/
form.addEventListener(`submit`, agregarStock);
btnReturnMenu1.addEventListener(`click`, menuReturn1);

/* Event listeners de la segunda opcion del menu principal*/
btnReturnMenu2.addEventListener(`click`, menuReturn2);

/* Event listeners de la tercera opcion del menu principal*/
btnReturnMenu3.addEventListener(`click`, menuReturn3);

/* Event listeners de la cuarta opcion del menu principal*/
btnReturnMenu4.addEventListener(`click`, menuReturn4);

/* Event listeners de la quinta opcion del menu principal*/
btnReturnMenu5.addEventListener(`click`, menuReturn5);

/* Modulos Export*/
export {usernameForm,containerDeStock,username,form,inicio,menu,menu1,menu2,menu3,menu4,menu5};