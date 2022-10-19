import {redToast,renderArray,objetoStock,greenToast} from './funcionesAuxiliares.js';
import {containerDeStock,form} from '../main.js';

let stock = JSON.parse(localStorage.getItem('stockStorage')) || [];

/*Inicializacion*/
const loadInitialStock = async (e) => { /* Realizo un fetch a mi JSON,lo guardo en el local storage y sobrescribo mi stock.*/
    e.preventDefault();
    const response = await fetch(`./data/stockInicial.JSON`);
    const data = await response.json();

    data.forEach( ({name, stock, stockMinimo}) => {
        let div = document.createElement(`div`);

        div.innerHTML= `<h2 class="product-title" name="product-name">${name}</h2>`;

        Number(stock) >= Number(stockMinimo)
        ? div.innerHTML += `<h4 class="product-text" name="product-stock">Stock: <span class="green">${stock}</span></h4>`
        : div.innerHTML += `<h4 class="product-text" name="product-stock">Stock: <span class="red">${stock}</span></h4>`;

        div.innerHTML += `<button type="button" class="remove-btn hidden">X</button>`;

        div.className = 'product';
        containerDeStock.appendChild(div);
    });

    localStorage.setItem("stockStorage", JSON.stringify(data));
    greenToast(`Se ha cargado el stock por defecto.`)
    stock = data;
}

/* OPCION 1 */
const agregarStock = (e) => { /*Funcion que permite agregar nuevos productos al stock y renderiza la modificacion.*/
    e.preventDefault();

    if(stock.find(element => element.name === form.children[1].value.toUpperCase())){
        /* Si ya existe en el stock un producto con el mismo nombre termino la funcion. */
        redToast(`${form.children[1].value.toUpperCase()} ya forma parte del stock`);
        form.reset();
        return;
    }
    /* Agrego el objeto que contiene la informacion de este producto al stock.*/
    stock.push(new objetoStock(form.children[1].value.toUpperCase(), form.children[3].value, form.children[5].value));

    stock.length === 1 && renderArray(stock); /* Cuando el stock tiene mas de un producto se renderiza despues de ordenarse*/

    if(stock.length >= 2){ /*Cuando exista mas de un producto es necesario ordenar el stock alfabeticamente y modificar el DOM*/

        stock.sort((a,b) => {/* Ordenamos el array.*/
            if(a.name > b.name){
                return 1;
            }

            if(b.name > a.name){
                return -1;
            }

            return 0;
            });

        containerDeStock.replaceChildren(); /* Limpio el container*/
        renderArray(stock); /*Lo muestro ordenado;*/
    }

    greenToast(`${form.children[1].value.toUpperCase()} se agrego exitosamente al stock.`)
    localStorage.setItem("stockStorage", JSON.stringify(stock)); /* Guardo el stock en el localStorage*/
    form.reset();
}

/* OPCION 2 */
const productDelete = (event) => { /*Funcion que permite eliminar productos del stock y renderiza la modificacion.*/
    if(event.target.className !== 'remove-btn'){ /* Me aseguro que el click sea sobre el boton que quiero.*/
        return
    }

    /*Utilizo una alerta de la libreria para confirmar la elmininacion del objeto del stock.*/
    Swal.fire({
        title: 'Estas seguro?',
        text: `Estas por eliminar ${event.target.parentNode.children[0].textContent} del stock.`,
        icon: 'warning',
        iconColor: '#311B92',
        showCancelButton: true,
        confirmButtonColor: '#311B92',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Regresar'
      }).then((result) => {
        if (result.isConfirmed) {
            containerDeStock.removeChild(event.target.parentNode); /* Elimino del DOM*/
            stock.splice(stock.findIndex((element) => element.name === event.target.parentNode.children[0].textContent),1); /* Elimino de mi array de objetos*/
            localStorage.setItem("stockStorage", JSON.stringify(stock)); /*Actualizo el localStorage*/
            Swal.fire({
                title: 'Eliminado!',
                text: `${event.target.parentNode.children[0].textContent} ha sido eliminado del stock.`,
                icon: 'success'
            }
            )
        }
      })

}

/* OPCION 3 */
const stockModify = (event) => { /* Funcion que realiza las modifcaciones de las unidades de los productos. */
    if(event.target.className !== 'modify-btn' && event.target.className !== 'modify-btn2'){ /*Chequeo que el click sea sobre el boton para modificar.*/
    return;
    }

    /* Paso el evento y la modificacion a la funcion que realiza la modificacion */
    event.target.className === 'modify-btn'
    ? stockAdd(event , Number(document.getElementById('product-add-input').value))
    : stockRemove(event , -Number(document.getElementById('product-remove-input').value))
}

const stockAdd = (event, value) => { /* Aumenta las unidades del producto en virtud del valor ingresado por el usuario */
    if(document.getElementById('product-add-input').value == 0){ /*Valido el valor de la modifcacion.*/
    redToast('Debe ingresar un numero distinto de 0')
    return;
    }

    let index = stock.findIndex((element) => element.name === event.target.parentNode.children[0].textContent);

    /* Trabajo sobre el array de objetos con el index obtenido*/
    stock[index].stock = Number(stock[index].stock)
    stock[index].stock += value;
    event.target.parentNode.children[1].children[0].textContent = stock[index].stock;

    /* Modifico el DOM */
    stock[index].stock >= stock[index].stockMinimo
    ? event.target.parentNode.children[1].children[0].className = 'green'
    : event.target.parentNode.children[1].children[0].className = 'red';

    localStorage.setItem("stockStorage", JSON.stringify(stock)); /* Guardo el localStorage */
}

/* OPCION 4 */
const stockRemove = (event, value) => { /* Decrece las unidades del producto en virtud del valor ingresado por el usuario */
    if(document.getElementById('product-remove-input').value == 0){ /*Valido el valor de la modifcacion.*/
    redToast('Debe ingresar un numero distinto de 0');
    return;
    }

    let index = stock.findIndex((element) => element.name === event.target.parentNode.children[0].textContent);

    if(Number(stock[index].stock)+value < 0){
        redToast('Esta intentando consumir mas unidades de las existentes en el stock.');
        return;
    }

    /* Trabajo sobre el array de objetos con el index obtenido*/
    stock[index].stock = Number(stock[index].stock);
    stock[index].stock += value;

    /* Modifico el DOM */
    event.target.parentNode.children[1].children[0].textContent = stock[index].stock;
    stock[index].stock >= stock[index].stockMinimo
    ? event.target.parentNode.children[1].children[0].className = 'green'
    : event.target.parentNode.children[1].children[0].className = 'red';

    localStorage.setItem("stockStorage", JSON.stringify(stock)); /* Guardo el localStorage */

}

/* OPCION 5 */
const filterBuy = () => { /* Filtra el stock en razon de si el stock es menor al stock minimo y lo renderiza filtrado.*/
    let arrayToBuy = stock.filter(element => element.stockMinimo > element.stock)
    containerDeStock.replaceChildren();

    arrayToBuy.forEach(element=> {
        let div = document.createElement('div');
        let stockNeeded = element.stockMinimo - element.stock;
        div.innerHTML= `<h2 class="product-title" name="product-name">${element.name}</h2>
        <h4 class="product-text" name="product-stock">Compra Minima <span class="red">${stockNeeded}</span></h4>`
        div.className = 'product';
        containerDeStock.appendChild(div);
    });
}

export {agregarStock,productDelete,stockModify,stock, loadInitialStock, filterBuy}
