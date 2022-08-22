const multer = require('multer');
const {Op} = require("sequelize");


const multerConfig = require('../utils/multerConfig');
const {Course} = require('../models');

const upload = multer(multerConfig).single('image');

exports.fileUpload = (req, res, next) => {
    upload(req,res, function(error){
        if(error){
            res.json({message: error});
        }
        return next();
    });
};

//función para agregar un curso
exports.add = async (req, res, next) => {
    const course = new Course(req.body);
    try {
        if(req.file && req.file.filename){
            course.image =  req.file.filename;
        }

        await course.save();
        res.json({
            mensaje: 'Se ha registrado el curso',
            course,
        });
    } catch (error) {
        console.log(error);
        let errores = [];
        if (error.errors){
            errores = error.errors.map((errorItem) => ({
                campo: errorItem.path,
                error: errorItem.message,
            }));
        }

        res.status(503).json({
            error: true,
            mensaje: 'Error al registrar el curso',
            errores,
        });
    };
}

//función para listar los cursos
exports.list = async (req, res, next) => {
    try {
        let filter = req.query;
        if(req.query.q){
            filter = {name: {[Op.like]: `%${req.query.q}%`}}
        }
        const courses = await Course.findAll({
            where: filter
        });
        res.json(courses);
    } catch (error) {
        response.status(503).json({mensaje: 'Error al leer los cursos'});
    }
};

//función para ver un curso
exports.show = async (req, res, next) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if(!course) {
            res.status(404).json({mensaje: 'No se encontro el curso'});
        }else{
            res.json(course);
        }
    } catch (error) {
        res.status(503).json({mensaje: 'Eror al leer el curso'});
    }
};

//función para actualizar un curso
exports.update = async (req, res, next) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if(!course){
            res.status(404).json({mensaje: 'No se encontró el curso'})
        }else
        Object.keys(req.body).forEach((propiedad) => {
            course[propiedad] = req.body[propiedad];
        });
        await course.save();
        res.json({mensaje: 'El curso fue actualizado'});
        
    } catch (error) {
        let errores = []
        if (error.errors){
            errores = error.errors.map( errorItem => ({
                campo: errorItem.path,
                error: errorItem.message,
            }));
        }

        res.status(503).json({
            error: true,
            mensaje: 'Error al registrar el curso',
            errores,
        });
    }
};

//función para eliminar un curso
exports.delete = async (req, res, next) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if(!course){
            res.status(404).json({mensaje: 'No se encontró el curso'});
        }else{
            await course.destroy();
            res.json({mensaje: 'El curso fue eliminado'});
        }
    } catch (error) {
        res.status(503).json({mensaje: 'Error al eliminar el curso'});
    }
};