//Definição das rotas da API


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

// métodos HTTP para CRUD
const router = (app)=>{
    
    app.get('/products/', (req, res)=>{
        const products = getProducts();
        res.status(200).send({products});
    });

    app.post('/products/cadastro', (req, res)=>{
        const products = getProducts();
        const getIds = products.map((products)=>{
            return products.id;
        });
       
        if(!getIds.includes(req.body.id)){
            
            products.push(req.body);
            saveProduct(products);
            res.status(201).send("CREATED");
        }
        else{
            res.status(400).send("BAD_REQUEST");
        }
    });

    app.put('/products/cadastro/:id?', (req, res)=>{
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

    app.delete('/products/cadastro/:id?', (req, res)=>{
        const products = getProducts();

        saveProduct(products.filter(products=> products.id !== req.params.id));

        res.status(200).send("OK");

    });

 
}

module.exports = router;