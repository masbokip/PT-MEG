const express = require("express");
const { Op, Sequelize } = require("sequelize");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const userSchema = Joi.object({
  nama_depan: Joi.string()
  .pattern(/^[a-zA-Z\s]+$/)
  .max(255)
  .required()
  .messages({
    "string.pattern.base": "Nama depan hanya boleh berisi huruf a-z atau A-Z.",
    "string.empty": "Nama depan tidak boleh kosong.",
  }),
  nama_belakang: Joi.string()
  .pattern(/^[a-zA-Z\s]+$/)
  .max(255)
  .required()
  .messages({
    "string.pattern.base": "Nama belakang hanya boleh berisi huruf a-z atau A-Z.",
    "string.empty": "Nama depan tidak boleh kosong.",
  }),
  email: Joi.string().email().max(255).required().messages({
    "string.email": "Format email tidak valid",
    "any.required": "Email wajib diisi",
  }),
  password: Joi.string()
    .min(8)
    .max(255)
    .required()
    .messages({
      "string.min": "Password harus memiliki minimal 8 karakter.",
      "string.empty": "Password tidak boleh kosong.",
    }),
    kpassword: Joi.string()
    .min(8)
    .max(255)
    .required()
    .messages({
      "string.min": "Konfirmasi Password harus memiliki minimal 8 karakter.",
      "string.empty": "Konfirmasi Password tidak boleh kosong.",
    }),
  jenis_kelamin: Joi.string().max(255).required(),
  no_telp: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(10)
    .max(15)
    .required()
    .messages({
      "string.pattern.base": "Nomor telepon hanya boleh berisi angka.",
      "string.min": "Nomor telepon harus minimal 10 digit.",
      "string.max": "Nomor telepon tidak boleh lebih dari 15 digit.",
    }),
  provinsi: Joi.string()
  .pattern(/^[a-zA-Z\s]+$/)
  .max(255)
  .required()
  .messages({
    "string.pattern.base": "Provinsi hanya boleh berisi huruf a-z atau A-Z.",
    "string.empty": "Provinsi tidak boleh kosong.",
  }),
  kota: Joi.string()
  .pattern(/^[a-zA-Z\s]+$/)
  .max(255)
  .required()
  .messages({
    "string.pattern.base": "Kota hanya boleh berisi huruf a-z atau A-Z.",
    "string.empty": "Kota tidak boleh kosong.",
  }),
  kecamatan: Joi.string()
  .pattern(/^[a-zA-Z\s]+$/)
  .max(255)
  .required()
  .messages({
    "string.pattern.base": "Kecamatan hanya boleh berisi huruf a-z atau A-Z.",
    "string.empty": "Kecamatan tidak boleh kosong.",
  }),
  kelurahan: Joi.string()
  .pattern(/^[a-zA-Z\s]+$/)
  .max(255)
  .required()
  .messages({
    "string.pattern.base": "Kelurahan hanya boleh berisi huruf a-z atau A-Z.",
    "string.empty": "Kelurahan tidak boleh kosong.",
  }),
  kode_pos: Joi.number().integer().min(1).max(9999999999).required(),
  alamat_lengkap: Joi.string().required(),
  foto: Joi.string().max(255).optional().allow(null),
  role: Joi.string().valid("Customer", "Pegawai", "Admin").required(),
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/assets/images/user");
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

// ADD USER
router.post("/registeradmin", async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  let {
    nama_depan,
    nama_belakang,
    email,
    password,
    kpassword,
    jenis_kelamin,
    no_telp,
    provinsi,
    kota,
    kecamatan,
    kelurahan,
    kode_pos,
    alamat_lengkap,
    role,
  } = req.body;

  let newIdFixUser = role === "Customer" ? "CUST" : role === "Pegawai" ? "PEG" : "ADM";
  try {
    const existingUser = await User.findOne({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email sudah terdaftar",
      });
    }

    if (password != kpassword){
      return res.status(400).json({
        message: "Password Tidak Sama",
      });
    }
    
    let checkIdEntryUser = await User.findOne({
      where: {
        id_user: {
          [Op.like]: `${newIdFixUser}%`,
        },
      },
      order: [["id_user", "DESC"]],
    });
    let newIdUser = 1;
    if (checkIdEntryUser) {
      let checkIdUser = checkIdEntryUser.id_user;
      let totalUser = checkIdUser.replace(newIdFixUser, ""); 
      newIdUser = parseInt(totalUser, 10) + 1;
    }

    let defaultIdUser = newIdFixUser + newIdUser.toString().padStart(3, "0");
    const passwordHash = bcrypt.hashSync(password, 10);
    const data = await User.create({
      id_user: defaultIdUser,
      nama_depan,
      nama_belakang,
      email,
      password: passwordHash,
      jenis_kelamin,
      no_telp,
      provinsi,
      kota,
      kecamatan,
      kelurahan,
      kode_pos,
      alamat_lengkap,
      foto: null,
      role,
      created_at: new Date(),
      status: 1,
    });

    return res.status(201).json({
      message: "Selamat! Registrasi berhasil.",
      data: data,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: "Gagal Registrasi.",
    });
  }
});

