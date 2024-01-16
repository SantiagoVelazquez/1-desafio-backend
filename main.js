const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = this.readFromFile();
    }

    getNextId() {
        return this.products.reduce((maxId, product) => (product.id > maxId ? product.id : maxId), 0) + 1;
    }

    addProduct(title, description, price, img, code, stock) {
        if (!title || !description || !price || !img || !code || !stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        if (this.products.some(item => item.code === code)) {
            console.log("El código debe ser único");
            return;
        }

        const newProduct = {
            id: this.getNextId(),
            title,
            description,
            price,
            img,
            code,
            stock
        };

        this.products.push(newProduct);
        this.saveToFile();
    }

    getProducts() {
        return this.products;
    }

    deleteProduct(id) {
        this.products = this.products.filter(item => item.id !== id);

        this.saveToFile();
    }

    updateProduct(id, updatedFields) {
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
            console.error("Producto no encontrado");
            return;
        }

        this.products[index] = { ...this.products[index], ...updatedFields };

        this.saveToFile();
    }


    readFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(data) || [];
        } catch (error) {
            console.error("Error al leer el archivo:", error.message);
            return [];
        }
    }

    saveToFile() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
        } catch (error) {
            console.error("Error al escribir en el archivo:", error.message);
        }
    }
}

// Pruebas

//const productManager = new ProductManager('productos.json');

//productManager.addProduct("Producto 1", "Descripción 1", 10, "imagen1.jpg", "CODE1", 100);
//productManager.addProduct("Producto 2", "Descripción 2", 15, "imagen2.jpg", "CODE2", 50);

//console.log(productManager.getProducts());

//productManager.updateProduct(1, { price: 23, stock: 50 });

//console.log(productManager.getProducts(2));

//productManager.deleteProduct(2);

//console.log(productManager.getProducts());
