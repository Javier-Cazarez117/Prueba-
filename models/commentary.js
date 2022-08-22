'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Commentary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Commentary.init({
    name: {
      type:  DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          args: true,
          msg: 'El nombre no puede quedar vacío'
        }
      }
    },
    email: {
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'El email no puede quedar vacío',
        },
        notEmpty: {
          args: true,
          msg: 'El email no puede quedar vacío',
        },
        isEmail: {
          args: true,
          msg: 'No es un email válido',
        }
      }
    },
    telephone:{
      type:  DataTypes.STRING,
      allowNull: false,
      validate:{
        isMobilePhone:{
          args: ['es-MX'],
          msg: 'No es un número telefónico válido'
        },
        notEmpty: {
          args: true,
          msg: 'El telefono no puede quedar vacío'
        }
      }
    },
    description:{
      type:  DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          args: true,
          msg: 'La descripción no puede quedar vacía'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Commentary',
  });
  return Commentary;
};