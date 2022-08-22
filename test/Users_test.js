let chai  = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImphdmllcmNhemFyZXMxMTdAZ21haWwuY29tIiwicm9sZSI6InN1cGVyIn0sImlhdCI6MTYyOTU1ODc5OCwiZXhwIjoxNjI5NjQ1MTk4fQ.EkEuonxjPbKjCQWfPWy7FwgHdUvouG0uK9usGxIPVos';

describe("Usuarios", () => {
    describe("Leer usuarios", () => {
        it("Debe de retornar los usuarios registrados", (done) => {
            chai.request(url)
            .get('/users')
            .set({
                Authorization: `jwt ${token}`
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
        });

        it("Debe de rechazar leer los usuarios con el token inválido (No autorizado)", (done) => {
            chai.request(url)
            .get('/users')
            .set({
                Authorization: `jwt ${token}fwf`
            })
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
        });

        it("Debe de mostrar al usuario por Id", (done) => {
            chai.request(url)
            .get('/users/1')
            .set({
                Authorization: `jwt ${token}`
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
        });
    });

    describe("Actualizar usuario", () => {
        it("Debe de actualizar al usuario po Id", (done) => {
            chai.request(url)
            .put('/users/2')
            .set({
                Authorization: `jwt ${token}`
            })
            .send({
                email: 'javiercaz117@gmail.com'
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('mensaje');
                done();
            });
        });

        it("Debe de rechazar el envío de un campo vacío a actualizar", (done) => {
            chai.request(url)
            .put('/users/2')
            .set({
                Authorization: `jwt ${token}`
            })
            .send({
                lastName: '' ,
                email: 'javiercaz111@gmail.com'
            })
            .end((err, res) => {
                expect(res).to.have.status(503);
                expect(res.body).to.have.property('error');
                expect(res.body).to.have.property('mensaje');
                done();
            });
        });

        it("Debe de retornar un mensaje si no se encuentra al usuario", (done) => {
            chai.request(url)
            .put('/users/29')
            .set({
                Authorization: `jwt ${token}`
            })
            .send({
                lastName: '' ,
                email: 'javiercaz111@gmail.com'
            })
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('mensaje');
                done();
            });
        });
    });

    describe("Eliminar usuario", () => {
        it("Debe de eliminar al usuario por Id", (done) => {
            chai.request(url)
            .delete('/users/10')
            .set({
                Authorization: `jwt ${token}`
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('mensaje');
                done();
            });
        });

        it("Debe de rechar el eliminar un usuario con el token inválido (No autorizado)", (done) => {
            chai.request(url)
            .delete('/users/2')
            .set({
                Authorization: `jwt ${token}df`
            })
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
        })

        it("Debe de retornar un mensaje si no se encuentra el usuario a eliminar", (done) => {
            chai.request(url)
            .delete('/users/15')
            .set({
                Authorization: `jwt ${token}`
            })
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('mensaje');
                done();
            });
        })
    })
});