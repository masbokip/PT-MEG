const { getDB } = require("../config/env");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");

class Transaksi extends Model {
  static associate(models) {
  }
}
Transaksi.init(
  {
    id_transaksi: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    id_beli: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    id_user: {
        type: DataTypes.STRING(255),
      allowNull: false,
    },
    nama_depan: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    nama_belakang: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    total: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
      },
    alamat_lengkap: {
        type: DataTypes.TEXT(),
        allowNull: false,
      },
    courier: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    resi: {
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
    modelName: "Transaksi",
    tableName: "transaksi",
  },
);

module.exports = Transaksi;
