class objetoStock {
    constructor(nombre,stock,stockMinimo){ /*Con esta constructora genero los objetos "stock".*/
    this.name = nombre,
    this.id = 0,
    this.stock = stock,
    this.stockMinimo = stockMinimo
    }
}

let stock = [];

/*Genero los objetos que voy a renderizar al usuario. */
stock.push(new objetoStock(`Tomate`,0,20));
stock.push(new objetoStock(`Pera`,0,20));
stock.push(new objetoStock(`Papa`,0,20));
stock.push(new objetoStock(`Zapallo`,0,20));
stock.push(new objetoStock(`Zanahoria`,0,20));
stock.push(new objetoStock(`Huevos`,0,20));
stock.push(new objetoStock(`Carne`,0,20));
stock.push(new objetoStock(`Harina`,0,20));
stock.push(new objetoStock(`Aceite`,0,20));

const stockContainer = document.querySelector("#grid-stock"); /* Selecciono el container donde quiero renderizar los productos.*/

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


/*array.sort((a,b) => {/* Ordenamos el array.
if(a.children[0].textContent > b.children[0].textContent){
    return 1;
}

if(b.children[0].textContent > a.children[0].textContent){
    return -1;
}

return 0;
});

for (let i = 0; i < productosOrdenados.length; i++){
        containerDeStock.removeChild(productosOrdenados[i]);
        containerDeStock.appendChild(productosOrdenados[i]);
    }
*/