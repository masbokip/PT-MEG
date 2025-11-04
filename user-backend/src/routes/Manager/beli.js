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

module.exports = router;