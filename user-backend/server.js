const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");


const routeslogins = require("./src/routes/login");

const routesregiscust = require("./src/routes/Customer/register")
const routescharts = require("./src/routes/Customer/cart")

const routesrating = require("./src/routes/Customer/rating")

const routesbrand = require("./src/routes/Manager/brand")
const routescategory = require("./src/routes/Manager/category")
const routesproduct = require("./src/routes/Manager/product")
const routesuser = require("./src/routes/Manager/user")
const routesvoucher = require("./src/routes/Manager/vocer")
const routescheckout = require("./src/routes/Customer/checkout")
const routesfavorite = require("./src/routes/Customer/favorite")

const Produk = require("./src/models/Product");
const ProdukFoto = require("./src/models/PhotoProduct");
const Carts = require("./src/models/Carts");
const CartProducts = require("./src/models/CartProducts");
const User = require("./src/models/User");
const Category = require("./src/models/Categorys");
const Brand = require("./src/models/Brands");
const Beli = require("./src/models/Beli");
const BeliProduk = require("./src/models/BeliProduk");
const Transaksi = require("./src/models/Transaksi");
const TransaksiProduk = require("./src/models/TransaksiProduk");
const PakaiVoucher = require("./src/models/PakaiVoucher");
const Vouchers = require("./src/models/Vouchers");
const Favorit = require("./src/models/Favorit");
const FavoritProduk = require("./src/models/FavoritProduk");
const Rating = require("./src/models/Rating");
// Pass associated models
Produk.associate({ ProdukFoto, CartProducts, Category, Brand,Rating });
ProdukFoto.associate({ Produk });

Brand.associate({Produk});
Category.associate({Produk});

Rating.associate({Produk,User});

User.associate({Carts,PakaiVoucher,Beli,Rating})

Vouchers.associate({PakaiVoucher})

PakaiVoucher.associate({User,Vouchers})

Carts.associate({User, CartProducts})
CartProducts.associate({Produk,Carts})

Favorit.associate({User, FavoritProduk})
FavoritProduk.associate({Produk,Favorit})

Beli.associate({ User, BeliProduk, Transaksi});
BeliProduk.associate({ Beli, Produk });
Transaksi.associate({ TransaksiProduk, Beli, User });
TransaksiProduk.associate({ Transaksi, Produk});


const app = express();
app.set("port", 5000);
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));


app.use("/api", routesregiscust);
app.use("/api",routescharts);
app.use("/api", routescheckout);
app.use("/api",routesfavorite);

app.use("/api", routesbrand);
app.use("/api", routescategory);
app.use("/api", routesproduct);
app.use("/api", routesuser);
app.use("/api", routesvoucher);

app.use("/api",routesrating)

app.use("/api", routeslogins);




app.listen(app.get("port"), () => {
    console.log(`Server started at http://localhost:${app.get("port")}`);
  });

  module.exports = app;