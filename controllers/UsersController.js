const bcrypt = require('bcrypt');

const {User} = require('../models');
//funcion para agregar un usuario
exports.add = async (req, res, next) => {
    try {
        //se verifica que venga la contraseña 
        if(!req.body.password){
            res.status(400).json({mensaje: 'La contraseña es obligatoria'});
            next();
        }
        // si trae la contraseña se prosigue con el registro
        const datosUsuario = {...req.body};
        
        //se cifra la contraseña
        const salt = await bcrypt.genSalt(10);
        datosUsuario.password = await bcrypt.hash(datosUsuario.password, salt);
        
        //se guarda el nuevo usuario
        const user = await User.create(datosUsuario);

        user.password = null;

        res.json({
            mensaje: 'Se ha registrado el usuario',
            user,
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

        res.status(400).json({
            error: true,
            mensaje: 'Error al registrar el usuario',
            errores,
        });
    };
}

//listar usuarios
exports.list = async (req, res, next) => {
    try {
        const users = await User.findAll({});
        res.json(users);
    } catch (error) {
        response.status(503).json({mensaje: 'Error al leer los usuarios'});
    }
};

//ver un usuario
exports.show = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if(!user) {
            res.status(404).json({mensaje: 'No se encontro el usuario'});
        }else{
            user.password = null;
            res.json(user);
        }
    } catch (error) {
        res.status(503).json({mensaje: 'Eror al leer el usuario'});
    }
};

//actualizar un usuario
exports.update = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if(!user){
            res.status(404).json({mensaje: 'No se encontró el usuario'})
        }else
        Object.keys(req.body).forEach((propiedad) => {
            user[propiedad] = req.body[propiedad];
        });
        await user.save();
        res.json({mensaje: 'El usuario fue actualizado'});
        
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
            mensaje: 'Error al registrar el usuario',
            errores,
        });
    }
};


//eliminar un usuario
exports.delete = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if(!user){
            res.status(404).json({mensaje: 'No se encontró el usuario'});
        }else{
            await user.destroy();
            res.json({mensaje: 'El usuario fue eliminado'});
        }
    } catch (error) {
        res.status(503).json({mensaje: 'Error al eliminar el usuario'});
    }
};