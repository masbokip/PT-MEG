const express = require("express");
const { Op, Sequelize } = require("sequelize");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../../models/Brands");
const Products = require("../../models/Product");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

async function countProductsByBrand() {
  try {
    const productsByBrand = await Products.findAll({
      attributes: [
        "nama_brand",
        [Sequelize.fn("COUNT", Sequelize.col("id_produk")), "jumlah_produk"]
      ],
      group: ["nama_brand"],
    });

    console.log(productsByBrand);
    return productsByBrand.map((item) => ({
      nama_brand: item.nama_brand,
      jumlah_produk: item.get("jumlah_produk"),
    }));
  } catch (error) {
    console.error("Error counting products by brand:", error);
    throw error;
  }
}

async function updateBrandCounts() {
  try {
    const productsByBrand = await countProductsByBrand();
    for (const { nama_brand, jumlah_produk } of productsByBrand) {
      await User.update(
        { jumlah_produk },
        { where: { nama_brand } }
      );
    }
    console.log("Jumlah produk per brand berhasil diperbarui.");
  } catch (error) {
    console.error("Error updating brand counts:", error);
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/assets/images/brand");
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

const brandSchema = Joi.object({
  nama_brand: Joi.string().min(2).required(),
});

// ADD DATA
router.post("/addbrand",upload.single("foto"),async function(req,res){
    const { error } = brandSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    let {nama_brand} = req.body;
    let newIdFixUser = "BRN";
    let checkIdEntryUser = await User.findOne({
      where: {
        id_brand: {
          [Op.like]: `${newIdFixUser}%`
        }
      },
      order: [[ 'id_brand', 'DESC' ]] 
    });
    let newIdUser = 1;
    if (checkIdEntryUser) {
      let checkIdUser = checkIdEntryUser.id_brand;
      let totalUser = checkIdUser.replace(newIdFixUser, ''); 
      newIdUser = parseInt(totalUser, 10) + 1;
    }
  let defaultIdUser = newIdFixUser + newIdUser.toString().padStart(3, '0');

  if (!req.file) {
    return res.status(400).send("Image file is required");
  }
    try {
      const data = await User.create({
        id_brand: defaultIdUser,
        nama_brand:nama_brand,
        jumlah_produk:0,
        foto: req.file.filename,
        created_at:Date.now(),
        status : 1
      });
       return res.status(201).json({
        message: "Selamat Brand "+nama_brand+" Berhasil Ditambahkan",
        data : data
      });
    
    } catch (error) {
        return res.status(400).json({
            message: "Gagal Registrasi",
         });
    }
})

// GET DATA WITH ID
router.get("/brand/:id", async function (req, res) {
  const { id } = req.params; 
  try {
    const data = await User.findOne({
      where: {
        id_brand: id, 
        status: 1 
      }
    });

    if (!data) {
      return res.status(404).json({ message: "Brand not found or inactive" });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).json({ message: "Failed to get Brand data" });
  }
});

router.put("/brand/update/:id", upload.single("foto"), async function (req, res) {
  const { id } = req.params;
  const { nama_brand } = req.body;
  try {
    const brand = await User.findOne({
      where: { id_brand: id },
    });

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    const updatedData = {
      nama_brand: nama_brand || brand.nama_brand,
    };
    if (req.file) {
      const imagePath = `./public/assets/images/brand/${brand.foto}`;
      try {
        if (brand.foto) {
          fs.unlinkSync(imagePath);
        }
      } catch (error) {
        console.error(`Failed to delete old image: ${brand.foto}`, error);
      }
      updatedData.foto = req.file.filename;
    }

    await brand.update(updatedData);

    return res.status(200).json({
      message: `Brand ${nama_brand || brand.nama_brand} berhasil diperbarui`,
      data: brand,
    });
  } catch (err) {
    console.error("Error updating brand:", err);
    return res.status(500).json({ message: "Failed to update brand data" });
  }
});

// DELETE BRAND
router.delete("/brand/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const brand = await User.findOne({
      where: { id_brand: id },
    });

    if (!brand) {
      return res.status(404).send("Brand not found");
    }
    if (brand.foto) {
      const imagePath = `./public/assets/images/brand/${brand.foto}`;
      try {
        fs.unlinkSync(imagePath);
      } catch (error) {
        console.error(`Failed to delete image: ${brand.foto}`, error);
      }
    }
    await User.destroy({
      where: { id_brand: id },
    });

    return res.status(200).send("Brand and associated image deleted successfully");
  } catch (err) {
    console.error("Error deleting brand:", err);
    return res.status(500).send("Failed to delete brand");
  }
});

// >>>>>>>>>>>> SHOW DATA + SEARCH <<<<<<<<<<< \\
router.get("/products-by-brand", async (req, res) => {
  try {
    const data = await countProductsByBrand();
    res.json(data);
  } catch (error) {
    console.error("Error fetching products by brand:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Show data all
router.get("/brands", async (req, res) => {
  updateBrandCounts()
  const { search } = req.query; 

  try {
    const brands = await User.findAll({
      where: search
        ? { nama_brand: { [Op.like]: `%${search}%` } } 
        : undefined, 
      order: [["id_brand", "ASC"]], 
    });

    res.status(200).json(brands);
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json({ message: "Failed to fetch brands" });
  }
});
router.get("/brandsreport", async (req, res) => {
  updateBrandCounts()
  const { search } = req.query; 

  try {
    const brands = await User.findAll({
      where: search
        ? { nama_brand: { [Op.like]: `%${search}%` } } 
        : undefined, 
      order: [["jumlah_produk", "DESC"]], 
    });

    res.status(200).json(brands);
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json({ message: "Failed to fetch brands" });
  }
});

router.get('/total-brand', async (req, res) => {
  try {
    const totalBrand = await User.count();
    res.status(200).json({
      success: true,
      message: 'Total brand berhasil dihitung.',
      total: totalBrand,
    });
  } catch (error) {
    
    console.error('Error menghitung total brand:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menghitung total brand.',
    });
  }
});

// Show data sort A~z
router.get("/brandsAZ", async (req, res) => {
  const { search } = req.query; 

  try {
    const brands = await User.findAll({
      where: search
        ? { nama_brand: { [Op.like]: `%${search}%` } } 
        : undefined, 
      order: [["nama_brand", "ASC"]], 
    });

    res.status(200).json(brands);
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json({ message: "Failed to fetch brands" });
  }
});

// Show data sort Z~a
router.get("/brandsZA", async (req, res) => {
  const { search } = req.query; 

  try {
    const brands = await User.findAll({
      where: search
        ? { nama_brand: { [Op.like]: `%${search}%` } } 
        : undefined, 
      order: [["nama_brand", "DESC"]], 
    });

    res.status(200).json(brands);
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json({ message: "Failed to fetch brands" });
  }
});

// Show data sort Newest
router.get("/brandsNEW", async (req, res) => {
  const { search } = req.query; 

  try {
    const brands = await User.findAll({
      where: search
        ? { nama_brand: { [Op.like]: `%${search}%` } } 
        : undefined, 
      order: [["created_at", "DESC"]], 
    });

    res.status(200).json(brands);
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json({ message: "Failed to fetch brands" });
  }
});

// Show data sort Oldest
router.get("/brandsOLD", async (req, res) => {
  const { search } = req.query; 

  try {
    const brands = await User.findAll({
      where: search
        ? { nama_brand: { [Op.like]: `%${search}%` } } 
        : undefined, 
      order: [["created_at", "ASC"]], 
    });

    res.status(200).json(brands);
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json({ message: "Failed to fetch brands" });
  }
});


module.exports = router;