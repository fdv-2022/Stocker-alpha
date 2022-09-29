class objetoStock {
    constructor(nombre,stock,stockMinimo){ /*Con esta constructora genero los objetos que se guardan en "stock".*/
    this.name = nombre,
    this.id = 0,
    this.stock = stock,
    this.stockMinimo = stockMinimo
    }
}


let stock = [];
if(JSON.parse(localStorage.getItem("stockStorage"))){
    stock = JSON.parse(localStorage.getItem("stockStorage"));
}/* Si existe el stock en el storage se carga el stock, eso valida este if.*/

const form = document.querySelector(`#stock-form`); /* Selecciono el formulario y el container donde se van a renderizar los productos.*/
const containerDeStock = document.querySelector(`#grid-stock`)

const renderInicial = () => {
    if(stock != []){
        let htmlString = ``
        stock.forEach(element=> {
            htmlString += `<div class="product">
            <h2 class="product-title" name="product-name">${element.name}</h2>
            <h4 class="product-text" name="product-stock">Stock: ${element.stock}</h4>
            <h4 class="product-text" name="product-stockMin">Stock minimo: ${element.stockMinimo}</h4>
             </div>
            `;
            }); /* Este string va a ser el innerHTML del container cuando se complete. */
        containerDeStock.innerHTML = htmlString;
    }
}

const agregarStock = (e) => {
    e.preventDefault();

    if(stock.find(element => element.name === form.children[1].value.toUpperCase())){
    /* Valido que no exista el nombre en el stock.
    Si se encuentra algo el if va a dar truthly y va a terminar la funcion con un alert.
    */
        return alert(`Ya existe un producto con ese nombre en el stock.`);
    }

    let div = document.createElement(`div`);

    div.innerHTML= `
        <h2 class="product-title" name="product-name">${form.children[1].value.toUpperCase()}</h2>
        <h4 class="product-text" name="product-stock">Stock: ${form.children[3].value}</h4>
        <h4 class="product-text" name="product-stockMin">Stock minimo: ${form.children[5].value}</h4>
    `;
    div.className = `product`;

    /* Agrego el div al container */
    containerDeStock.appendChild(div);

    /* Agrego el objeto que contiene este div al stock y lo guardo en el localStorage.*/
    stock.push(new objetoStock(form.children[1].value.toUpperCase(), form.children[3].value, form.children[5].value));
    localStorage.setItem("stockStorage", JSON.stringify(stock));
}

const ordenarAlfabeticamente = (e) => { /*Esta funcion al agregarse un nuevo producto ordena el stock. */
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

        stock.forEach(element => { /*Vuelvo a agregar los stock ordenados al container.*/
            let div = document.createElement(`div`);
            div.innerHTML= `
                <h2 class="product-title" name="product-name">${element.name}</h2>
                <h4 class="product-text" name="product-stock">Stock: ${element.stock}</h4>
                <h4 class="product-text" name="product-stockMin">Stock minimo: ${element.stockMinimo}</h4>
            `;
            div.className = `product`;

            containerDeStock.appendChild(div);
        })

    }

};

renderInicial();
form.addEventListener(`submit`, agregarStock);
form.addEventListener(`submit`, ordenarAlfabeticamente);
