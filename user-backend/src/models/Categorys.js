const { getDB } = require("../config/env");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");

class Categorys extends Model {
  static associate(models) {
    this.hasMany(models.Produk, { foreignKey: "nama_kategori" });
  }
}
Categorys.init(
  {
    id_kategori: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    nama_kategori: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    jumlah_produk: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    foto: {
      type: DataTypes.STRING(255),
      allowNull: true,
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
    modelName: "Categorys",
    tableName: "kategori",
  },
);

module.exports = Categorys;
