const Brands = require("./Brands");
const CartProducts = require("./CartProducts");
const Carts = require("./Carts");
const Categorys = require("./Categorys");
const Customer = require("./Customer");
const ProdukFoto = require("./PhotoProduct");
const Produk = require("./Product");
const User = require("./User");
const Vouchers = require("./Vouchers");
const Beli = require("./Beli");
const BeliProduk = require("./BeliProduk");
const Transaksi = require("./Transaksi");
const TransaksiProduk = require("./TransaksiProduk");
const PakaiVoucher = require("./PakaiVoucher");
const Favorite = require("./Favorit")
const FavoritProduk = require("./FavoritProduk")
const Rating = require("./Rating")
module.exports = function () {

    Produk.hasMany(ProdukFoto,CartProducts,BeliProduk,TransaksiProduk,FavoritProduk,Rating, { foreignKey: "id_produk" });
    Produk.belongsTo(Brands,{foreignKey:"nama_brand"});
    Produk.belongsTo(Categorys,{foreignKey:"nama_kategori"});

    Brands.hasMany(Produk,{foreignKey:"nama_brand"});
    Categorys.hasMany(Produk,{foreignKey:"nama_kategori"});

    ProdukFoto.belongsTo(Produk, { foreignKey: "id_produk" });

    Rating.belongsTo(Produk,{foreignKey:"id_produk"});
    Rating.belongsTo(User,{foreignKey:"id_user"});

    User.hasOne(Carts,Favorite, { foreignKey: "id_user" });
    User.hasMany(Beli,PakaiVoucher,Rating, { foreignKey: "id_user" })

    Carts.belongsTo(User, { foreignKey: 'id_user' });
    CartProducts.belongsTo(Produk, { foreignKey: "id_produk" });

    Favorite.belongsTo(User, { foreignKey: 'id_user' });
    FavoritProduk.belongsTo(Produk, { foreignKey: "id_produk" });

    Beli.belongsTo(User, { foreignKey: "id_user" });
    Beli.hasOne(BeliProduk, { foreignKey: "id_beli" });
    BeliProduk.belongsTo(Beli, { foreignKey: "id_beli" });

    
    Transaksi.hasMany(TransaksiProduk, { foreignKey: "id_transaksi" });
    TransaksiProduk.belongsTo(Transaksi, { foreignKey: "id_transaksi" });
    Beli.hasOne(Transaksi, { foreignKey: "id_beli" });
    Transaksi.belongsTo(Beli, { foreignKey: "id_beli" });
    Transaksi.belongsTo(User, { foreignKey: "id_user" });
    BeliProduk.belongsTo(Produk, { foreignKey: "id_produk" });
    TransaksiProduk.belongsTo(Produk, { foreignKey: "id_produk" });

    PakaiVoucher.belongsTo(Vouchers,{foreignKey:"id_voucher"})
    PakaiVoucher.belongsTo(User,{foreignKey:"id_user"})

    Vouchers.hasMany(PakaiVoucher,{foreignKey:"id_voucher"})
    
};