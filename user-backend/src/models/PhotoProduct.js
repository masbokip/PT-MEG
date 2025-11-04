const { getDB } = require("../config/env");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");

class ProdukFoto extends Model {
  static associate(models) {
    this.belongsTo(models.Produk, { foreignKey: "id_produk" });
  }
}

ProdukFoto.init(
  {
    id_produk: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    number: {
      type: DataTypes.INTEGER(20),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ProdukFoto",
    tableName: "foto_product",
    timestamps: false,
  }
);

module.exports = ProdukFoto;