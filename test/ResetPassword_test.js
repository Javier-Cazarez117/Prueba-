let chai  = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';

describe("Resetear Contraseña", () => {
    before(() => {
        console.log("Probando la funcionalidad para restablecer una contraseña");
    });
    after(() =>{
        console.log("Fin del test");
    });

    describe("Enviar correo de recuperación", function()  {
        this.timeout(9000);
        it("Debe de poder enviar el correo para restablecer la contraseña", (done) =>{
            chai.request(url)
            .post('/recuperar-password')
            .send({
                email: 'rojaslazaro386@gmail.com'
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
        })

        it("Debe de rechazar el envió del correo de recuperacón si no se proporciona uno", (done) =>{
            chai.request(url)
            .post('/recuperar-password')
            .send({
                email: ''
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message');
                done();
            });
        })

        it("Debe de rechazar el envió del correo de recuperacón si no existe el usuario", (done) =>{
            chai.request(url)
            .post('/recuperar-password')
            .send({
                email: 'rojaslazaro286@gmail.com'
            })
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('message');
                done();
            });
        })
    })

    describe("Validar token ", () =>{
        it("Debe de verificar que el token es válido", (done) =>{
            chai.request(url)
            .post('/validar-token')
            .send({
                token: '$2b$10$v05cxW170QLb3PTjSrDDYu9fcFpxXwX3H.8K1g1Mm8fJDUu.jZHvy'
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
        })

        it("Debe de verificar que se envie el token", (done) =>{
            chai.request(url)
            .post('/validar-token')
            .send({
                token: ''
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
        })

        it("Debe de rechazar la actualización de la contraseña si el token es inválido", (done) =>{
            chai.request(url)
            .post('/validar-token')
            .send({
                token: '$2b$10$JG9MdzCwIPjhPMWMITdsyamOcIdefEILjX3SrYIH6uR.YTz3hLfjUnJBjK'
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message');
                done();
            });
        })
    })

    describe("Actualizar contraseña", () =>{
        it("Debe de actualizar la contraseña", (done) =>{
            chai.request(url)
            .post('/actualizar-contrasena')
            .send({
                token: '$2b$10$v05cxW170QLb3PTjSrDDYu9fcFpxXwX3H.8K1g1Mm8fJDUu.jZHvy',
                password: '12345'
            })
            .end((err, res) => {
                expect(res).to.have.status(503);
                expect(res.body).to.have.property('message');
                done();
            });
        })

        it("Debe de rechazar la actualización si no se envia una nueva contraseña", (done) =>{
            chai.request(url)
            .post('/actualizar-contrasena')
            .send({
                token: '$2b$10$y282uDhb5a4.ihvOKLOU1.dJjOXiZTyUEDihcgEuFDbG8ZLfVnO8C',
                password: ''
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message');
                done();
            });
        })

        it("Debe de retornar un mensaje en caso de no poder guardar la contraseña", (done) =>{
            chai.request(url)
            .post('/actualizar-contrasena')
            .send({
                
            })
            .end((err, res) => {
                expect(res).to.have.status(503);
                expect(res.body).to.have.property('error');
                expect(res.body).to.have.property('message');
                done();
            });
        })
    })
})