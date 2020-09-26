const fs = require('fs');
const { join } = require('path');

//Definindo um arquivo JSON como banco de dados de exemplo
const filePath = join(__dirname, '../data/productsData.json');

class ProductsRepository{
    
    getProducts = () =>{
        const data = fs.existsSync(filePath)
            ? fs.readFileSync(filePath)
            : []
    
        try{
            return JSON.parse(data);
        }
        catch (error){
            return []
        }
    }
    
    
    saveProduct = (products) => fs.writeFileSync(filePath, JSON.stringify(products, null, '\t'));
}

module.exports = ProductsRepository;