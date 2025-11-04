const { getDB } = require("../config/env");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");

class PakaiVoucher extends Model {
  static associate(models) {
    this.belongsTo(models.Vouchers,{foreignKey:"id_voucher"})
    this.belongsTo(models.User,{foreignKey:"id_user"})
  }
}
PakaiVoucher.init(
  {
    id_pakaivoucher: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    id_user: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        allowNull: false,
      },
    id_voucher: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        allowNull: false,
      },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "PakaiVoucher",
    tableName: "pakai_voucher",
  },
);

module.exports = PakaiVoucher;
