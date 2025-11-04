const { getDB } = require("../config/env");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");

class Rating extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "id_user" });
    this.belongsTo(models.Produk, { foreignKey: "id_produk" });
  }
}

Rating.init(
  {
    id_rating: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    id_produk: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      validate: { min: 1, max: 5 },
    },
    ulasan: {
      type: DataTypes.TEXT(),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Rating",
    tableName: "rating",
    timestamps: false,
  }
);

module.exports = Rating;
