'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: { 
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Nombre no puede quedar vacío'
        }
      }
    },
    lastName: { 
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Apellido no puede quedar vacío'
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
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    passwordResetToken: DataTypes.STRING,
    passwordResetExpire: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'User',
  });

  User.prototype.isValidPassword = function(password){
    return bcrypt.compareSync(password, this.password);
  }
  return User;
};