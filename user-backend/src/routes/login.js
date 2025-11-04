const express = require("express");
const { Op, Sequelize } = require("sequelize");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../models/Customer");
const jwt = require("jsonwebtoken");


router.post("/login", async function (req, res) {
    let { email, password } = req.body;

    const user = await User.findAll({
        where:{
            email:email
        },
    });
    try {
        if (user.length>0) {
            let cekPassword = null;
            user.forEach((item)=>{
                cekPassword = item.password;
            })
            let passwordHashUser = cekPassword;
            console.log(passwordHashUser);
            if (bcrypt.compareSync(password, passwordHashUser)) {
                const dataUser = await User.findOne({
                    where:{email : email}
                })
                
                const token = jwt.sign(
                    {
                        id_user: user.id_user,
                        nama_depan: user.username,
                        nama_belakang: user.nama_belakang,
                        email: user.email,
                        jenis_kelamin: user.jenis_kelamin,
                        no_telp: user.no_telp,
                        provinsi: user.provinsi,
                        kota: user.kota,
                        kecamatan: user.kecamatan,
                        kelurahan: user.kelurahan,
                        kode_pos: user.kode_pos,
                        alamat_lengkap: user.alamat_lengkap,
                        foto: user.foto,
                        role: user.role,
                        status: user.status,
                    },
                    process.env.JWT_CODE,
                    { expiresIn: '30d' }
                  );
                  const userData = {
                    ...dataUser.dataValues,
                    token
                  };
                  return res.status(200).json(userData);
            }else{
                return res.status(400).json("Password salah");
            }
        }else {
            return res.status(404).json("Data user tidak ditemukan");
        }
    } catch (error) {
        return res.status(400).json("Data salah");
    }
});



module.exports = router;