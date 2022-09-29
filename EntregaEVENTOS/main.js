const form = document.querySelector(`#stock-form`); /* Selecciono el formulario */
const containerDeStock = document.querySelector(`#grid-stock`); /* Selecciono el contenedor donde voy a agregar los divs de los productos. */

const agregarStock = (e) => { /* Esta funcion toma los datos del formulario y los utiliza para agregar un div al DOM.*/
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

form.addEventListener(`submit`, agregarStock); /* Este evento activa la funcion anterior cuando se clickea el boton submit AGREGAR */