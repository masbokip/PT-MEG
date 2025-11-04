const express = require("express");
const { Op, Sequelize } = require("sequelize");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../../models/Customer");
const jwt = require("jsonwebtoken");


router.get("/data/customer", async function (req, res) {
    const token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    const userdata = jwt.verify(token, process.env.JWT_KEY);
  
    const data = await User.findOne({
      where: {
        id_user: userdata.id_user
      },
      attributes: {
        exclude: ["password", "created_at", "status"],
      },
    });
    return res.status(200).json(data);
  });


module.exports = router;