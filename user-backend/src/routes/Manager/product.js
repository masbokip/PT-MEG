const express = require("express");
const multer = require("multer");
const { Op, Sequelize, where } = require("sequelize");
const path = require("path");
const ProductImages = require("../../models/PhotoProduct");
const Products = require("../../models/Product");
const Category = require("../../models/Categorys");
const Brand = require("../../models/Brands");
const router = express.Router();
const Joi = require('joi');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/assets/images/product");
  },
  filename: function name(req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName =
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only .jpg, .jpeg, and .png files are allowed"), false);
  }
};

const upload = multer({ 
  storage: storage ,
  fileFilter: fileFilter,
});

const productSchema = Joi.object({
  nama_produk: Joi.string().min(2).required(),
  nama_brand: Joi.string().required(),
  nama_kategori: Joi.string().required(),
  harga: Joi.number().positive().required(),
  berat: Joi.number().positive().required(),
  garansi: Joi.string().optional().allow(null, ""),
  stok: Joi.number().integer().min(0).required(),
  deskripsi: Joi.string().required(),
});

async function updatePromo() {
  try {
    const today = new Date();
    today.setHours(0,0,0,0);
    const produkPromo = await Products.findAll({
      where:{
        status_promo : 1,
        selesai_promo : today
      },
    });
    for(const produk of produkPromo){
      await produk.update({
        status_promo: 0,
        total_harga: produk.harga,
        harga_diskon: 0,
      });
    }
    console.error("Pengecekan berhasil");
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
}

async function setDbHargaBaru() {
  try {
    const produkPromo = await Products.findAll({
      where:{
        status_promo : 0,
      },
    });
    for(const produk of produkPromo){
      const hitungHarga = produk.harga - produk.harga_diskon;
      await produk.update({
        total_harga: hitungHarga,
      });
    }
    console.error("Pengecekan berhasil");
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
}

router.post("/addproduk", upload.array("foto", 4), async (req, res) => {
  try {

    const { error } = productSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    const { nama_produk, nama_brand, nama_kategori, harga, berat, garansi, stok, deskripsi } = req.body;

    const newIdFixUser = "MEG";
    const checkIdEntryUser = await Products.findOne({
      where: {
        id_produk: {
          [Op.like]: `${newIdFixUser}%`,
        },
      },
      order: [["id_produk", "DESC"]],
    });

    let newIdUser = 1;
    if (checkIdEntryUser) {
      const checkIdUser = checkIdEntryUser.id_produk;
      const totalUser = checkIdUser.replace(newIdFixUser, "");
      newIdUser = parseInt(totalUser, 10) + 1;
    }
    const defaultIdUser = newIdFixUser + newIdUser.toString().padStart(3, "0");

    // Simpan data produk
    const data = await Products.create({
      id_produk: defaultIdUser,
      nama_produk,
      nama_brand,
      nama_kategori,
      harga,
      berat,
      garansi,
      stok,
      deskripsi,
      harga_diskon: 0,
      total_harga : harga - 0,
      mulai_promo: null,
      selesai_promo: null,
      status_promo: null,
      created_at: new Date(),
      status: 1,
    });

    // Simpan data gambar
    const imageEntries = req.files.map((file, index) => ({
      id_produk: defaultIdUser,
      nama: file.filename,
      number: index + 1,
    }));
    await ProductImages.bulkCreate(imageEntries);

    return res.status(201).json({
      message: `Selamat Produk ${nama_produk} Berhasil Ditambahkan`,
      data,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(400).json({
      message: "Gagal Registrasi",
      error: error.message,
    });
  }
});

router.put("/produk/update/:id",upload.array("fotos", 4),
  async function (req, res) {
    const { id } = req.params;
    const {
      nama_produk,
      nama_brand,
      nama_kategori,
      harga,
      stok,
      berat,
      garansi,
      deskripsi,
    } = req.body;
    try {
      const produk = await Products.findOne({
        where: { id_produk: id },
      });
      if (!produk) {
        return res.status(404).json({ message: "Product not found" });
      }
      await produk.update({
        nama_produk: nama_produk || produk.nama_produk,
        nama_brand: nama_brand || produk.nama_brand,
        nama_kategori: nama_kategori || produk.nama_kategori,
        harga: harga || produk.harga,
        stok: stok || produk.stok,
        berat: berat || produk.berat,
        garansi: garansi || produk.garansi,
        deskripsi: deskripsi || produk.deskripsi,
        status: 1,
      });
      if (req.files && req.files.length > 0) {
        await ProductImages.destroy({
          where: { id_produk: id },
        });
        const imageEntries = req.files.map((file, index) => ({
          id_produk: id,
          nama: file.filename,
          number: index + 1,
        }));
        await ProductImages.bulkCreate(imageEntries);
      }
      return res.status(200).json({
        message: "Produk and images updated successfully",
        produk,
      });
    } catch (err) {
      console.error("Error updating product:", err);
      return res.status(500).json({ message: "Failed to update Produk data" });
    }
  }
);

router.put("/produk/updatepromo/:id", async function (req, res) {
  const { id } = req.params; 
  const { mulai_promo,selesai_promo,harga_diskon } = req.body; 
  try {
    const produk = await Products.findOne({ 
      where: { id_produk: id} 
    });

    if (!produk) {
      return res.status(404).json({ message: "Product not found" });
    }
    await produk.update({
      mulai_promo: mulai_promo || produk.mulai_promo,
      selesai_promo: selesai_promo || produk.selesai_promo,
      harga_diskon: harga_diskon || produk.harga_diskon,
      total_harga : produk.harga - harga_diskon,
      status_promo: 1,
    });
    return res.status(200).json({ message: "Produk updated successfully", produk });
  } catch (err) {
    console.error("Error updating product:", err);
    return res.status(500).json({ message: "Failed to update Produk data" });
  }
});

router.delete("/produk/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const product = await Products.findOne({
      where: { id_produk: id },
      include: [ProductImages],
    });

    if (!product) {
      return res.status(404).send("Product not found");
    }

    for (const foto of product.ProdukFotos) {
      const imagePath = `./public/assets/images/product/${foto.nama}`;
      try {
        fs.unlinkSync(imagePath);
      } catch (error) {
        console.error(`Failed to delete image: ${foto.nama}`, error);
      }
    }
    await ProductImages.destroy({ where: { id_produk: id } });
    await Products.destroy({ where: { id_produk: id } });

    return res.status(200).send("Product and associated images deleted successfully");
  } catch (err) {
    console.error("Error deleting product:", err);
    return res.status(500).send("Failed to delete product");
  }
});

