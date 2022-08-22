'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Certification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Certification.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          args: true,
          msg: 'El nombre de la certificación no puede quedar vacío'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notEmpty: {
          args: true,
          msg: 'La descripción de la certificación no puede quedar vacía'
        }
      }
    },
    image: DataTypes.STRING,
    startDate: {
      type:  DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          args: true,
          msg: 'La fecha de inicio no puede quedar vacía'
        }
      }
    },
    endDate:{
      type:  DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          args: true,
          msg: 'La fecha de fin no puede quedar vacía'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Certification',
  });
  return Certification;
};