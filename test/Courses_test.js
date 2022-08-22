let chai  = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImphdmllcmNhemFyZXMxMTdAZ21haWwuY29tIiwicm9sZSI6InN1cGVyIn0sImlhdCI6MTYyOTU1ODc5OCwiZXhwIjoxNjI5NjQ1MTk4fQ.EkEuonxjPbKjCQWfPWy7FwgHdUvouG0uK9usGxIPVos';

describe("Cursos", () =>{
    before(() => {
        console.log("Probando las funcionalidades sobre el CRUD de cursos");
    });
    after(() =>{
        console.log("Fin del test de las funcionalidades sobre el CRUD de cursos")
    });

    describe("Agregar cursos", () => {
        it("Debe de agregar un nuevo curso", (done) => {
            chai.request(url)
            .post('/courses')
            .set({
                Authorization: `jwt ${token}`
            })
            .send({
                name: 'Instalación de redes Lan',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit, lorem et mollis sodales',
                startDate: '2021-08-15',
                endDate: '2021-12-15',
                modality: 'Linea'
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('course');
                expect(res.body).to.have.property('mensaje');
                done();
            });
        });
       
        it("Debe de rechazar el envío de campos vacíos", (done) => {
            chai.request(url)
            .post('/courses')
            .set({
                Authorization: `jwt ${token}`
            })
            .send({
                name: '',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit, lorem et mollis sodales',
                startDate: '2021-08-15',
                endDate: '2021-12-15',
                modality: 'Linea'
            })
            .end((err, res) => {
                expect(res).to.have.status(503);
                expect(res.body).to.have.property('error');
                expect(res.body).to.have.property('mensaje');
                done();
            });
        });
        
        it("Debe de evitar el registro de un nuevo curso si el token es inválido", (done) => {
            chai.request(url)
            .post('/courses')
            .set({
                Authorization: `jwt ${token}dw`
            })
            .send({
                name: '',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit, lorem et mollis sodales',
                startDate: '2021-08-15',
                endDate: '2021-12-15',
                modality: 'Linea'
            })
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            }); 
        });
    });

    describe("Listar Cursos", () => {
        it("Debe de retornar la lista de todos los cursos registrados", (done) => {
            chai.request(url)
            .get('/courses')
            .set({
                Authorization: `jwt ${token}`
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            }); 
        });

        it("Debe de retornar un registro por Id", (done) => {
            chai.request(url)
            .get('/courses/1')
            .set({
                Authorization: `jwt ${token}`
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            }); 
        });

        it("Debe de retornar un mensaje en caso de que no se encuentre el registro", (done) => {
            chai.request(url)
            .get('/courses/12')
            .set({
                Authorization: `jwt ${token}`
            })
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('mensaje').to.be.equal('No se encontro el curso');
                done();
            }); 
        });
    });

    describe("Actualizar Curso", () => {
        it("Debe de permitir la actualización de cualquier registro del curso", (done) => {
            chai.request(url)
            .put('/courses/1')
            .set({
                Authorization: `jwt ${token}`
            })
            .send({
                startDate: '2021-09-01',
                endDate: '2021-12-01',
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('mensaje').to.be.equal('El curso fue actualizado');
                done();
            }); 
        });

        it("Debe de retornar un mensaje si no encuentra el registro a actualizar", (done) => {
            chai.request(url)
            .put('/courses/12')
            .set({
                Authorization: `jwt ${token}`
            })
            .send({
                startDate: '2021-09-01',
                endDate: '2021-12-01',
            })
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('mensaje').to.be.equal('No se encontró el curso');
                done();
            }); 
        });

        it("Debe de rechazar la actualización si el token es inválido", (done) => {
            chai.request(url)
            .put('/courses/1')
            .set({
                Authorization: `jwt ${token}h`
            })
            .send({
                startDate: '2021-09-01',
                endDate: '2021-12-01',
            })
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            }); 
        });
    });

    describe("Eliminar Cursos", () => {
        it("Debe permitir eliminar un registro por su Id", (done) =>{
            chai.request(url)
            .delete('/courses/6')
            .set({
                Authorization: `jwt ${token}`
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('mensaje');
                done();
            })
        });

        it("Debe de retornar un mensaje si no encuentra el registro a eliminar", (done) =>{
            chai.request(url)
            .delete('/courses/12')
            .set({
                Authorization: `jwt ${token}`
            })
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('mensaje').to.be.equal('No se encontró el curso');
                done();
            })
        });

        it("Debe de rechazar la acción de eliminar si no esta autorizado", (done) => {
            chai.request(url)
            .delete('/courses/2')
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
        });
    });
});