/*Inicializacion de variables que se guardan en el localStorage*/
let stock = JSON.parse(localStorage.getItem('stockStorage')) || [];
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

/*Botones*/
const btnMenu1 = document.getElementById('menu-option1'); /*Primer opcion del menu*/
const btnMenu2 = document.getElementById('menu-option2'); /*Segunda opcion del menu*/
const btnMenu3 = document.getElementById('menu-option3'); /* Tercera opcion del menu */
const btnMenu4 = document.getElementById('menu-option4'); /* Tercera opcion del menu */
const btnReturnMenu1 = document.getElementById('form-return'); /*Return primer opcion*/
const btnReturnMenu2 = document.getElementById('menu2-return'); /*Return segunda opcion*/
const btnReturnMenu3 = document.getElementById('menu3-return'); /*Return tercera opcion */
const btnReturnMenu4 = document.getElementById('menu4-return'); /*Return tercera opcion */

/*Funciones Auxiliares */
class objetoStock { /*Con esta constructora genero los objetos que se guardan en "stock".*/
    constructor(nombre,stock,stockMinimo){
    this.name = nombre,
    this.stock = stock,
    this.stockMinimo = stockMinimo
    }
    /* Si quiero utilizar un metodo en objetos pasados a JSON tengo que
    volver a crear los objetos cada vez que cargo la pagina, no acepta metodos.*/
}

