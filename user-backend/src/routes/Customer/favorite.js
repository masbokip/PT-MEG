const express = require("express");
const { Op,fn,col, Sequelize } = require("sequelize");
const router = express.Router();
const Product = require("../../models/Product");
const Favorites = require("../../models/Favorit");
const FavoriteProducts = require("../../models/FavoritProduk");
const PhotoProducts = require("../../models/PhotoProduct");
const jwt = require("jsonwebtoken");

router.post("/favorite", async function (req, res) {
    const { id_user,id_produk } = req.body; 
    const jumlah_produk = 1;
    try {
        if (!id_produk || !jumlah_produk) {
        return res.status(400).json({ message: 'ID DAN STOK PRODUK HARUS ADA' });
    }
    let newIdPrefix = "FAV";
    let keyword = `%${newIdPrefix}%`
    let similiarUID = await Favorites.findAll({
        where: {
            id_favorite: {
                [Op.like]: keyword
            }
        }
    });
    let newIdFav = newIdPrefix + (similiarUID.length + 1).toString().padStart(3, '0');
    
    let favorite = await Favorites.findOne({ where: { id_user: id_user } });
    if (!favorite) {
        favorite = await Favorites.create({
            id_favorite: newIdFav,
            id_user: id_user,
            created_at: Date.now(),
        });
    }
    const produk = await Product.findByPk(id_produk);
    if (!produk) {
        return res.status(404).json({ message: 'Cannot find product' });
    }
    let favProduct = await FavoriteProducts.findOne({
        where: {
            id_favorite: favorite.id_favorite,
            id_produk: id_produk,
         }
    });
    if (produk.stok<jumlah_produk) {
        return res.status(400).json({
            message: "Stok tidak mencukupi",
         });
    }
     if (favProduct) {
        favProduct.jumlah_produk += jumlah_produk;
        await favProduct.save();
     } else {
        let newIdPrefix = "FAVPDT";
        let keyword = `%${newIdPrefix}%`
        let similiarUID = await FavoriteProducts.findAll({
        where: {
            id_favorite_produk: {
                [Op.like]: keyword
            }
        }
    });
    let newIdFavItem = newIdPrefix + (similiarUID.length + 1).toString().padStart(3, '0');
    favProduct = await FavoriteProducts.create({
        id_favorite_produk: newIdFavItem,
                id_favorite: favorite.id_favorite,
                id_produk: id_produk,
                jumlah_produk: jumlah_produk,
                harga : produk.total_harga,
                created_at: Date.now(),
            });
    }
        res.status(200).json({
        message: "Successfully add product to favorite", 
        data: favProduct
    });
        
    } catch (error) {
        res.status(400).send('Failed to add product to favorite') ;
    }
});

router.get("/favorite", async function (req, res) {
    const { id } = req.query;
    try {           
    const favorite = await Favorites.findOne({
        where: {
            id_user: id
        }
    });
    if (!favorite) {
        return res.status(400).json({ message: "Favorite has been empty" });
    };
    
    const favItems = await FavoriteProducts.findAll({
            where: {
                id_favorite: {
                    [Op.like]: favorite.id_favorite
                }
            },
            include: [
                {
                    model: Product,
                    where: {
                        status: 1
                    },
                    attributes: ['nama_produk', 'total_harga', 'stok','id_produk'],
                    include: [{
                        model: PhotoProducts,
                        attributes: ['nama'],
                        where: {
                            number: 1
                        }
                    }]
                }
            ]
    }); 
   return  res.status(200).json({data: favItems });
    
    
    } catch (error) {
        return res.status(400).send('Failed to get data favorite');
    }
});

router.delete("/favorite", async function (req, res) {
    const {id} = req.query;

    try {
        await FavoriteProducts.destroy({
            where: {
                id_favorite_produk: id
            }
        });
        return res.status(200).json("Item has been remove from favorite")
    } catch (error) {
        res.status(400).send("Failed to remove favorite item");
    }
});

router.get('/produk-favorit-bijian', async (req, res) => {
    try {
      const produkTerjual = await FavoriteProducts.findAll({
        attributes: [
          'id_produk',
          [fn('SUM', col('jumlah_produk')), 'total_terjual']
        ],
        include: [
          {
            model: Favorites,
            attributes: [],
            where: {
              created_at: {
                [Op.ne]: null
              }
            }
          }
        ],
        group: ['id_produk'],
      });
  
      const result = produkTerjual.map(row => row.toJSON());
  
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Error fetching produk favorit:", error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat memproses data.',
      });
    }
  });

module.exports = router;