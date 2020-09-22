//Definição das rotas da API
const express = require('express');
const router = express.Router();

//Definindo um arquivo JSON como banco de dados de exemplo
const fs = require('fs');
const { join } = require('path');

const filePath = join(__dirname, '../data/productsData.json');

const getProducts = () =>{
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

const saveProduct = (products) => fs.writeFileSync(filePath, JSON.stringify(products, null, '\t'));


router.route('/products/:id?')
.get((req, res) =>{
    const products = getProducts();

    res.status(200).send({products});
})
.post((req, res) =>{
    const products = getProducts();

    products.push(req.body);
    saveProduct(products);

    res.status(201).send('Salvo com sucesso!')
});



module.exports = router;


