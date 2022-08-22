let chai  = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImphdmllcmNhemFyZXMxMTdAZ21haWwuY29tIiwicm9sZSI6InN1cGVyIn0sImlhdCI6MTYyOTU1ODc5OCwiZXhwIjoxNjI5NjQ1MTk4fQ.EkEuonxjPbKjCQWfPWy7FwgHdUvouG0uK9usGxIPVos';

describe("Certificaciones", () => {
    before(() =>{
        console.log("Probando las funncionalidades sobre el CRUD  de certificaciones");
    });
   after(() => {
       console.log("Fin del test de las funcionalidades sobre el CRUD de certificaciones");
   });

    describe("Agregar certificaciones", () =>{
        it("Debe de agregar una nueva certificación", (done) => {
            chai.request(url)
            .post('/certifications')
            .set({
                Authorization: `jwt ${token}`
            })
            .send({
                name: 'Lorem ipsum dolor sit amet',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit, lorem et mollis sodales',
                startDate: '2021-08-15',
                endDate: '2021-12-15',
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('certification');
                expect(res.body).to.have.property('mensaje');
                done();
            });
        });

        it("Debe de rechazar el registro si se envian campos vacíos", (done) => {
            chai.request(url)
            .post('/certifications')
            .set({
                Authorization: `jwt ${token}`
            })
            .send({
                name: '',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit, lorem et mollis sodales',
                startDate: '2021-08-15',
                endDate: '',
            })
            .end((err, res) => {
                expect(res).to.have.status(503);
                expect(res.body).to.have.property('error');
                expect(res.body).to.have.property('mensaje');
                done();
            });
        })

        it("Debe de rechazar el registro si se envía un token inválido", (done) => {
            chai.request(url)
            .post('/certifications')
            .set({
                Authorization: `jwt ${token}y`
            })
            .send({
                name: 'Lorem ipsum dolor sit amet',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit, lorem et mollis sodales',
                startDate: '2021-08-15',
                endDate: '2021-12-15',
            })
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
        });
   });

    describe("Leer Certificaciones", () => {
       it("Debe de retornar la lista de las Certificaciones", (done) => {
            chai.request(url)
            .get('/certifications')
            .set({
                Authorization: `jwt ${token}`
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
       });

       it("Debe de retornar un registro por su Id", (done) => {
            chai.request(url)
            .get('/certifications/1')
            .set({
                Authorization: `jwt ${token}`
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
       });

        it("Debe de retornar un mensaje, en caso de no encontrar el registro", (done) => {
            chai.request(url)
            .get('/certifications/13')
            .set({
                Authorization: `jwt ${token}`
            })
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('mensaje').to.be.equal('No se encontro la certificación');
                done();
            });
       });
   });

   describe("Actualizar certificación", () =>{
        it("Debe de actualizar una certificación", (done) => {
            chai.request(url)
            .put('/certifications/1')
            .set({
                Authorization: `jwt ${token}`
            })
            .send({
                name: 'Lorem ipsum dolor sit amet',
                description: 'Lorem ipsum dolor sit amet, uisque hendrerit, lorem et mollis sodales',
                startDate: '2021-07-15',
                endDate: '2021-11-15',
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('mensaje').to.be.equal('La certificación fue actualizada');
                done();
            }); 
       });

       it("Debe de rechazar el envío de campos vacíos", (done) => {
            chai.request(url)
            .put('/certifications/1')
            .set({
                Authorization: `jwt ${token}`
            })
            .send({
                name: '',
                description: '',
                startDate: '2021-07-10',
                endDate: '2021-11-10',
            })
            .end((err, res) => {
                expect(res).to.have.status(503);
                expect(res.body).to.have.property('error');
                done();
            }); 
       });

       it("Debe de rechazar actualizar un registro si no se envía un token", (done) => {
           chai.request(url)
           .put('/certifications/1')
           .send({
                name: 'Lorem ipsum dolor sit amet',
                description: 'Lorem ipsum dolor sit amet, uisque hendrerit, lorem et mollis sodales',
                startDate: '2021-07-15',
                endDate: '2021-11-15',
            })
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
       });
   });

   describe("Elimimar certificación", () => {
        it("Debe de eliminar una certificación por su Id", (done) =>{
           chai.request(url)
           .delete('/certifications/7')
           .set({
               Authorization: `jwt ${token}`
           })
           .end((err, res) =>{
               expect(res).to.have.status(200);
               expect(res.body).to.have.property('mensaje').to.be.equals('La certificación fue eliminada');
               done();
           });
       });

        it("Debe de retornar un mensaje si no encuentra un registro a eliminar", (done) =>{
           chai.request(url)
           .delete('/certifications/18')
           .set({
               Authorization: `jwt ${token}`
           })
           .end((err, res) => {
               expect(res).to.have.status(404);
               expect(res.body).to.have.property('mensaje').to.be.equals('No se encontró la certificación');
               done();
           });
       });

        it("Debe de rechar eliminar una certificación si el token es inválido (No autorizado)", (done) => {
            chai.request(url)
            .delete('/certifications/1')
            .set({
                Authorization: `jwt ${token}dw`
            })
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
        });
   });
});