// DELETE USER
router.delete("/user/:id", async function (req, res) {
  try {
    const { id } = req.params;

    // Find and delete the category
    const deletedRows = await User.destroy({
      where: { id_user: id },
    });

    if (deletedRows > 0) {
      return res.status(200).send("User deleted successfully");
    } else {
      return res.status(404).send("User not found");
    }
  } catch (err) {
    console.error("Error deleting user:", err);
    return res.status(500).send("Failed to delete user");
  }
});

// UPDATE USER
router.put("/user/update/:id", upload.single("foto"), async function (req, res) {
  const { id } = req.params;
  const { nama_depan, nama_belakang, jenis_kelamin, no_telp, provinsi, kota, kecamatan, kelurahan, kode_pos, alamat_lengkap, role  } = req.body; // Extract fields to update from the request body

  try {
    const user = await User.findOne({ 
      where: { id_user: id } 
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedData = {
      nama_depan: nama_depan || user.nama_depan,
      nama_belakang: nama_belakang || user.nama_belakang,
      jenis_kelamin: jenis_kelamin || user.jenis_kelamin,
      no_telp : no_telp || user.no_telp,
      provinsi: provinsi || user.provinsi,
      kota: kota || user.kota,
      kecamatan : kecamatan || user.kecamatan,
      kelurahan: kelurahan || user.kelurahan,
      kode_pos: kode_pos || user.kode_pos,
      alamat_lengkap : alamat_lengkap || user.alamat_lengkap,
      role: role || user.role,
    };
    if (req.file) {
      updatedData.foto = req.file.filename;
    }
    
    await user.update(updatedData);
    return res.status(200).json({
      message: `User ${nama_depan || user.nama_depan} berhasil diperbarui`,
      data: user,
    });
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({ message: "Failed to update user data" });
  }
});

router.put("/user/update/password/:id", async function (req, res) {
  const { id } = req.params;
  const { password, kpassword  } = req.body;
  try {
    const user = await User.findOne({ 
      where: { id_user: id } 
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if(password != kpassword){
      return res.status(400).json({ message: "Password dan Konfirmasi Password Tidak Sama" });
    }
    const passwordHash = bcrypt.hashSync(password, 10);
    const updatedData = {
      password: passwordHash || user.password,
    };
    await user.update(updatedData);
    return res.status(200).json({
      message: `Password berhasil diperbarui`,
      data: user,
    });
  } catch (err) {
    console.error("Error update user:", err);
    return res.status(500).json({ message: "Failed to update user data" });
  }
});

// router.put("/user/update/:id", upload.single("foto"), async function (req, res) {
//   const { id } = req.params;
//   const { nama_depan, nama_belakang, password, jenis_kelamin, no_telp, provinsi, kota, kecamatan, kelurahan, kode_pos, alamat_lengkap, role } = req.body;

//   try {
//     const user = await User.findOne({ where: { id_user: id } });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const updatedData = {
//       nama_depan: nama_depan || user.nama_depan,
//       nama_belakang: nama_belakang || user.nama_belakang,
//       password: password ? bcrypt.hashSync(password, 10) : user.password,
//       jenis_kelamin: jenis_kelamin || user.jenis_kelamin,
//       no_telp: no_telp || user.no_telp,
//       provinsi: provinsi || user.provinsi,
//       kota: kota || user.kota,
//       kecamatan: kecamatan || user.kecamatan,
//       kelurahan: kelurahan || user.kelurahan,
//       kode_pos: kode_pos || user.kode_pos,
//       alamat_lengkap: alamat_lengkap || user.alamat_lengkap,
//       role: role || user.role,
//     };

//     if (req.file) {
//       updatedData.foto = req.file.filename;
//     }

//     await user.update(updatedData);
//     return res.status(200).json({ message: "User updated successfully", user });
//   } catch (err) {
//     console.error("Error updating user:", err);
//     return res.status(500).json({ message: "Failed to update user data" });
//   }
// });


// GET DATA WITH ID

router.get("/user/:id", async function (req, res) {
  const { id } = req.params;

  try {
    const data = await User.findOne({
      where: {
        id_user: id,
      }
    });

    if (!data) {
      return res.status(404).json({ message: "User not found or inactive" });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).json({ message: "Failed to get user data" });
  }
});

router.get("/ambiluser", async function (req, res) {
  const { id_user } = req.query;

  try {
    const data = await User.findOne({
      where: {
        id_user: id_user,
        status: 1
      }
    });

    if (!data) {
      return res.status(404).json({ message: "User not found or inactive" });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).json({ message: "Failed to get user data" });
  }
});

router.get("/totaluser", async (req, res) => {
  try {
    const totalUsers = await User.count();
    res.json({ total: totalUsers });
  } catch (error) {
    console.error("Error fetching total produk:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

 //================== FILTER AREA =====================\\
 //================== ALL USER AREA ====================\\

 router.get("/users", async (req, res) => {
  const { search } = req.query; 
  try {
    const users = await User.findAll({
      where: search
        ? { nama_depan: { [Op.like]: `%${search}%` } } 
        : undefined, 
      order: [["id_user", "ASC"]], 
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

router.get("/usersAZ", async (req, res) => {
  const { search } = req.query; 
  try {
    const users = await User.findAll({
      where: search
        ? { nama_depan: { [Op.like]: `%${search}%` } } 
        : undefined, 
      order: [["nama_depan", "ASC"]], 
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

router.get("/usersZA", async (req, res) => {
  const { search } = req.query; 
  try {
    const users = await User.findAll({
      where: search
        ? { nama_depan: { [Op.like]: `%${search}%` } } 
        : undefined, 
      order: [["nama_depan", "DESC"]], 
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

router.get("/usersNEW", async (req, res) => {
  const { search } = req.query; 
  try {
    const users = await User.findAll({
      where: search
        ? { nama_depan: { [Op.like]: `%${search}%` } } 
        : undefined, 
      order: [["created_at", "DESC"]], 
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

router.get("/usersOLD", async (req, res) => {
  const { search } = req.query; 
  try {
    const users = await User.findAll({
      where: search
        ? { nama_depan: { [Op.like]: `%${search}%` } } 
        : undefined, 
      order: [["created_at", "ASC"]], 
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});
 
 //================== CUSTOMER AREA ====================\\
router.get("/usersCST", async (req, res) => {
  const { search } = req.query; 
  try {
    const users = await User.findAll({
      where: search
        ? { nama_depan: { [Op.like]: `%${search}%` } ,
            role : "Customer"
          } 
        : {role : "Customer"}, 
      order: [["id_user", "ASC"]], 
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

router.get("/usersCSTaz", async (req, res) => {
  const { search } = req.query; 
  try {
    const users = await User.findAll({
      where: search
        ? { nama_depan: { [Op.like]: `%${search}%` } ,
            role : "Customer"
          } 
        : {role : "Customer"}, 
      order: [["nama_depan", "ASC"]], 
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

router.get("/usersCSTza", async (req, res) => {
  const { search } = req.query; 
  try {
    const users = await User.findAll({
      where: search
        ? { nama_depan: { [Op.like]: `%${search}%` } ,
            role : "Customer"
          } 
        : {role : "Customer"}, 
      order: [["nama_depan", "DESC"]], 
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

router.get("/usersCSTnew", async (req, res) => {
  const { search } = req.query; 
  try {
    const users = await User.findAll({
      where: search
        ? { nama_depan: { [Op.like]: `%${search}%` } ,
            role : "Customer"
          } 
        : {role : "Customer"}, 
      order: [["created_at", "DESC"]], 
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

router.get("/usersCSTold", async (req, res) => {
  const { search } = req.query; 
  try {
    const users = await User.findAll({
      where: search
        ? { nama_depan: { [Op.like]: `%${search}%` } ,
            role : "Customer"
          } 
        : {role : "Customer"}, 
      order: [["created_at", "ASC"]], 
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});


//================== PEGAWAI AREA =====================\\

// SHOW ALL USER PEGAWAI
router.get("/usersPGW", async (req, res) => {
  const { search } = req.query; 
  try {
    const users = await User.findAll({
      where: search
        ? { nama_depan: { [Op.like]: `%${search}%` } ,
            role : "Pegawai"
          } 
        : {role : "Pegawai"}, 
      order: [["id_user", "ASC"]], 
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

router.get("/usersPGWaz", async (req, res) => {
  const { search } = req.query; 
  try {
    const users = await User.findAll({
      where: search
        ? { nama_depan: { [Op.like]: `%${search}%` } ,
            role : "Pegawai"
          } 
        : {role : "Pegawai"}, 
      order: [["nama_depan", "ASC"]], 
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

router.get("/usersPGWza", async (req, res) => {
  const { search } = req.query; 
  try {
    const users = await User.findAll({
      where: search
        ? { nama_depan: { [Op.like]: `%${search}%` } ,
            role : "Pegawai"
          } 
        : {role : "Pegawai"}, 
      order: [["nama_depan", "DESC"]], 
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

router.get("/usersPGWnew", async (req, res) => {
  const { search } = req.query; 
  try {
    const users = await User.findAll({
      where: search
        ? { nama_depan: { [Op.like]: `%${search}%` } ,
            role : "Pegawai"
          } 
        : {role : "Pegawai"}, 
      order: [["created_at", "DESC"]], 
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

router.get("/usersPGWold", async (req, res) => {
  const { search } = req.query; 
  try {
    const users = await User.findAll({
      where: search
        ? { nama_depan: { [Op.like]: `%${search}%` } ,
            role : "Pegawai"
          } 
        : {role : "Pegawai"}, 
      order: [["created_at", "ASC"]], 
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});


//================== ADMIN AREA =====================\\
// SHOW ALL USER ADMIN
router.get("/useradmin", async function (req, res) {
  try {
    const data = await User.findAll({
      where: {
        status: 1,
        role : "admin"
      },
      order: [["id_user", "ASC"]],
    });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).send("Failed to get data user");
  }
});



module.exports = router;