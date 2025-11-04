const { getDB } = require("../config/env");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");

class BeliProduk extends Model {
  static associate(models) {
    this.belongsTo(models.Beli, { foreignKey: "id_beli" });
    this.belongsTo(models.Produk, { foreignKey: "id_produk" });
  }
}
BeliProduk.init(
  {
    id_beli_produk: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    id_beli: {
        type: DataTypes.STRING(255),
      allowNull: false,
    },
    id_produk: {
        type: DataTypes.STRING(255),
      allowNull: false,
    },
    harga: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
      },
    jumlah: {
        type: DataTypes.INTEGER(20),
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
    modelName: "BeliProduk",
    tableName: "beli_produk",
  },
);

module.exports = BeliProduk;
