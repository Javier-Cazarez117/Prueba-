const multer = require('multer');

const multerConfig = require('../utils/multerConfig');
const {Certification} = require('../models');
const upload = multer(multerConfig).single('image');

exports.fileUpload = (req, res, next) => {
    upload(req,res, function(error){
        if(error){
            res.json({message: error});
        }
        return next();
    });
};

exports.add = async (req, res, next) => {
    const certification = new Certification(req.body);
    try {
        if(req.file && req.file.filename){
            certification.image =  req.file.filename;
        }

        await certification.save();
        res.json({
            mensaje: 'Se ha registrado la certificación',
            certification,
        });
    } catch (error) {
        let errores = [];
        if (error.errors){
            errores = error.errors.map((errorItem) => ({
                campo: errorItem.path,
                error: errorItem.message,
            }));
        }

        res.status(503).json({
            error: true,
            mensaje: 'Error al registrar la certificación',
            errores,
        });
    };
}

exports.list = async (req, res, next) => {
    try {
        let filter  = req.query;
        if(req.query.q){
            filter = {name: {[Op.like]: `%${req.query.q}%`}}
        }
        const certifications = await Certification.findAll({
            where: filter
        });
        res.json(certifications);
    } catch (error) {
        res.status(503).json({mensaje: 'Error al leer las certificaciones'});
    }
};

exports.show = async (req, res, next) => {
    try {
        const certification = await Certification.findByPk(req.params.id);
        if(!certification) {
            res.status(404).json({mensaje: 'No se encontro la certificación'});
        }else{
            res.json(certification);
        }
    } catch (error) {
        res.status(503).json({mensaje: 'Eror al leer la certificación'});
    }
};

exports.update = async (req, res, next) => {
    try {
        const certification = await Certification.findByPk(req.params.id);
        if(!certification){
            res.status(404).json({mensaje: 'No se encontró la certificación'})
        }else
        Object.keys(req.body).forEach((propiedad) => {
            certification[propiedad] = req.body[propiedad];
        });
        await certification.save();
        res.json({mensaje: 'La certificación fue actualizada'});
        
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
            mensaje: 'Error al registrar la certificación',
            errores,
        });
    }
};

exports.delete = async (req, res, next) => {
    try {
        const certification = await Certification.findByPk(req.params.id);
        if(!certification){
            res.status(404).json({mensaje: 'No se encontró la certificación'});
        }else{
            await certification.destroy();
            res.json({mensaje: 'La certificación fue eliminada'});
        }
    } catch (error) {
        res.status(503).json({mensaje: 'Error al eliminar la certificación'});
    }
};