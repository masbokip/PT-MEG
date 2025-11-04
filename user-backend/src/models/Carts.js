const { getDB } = require("../config/env");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");

class Carts extends Model {
  static associate(models) {
    this.hasOne(models.CartProducts, { foreignKey: "id_cart" });
    this.belongsTo(models.User, { foreignKey: "id_user" });
  }
}
Carts.init(
  {
    id_cart: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Carts",
    tableName: "cart",
  },
);

module.exports = Carts;
