const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Job', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    clienId: {
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