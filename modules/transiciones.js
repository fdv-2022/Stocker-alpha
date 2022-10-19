import {menu,menu1,menu2,menu3,menu4, menu5,
containerDeStock} from '../main.js';

import {redToast,productButtonHider,productButtonShower, renderArray} from './funcionesAuxiliares.js';

import {stock,productDelete,stockModify, filterBuy} from './funcionalidadesStock.js'


/* OPCION 1 */
const menuOpcion1 = () => {
    menu.className = "menu hidden";
    menu1.className = "menu";
}

const menuReturn1 = () => {
    menu1.className = "menu hidden";
    menu.className = "menu";
}

/* OPCION 2 */
const menuOpcion2 = () => {
    if(stock.length === 0){/*Si no hay productos que eliminar muestro un alerta y salgo de la funcion */
        redToast(`STOCK VACIO: Ingrese algun producto.`)
        return;
    }
    menu.className = "menu hidden";
    menu2.className = "menu";
    containerDeStock.addEventListener(`click`, productDelete); /* Este es el event listener que permite la funcionalidad de esta opcion.*/
    productButtonShower('remove-btn', 'X');  /* Mostramos los botones que vamos a usar en esta opcion */
}

const menuReturn2 = () => {
    menu2.className = "menu hidden";
    menu.className = "menu";
    containerDeStock.removeEventListener(`click`, productDelete); /* Eliminamos el event listener para que no se pise con otras funcionalidades*/
    productButtonHider();
}

/* OPCION 3 */
const menuOpcion3 = () => {
    if(stock.length === 0){/*Si no hay productos muestro un alerta y salgo de la funcion */
        redToast(`STOCK VACIO: Ingrese algun producto.`)
        return;
    }

    menu.className = "menu hidden";
    menu3.className = "menu";
    productButtonShower('modify-btn', '+');
    containerDeStock.addEventListener('click', stockModify);
}

const menuReturn3 = () => {
    menu3.className = "menu hidden";
    menu.className = "menu";
    productButtonHider();
    containerDeStock.removeEventListener('click', stockModify);
}

/* OPCION 4 */
const menuOpcion4 = () => {
    if(stock.length === 0){/*Si no hay productos muestro un alerta y salgo de la funcion */
    redToast(`STOCK VACIO: Ingrese algun producto.`)
    return;
    }

    menu.className = "menu hidden";
    menu4.className = "menu";
    productButtonShower('modify-btn2', '-');
    containerDeStock.addEventListener('click', stockModify);
}

const menuReturn4 = () => {
    menu4.className = "menu hidden";
    menu.className = "menu";
    productButtonHider();
    containerDeStock.removeEventListener('click', stockModify);
}

/* OPCION 5 */
const menuOpcion5 = () => {
    if(stock.length === 0){/*Si no hay productos muestro un alerta y salgo de la funcion */
    redToast(`STOCK VACIO: Ingrese algun producto.`)
    return;
    }

    menu.className = "menu hidden";
    menu5.className = "menu";
    filterBuy();
}

const menuReturn5 = () => {
    menu5.className = "menu hidden";
    menu.className = "menu";

    containerDeStock.replaceChildren();
    renderArray(stock);
}


export {menuOpcion1,menuOpcion2,menuOpcion3,menuOpcion4,menuOpcion5,menuReturn1,menuReturn2,menuReturn3,menuReturn4,menuReturn5}