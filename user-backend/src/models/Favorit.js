const { getDB } = require("../config/env");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");

class Favorit extends Model {
  static associate(models) {
    this.hasOne(models.FavoritProduk, { foreignKey: "id_favorite" });
    this.belongsTo(models.User, { foreignKey: "id_user" });
  }
}
Favorit.init(
  {
    id_favorite: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    id_user: {
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
    modelName: "Favorit",
    tableName: "favorite",
  },
);

module.exports = Favorit;
