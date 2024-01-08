class ProductManager{

    static ultId = 0;

    constructor() {
        this.products = [];
    }
    addProduct(title, description, price, img, code, stock){
        if(!title || !description || !price || !img || !code || !stock){
            console.log("todos los campos son obligatorios");
            return;
        }
        if(this.products.some(item => item.code === code)){
            console.log("el código debe ser único");
            return;
        }
        const newProduct = {
            id: ++ProductManager.ultId,
            title,
            description,
            price,
            img,
            code,
            stock
        }
        this.products.push(newProduct);

    }
    getProducts(){
        return this.products;

    }
    getProductById(id){
        const product = this.products.find(item => item.id === id);
        if(!product){
            console.error("not found");
        } else {
            console.log(product);
        }
    }
}




//Testing

// const manager = new ProductManager();

// console.log(manager.getProducts());

// manager.addProduct("Producto prueba", "Este es un producto prueba", 200, "sin imagen","abc123", 25);

// console.log(manager.getProducts());

//  manager.addProduct("Producto prueba", "Este es un producto prueba", 200, "sin imagen","abc123", 25);

// manager.addProduct("prueba 2", "Este es producto prueba 2", 200, "sin imagen","abc124", 25);
// manager.addProduct("prueba 3", "Este es producto prueba 3", 200, "sin imagen","abc125", 25);

// console.log(manager.getProducts());

// console.log("verificamos producto id:2");
// manager.getProductById(2)