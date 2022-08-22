'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Course.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true, 
          msg: 'El nombre del curso no puede quedar vacío'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'La descripción no puede quedar vacía'
        }
      }
    },
    startDate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          args: true,
          msg: 'La fecha de inicio no puede quedar vacía'
        }
      }
    },
    endDate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args:true,
          msg: 'La fecha de termino no puede quedar vacía'
        }
      }
    },
    modality: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'La modalidad no puede quedar vacía'
        }
      }
    },
    image: DataTypes.STRING 
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};