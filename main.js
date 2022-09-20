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


const ordenarAlfabeticamente = (e) => {
    e.preventDefault();

    let productos = document.querySelectorAll(`.product`);
    let productosOrdenados = Array.from(productos); /* Convertimos la HTML collection en array para usar .sort */

    if(productosOrdenados.length >= 2) {

        productosOrdenados.sort((a,b) => {/* Ordenamos el array.*/
            if(a.children[0].textContent > b.children[0].textContent){
                return 1;
            }

            if(b.children[0].textContent > a.children[0].textContent){
                return -1;
            }

            return 0;
            });

        /* Una vez que tenemos el array ordenado utilizamos un ciclo para
        modificar el DOM de manera que los elementos queden ordenados segun el array.*/

        for (let i = 0; i < productosOrdenados.length; i++){
            containerDeStock.removeChild(productosOrdenados[i]);
            containerDeStock.appendChild(productosOrdenados[i]);
        }

    }

};


form.addEventListener(`submit`, ordenarAlfabeticamente);
