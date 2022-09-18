/* Funciona

const containerDeStock = document.querySelector(`#grid-stock`);
const button = document.querySelector(`#form-submit`)

const agregarStock = (e) => {
    e.preventDefault();
    let nombreStock = document.querySelector(`#product-name-input`).value;
    let stockInicial = document.querySelector(`#product-stock-input`).value;
    let stockMinimo = document.querySelector(`#product-stockMin-input`).value;

    let div = document.createElement(`div`);

    div.innerHTML = `
            <h2 class="product-title">${nombreStock}</h2>
            <h4 class="product-text">Stock: ${stockInicial}</h4>
            <h4 class="product-text">Stock minimo: ${stockMinimo}</h4>`;

    div.className = `product`;

    containerDeStock.appendChild(div);
}

button.onclick = agregarStock;

*/

const form = document.querySelector(`#stock-form`);
const containerDeStock = document.querySelector(`#grid-stock`)

const agregarStock = (e) => {
    e.preventDefault();

    let div = document.createElement(`div`);

    div.innerHTML= `
        <h2 class="product-title" name="product-name">${form.children[1].value.toUpperCase()}</h2>
        <h4 class="product-text" name="product-stock">Stock: ${form.children[3].value}</h4>
        <h4 class="product-text" name="product-stockMin">Stock minimo: ${form.children[5].value}</h4>
    `;

    div.className = `product`;

    containerDeStock.appendChild(div);
}

form.addEventListener(`submit`, agregarStock);

/* Ya esta armada la forma de agregarlo ahora quiero que el boton
me ordene alfabeticamente los elementos cada vez que se ingresa uno nuevo */

let productosArray = [];
let productos;
let contador;

const ordenarAlfabeticamente = (e) => {
    e.preventDefault();

    console.log(`ordenando`)

    productos = document.querySelectorAll(`.product`);

    productosArray = Array.from(productos)

    if(productosArray.length >= 2) {
        productosArray.sort((a,b) => {
            if(a.children[0].textContent > b.children[0].textContent){
                return 1;
            }

            if(b.children[0].textContent > a.children[0].textContent){
                return -1;
            }

            return 0;
            });

        contador = 0;

        productos.forEach((producto) => {
            producto.children[0].textContent = productosArray[contador].children[0].textContent;
            producto.children[1].textContent = productosArray[contador].children[1].textContent;
            producto.children[2].textContent = productosArray[contador].children[2].textContent;

             contador++;
            })
        }

};


form.addEventListener(`submit`, ordenarAlfabeticamente);
