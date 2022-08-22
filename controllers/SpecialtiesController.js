const multer = require('multer');

const multerConfig = require('../utils/multerConfig');
const {Specialty} = require('../models');

const upload = multer(multerConfig).single('image');

exports.fileUpload = (req, res, next) => {
    upload(req,res, function(error){
        if(error){
            res.json({message: error});
        }
        return next();
    });
};

//función para agregar una especialidad
exports.add = async (req, res, next) => {
    const specialty = new Specialty(req.body);
    try {
        if(req.file && req.file.filename){
            specialty.image =  req.file.filename;
        }

        await specialty.save();
        res.json({
            mensaje: 'Se ha registrado la especialidad',
            specialty,
        });
    } catch (error) {
        let errores = [];
        if (error.errors){
            errores = error.errors.map((errorItem) => ({
                campo: errorItem.path,
                error: errorItem.message,
            }));
        }

        res.status(400).json({
            error: true,
            mensaje: 'Error al registrar la especialidad',
            errores,
        });
    };
}

//función para listar las especialidades
exports.list = async (req, res, next) => {
    try {
        let filter  = req.query;
        if(req.query.q){
            filter = {name: {[Op.like]: `%${req.query.q}%`}}
        }
        const specialties = await Specialty.findAll({
            where: filter
        });
        res.json(specialties);
    } catch (error) {
        response.status(503).json({mensaje: 'Error al leer las especialidades'});
    }
};

//función para ver una especialidad
exports.show = async (req, res, next) => {
    try {
        const specialty = await Specialty.findByPk(req.params.id);
        if(!specialty) {
            res.status(404).json({mensaje: 'No se encontro la especialidad'});
        }else{
            res.json(specialty);
        }
    } catch (error) {
        res.status(503).json({mensaje: 'Eror al leer la especialidad'});
    }
};

//función para actualizar una especialidad
exports.update = async (req, res, next) => {
    try {
        const specialty = await Specialty.findByPk(req.params.id);
        if(!specialty){
            res.status(404).json({mensaje: 'No se encontró la especialidad'})
        }else
        Object.keys(req.body).forEach((propiedad) => {
            specialty[propiedad] = req.body[propiedad];
        });
        await specialty.save();
        res.json({mensaje: 'La especialidad fue actualizada'});
        
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
            mensaje: 'Error al registrar la especialidad',
            errores,
        });
    }
};

//función para eliminar una especialidad
exports.delete = async (req, res, next) => {
    try {
        const specialty = await Specialty.findByPk(req.params.id);
        if(!specialty){
            res.status(404).json({mensaje: 'No se encontró la especialidad'});
        }else{
            await specialty.destroy();
            res.json({mensaje: 'La especialidad fue eliminada'});
        }
    } catch (error) {
        res.status(503).json({mensaje: 'Error al eliminar la especialidad'});
    }
};