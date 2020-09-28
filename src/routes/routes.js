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

    app.delete('/products/', (req, res)=>{
        const products = productsRepository.getProducts();
        var hashArray = md5(JSON.stringify(req.body).toLowerCase());
        try{
            productsRepository.saveProduct(products.filter(products=> products.hash !== hashArray));

            res.status(200).send("OK");
        }
        catch(err){
            console.log(err);
            res.status(400).send("BAD_REQUEST");
        }
       

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
            res.status(403).send("FORBIDDEN");
        }
    })

}

module.exports = router;