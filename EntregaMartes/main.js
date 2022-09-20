class objetoStock {
    constructor(nombre,stock,stockMinimo){ /*Con esta constructora deposito los objetos dentro del array "stock".*/
    this.name = nombre,
    this.id = 0,
    this.stock = stock,
    this.stockMinimo = stockMinimo
    }
}

let stock = []; /* Este es el array que despues se completa con objetos en base a lo que ingresa el usuario */

stock.push(new objetoStock(`Tomate`,0,20));
stock.push(new objetoStock(`Pera`,0,20));
stock.push(new objetoStock(`Papa`,0,20));
stock.push(new objetoStock(`Zapallo`,0,20));
stock.push(new objetoStock(`Zanahoria`,0,20));
stock.push(new objetoStock(`Huevos`,0,20));
stock.push(new objetoStock(`Carne`,0,20));
stock.push(new objetoStock(`Harina`,0,20));
stock.push(new objetoStock(`Aceite`,0,20));

const stockContainer = document.querySelector("#grid-stock");

const renderStock = () => { /*Renderizo los productos utilizando el array de objetos */

    stock.forEach(producto => {
        let div = document.createElement(`div`);
        div.innerHTML = `<h2 class="product-title">${producto.name}</h2>
                <h4 class="product-text">Stock: ${producto.stock}</h4>
                <h4 class="product-text">Stock minimo: ${producto.stockMinimo}</h4>`;
        div.className = `product`;
        stockContainer.appendChild(div)
    });

}

renderStock();