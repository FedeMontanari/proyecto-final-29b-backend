const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('job', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    professionalId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    specializationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })
}