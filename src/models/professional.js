const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "professional",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      phoneNumber: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          notEmpty: true,
          isNumeric: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      occupation: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      rating: {
        type: DataTypes.FLOAT,
        validate: {
          isFloat: true,
          isNumeric: true,
        },
        defaultValue: null,
      },
      reviews: {
        type: DataTypes.ARRAY(DataTypes.JSON),
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:
          "https://cdn.discordapp.com/attachments/1031603049287917648/1034914210821460018/user.png",
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
