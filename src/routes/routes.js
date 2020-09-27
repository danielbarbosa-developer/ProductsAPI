const md5 = require("md5");
const TimeControl = require ("../controller/time-control.js");
const ProductsRepository = require("../Repository/products-repository.js");

const timeControl = new TimeControl();
const productsRepository = new ProductsRepository();

// //Definição das rotas da API e métodos HTTP
const router = (app)=>{
    
    app.get('/products/', (req, res)=>{
        const products = productsRepository.getProducts();
        res.status(200).send({products});
    });

    app.delete('/products/:id?', (req, res)=>{
        const products = productsRepository.getProducts();

        productsRepository.saveProduct(products.filter(products=> products.id !== req.params.id));

        res.status(200).send("OK");

    });

    
    
    app.post('/products/',(req, res)=>{
        var hashArray = md5(JSON.stringify(req.body).toLowerCase());
        const products = productsRepository.getProducts();
        const sameProducts = products.filter(requisicao=> requisicao.hash === hashArray);

        if(timeControl.timmer(sameProducts, 10) === false){
            var requisicao = {"hash": hashArray, "time": Date.now(), "products": req.body}
            products.push(requisicao);
            productsRepository.saveProduct(products);
            res.status(201).send("CREATED");
        }
        else{
            res.status(404).send("METHOD_NOT_ALLOWED");
        }
    })

    app.put('/products/:id?',(req, res)=>{
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