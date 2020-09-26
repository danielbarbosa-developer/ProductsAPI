const TimeControl = require ("../controller/time-control.js");
const ProductsRepository = require("../Repository/products-repository.js");


//Definindo um arquivo JSON como banco de dados de exemplo
/*const fs = require('fs');
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


const saveProduct = (products) => fs.writeFileSync(filePath, JSON.stringify(products, null, '\t'));*/

const timeControl = new TimeControl();
const productsRepository = new ProductsRepository();



// //Definição das rotas da API e métodos HTTP
const router = (app)=>{
    
    app.get('/products/', (req, res)=>{
        const products = productsRepository.getProducts();
        res.status(200).send({products});
    });

    app.delete('/products/cadastro/:id?', (req, res)=>{
        const products = productsRepository.getProducts();

        productsRepository.saveProduct(products.filter(products=> products.id !== req.params.id));

        res.status(200).send("OK");

    });

    
    
    app.post('/products/cadastro',(req, res)=>{
        const products = productsRepository.getProducts();
        const getIds = products.map((products)=>{
            return products.id;
        });
        const getProduct = products.map((products)=>{
            return products.product;
        });
       
    
        //Negando requisições com o mesmo conteúdo dentro de 10 minutos
        if( getIds.includes(req.body.id) && getProduct.includes(req.body.product)){

            const sameProduct = products.filter(products=> products.id === req.body.id && products.product === req.body.product);
            
            if(timeControl.timmer(sameProduct, 10) === false){
                products.push({id: req.body.id, product: req.body.product, time: Date.now()});
                productsRepository.saveProduct(products);
    
                res.status(201).send("CREATED");
            }
            else{
                res.status(400).send("BAD_REQUEST");
            }
            
        }
        else{
            products.push({id: req.body.id, product: req.body.product, time: Date.now()});
            productsRepository.saveProduct(products);

            res.status(201).send("CREATED");
        }
    })

    app.put('/products/cadastro/:id?',(req, res)=>{
        const products = productsRepository.getProducts();

        productsRepository.saveProduct(products.map(products=>{
            if (products.id === req.params.id){
                return{
                    ...products,
                    ...req.body
                }
            }
            return products
        }));
        res.status(200).send("OK");

    });

}

module.exports = router;