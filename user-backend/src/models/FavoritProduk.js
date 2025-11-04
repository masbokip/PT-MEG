const { getDB } = require("../config/env");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");

class FavoritProduk extends Model {
  static associate(models) {
    this.belongsTo(models.Produk, { foreignKey: "id_produk" });
    this.belongsTo(models.Favorit, { foreignKey: "id_favorite" });
  }
}
FavoritProduk.init(
  {
    id_favorite_produk: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    id_favorite: {
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
    created_at: {
        type: DataTypes.DATE(),
        allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "FavoritProduk",
    tableName: "favorite_produk",
  },
);

module.exports = FavoritProduk;