router.get("/product/:id", async function (req, res) {
  setDbHargaBaru();
  updatePromo();
  const { id } = req.params;

  try {
    const data = await Products.findOne({
      where: {
        id_produk: id,
        status: 1,
      }
    });

    if (!data) {
      return res.status(404).json({ message: "Product not found or inactive" });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).json({ message: "Failed to get user product" });
  }
});

// GET TOTAL PRODUK
router.get("/totalproduk", async (req, res) => {
  try {
    const totalProducts = await Products.count();
    res.json({ total: totalProducts });
  } catch (error) {
    console.error("Error fetching total produk:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//GET DATA FOR HOME PAGE
router.get("/producthome", async function (req, res) {
  try {
    const data = await Products.findAll({
      where: {
        status: 1,
        stok: {
          [Op.gt]: 0, // Kondisi stok lebih dari 0
        },
      },
      limit: 6,
      order: [["id_produk", "DESC"]],
    });
    return res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching product home data:", err);
    return res.status(400).send("Failed to get data produk");
  }
});


//~~================== FILTER AREA =====================~~\\
//================== ALL PRODUCT AREA ====================\\

router.get("/products", async (req, res) => {
  setDbHargaBaru();
  updatePromo();
  const { search } = req.query;
  
  try {
    const products = await Products.findAll({
      where: {
        status: 1,
        ...(search && { nama_produk: { [Op.like]: `%${search}%` } }),
        stok: {
          [Op.gt]: 0,
        },
      },
      order: [["id_produk", "DESC"]],
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

router.get("/productskosong", async (req, res) => {
  setDbHargaBaru();
  updatePromo();
  const { search } = req.query;
  try {
    const products = await Products.findAll({
      where: {
        status: 1,
        stok: 0,
        ...(search && { nama_produk: { [Op.like]: `%${search}%` } }), // Menambahkan filter pencarian jika tersedia
      },
      order: [["id_produk", "DESC"]],
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

router.get("/productspromo", async (req, res) => {
  setDbHargaBaru();
  updatePromo();
  const { search } = req.query;
  try {
    const products = await Products.findAll({
      where: search
        ? { 
          nama_produk: { [Op.like]: `%${search}%` },
          status_promo : 1
          }
        : { status_promo : 1 },
      order: [["id_produk", "ASC"]],
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

router.get("/productcategory", async (req, res) => {
  setDbHargaBaru();
  updatePromo();
  const { nama_kategori } = req.query; 
  try {
    const products = await Products.findAll({
      where: { nama_kategori: nama_kategori }, 
      order: [["id_produk", "ASC"]],
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

router.get("/productbrand", async (req, res) => {
  setDbHargaBaru();
  updatePromo();
  const { nama_brand } = req.query; 
  try {
    const products = await Products.findAll({
      where: { nama_brand: { [Op.like]: `%${nama_brand}%` } }, 
      order: [["id_produk", "ASC"]], 
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

router.get("/productsAZ", async (req, res) => {
  setDbHargaBaru();
  updatePromo();
  const { search } = req.query; 
  try {
    const products = await Products.findAll({
      where: {
        status: 1,
        ...(search && { nama_produk: { [Op.like]: `%${search}%` } }),
        stok: {
          [Op.gt]: 0,
        },
      },
      order: [["nama_produk", "ASC"]],
    });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

router.get("/productsZA", async (req, res) => {
  setDbHargaBaru();
  updatePromo();
  const { search } = req.query; 
  try {
    const products = await Products.findAll({
      where: {
        status: 1,
        ...(search && { nama_produk: { [Op.like]: `%${search}%` } }),
        stok: {
          [Op.gt]: 0,
        },
      },
      order: [["nama_produk", "DESC"]],
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

router.get("/productsMUR", async (req, res) => {
   
  setDbHargaBaru();
  updatePromo();
  const { search } = req.query; 
  try {
    const products = await Products.findAll({
      where: {
        status: 1,
        ...(search && { nama_produk: { [Op.like]: `%${search}%` } }),
        stok: {
          [Op.gt]: 0,
        },
      },
      order: [["harga", "ASC"]], 
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

router.get("/productsMAH", async (req, res) => {
   
  setDbHargaBaru();
  updatePromo();
  const { search } = req.query;
  try {
    const products = await Products.findAll({
      where: {
        status: 1,
        ...(search && { nama_produk: { [Op.like]: `%${search}%` } }),
        stok: {
          [Op.gt]: 0,
        },
      },
      order: [["harga", "DESC"]],
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

router.get("/productsPLUS", async (req, res) => {
   
  setDbHargaBaru();
  updatePromo();
  const { search } = req.query; 
  try {
    const products = await Products.findAll({
      where: {
        status: 1,
        ...(search && { nama_produk: { [Op.like]: `%${search}%` } }),
        stok: {
          [Op.gt]: 0,
        },
      },
      order: [["stok", "DESC"]],
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

router.get("/productsMIN", async (req, res) => {
   
  setDbHargaBaru();
  updatePromo();
  const { search } = req.query;
  try {
    const products = await Products.findAll({
      where: {
        status: 1,
        ...(search && { nama_produk: { [Op.like]: `%${search}%` } }),
        stok: {
          [Op.gt]: 0,
        },
      },
      order: [["stok", "ASC"]],
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

router.get("/productsNEW", async (req, res) => {
   
  setDbHargaBaru();
  updatePromo();
  const { search } = req.query;
  try {
    const products = await Products.findAll({
      where: {
        status: 1,
        ...(search && { nama_produk: { [Op.like]: `%${search}%` } }),
        stok: {
          [Op.gt]: 0,
        },
      },
      order: [["created_at", "DESC"]],
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

router.get("/productsOLD", async (req, res) => {
   
  setDbHargaBaru();
  updatePromo();
  const { search } = req.query;
  try {
    const products = await Products.findAll({
      where: {
        status: 1,
        ...(search && { nama_produk: { [Op.like]: `%${search}%` } }),
        stok: {
          [Op.gt]: 0,
        },
      },
      order: [["created_at", "ASC"]],
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

///////////========= FILTER DATA =========\\\\\\\\\\\\\

router.get('/productimages', async function (req, res) {
 
  setDbHargaBaru();
  updatePromo();
  const { id, number } = req.query;

  if (number) {
    try {
    const data = await ProductImages.findAll({
      where: {
        id_produk: id,
        number : number
      }
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).send('gagal memuat gambar produk');
  }
  }
  else {
     try {
    const data = await ProductImages.findAll({
      where: {
        id_produk: id
      },
      order: [[Sequelize.literal(`number`), "ASC"]],
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).send('gagal memuat gambar produk');
  }
  }
 
});


module.exports = router;
