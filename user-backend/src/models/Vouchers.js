const { getDB } = require("../config/env");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");

class Vouchers extends Model {
  static associate(models) {
    this.hasMany(models.PakaiVoucher,{foreignKey:"id_voucher"})
  }
}
Vouchers.init(
  {
    id_voucher: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    nama_voucher: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    kode_voucher: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    potongan: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    jumlah_voucher: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
    status: {
      type: DataTypes.NUMBER(2),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Vouchers",
    tableName: "voucher",
  },
);

module.exports = Vouchers;
