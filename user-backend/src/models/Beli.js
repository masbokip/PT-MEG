const { getDB } = require("../config/env");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");

class Beli extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "id_user" });
    this.hasMany(models.BeliProduk, { foreignKey: "id_beli" });
  }
}
Beli.init(
  {
    id_beli: {
      type: DataTypes.STRING(255),
      primaryKey: true,
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
    alamat_lengkap: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    total_beli: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
      },
    no_hp: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    courier: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      resi: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      ongkir: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
      },
      pajak: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
      },
      subtotal: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
      },
      potongan: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
      },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      status_pembayaran: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
      },
    status_pengiriman: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
      },
      status: {
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
    modelName: "Beli",
    tableName: "beli",
  },
);

module.exports = Beli;
