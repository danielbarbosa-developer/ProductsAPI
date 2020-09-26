const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server.js');
const route = require('../src/routes/routes.js');

const should = chai.should();

chai.use(chaiHttp);

describe('routes', function(){

    var newProduct = {
        id: 123,
        product: 'Mesa'
    };

    it('Add new product', function(done){

        chai.request(server)
            .post('/products/')
            .send(newProduct)
            .end(function(err, res){

                res.should.have.status(201);
                done();
            });

    });
   it('Add the same product before 10mins', function(done){

        chai.request(server)
            .post('/products/')
            .send(newProduct)
            .end(function(err, res){

                res.should.have.status(400);
                done();
            });
    });

    it('Get all registers', function(done){

        chai.request(server)
            .get('/products/')
            .end(function(err, res){

                res.should.have.status(200);


                done();
            });
        
    });

})

