class objetoStock { /*Esta es la clase en base a la que se van a crear todos los objetos del stock a continuacion,
                    con esta constructora deposito los objetos dentro del array "stock".*/

    constructor(nombre,stock,stockMinimo){
    this.producto = nombre,
    this.id = 0,
    this.stock = stock,
    this.stockMinimo = stockMinimo
    }

    agregarStock(cantidad){
        this.stock += cantidad;
    }
}

let stock = []; /* Este es el array que despues se completa con objetos en base a lo que ingresa el usuario */

const submit = document.getElementById("form-submit")