const renderizarStock = () => {
        stock.forEach( ({name, stock, stockMinimo}) => {
        /* Desestructuro el element en sus propiedades ya que se trata de un objeto.*/
            let div = document.createElement(`div`);

            div.innerHTML= `<h2 class="product-title" name="product-name">${name}</h2>`;

            Number(stock) >= Number(stockMinimo)/*MODIFICACION - Utilizo un ternario en vez de un if. */
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
/*Fin de Funciones Auxiliares */


/* Funcion que se utiliza para el render inicial de la pagina */
const renderInicial = () => {
    stock != [] && renderizarStock();

    if(username !=""){
        inicio.className = "menu hidden";
        menu.className = "menu";
        menu.children[0].textContent = `Bienvenido ${username}`;
    }
}

/* Funcion del menu inicial */
const ingresarUsername = (e) => {
    e.preventDefault()

    username = usernameForm.children[1].value.toUpperCase();
    localStorage.setItem('username', username);

    inicio.className = "menu hidden";
    menu.className = "menu";
    menu.children[0].textContent = `Bienvenido ${username}`;
}

const loadInitialStock = async () => {
    const response = await fetch(`/stockInicial.JSON`);
    const data =  await response.json();
    stockInicial = data;

    stockInicial.forEach( ({name, stock, stockMinimo}) => {
        let div = document.createElement(`div`);

        div.innerHTML= `<h2 class="product-title" name="product-name">${name}</h2>`;

        Number(stock) >= Number(stockMinimo)
        ? div.innerHTML += `<h4 class="product-text" name="product-stock">Stock: <span class="green">${stock}</span></h4>`
        : div.innerHTML += `<h4 class="product-text" name="product-stock">Stock: <span class="red">${stock}</span></h4>`;

        div.innerHTML += `<button type="button" class="remove-btn hidden">X</button>`;

        div.className = 'product';
        containerDeStock.appendChild(div);
    });
    stock = stockInicial;
    localStorage.setItem("stockStorage", JSON.stringify(stock));
    greenToast('Se ha cargado el stock inicial por defecto.');
}

/* Funciones de CAMBIO DE INSTANCIAS del menu. */

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
        Toastify({
            text: `STOCK VACIO: Ingrese algun producto.`,
            gravity: 'top',
            position: 'right',
            timer: 3000,
            style: {
                background: '#bb010b',
                'border-radius':  '15px'
              }
        }).showToast()
        return;
    }
    menu.className = "menu hidden";
    menu2.className = "menu";
    containerDeStock.addEventListener(`click`, productDelete); /* Este es el event listener que permite la funcionalidad de esta opcion.*/
    productButtonShower('remove-btn', 'X');  /* Mostramos los botones que vamos a usar en esta opcion */
}

const menuReturn2 = () => { /* Esta tiene una funcionalidad extra, hace desaparecer los botones para eliminar productos.*/
    menu2.className = "menu hidden";
    menu.className = "menu";
    containerDeStock.removeEventListener(`click`, productDelete); /* Eliminamos el event listener para que no se pise con otras funcionalidades*/
    productButtonHider();
}

/* OPCION 3 */
const menuOpcion3 = () => {
    if(stock.length === 0){/*Si no hay productos que eliminar muestro un alerta y salgo de la funcion */
        Toastify({
            text: `STOCK VACIO: Ingrese algun producto.`,
            gravity: 'top',
            position: 'right',
            timer: 3000,
            style: {
                background: '#bb010b',
                'border-radius':  '15px'
              }
        }).showToast()
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
    if(stock.length === 0){/*Si no hay productos que eliminar muestro un alerta y salgo de la funcion */
    Toastify({
        text: `STOCK VACIO: Ingrese algun producto.`,
        gravity: 'top',
        position: 'right',
        timer: 3000,
        style: {
            background: '#bb010b',
            'border-radius':  '15px'
          }
    }).showToast()
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


/* Fin cambio de Instancias. */

/* FUNCIONES */
/* OPCION 1 */
const agregarStock = (e) => {
    e.preventDefault();

    if(stock.find(element => element.name === form.children[1].value.toUpperCase())){
        /* Si ya existe en el stock un producto con el mismo nombre termino la funcion. */
        redToast(`${form.children[1].value.toUpperCase()} ya forma parte del stock`);
        form.reset();
        return;
    }

    stock.push(new objetoStock(form.children[1].value.toUpperCase(), form.children[3].value, form.children[5].value)); /* Agrego el objeto que contiene la informacion de este producto al stock.*/

    stock.length === 1 && renderizarStock(); /* Cuando el stock tiene mas de un producto se renderiza despues de ordenarse*/

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
        renderizarStock(); /*Lo muestro ordenado;*/
    }

    greenToast(`${form.children[1].value.toUpperCase()} se agrego exitosamente al stock.`)
    localStorage.setItem("stockStorage", JSON.stringify(stock)); /* Guardo el stock en el localStorage*/
    form.reset();
}

/* OPCION 2 */
const productDelete = (event) => {
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
const stockModify = (event) => {
    if(event.target.className !== 'modify-btn' && event.target.className !== 'modify-btn2'){ /*Chequeo que el click sea sobre el boton para modificar.*/
    return;
    }

    /* Paso el evento y la modificacion a la funcion que realiza la modificacion */
    event.target.className === 'modify-btn'
    ? stockAdd(event , Number(document.getElementById('product-add-input').value))
    : stockRemove(event , -Number(document.getElementById('product-remove-input').value))
}

const stockAdd = (event, value) => {
    if(document.getElementById('product-add-input').value == 0){ /*Valido el valor de la modifcacion.*/
    Toastify({
        text: `Debe ingresar un numero distinto de 0.`,
        gravity: 'top',
        position: 'right',
        timer: 3000,
        style: {
            background: '#bb010b',
            'border-radius':  '15px'
            }
    }).showToast()
    return;
    }

    let index = stock.findIndex((element) => element.name === event.target.parentNode.children[0].textContent);

    stock[index].stock = Number(stock[index].stock)
    stock[index].stock += value;
    event.target.parentNode.children[1].children[0].textContent = stock[index].stock;

    stock[index].stock >= stock[index].stockMinimo
    ? event.target.parentNode.children[1].children[0].className = 'green'
    : event.target.parentNode.children[1].children[0].className = 'red';

    localStorage.setItem("stockStorage", JSON.stringify(stock)); /* Guardo el localStorage */
}

/* OPCION 4 */

const stockRemove = (event, value) => {
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


/* FIN FUNCIONES */

/* Render Inicial*/
renderInicial();

/* Event listener del menu inicial.*/
usernameForm.addEventListener(`submit`, ingresarUsername);
usernameForm.addEventListener(`submit`, loadInitialStock);

/*Event listeners del menu principal. */
btnMenu1.addEventListener(`click`, menuOpcion1);
btnMenu2.addEventListener(`click`, menuOpcion2);
btnMenu3.addEventListener(`click`, menuOpcion3);
btnMenu4.addEventListener(`click`, menuOpcion4);

/* Event listeners de la primer opcion del menu principal*/
form.addEventListener(`submit`, agregarStock);
btnReturnMenu1.addEventListener(`click`, menuReturn1);

/* Event listeners de la segunda opcion del menu principal*/
btnReturnMenu2.addEventListener(`click`, menuReturn2);

/* Event listeners de la tercera opcion del menu principal*/
btnReturnMenu3.addEventListener(`click`, menuReturn3);

/* Event listeners de la cuarta opcion del menu principal*/
btnReturnMenu4.addEventListener(`click`, menuReturn4);