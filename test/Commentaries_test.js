let chai  = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImphdmllcmNhemFyZXMxMTdAZ21haWwuY29tIiwicm9sZSI6InN1cGVyIn0sImlhdCI6MTYyOTU1ODc5OCwiZXhwIjoxNjI5NjQ1MTk4fQ.EkEuonxjPbKjCQWfPWy7FwgHdUvouG0uK9usGxIPVos';

describe("Comentarios del usuario", () => {
    before(() =>{
        console.log("Probando las funcionalidades del CRUD de comentarios");
    });
    after(() =>{
        console.log("Fin del test de las funcionalidades del CRUD de comentarios");
    });

    describe("Agregar Comentario", () =>{
        it("Debe de poder registrar un nuevo comentario", (done) =>{
            chai.request(url)
            .post('/commentaries')
            .send({
                name: 'Jose Gonzalez',
                email: 'jose123@gmail.com',
                telephone: '7845219852',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit, lorem et mollis sodales',
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('commentary');
                expect(res.body).to.have.property('mensaje');
                done();
            });
        })

        it("Debe rechazar el registro de un nuevo comentario si el email no es válido", (done) =>{
            chai.request(url)
            .post('/commentaries')
            .send({
                name: 'Jose Gonzalez',
                email: 'jose123@dejnkn',
                telephone: '7845219852',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit, lorem et mollis sodales',
            })
            .end((err, res) => {
                expect(res).to.have.status(503);
                expect(res.body).to.have.property('mensaje');
                done();
            });
        })

        it("Debe rechazar el registro de un nuevo comentario si el número telefónico no es válido", (done) =>{
            chai.request(url)
            .post('/commentaries')
            .send({
                name: 'Jose Gonzalez',
                email: 'jose123@dejnkn',
                telephone: '784521879852',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit, lorem et mollis sodales',
            })
            .end((err, res) => {
                expect(res).to.have.status(503);
                expect(res.body).to.have.property('mensaje');
                done();
            });
        })
    })

    describe("Leer Comentarios", () => {
        it("Debe de retornar los comentarios registrados", (done) =>{
            chai.request(url)
            .get('/commentaries')
            .set({
                Authorization: `jwt ${token}`
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
        })

        it("Debe de rechazar leer la lista de comentarios si el token es inválido", (done) =>{
            chai.request(url)
            .get('/commentaries')
            .set({
                Authorization: `jwt ${token}w`
            })
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
        })

        it("Debe de permitir leer un comentario por Id", (done) =>{
            chai.request(url)
            .get('/commentaries/1')
            .set({
                Authorization: `jwt ${token}`
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
        })
    })

    describe("Eliminar Comentarios", () =>{
        it("Debe permitir eliminar un registro por su Id", (done) =>{
            chai.request(url)
            .delete('/commentaries/6')
            .set({
                Authorization: `jwt ${token}`
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('mensaje');
                done();
            })
        });

        it("Debe de retornar un mensaje en caso de no encontrar el registro a eliminar", (done) =>{
            chai.request(url)
            .delete('/commentaries/30')
            .set({
                Authorization: `jwt ${token}`
            })
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('mensaje').to.be.equals('No se encontró el comentario');
                done();
            });
        })

        it("Debe de rechazar la acción de eliminar si el token es inválido", (done) =>{
            chai.request(url)
            .delete('/commentaries/5')
            .set({
                Authorization: `jwt ${token}w`
            })
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
        })
    })
})