const { getDB } = require("../config/env");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");

class TransaksiProduk extends Model {
  static associate(models) {
    
  }
}
TransaksiProduk.init(
  {
    id_transaksi_produk: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    id_transaksi: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    id_produk: {
      type: DataTypes.STRING(255),
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
    modelName: "TransaksiProduk",
    tableName: "transaksi_produk",
  },
);

module.exports = TransaksiProduk;
