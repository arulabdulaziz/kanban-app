'use strict';
const Bcrypt = require('../helper/bcrypt')
const {
  Model
} = require('sequelize');
const { options } = require('../routes');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task, {foreignKey: 'UserId'})
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: {type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: {
        msg: `Format email inavlid`
      },
      notEmpty: {
        msg: `Fill Email`
      },
    }},
    password: {type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: `Fill the password`
      },
      min: 3
    }}
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance, option) => {
    instance.password = Bcrypt.hash(instance.password)
  })
  User.beforeUpdate((instance, option) => {
    instance.password = Bcrypt.hash(instance.password)
  })
  return User;
};