const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');
const route = require('../src/routes/routes');

const should = chai.should();

chai.use(chaiHttp);

describe('routes', function(){

    var urlProduct = "/products";

    var newProducts = [
        {
            "id": "123",
            "name": "Caneta"
        }, 
        {
            "id": "14",
            "name": "Teclado"
        }
    ];

    it('Add new product', function(done){

        chai.request(server)
            .post(urlProduct)
            .set('content-type', 'application/json')
            .send(newProducts)
            .end(function(err, res){

                res.should.have.status(201);
                done();
            });

    });

   it('Add the same product before 10mins', function(done){

        chai.request(server)
            .post(urlProduct)
            .set('content-type', 'application/json')
            .send(newProducts)
            .end(function(err, res){

                res.should.have.status(403);
                done();
            });
    });

    it('Get all registers', function(done){

        chai.request(server)
            .get(urlProduct)
            .end(function(err, res){

                res.should.have.status(200);


                done();
            });
        
    });
    it('Delete by hash', function(done){

        chai.request(server)
            .delete(urlProduct)
            .send(newProducts)
            .end(function(err, res){

                res.should.have.status(200)
                done();
            })
    });


});

