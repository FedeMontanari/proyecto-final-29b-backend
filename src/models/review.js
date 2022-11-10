const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("review", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 5,
        notEmpty: true,
      }
    },
    picture: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    isProfessional: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
  });
};
