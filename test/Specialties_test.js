let chai  = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImphdmllcmNhemFyZXMxMTdAZ21haWwuY29tIiwicm9sZSI6InN1cGVyIn0sImlhdCI6MTYyOTU1ODc5OCwiZXhwIjoxNjI5NjQ1MTk4fQ.EkEuonxjPbKjCQWfPWy7FwgHdUvouG0uK9usGxIPVos';

describe("Especialidades", () => {
    describe("Agregar Especialidad", () => {
        it("Debe de registrar una nueva especialidad", (done) => {
            chai.request(url)
            .post('/specialties')
            .set({
                Authorization: `jwt ${token}`
            })
            .send({
                name: 'Ofimática',
                areaName: 'Tecnologías de la Información',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('specialty');
                expect(res.body).to.have.property('mensaje');
                done();
            });
        });

        it("Debe de rechazar crear una especialidad sin nombre", (done) => {
            chai.request(url)
            .post('/specialties')
            .set({
                Authorization: `jwt ${token}`
            })
            .send({
                areaName: 'Tecnologías de la Información',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body).to.have.property('mensaje');
                done();
            });
        });

        it("Debe de rechazar registrar una nueva especialidad con el token inválido (No auorizado)", (done) => {
            chai.request(url)
            .post('/specialties')
            .set({
                Authorization: `jwt ${token}gd`
            })
            .send({
                name: 'Ofimática',
                areaName: 'Tecnologías de la Información',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            })
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
        });
    });

    describe("Listar Especialidades", () => {
        it("Debe de retornar la lista de especialidades registradas", (done) => {
            chai.request(url)
            .get('/specialties')
            .set({
                Authorization: `jwt ${token}`
            })
            .end((err, res) =>{
                expect(res).to.have.status(200);
                done();
            });
        });

        it("Debe de rechazar leer la lista de especialides si no se envia el token", (done) => {
            chai.request(url)
            .get('/specialties')
            .end((err, res) =>{
                expect(res).to.have.status(401);
                done();
            });
        });
        
        it("Debe de mostrar una especialidad por Id", (done) => {
            chai.request(url)
            .get('/specialties/1')
            .set({
                Authorization: `jwt ${token}`
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
        });
    });

    describe("Actualizar especialidades", () => {
        it("Debe de actualizar una especialidad", (done) => {
            chai.request(url)
            .put('/specialties/1')
            .set({
                Authorization: `jwt ${token}`
            })
            .send({
                name: 'Uso de la lengua inglesa en diversos contextos',
                areaName: 'Comunicación', 
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
            })
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('mensaje');
                done();
            });
        });

        it("Debe de retornar un mensaje si no encuentra la especialidad a actualizar", (done) => {
            chai.request(url)
            .put('/specialties/10')
            .set({
                Authorization: `jwt ${token}`
            })
            .send({
                name: 'Uso de la lengua inglesa en diversos contextos',
                areaName: 'Comunicación', 
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
            })
            .end((err, res) => {
                expect(res).to.have.status(404)
                expect(res.body).to.have.property('mensaje');
                done();
            });
        });
         
        it("Debe rechazar el envío de un campos vacios a actualizar", (done) => {
            chai.request(url)
            .put('/specialties/2')
            .set({
                Authorization: `jwt ${token}`
            })
            .send({
                name: '',
                areaName: 'Comunicación', 
                description: ''
            })
            .end((err, res) => {
                expect(res).to.have.status(503)
                expect(res.body).to.have.property('error');
                expect(res.body).to.have.property('mensaje');
                done();
            });
        });
    });

    describe("Eliminar Especialidades", () => {
        it("Debe de elilminar una especialidad por su Id", (done) => {
            chai.request(url)
            .delete('/specialties/6')
            .set({
                Authorization: `jwt ${token}`
            })
            .end((err, res) =>{
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('mensaje');
                done();
            });
        });

        it("Debe de rechazar el eliminar una especialidad, si se envia un token inválido (No autorizado)", (done) =>{
            chai.request(url)
            .delete('/specialties/4')
            .set({
                Authorization: `jwt ${token}dew`
            })
            .end((err, res) =>{
                expect(res).to.have.status(401);
                done();
            });
        });

        it("Debe de retornar un mensaje si no se encuentra una especialidad a eliminar", (done) =>{
            chai.request(url)
            .delete('/specialties/14')
            .set({
                Authorization: `jwt ${token}`
            })
            .end((err, res) =>{
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('mensaje');
                done();
            });
        });
    });
});