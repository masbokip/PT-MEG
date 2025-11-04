const express = require("express");
const  Rating  = require("../../models/Rating");
const  Produk  = require("../../models/Product");
const  User = require("../../models/User");
const router = express.Router();
const { Op } = require("sequelize");

router.post("/rating", async (req, res) => {
    const { id_user, id_produk, rating, ulasan } = req.body;
    try {
      if (!id_user || !id_produk || !rating || rating < 1 || rating > 5 || !ulasan) {
        return res.status(400).json({ message: "Input tidak valid" });
      }
      const user = await User.findByPk(id_user);
      const produk = await Produk.findByPk(id_produk);
      if (!user) {
        return res.status(404).json({ message: "User tidak ditemukan" });
      }
      if (!produk) {
        return res.status(404).json({ message: "Produk tidak ditemukan" });
      }
      let newIdFixUser = "RAT";
      let checkIdEntryUser = await Rating.findOne({
        where: {
          id_rating: {
            [Op.like]: `${newIdFixUser}%`,
          },
        },
        order: [["id_rating", "DESC"]],
      });
      let newIdUser = 1;
      if (checkIdEntryUser) {
        let checkIdUser = checkIdEntryUser.id_rating;
        let totalUser = checkIdUser.replace(newIdFixUser, "");
        newIdUser = parseInt(totalUser, 10) + 1;
      }
      let defaultIdUser = newIdFixUser + newIdUser.toString().padStart(3, "0");
      const newRating = await Rating.create({
        id_rating: defaultIdUser,
        id_user: id_user,
        id_produk: id_produk,
        rating: rating,
        ulasan: ulasan,
        created_at: new Date(),
      });
  
      res.status(201).json({ message: "Rating berhasil ditambahkan", data: newRating });
    } catch (error) {
      console.error("Error pada endpoint /rating:", error.message);
      res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
    }
  });
  
  router.get("/rating/:id", async function (req, res) {
    const { id } = req.params;
    try {
      const data = await Rating.findAll({
        where: {
          id_produk: id,
        },
        include: [
          {
            model: User,
            attributes: ['id_user', 'nama_depan', 'nama_belakang'],
          },
          {
            model: Produk,
            attributes: ['id_produk', 'nama_produk'], 
          },
        ],
      });
  
      if (!data || data.length === 0) {
        return res.status(404).json({ message: "Data rating not found" });
      }
  
      return res.status(200).json(data);
    } catch (err) {
      console.error("Error fetching ratings:", err);
      return res.status(500).json({ message: "Failed to get Rating data" });
    }
  });
  
  router.get('/ratings', async (req, res) => {
    const { id } = req.query;

    try {
        if (id) {
            const ratingData = await Rating.findAll({
                where: { id_produk: id },
                attributes: [
                  [Rating.sequelize.fn('COALESCE', Rating.sequelize.fn('AVG', Rating.sequelize.col('rating')), 0), 'averageRating'],
                  [Rating.sequelize.fn('COUNT', Rating.sequelize.col('rating')), 'totalReviews']
              ]
            });
            return res.json(ratingData[0]);
        } else {
            
            const allRatings = await Rating.findAll({
                attributes: [
                    'id_produk',
                    [Rating.sequelize.fn('AVG', Rating.sequelize.col('rating')), 'averageRating'],
                    [Rating.sequelize.fn('COUNT', Rating.sequelize.col('rating')), 'totalReviews']
                ],
                group: ['id_produk']
            });
            return res.json(allRatings);
        }
    } catch (error) {
        console.error('Error fetching ratings:', error);
        return res.status(500).json({ error: 'Failed to fetch ratings' });
    }
});

module.exports = router;