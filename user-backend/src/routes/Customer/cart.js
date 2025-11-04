const express = require("express");
const { Op, Sequelize } = require("sequelize");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const Carts = require("../../models/Carts");
const CartProducts = require("../../models/CartProducts");
const Product = require("../../models/Product");
const PhotoProducts = require("../../models/PhotoProduct");
const jwt = require("jsonwebtoken");


router.post("/cart", async function (req, res) {
    const { id_user,id_produk, jumlah_produk } = req.body; 
    const totalproduk = 0;
    try {
        if (!id_produk || !jumlah_produk) {
        return res.status(400).json({ message: 'ID DAN STOK PRODUK HARUS ADA' });
    }
    let newIdPrefix = "CART";
    let keyword = `%${newIdPrefix}%`
    let similiarUID = await Carts.findAll({
        where: {
            id_cart: {
                [Op.like]: keyword
            }
        }
    });
    let newIdCart = newIdPrefix + (similiarUID.length + 1).toString().padStart(3, '0');
    
    let cart = await Carts.findOne({ where: { id_user: id_user } });
    if (!cart) {
        cart = await Carts.create({
            id_cart: newIdCart,
            id_user: id_user,
            created_at: Date.now(),
        });
    }
    const produk = await Product.findByPk(id_produk);
    if (!produk) {
        return res.status(404).json({ message: 'Cannot find product' });
    }

    let cartProduct = await CartProducts.findOne({
        where: {
            id_cart: cart.id_cart,
            id_produk: id_produk,
         }
    });
    if (produk.stok<jumlah_produk) {
        return res.status(400).json({
            message: "Stok tidak mencukupi",
         });
    }
     if (cartProduct) {
        parseInt(cartProduct.jumlah_produk += jumlah_produk);
        await cartProduct.save();
     } else {
        let newIdPrefix = "CARTPRDK";
        let keyword = `%${newIdPrefix}%`
        let similiarUID = await CartProducts.findAll({
        where: {
            id_cart_produk: {
                [Op.like]: keyword
            }
        }
    });
    let newIdCartItem = newIdPrefix + (similiarUID.length + 1).toString().padStart(3, '0');
    cartProduct = await CartProducts.create({
                id_cart_produk: newIdCartItem,
                id_cart: cart.id_cart,
                id_produk: id_produk,
                jumlah_produk: parseInt(jumlah_produk),
                harga : produk.total_harga,
                total_cart : jumlah_produk * produk.total_harga,
                created_at: Date.now(),
            });
    }
        res.status(200).json({
        message: "Successfully add product to cart", 
        data: cartProduct
    });
        
    } catch (error) {
        res.status(400).send('Failed to add product to cart') ;
    }
});



router.post("/cartsingle", async function (req, res) {
    const { id_user,id_produk } = req.body; 
    const jumlah_produk = 1;
    try {
        if (!id_produk || !jumlah_produk) {
        return res.status(400).json({ message: 'ID DAN STOK PRODUK HARUS ADA' });
    }
    let newIdPrefix = "CART";
    let keyword = `%${newIdPrefix}%`
    let similiarUID = await Carts.findAll({
        where: {
            id_cart: {
                [Op.like]: keyword
            }
        }
    });
    let newIdCart = newIdPrefix + (similiarUID.length + 1).toString().padStart(3, '0');
    
    let cart = await Carts.findOne({ where: { id_user: id_user } });
    if (!cart) {
        cart = await Carts.create({
            id_cart: newIdCart,
            id_user: id_user,
            created_at: Date.now(),
        });
    }
    const produk = await Product.findByPk(id_produk);
    if (!produk) {
        return res.status(404).json({ message: 'Cannot find product' });
    }

    let cartProduct = await CartProducts.findOne({
        where: {
            id_cart: cart.id_cart,
            id_produk: id_produk,

         }
    });
    if (produk.stok<jumlah_produk) {
        return res.status(400).json({
            message: "Stok tidak mencukupi",
         });
    }
     if (cartProduct) {
        cartProduct.jumlah_produk += jumlah_produk;
        await cartProduct.save();
     } else {
        let newIdPrefix = "CARTPRDK";
        let keyword = `%${newIdPrefix}%`
        let similiarUID = await CartProducts.findAll({
        where: {
            id_cart_produk: {
                [Op.like]: keyword
            }
        }
    });
    let newIdCartItem = newIdPrefix + (similiarUID.length + 1).toString().padStart(3, '0');
    cartProduct = await CartProducts.create({
                id_cart_produk: newIdCartItem,
                id_cart: cart.id_cart,
                id_produk: id_produk,
                jumlah_produk: jumlah_produk,
                harga : produk.total_harga,
                total_cart : jumlah_produk * produk.total_harga,
                created_at: Date.now(),
            });
    }
        res.status(200).json({
        message: "Successfully add product to cart", 
        data: cartProduct
    });
        
    } catch (error) {
        res.status(400).send('Failed to add product to cart') ;
    }
});

