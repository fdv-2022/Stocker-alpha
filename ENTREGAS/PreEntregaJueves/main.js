let stock = [];
/* Si existe el stock en el storage se carga el stock.*/
if(JSON.parse(localStorage.getItem('stockStorage'))){
    stock = JSON.parse(localStorage.getItem('stockStorage'));
}

let username = '';
/* Si existe el usuario se carga el usuario. */
if(localStorage.getItem('username')){
    username = localStorage.getItem('username');
}

/* Formularios */
const form = document.querySelector('#stock-form'); /* Selecciono el formulario del primer menu */
const usernameForm = document.getElementById('username-form'); /* Form del username */

/*Contenedores*/
const containerDeStock = document.querySelector(`#grid-stock`) /*Stock*/
const inicio = document.getElementById('grid-inicio'); /*Menu inicial*/
const menu = document.getElementById('grid-menu'); /*Menu Principal*/
const menu1 = document.getElementById('grid-menu-1'); /*Menu Principal-1*/
const menu2 = document.getElementById('grid-menu-2'); /*Menu Principal-2*/

/*Botones*/
const btnMenu1 = document.getElementById('menu-option1'); /*Primer opcion del menu*/
const btnMenu2 = document.getElementById('menu-option2'); /*Segunda opcion del menu*/
const btnReturnMenu1 = document.getElementById('form-return'); /*Return primer opcion*/
const btnReturnMenu2 = document.getElementById('menu2-return'); /*Return segunda opcion*/


/*Funciones Auxiliares */
class objetoStock { /*Con esta constructora genero los objetos que se guardan en "stock".*/
    constructor(nombre,stock,stockMinimo){
    this.name = nombre,
    this.id = 0,
    this.stock = stock,
    this.stockMinimo = stockMinimo
    }
}

const renderizarStock = () => {
    stock.forEach(element=> {
        let div = document.createElement(`div`);

        div.innerHTML= `<h2 class="product-title" name="product-name">${element.name}</h2>`;

        if(Number(element.stock) >= Number(element.stockMinimo)){
        div.innerHTML += `<h4 class="product-text" name="product-stock">Stock: <span class="green">${element.stock}</span></h4>`;
        } else {
        div.innerHTML += `<h4 class="product-text" name="product-stock">Stock: <span class="red">${element.stock}</span></h4>`;
        }

        div.innerHTML += `<button type="button" class="remove-btn hidden">X</button>`;
        div.className = 'product';
        containerDeStock.appendChild(div);
        });
}
/*Fin de Funciones Auxiliares */


/* Funcion que se utiliza para el render inicial de la pagina */
const renderInicial = () => {
    if(stock != []){
        renderizarStock();
    }

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

/* Funciones de cambio de instancias del menu. */
const menuOpcion1 = () => {
    menu.className = "menu hidden";
    menu1.className = "menu";
}

const menuReturn1 = () => {
    menu1.className = "menu hidden";
    menu.className = "menu";
}

const menuOpcion2 = () => {
    menu.className = "menu hidden";
    menu2.className = "menu";
}

const menuReturn2 = () => { /* Este boton tiene una funcionalidad extra, hace desaparecer los botones para eliminar productos.*/
    menu2.className = "menu hidden";
    menu.className = "menu";
    containerDeStock.childNodes.forEach((item) =>{
        item.children[2].className = "remove-btn hidden";
    })
}

/* Funciones de la primer opcion del menu.
Ambas funciones se activan al clickearse el
boton que envia el formulario de ingreso del stock*/

const agregarStock = (e) => {
    e.preventDefault();

    if(stock.find(element => element.name === form.children[1].value.toUpperCase())){
    /* Valido que no exista el nombre en el stock.
    Si se encuentra algo el if va a dar truthly y va a terminar la funcion con un alert.*/
        return alert(`Ya existe un producto con ese nombre en el stock.`);
    }

    let div = document.createElement(`div`);

    div.innerHTML= `<h2 class="product-title" name="product-name">${form.children[1].value.toUpperCase()}</h2>`;

    Number(form.children[3].value) >= Number(form.children[5].value)
    ? div.innerHTML += `<h4 class="product-text" name="product-stock">Stock: <span class="green">${form.children[3].value}</span></h4>`
    : div.innerHTML += `<h4 class="product-text" name="product-stock">Stock: <span class="red">${form.children[3].value}</span></h4>`;
    /*if(Number(form.children[3].value) >= Number(form.children[5].value)){
        div.innerHTML += `<h4 class="product-text" name="product-stock">Stock: <span class="green">${form.children[3].value}</span></h4>`;
    }else{
        div.innerHTML += `<h4 class="product-text" name="product-stock">Stock: <span class="red">${form.children[3].value}</span></h4>`;
    } */
    div.innerHTML += `<button type="button" class="remove-btn hidden">X</button>`;

    div.className = `product`;

    /* Agrego el div al container */
    containerDeStock.appendChild(div);

    /* Agrego el objeto que contiene la informacion de este producto al stock.*/
    stock.push(new objetoStock(form.children[1].value.toUpperCase(), form.children[3].value, form.children[5].value));
}

const ordenarAlfabeticamente = (e) => { /*Esta funcion al agregarse un nuevo producto ordena alfabeticamente el stock. */
    e.preventDefault();

    if(stock.length >= 2){

        stock.sort((a,b) => {/* Ordenamos el array.*/
            if(a.name > b.name){
                return 1;
            }

            if(b.name > a.name){
                return -1;
            }

            return 0;
            });

        containerDeStock.replaceChildren(); /* Limpio el container */
        renderizarStock(); /*Lo vuelvo a mostrar*/
    }

    localStorage.setItem("stockStorage", JSON.stringify(stock));
    /* Guardo el stock al final de esta funcion para que quede ordenado en el localStorage */
    form.reset();
};
/* Fin de funciones de la primer opcion del menu.*/

/* Funcion de la segunda opcion del menu. */
const buttonGenerator = () => { /*Esta funcion hace aparecer los botones que permiten eliminar los productos.*/
    containerDeStock.childNodes.forEach((item) =>{
        item.children[2].className = "remove-btn";
    })
}

const productDelete = (event) => {
    if(event.target.className === 'remove-btn'){ /* Me aseguro que esten tocando el boton que quiero que toquen.*/
        alert(`Has eliminado ${event.target.parentNode.children[0].textContent}. \nCuando hayas terminado de eliminar elementos regresa al menu principal.`);
        containerDeStock.removeChild(event.target.parentNode); /* Elimino del DOM*/
        stock.splice(stock.findIndex((element) => element.name === event.target.parentNode.children[0].textContent),1); /* Elimino de mi array de objetos*/
        localStorage.setItem("stockStorage", JSON.stringify(stock)); /*Actualizo el localStorage*/
    }
}


renderInicial();

/* Event listener del menu inicial.*/
usernameForm.addEventListener(`submit`, ingresarUsername);

/*Event listeners del menu principal. */
btnMenu1.addEventListener(`click`, menuOpcion1);
btnMenu2.addEventListener(`click`, menuOpcion2);

/* Event listeners de la primer opcion del menu principal*/
form.addEventListener(`submit`, agregarStock);
form.addEventListener(`submit`, ordenarAlfabeticamente);
btnReturnMenu1.addEventListener(`click`, menuReturn1);

/* Event listeners de la segunda opcion del menu principal*/
btnReturnMenu2.addEventListener(`click`, menuReturn2);
btnMenu2.addEventListener(`click`, buttonGenerator);
containerDeStock.addEventListener(`click`, productDelete);