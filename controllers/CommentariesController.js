const {Commentary} = require('../models');

exports.add = async (req, res, next) => {
    try {
        const commentary = await Commentary.create(req.body);
        res.json({
            mensaje: 'Se ha registrado tú comentario',
            commentary,
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
            mensaje: 'Error al registrar tú comentario',
            errores,
        });
    };
}

exports.list = async (req, res, next) => {
    try {
        const commentaries = await Commentary.findAll({});
        res.json(commentaries);
    } catch (error) {
        response.status(503).json({mensaje: 'Error al leer los comentarios'});
    }
};

exports.show = async (req, res, next) => {
    try {
        const commentary = await Commentary.findByPk(req.params.id);
        if(!commentary) {
            res.status(404).json({mensaje: 'No se encontro el comentario'});
        }else{
            res.json(commentary);
        }
    } catch (error) {
        res.status(503).json({mensaje: 'Eror al leer el comentario'});
    }
};

exports.delete = async (req, res, next) => {
    try {
        const commentary = await Commentary.findByPk(req.params.id);
        if(!commentary){
            res.status(404).json({mensaje: 'No se encontró el comentario'});
        }else{
            await commentary.destroy();
            res.json({mensaje: 'El comentario fue eliminado'});
        }
    } catch (error) {
        res.status(503).json({mensaje: 'Error al eliminar el comentario'});
    }
};