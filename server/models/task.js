'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  };
  Task.init({
    title: {type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: `Fill the title`
      }
    }},
    description: DataTypes.STRING,
    category: {type: DataTypes.STRING,
    validate: {
      isIn: {
        args: [['backlog', 'todo', 'doing', 'done']],
        msg: "Category Invalid"
      }
    }}
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};