router.get("/cart", async function (req, res) {
    const { id } = req.query;
    try {           
    const cart = await Carts.findOne({
        where: {
            id_user: id
        }
    });
    if (!cart) {
        return res.status(400).json({ message: "Cart has been empty" });
    };
    
    const cartItems = await CartProducts.findAll({
            where: {
                id_cart: {
                    [Op.like]: cart.id_cart
                }
            },
            include: [
                {
                    model: Product,
                    where: {
                        status: 1
                    },
                    attributes: ['nama_produk', 'total_harga', 'nama_brand'],
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
    const totalCartProducts = await CartProducts.count({
            distinct: true,
            col: 'id_cart_produk',
            where: {
                id_cart: cart.id_cart
            }
    });

     const totalQtyProducts = await CartProducts.sum('jumlah_produk', {
            where: {
                id_cart: cart.id_cart
            }
     });

     const totalPesanan = await CartProducts.sum('total_cart', {
        where: {
            id_cart: cart.id_cart
        }
 });
   return  res.status(200).json({data: cartItems, totalProducts: totalCartProducts, jumlahProducts: totalQtyProducts , totalPesanans: totalPesanan });
    
    
    } catch (error) {
        return res.status(400).send('Failed to get data cart');
    }
});

// router.get("/beratcart", async function (req, res) {
//     const { id_user } = req.query;
//     // try {           
//         const cart = await Carts.findOne({
//             where: {
//                 id_user: id_user
//             }
//         });
//         if (!cart) {
//             return res.status(400).json({ message: "Cart has been empty" });
//         };
//         const totalBerat = await Product.sum('berat', {
//             include: [
//                 {
//                     model: CartProducts,
//                     where: {
//                         id_cart : cart.id_cart
//                     },
//                 },
//             ],
            
//         });
//         const jumlahproduk = await CartProducts.sum('jumlah_produk',{
//             where: {
//                 id_cart : cart.id_cart
//             }
//         })
//         const tambah = jumlahproduk * totalBerat
//         return  res.status(200).json({tambah});
    
//     // } catch (error) {
//     //     return res.status(400).send('Failed to get data cart');
//     // }
// });

router.get("/beratcart", async function (req, res) {
    const { id_user } = req.query;
    try {
        const cart = await Carts.findOne({
            where: {
                id_user: id_user
            }
        });

        if (!cart) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Hitung total berat produk dalam cart
        const totalBerat = await Product.sum('berat', {
            include: {
                model: CartProducts,
                attributes: [], // Hindari pengambilan kolom tambahan
                where: {
                    id_cart: cart.id_cart
                }
            }
        });

        // Hitung jumlah produk dalam cart
        const jumlahProduk = await CartProducts.sum('jumlah_produk', {
            where: {
                id_cart: cart.id_cart
            }
        });

        const total = jumlahProduk * totalBerat;
        return res.status(200).json({ total });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Failed to get data cart', error });
    }
});


router.put('/cart', async function (req, res) {
    const { id } = req.query;
    const { qty } = req.body;

    try {
        let cartProduct = await CartProducts.findOne({
            where: {
                id_cart_produk: id,
            }
        });

        if (!cartProduct) {
            return res.status(404).json({ message: 'Cart product not found' });
        }

        let product = await Product.findOne({
            where: {
                id_produk: cartProduct.id_produk,
            }
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let availableStock = product.stok;

        if (availableStock < qty) {
            return res.status(400).json({ message: `Not enough stock available` });
        }

        cartProduct.jumlah_produk = qty;
        await cartProduct.save();

        res.status(200).json({ message: 'Cart updated successfully', cartProduct });
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ message: 'An error occurred while updating the cart' });
    }
});

router.delete("/cart", async function (req, res) {
    const {id} = req.query;

    try {
        await CartProducts.destroy({
            where: {
                id_cart_produk: id
            }
        });
        return res.status(200).json("Item has been remove from cart")
    } catch (error) {
        res.status(400).send("Failed to remove cart item");
    }
});

module.exports = router;