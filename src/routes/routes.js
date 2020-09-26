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


const toMiliSeconds = (minutes) =>{
    return minutes*60*1000;// converte minutos em milisegundos
}

function timmer(sameProduct, minutes){
    const filterTime = sameProduct.map((times)=>{
        return times.time;
    });// filtrando os times das requisições anteriores

    const timmer = filterTime.filter(time => time > Date.now() - toMiliSeconds(minutes) )
    console.log(timmer);
    var test = timmer * 1;
    console.log(test)
    if(timmer*1 !== 0){
        return true;
    }
    else{
        return false;
    }
}




// //Definição das rotas da API e métodos HTTP
const router = (app)=>{
    
    app.get('/products/', (req, res)=>{
        const products = getProducts();
        res.status(200).send({products});
    });

    app.delete('/products/cadastro/:id?', (req, res)=>{
        const products = getProducts();

        saveProduct(products.filter(products=> products.id !== req.params.id));

        res.status(200).send("OK");

    });

    
    
    app.post('/products/cadastro',(req, res)=>{
        const products = getProducts();
        const getIds = products.map((products)=>{
            return products.id;
        });
        const getProduct = products.map((products)=>{
            return products.product;
        });
        const sameProduct = products.filter(products=> products.id === req.body.id && products.product === req.body.product);
        console.log(sameProduct);
    
        //Negando requisições com o mesmo conteúdo dentro de 10 minutos
        if( getIds.includes(req.body.id) && getProduct.includes(req.body.product)){
            
            if(timmer(sameProduct, 10) === false){
                products.push({id: req.body.id, product: req.body.product, time: Date.now()});
                saveProduct(products);
    
                res.status(201).send("CREATED");
            }
            else{
                res.status(400).send("BAD_REQUEST");
            }
            
        }
        else{
            products.push({id: req.body.id, product: req.body.product, time: Date.now()});
            saveProduct(products);

            res.status(201).send("CREATED");
        }
    })

    app.put('/products/cadastro/:id?',(req, res)=>{
        const products = getProducts();

        saveProduct(products.map(products=>{
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