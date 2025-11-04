const express = require("express");
const { Op, Sequelize } = require("sequelize");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../../models/Customer");

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
  // .pattern(/^[a-zA-Z\s]+$/)
  .max(255)
  .required()
  .messages({
    // "string.pattern.base": "Provinsi hanya boleh berisi huruf a-z atau A-Z.",
    "string.empty": "Provinsi tidak boleh kosong.",
  }),
  kota: Joi.string()
  // .pattern(/^[a-zA-Z\s]+$/)
  .max(255)
  .required()
  .messages({
    // "string.pattern.base": "Kota hanya boleh berisi huruf a-z atau A-Z.",
    "string.empty": "Kota tidak boleh kosong.",
  }),
  kecamatan: Joi.string()
  // .pattern(/^[a-zA-Z\s]+$/)
  .max(255)
  .required()
  .messages({
    // "string.pattern.base": "Kecamatan hanya boleh berisi huruf a-z atau A-Z.",
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
  id_provinsi :Joi.string().max(255).optional().allow(null),
  id_kota :Joi.string().max(255).optional().allow(null),
  id_kecamatan :Joi.string().max(255).optional().allow(null),
});

router.post("/register",async function(req,res){
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });  
    
  }
    let {nama_depan,nama_belakang,email,password,kpassword,jenis_kelamin,no_telp,provinsi,kota,kecamatan,kelurahan,kode_pos,alamat_lengkap,id_provinsi, id_kota, id_kecamatan } = req.body;
    // 
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

    console.log(nama_depan)
    let newIdFixUser = "CUST";
    let checkIdEntryUser = await User.findOne({
      where: {
        id_user: {
          [Op.like]: `${newIdFixUser}%`
        }
      },
      order: [[ 'id_user', 'DESC' ]] 
    });
    let newIdUser = 1;
    if (checkIdEntryUser) {
      let checkIdUser = checkIdEntryUser.id_user;
      let totalUser = checkIdUser.replace(newIdFixUser, ''); 
      newIdUser = parseInt(totalUser, 10) + 1;
    }
  let defaultIdUser = newIdFixUser + newIdUser.toString().padStart(3, '0');
  const passwordHash = bcrypt.hashSync(password, 10);

    try {
      const data = await User.create({
        id_user: defaultIdUser,
        nama_depan:nama_depan,
        nama_belakang:nama_belakang,
        email: email, 
        password: passwordHash,
        jenis_kelamin: jenis_kelamin,
        no_telp: no_telp,
        provinsi: provinsi,
        kota: kota,
        kecamatan: kecamatan,
        kelurahan: kelurahan,
        kode_pos: kode_pos,
        alamat_lengkap: alamat_lengkap,
        role: "Customer",
        created_at:Date.now(),
        status : 1,
        id_kota : id_kota,
        id_provinsi : id_provinsi,
        id_kecamatan : id_kecamatan,
      });
        return res.status(201).json({
               message: "Selamat Data Registrasi Berhasil",
               data : data
        });
    } 
    catch (error) {
        return res.status(400).json({
            message: "Gagal Registrasi",
         });
    }
    
})

module.exports = router;


