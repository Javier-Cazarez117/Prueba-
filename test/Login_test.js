let chai  = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';

describe("Registro y autenticación de usuarios", () => {
    describe("Registrar usuario", () => {
        it("Debe de registrar un nuevo usuario", (done) => {
            chai.request(url)
            .post('/users')  
            .send({
                name: 'Jose',
                lastName: 'Gonzalez',
                email: 'jose117@gmail.com',
                password: '1234'
            })
            .end((err, res) =>{
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('user');
                expect(res.body).to.have.property('mensaje');
                done();
            });
        });

        it("Debe de rechazar crear un usuario sin nombre", (done) => {
            chai.request(url)
            .post('/users')
            .send({
                lastName: 'Gonzalez',
                email: 'jose123@gmail.com',
                password: '1234'
            })
            .end((err, res) =>{
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body).to.have.property('mensaje');
                done();
            });
        });

        it("Debe de rechazar crear un usuario sin un email válido", (done) => {
            chai.request(url)
            .post('/users')
            .send({
                name: 'Eduardo',
                lastName: 'Gonzalez',
                email: 'eduar@fwfewf',
                password: '1234'
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body).to.have.property('mensaje');
                done();
            });
        });

        it("Debe rechazar registro de usuario existente",(done) => {
            chai.request(url)
            .post('/users')
            .send({
                name: 'Javier',
                lastname: 'Cazarez',
                email: 'javiercaz117@gmail.com',
                password: '123',
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body).to.have.property('mensaje');
                done();
            });
        });
    });

    describe("Autenticar usuario", () => {
        it("Debe de autenticar un usuario", (done) => {
            chai.request(url)
            .post('/login')
            .send({
                email: 'rojaslazaro386@gmail.com',
                password: '12345',
            })           
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('user');
                expect(res.body).to.have.property('token');
                done();
            });
        });

        it("Debe rechazar autenticación de credencial invalida", (done) => {
            chai.request(url)
            .post('/login')
            .send({
                email: 'javiercazares117@gmail.com',
                password: '123',
            })           
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body).to.have.property('message');
                done();
            })
        })

        it("Debe rechazar autenticación si se envía un campo vacío", (done) =>{
            chai.request(url)
            .post('/login')
            .send({
                email: 'javiercazares117@gmail.com',
                password: '',
            })           
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body).to.have.property('message');
                done();
            })
        })
    });
});
