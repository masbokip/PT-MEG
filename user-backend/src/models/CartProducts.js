const { getDB } = require("../config/env");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");

class CartProducts extends Model {
  static associate(models) {
    this.belongsTo(models.Produk, { foreignKey: "id_produk" });
    this.belongsTo(models.Carts, { foreignKey: "id_cart" });
  }
}
CartProducts.init(
  {
    id_cart_produk: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    id_cart: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    id_produk: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    harga: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
    jumlah_produk: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
    total_cart: {
        type: DataTypes.INTEGER(10),
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
    modelName: "CartProducts",
    tableName: "cart_produk",
  },
);

module.exports = CartProducts;
