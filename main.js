/*Inicializacion de variables que se guardan en el localStorage*/

/* MODIFICACION Si no hay un stock guardado en el localStorage tomo el stock inicial de mi JSON.*/
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

/*Botones*/
const btnMenu1 = document.getElementById('menu-option1'); /*Primer opcion del menu*/
const btnMenu2 = document.getElementById('menu-option2'); /*Segunda opcion del menu*/
const btnMenu3 = document.getElementById('menu-option3'); /* Tercera opcion del menu */
const btnReturnMenu1 = document.getElementById('form-return'); /*Return primer opcion*/
const btnReturnMenu2 = document.getElementById('menu2-return'); /*Return segunda opcion*/
const btnReturnMenu3 = document.getElementById('menu3-return'); /*Return tercera opcion */

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

    Toastify({
        text: `Se ha cargado el stock inicial por defecto.`,
        gravity: 'top',
        position: 'right',
        timer: 3000,
        style: {
            background: '#60d394',
            'border-radius':  '15px'
          }
    }).showToast()
}

/* Funciones de cambio de instancias del menu. */

/* OPCION1 */
const menuOpcion1 = () => {
    menu.className = "menu hidden";
    menu1.className = "menu";
}

const menuReturn1 = () => {
    menu1.className = "menu hidden";
    menu.className = "menu";
}

/* OPCION2 */
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
    removeButtonGenerator();  /* Mostramos los botones que vamos a usar en esta opcion */
}

const menuReturn2 = () => { /* Esta tiene una funcionalidad extra, hace desaparecer los botones para eliminar productos.*/
    menu2.className = "menu hidden";
    menu.className = "menu";
    containerDeStock.removeEventListener(`click`, productDelete); /* Eliminamos el event listener para que no se pise con otras funcionalidades*/
    removeButtonHider();
}

/* OPCION3 */
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
    modifyButtonAdd();
    containerDeStock.addEventListener('click', stockAdd);
}

const menuReturn3 = () => {
    menu3.className = "menu hidden";
    menu.className = "menu";
    console.log(`click`);
    modifyButtonRemove();
    containerDeStock.removeEventListener('click', stockAdd);
}

/* Fin cambio de Instancias. */

/* FUNCIONES */
/* OPCION 1 */
const agregarStock = (e) => {
    e.preventDefault();

    if(stock.find(element => element.name === form.children[1].value.toUpperCase())){
        /* Si ya existe en el stock un producto con el mismo nombre termino la funcion. */
        Toastify({
            text: `${form.children[1].value.toUpperCase()} ya forma parte del stock`,
            gravity: 'top',
            position: 'right',
            timer: 3000,
            style: {
                background: '#bb010b',
                'border-radius':  '15px'
              }
        }).showToast()

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

    Toastify({
        text: `${form.children[1].value.toUpperCase()} se agrego exitosamente al stock.`,
        gravity: 'top',
        position: 'right',
        timer: 3000,
        style: {
            background: '#72cc50',
            'border-radius':  '15px'
          }
    }).showToast()

    localStorage.setItem("stockStorage", JSON.stringify(stock)); /* Guardo el stock en el localStorage*/
    form.reset();
}

/* OPCION 2 */
const removeButtonGenerator = () => { /*Esta funcion hace aparecer los botones que permiten eliminar los productos.*/
    containerDeStock.childNodes.forEach((item) =>{
        item.children[2].className = "remove-btn";
        item.children[2].textContent = 'X';
    })
}

const removeButtonHider = () => {/*Esta funcion hace aparecer los botones que permiten eliminar los productos.*/
    containerDeStock.childNodes.forEach((item) =>{
    item.children[2].className = "hidden";
})
}

const productDelete = (event) => {
    if(event.target.className === 'remove-btn'){ /* Me aseguro que esten tocando el boton que quiero que toquen.*/

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
}

/* OPCION 3 */
const modifyButtonAdd = () => {
    containerDeStock.childNodes.forEach((item) =>{
        item.children[2].className = 'modify-btn';
        item.children[2].textContent = '+';
    })
}

const modifyButtonRemove= () => {
    containerDeStock.childNodes.forEach((item) =>{
        item.children[2].className = 'hidden';
    })
}

const stockAdd = (event) => {
    console.log(`click`);
    if(event.target.className === 'modify-btn'){
        console.log(event.target.parentNode.children[0].textContent);
        let index = stock.findIndex((element) => element.name === event.target.parentNode.children[0].textContent);
        console.log(index);
    }
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

/* Event listeners de la primer opcion del menu principal*/
form.addEventListener(`submit`, agregarStock);
btnReturnMenu1.addEventListener(`click`, menuReturn1);

/* Event listeners de la segunda opcion del menu principal*/
btnReturnMenu2.addEventListener(`click`, menuReturn2);

/* Event listeners de la tercera opcion del menu principal*/
btnReturnMenu3.addEventListener(`click`, menuReturn3);