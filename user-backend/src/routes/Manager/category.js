const express = require("express");
const { Op, Sequelize } = require("sequelize");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../../models/Categorys");
const Products = require("../../models/Product");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

async function countProductsByCategory() {
  try {
    const productsByCategory = await Products.findAll({
      attributes: [
        "nama_kategori",
        [Sequelize.fn("COUNT", Sequelize.col("id_produk")), "jumlah_produk"]
      ],
      group: ["nama_kategori"],
    });

    console.log(productsByCategory);
    return productsByCategory.map((item) => ({
      nama_kategori: item.nama_kategori,
      jumlah_produk: item.get("jumlah_produk"),
    }));
  } catch (error) {
    console.error("Error counting products by category:", error);
    throw error;
  }
}

async function updateCategoryCounts() {
  try {
    const productsByCategory = await countProductsByCategory();

    for (const { nama_kategori, jumlah_produk } of productsByCategory) {
      await User.update(
        { jumlah_produk },
        { where: { nama_kategori } }
      );
    }

    console.log("Jumlah produk per kategori berhasil diperbarui.");
  } catch (error) {
    console.error("Error updating category counts:", error);
  }
}


const categorySchema = Joi.object({
  nama_kategori: Joi.string().min(2).required(),
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/assets/images/category");
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

router.get('/total-kategori', async (req, res) => {
  try {
    const totalKategori = await User.count();
    res.status(200).json({
      success: true,
      message: 'Total kategori berhasil dihitung.',
      total: totalKategori,
    });
  } catch (error) {
    
    console.error('Error menghitung total kategori:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menghitung total kategori.',
    });
  }
});

// ADD DATA
router.post("/addkategori",upload.single("foto"),async function(req,res){
  const { error } = categorySchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    let {nama_kategori} = req.body;
    let newIdFixUser = "KTG";
    let checkIdEntryUser = await User.findOne({
      where: {
        id_kategori: {
          [Op.like]: `${newIdFixUser}%`
        }
      },
      order: [[ 'id_kategori', 'DESC' ]] 
    });
    let newIdUser = 1;
    if (checkIdEntryUser) {
      let checkIdUser = checkIdEntryUser.id_kategori;
      let totalUser = checkIdUser.replace(newIdFixUser, ''); 
      newIdUser = parseInt(totalUser, 10) + 1;
    }
  let defaultIdUser = newIdFixUser + newIdUser.toString().padStart(3, '0');

  if (!req.file) {
    return res.status(400).send("Image file is required");
  }
    try {
      const data = await User.create({
        id_kategori: defaultIdUser,
        nama_kategori:nama_kategori,
        jumlah_produk:0,
        foto: req.file.filename,
        created_at:Date.now(),
        status : 1
      });
       return res.status(201).json({
         message: "Selamat Kategori "+nama_kategori+" Berhasil Ditambahkan",
         data : data
      });
    
    } catch (error) {
        return res.status(400).json({
            message: "Gagal Registrasi",
         });
    }
});

router.delete("/category/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const category = await User.findOne({
      where: { id_kategori: id },
    });

    if (!category) {
      return res.status(404).send("Category not found");
    }
    if (category.foto) {
      const imagePath = `./public/assets/images/category/${category.foto}`;
      try {
        fs.unlinkSync(imagePath);
      } catch (error) {
        console.error(`Failed to delete image: ${category.foto}`, error);
      }
    }
    await User.destroy({
      where: { id_kategori: id },
    });

    return res.status(200).send("Category and its photo deleted successfully");
  } catch (err) {
    console.error("Error deleting category:", err);
    return res.status(500).send("Failed to delete category");
  }
});

router.put("/category/update/:id", upload.single("foto"), async function (req, res) {
  const { id } = req.params;
  const { nama_kategori } = req.body;
  try {
    const brand = await User.findOne({
      where: { id_kategori: id },
    });

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    const updatedData = {
      nama_kategori: nama_kategori || brand.nama_kategori,
    };
    if (req.file) {
      const imagePath = `./public/assets/images/category/${brand.foto}`;
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
      message: `Kategori ${nama_kategori || brand.nama_kategori} berhasil diperbarui`,
      data: brand,
    });
  } catch (err) {
    console.error("Error updating kategori:", err);
    return res.status(500).json({ message: "Failed to update kategori data" });
  }
});

// GET DATA WITH ID
router.get("/category/:id", async function (req, res) {
  const { id } = req.params; 

  try {
    const data = await User.findOne({
      where: {
        id_kategori: id, 
        status: 1 
      }
    });

    if (!data) {
      return res.status(404).json({ message: "Kategori not found or inactive" });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).json({ message: "Failed to get Kategori data" });
  }
});

router.get("/products-by-category", async (req, res) => {
  try {
    const data = await countProductsByCategory();
    res.json(data);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/categories", async (req, res) => {
  updateCategoryCounts();
  const { search } = req.query; 
  try {
    const categories = await User.findAll({
      where: search
        ? { nama_kategori: { [Op.like]: `%${search}%` } } 
        : undefined,
      order: [["id_kategori", "DESC"]], 
    });

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});

// Show data with sort A~z
router.get("/categoriesAZ", async (req, res) => {
  const { search } = req.query; // Get search query from request

  try {
    const categories = await User.findAll({
      where: search
        ? { nama_kategori: { [Op.like]: `%${search}%` } } // Search condition
        : undefined, // No condition if no search query
      order: [["nama_kategori", "ASC"]], // Sort by newest date
    });

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});

// Show data with sort Z~a
router.get("/categoriesZA", async (req, res) => {
  const { search } = req.query; 

  try {
    const categories = await User.findAll({
      where: search
        ? { nama_kategori: { [Op.like]: `%${search}%` } } 
        : undefined, 
      order: [["nama_kategori", "DESC"]], 
    });

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});

// Show data with sort New
router.get("/categoriesNEW", async (req, res) => {
  const { search } = req.query; 

  try {
    const categories = await User.findAll({
      where: search
        ? { nama_kategori: { [Op.like]: `%${search}%` } }
        : undefined, 
      order: [["created_at", "DESC"]], 
    });

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});

// Show data with sort Old
router.get("/categoriesOLD", async (req, res) => {
  const { search } = req.query; 

  try {
    const categories = await User.findAll({
      where: search
        ? { nama_kategori: { [Op.like]: `%${search}%` } }
        : undefined, 
      order: [["created_at", "ASC"]], 
    });

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});


module.exports = router;