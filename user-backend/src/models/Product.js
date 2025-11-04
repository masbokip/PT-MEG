const { getDB } = require("../config/env");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");

class Produk extends Model {
  static associate(models) {
    this.hasMany(models.ProdukFoto, { foreignKey: "id_produk" });
    this.hasMany(models.CartProducts, { foreignKey: "id_produk" });
    // this.hasMany(models.FavoritProduk, { foreignKey: "id_produk" });
    this.hasMany(models.Rating, { foreignKey: "id_produk" });
    this.belongsTo(models.Category, { foreignKey: "nama_kategori" });
    this.belongsTo(models.Brand, { foreignKey: "nama_brand" });

  }
}

Produk.init(
  {
    id_produk: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    nama_produk: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nama_brand: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    nama_kategori: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    harga: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    stok: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    berat: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    garansi: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    deskripsi: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    harga_diskon: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
    },
    total_harga: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
    },
    mulai_promo: {
      type: DataTypes.DATE(),
      allowNull: true,
    },
    selesai_promo: {
      type: DataTypes.DATE(),
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
    status_promo: {
      type: DataTypes.NUMBER(2),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Produk",
    tableName: "produk",
    timestamps: false,
  }
);

module.exports = Produk;