const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "occupation",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
    },
    {
      timestamps: true,
    }
  );
};
