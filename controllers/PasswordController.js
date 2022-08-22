const bcrypt = require('bcrypt'); 
const { response } = require('express');
const { Op } = require('sequelize');

const {User} = require('../models');
const {emailResetPassword} = require('../utils/emailResetPassword');

exports.resetearPassword =  async (req, res, next) => {
  try {
    //verificar si se recibio el email
    if (!req.body.email){
      res.status(400).json({
        error: true,
        message: 'Se debe de proporcionar un email',
      });
    }
    //buscar el usuario por su email
    const user = await User.findOne({
      where: {
        email: req.body.email,
      }
    });
    if(!user){
      res.status(404).json({
        error: true, 
        message: 'No existe el usuario',
      });
    }
    //generar el token y enviar el email
    let token = await bcrypt.hash(user.email + Date.now().toString(), 10);
    token = token.replace(/\//g, "j");

    //guardar token
    user.passwordResetToken = token;
    user.passwordResetExpire = Date.now() + 3600000;
    await user.save();

    //enviar email
    const resultadoEmail = await emailResetPassword(
      `${user.name} ${user.lastName}`, 
      user.email, 
      token
      );
    if (resultadoEmail){
      res.json({
        message: 'Un mensaje ha sido enviado al email proporcionado',
      });
    } else {
      res.status(503).json({
        error: true,
        message: "Ocurrio un error al tratar de enviar el email de recuperación",
      });
    }
  } catch (error) {
    console.log(error)
    res.status(503).json({
      error: true,
      message: "Ocurrio un error al tratar de enviar el email de recuperación",
    });
  }
}

exports.validarTokenPassword = async (req, res, next) => {
  try {
    //buscar al usuario con ese token y vigencia
    const user = await User.findOne({
      where: {
        passwordResetToken: req.body.token,
        passwordResetExpire: {
          [Op.gt]: new Date()
        }
      }
    });

    if(!user){
      res.status(400).json({
        message: 'El link para reestablecer la contraseña es inválido o ha expirado',
      });
    }

    //retornar estatus que indique que es valido
    res.json({
      isValid: true,
      message: 'Ingrese una nueva contraseña',
    });

  } catch (error) {
    console.log(error);
    response.status(503).json({
      error: true,
      message: 'Error al validar el token'
    })
  }
}

exports.guardarNuevoPassword = async (req, res,next) => {
  try {
    //volver a validar el token
    //buscar al usuario con ese token y vigencia
    const user = await User.findOne({
      where: {
        passwordResetToken: req.body.token,
        passwordResetExpire: {
          [Op.gt]: new Date()
        }
      }
    });

    if(!user){
      res.status(400).json({
        message: 'El link para reestablecer la contraseña es inválido o ha expirado',
      });
    }

    //comprobar que se esta enviando la nueva contraseña
    if(!req.body.password){
      res.status(400).json({
        error: true,
        message: 'La contraseña es obligatoria',
      });
    }

    //cifrar contraseña
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    //quitar el token de recuperacion
    user.passwordResetToken = '';
    user.passwordResetExpire = null;

    await user.save();

    res.json({
      message: 'La nueva contraseña ha sido guardada, iniciar sesión nuevamente',
    })
    
  } catch (error) {
    console.log(error)
    res.status(503).json({
      error: true,
      message: 'Error al guardar la nueva contraseña',
    })
  }
}