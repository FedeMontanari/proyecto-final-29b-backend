const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "occupation",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: true,
    }
  );
};
