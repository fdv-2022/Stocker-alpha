import {containerDeStock,inicio,menu,username} from '../main.js';
import {stock} from './funcionalidadesStock.js'


class objetoStock { /*Con esta constructora genero los objetos que se guardan en "stock".*/
    constructor(nombre,stock,stockMinimo){
    this.name = nombre,
    this.stock = stock,
    this.stockMinimo = stockMinimo
    }
}

const renderInicial = () => {
    stock != [] && renderArray(stock);

    if(username !=""){
        inicio.className = "menu hidden";
        menu.className = "menu";
        menu.children[0].textContent = `Bienvenido ${username}`;
    }
}

const renderArray = (arr) => {
        arr.forEach( ({name, stock, stockMinimo}) => {
        /* Desestructuro el element en sus propiedades ya que se trata de un objeto.*/
            let div = document.createElement(`div`);

            div.innerHTML= `<h2 class="product-title" name="product-name">${name}</h2>`;

            Number(stock) >= Number(stockMinimo)/*Ternario que modifica el color del numero del stock si se cumple el stockMin */
            ? div.innerHTML += `<h4 class="product-text" name="product-stock">Stock: <span class="green">${stock}</span></h4>`
            : div.innerHTML += `<h4 class="product-text" name="product-stock">Stock: <span class="red">${stock}</span></h4>`;

            div.innerHTML += `<button type="button" class="remove-btn hidden">X</button>`;

            div.className = 'product';
            containerDeStock.appendChild(div);
            });
}

const productButtonShower = (buttonClass, text) => {
    containerDeStock.childNodes.forEach((item) =>{
        item.children[2].className = `${buttonClass}`;
        item.children[2].textContent = `${text}`;
    })
}

const productButtonHider = () => {
    containerDeStock.childNodes.forEach((item) =>{
        item.children[2].className = "hidden";
    })
}

const redToast = (text) => {
    Toastify({
        text: `${text}`,
        gravity: 'top',
        position: 'right',
        timer: 3000,
        style: {
            background: '#bb010b',
            'border-radius':  '15px'
            }
    }).showToast()
}

const greenToast = (text) => {
    Toastify({
        text: `${text}`,
        gravity: 'top',
        position: 'right',
        timer: 3000,
        style: {
            background: '#60d394',
            'border-radius':  '15px'
          }
    }).showToast()
}

export {objetoStock, renderArray, renderInicial, productButtonHider, productButtonShower, redToast, greenToast};