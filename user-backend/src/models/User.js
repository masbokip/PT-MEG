const { getDB } = require("../config/env");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static associate(models) {
    // this.hasMany(models.Beli, { foreignKey: "id_user" })
    this.hasMany(models.PakaiVoucher, { foreignKey: "id_user" })
    this.hasOne(models.Carts, { foreignKey: 'id_user' });
    // this.hasOne(models.Favorit, { foreignKey: 'id_user' });
    this.hasMany(models.Rating, { foreignKey: "id_user" });
  }
}
User.init(
  {
    id_user: {
      type: DataTypes.STRING(255),
      primaryKey: true,
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
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    jenis_kelamin: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    no_telp: {
      type: DataTypes.STRING(13),
      allowNull: false,
    },
    provinsi: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    kota: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    kecamatan: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    kelurahan: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    kode_pos: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
    },
    alamat_lengkap: {
        type: DataTypes.TEXT(),
        allowNull: false,
    },
    foto: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    role: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE(),
        allowNull: false,
    },
    status: {
      type: DataTypes.NUMBER(2),
      allowNull: false,
    },id_provinsi: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    id_kota: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    id_kecamatan: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "User",
    tableName: "user",
  },
);

module.exports = User;
