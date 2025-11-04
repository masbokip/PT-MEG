const express = require("express");
const { Op, Sequelize } = require("sequelize");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../../models/Vouchers");
const PakaiVoucher = require("../../models/PakaiVoucher")


// ADD Voucher
router.post("/addvoucher",async function(req,res){
    let {nama_voucher, kode_voucher, potongan, jumlah_voucher} = req.body;
    let newIdFixUser = "VOC";
    let checkIdEntryUser = await User.findOne({
      where: {
        id_voucher: {
          [Op.like]: `${newIdFixUser}%`
        }
      },
      order: [[ 'id_voucher', 'DESC' ]] 
    });
    let newIdUser = 1;
    if (checkIdEntryUser) {
      let checkIdUser = checkIdEntryUser.id_voucher;
      let totalUser = checkIdUser.replace(newIdFixUser, ''); 
      newIdUser = parseInt(totalUser, 10) + 1;
    }
  let defaultIdUser = newIdFixUser + newIdUser.toString().padStart(3, '0');
    try {
        const data = await User.create({
            id_voucher: defaultIdUser,
            nama_voucher:nama_voucher,
            kode_voucher:kode_voucher,
            potongan: potongan,
            jumlah_voucher:jumlah_voucher,
            created_at:Date.now(),
            status : 1
          });
           return res.status(201).json({
             message: "Selamat Voucher "+nama_voucher+" Berhasil Ditambahkan",
             data : data
          });
    
    } catch (error) {
        return res.status(400).json({
            message: "Gagal Registrasi",
         });
    }
})

// DELETE VOUCHER
router.delete("/voucher/:id", async function (req, res) {
  try {
    const { id } = req.params;

    // Find and delete the voucher
    const deletedRows = await User.destroy({
      where: { id_voucher: id },
    });

    if (deletedRows > 0) {
      return res.status(200).send("Voucher deleted successfully");
    } else {
      return res.status(404).send("Voucher not found");
    }
  } catch (err) {
    console.error("Error deleting voucher:", err);
    return res.status(500).send("Failed to delete voucher");
  }
});

router.get("/voucher/:id", async function (req, res) {
  const { id } = req.params; 

  try {
    const data = await User.findOne({
      where: {
        id_voucher: id, 
        status: 1 
      }
    });

    if (!data) {
      return res.status(404).json({ message: "Voucher not found or inactive" });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching voucher:", err);
    return res.status(500).json({ message: "Failed to get Voucher data" });
  }
});

router.get("/voucher/count", async (req, res) => {
  try {
    // Hitung semua produk
    const totalProduk = await Produk.count();

    // Hitung produk aktif
    const totalActiveProduk = await Produk.count({
      where: { status: 1 },
    });

    res.status(200).json({
      total: totalProduk,
      active: totalActiveProduk,
    });
  } catch (error) {
    console.error("Error counting produk:", error);
    res.status(500).send("Failed to count produk");
  }
});

router.put("/voucher/update/:id", async function (req, res) {
  const { id } = req.params;
  const { nama_voucher, kode_voucher, potongan, jumlah_voucher } = req.body; 
  try {
    const voucher = await User.findOne({ 
      where: { id_voucher: id } 
    });

    if (!voucher) {
      return res.status(404).json({ message: "Voucher not found" });
    }
    await voucher.update({
      nama_voucher: nama_voucher || voucher.nama_voucher,
      kode_voucher: kode_voucher || voucher.kode_voucher,
      potongan: potongan || voucher.potongan,
      jumlah_voucher: jumlah_voucher || voucher.jumlah_voucher,
    });
    return res.status(200).json({ message: "Voucher updated successfully", voucher });
  } catch (err) {
    console.error("Error updating voucher:", err);
    return res.status(500).json({ message: "Failed to update voucher data" });
  }
});

router.post("/voucherambil", async (req, res) => {
  const { kode_voucher, id_user } = req.query; // Get search query from request

  const voucher = await User.findOne({
    where: { kode_voucher: kode_voucher}, // Search condition
  });
  
   await voucher.update({
    where : {kode_voucher : kode_voucher},
    jumlah_voucher: voucher.jumlah_voucher - 1,
  });

  let newIdFixUser = "MAKE";
  let checkIdEntryUser = await PakaiVoucher.findOne({
    where: {
      id_pakaivoucher: {
        [Op.like]: `${newIdFixUser}%`
      }
    },
    order: [[ 'id_pakaivoucher', 'DESC' ]] 
  });
  let newIdUser = 1;
  if (checkIdEntryUser) {
    let checkIdUser = checkIdEntryUser.id_pakaivoucher;
    let totalUser = checkIdUser.replace(newIdFixUser, ''); 
    newIdUser = parseInt(totalUser, 10) + 1;
  }
let defaultIdUser = newIdFixUser + newIdUser.toString().padStart(3, '0');

  const [pakaivoucher,created] = await PakaiVoucher.findOrCreate({
    where : {
      id_user : id_user,
      id_voucher : voucher.id_voucher
    },
    defaults : {
      id_user:id_user,
      id_voucher:voucher.id_voucher,
      id_pakaivoucher : defaultIdUser,
      status : 1
    }
  })
  if (created) {
    return res.status(200).json(pakaivoucher)
  }    else{
    return res.status(400).json("Kode sudah dipakai")
  }
  // try {
    
    
  // } catch (error) {
  //   console.error("Error fetching vowuchers:", error);
  //   res.status(500).json({ message: "Failed to fetch voucher" });
  // }

});

router.get("/ambilvoucher", async (req, res) => {
  const { kode_voucher } = req.query; // Get search query from request
  try {
    const vouchers = await User.findOne({
      where:{kode_voucher:kode_voucher},
    });

   return  res.status(200).json(vouchers);
  } catch (error) {
    console.error("Error fetching vouchers:", error);
    res.status(500).json({ message: "Failed to fetch vouchers" });
  }
});


router.get("/vouchers", async (req, res) => {
  const { search } = req.query; // Get search query from request

  try {
    const vouchers = await User.findAll({
      where: search
        ? { nama_voucher: { [Op.like]: `%${search}%` } } // Search condition
        : undefined, // No condition if no search query
      order: [["id_voucher", "ASC"]], // Sort by newest date
    });

    res.status(200).json(vouchers);
  } catch (error) {
    console.error("Error fetching vouchers:", error);
    res.status(500).json({ message: "Failed to fetch vouchers" });
  }
});

router.get("/vouchersNEW", async (req, res) => {
  const { search } = req.query; // Get search query from request

  try {
    const vouchers = await User.findAll({
      where: search
        ? { nama_voucher: { [Op.like]: `%${search}%` } } // Search condition
        : undefined, // No condition if no search query
      order: [["created_at", "DESC"]], // Sort by newest date
    });

    res.status(200).json(vouchers);
  } catch (error) {
    console.error("Error fetching vouchers:", error);
    res.status(500).json({ message: "Failed to fetch vouchers" });
  }
});

router.get("/vouchersOLD", async (req, res) => {
  const { search } = req.query; // Get search query from request

  try {
    const vouchers = await User.findAll({
      where: search
        ? { nama_voucher: { [Op.like]: `%${search}%` } } // Search condition
        : undefined, // No condition if no search query
      order: [["created_at", "ASC"]], // Sort by newest date
    });

    res.status(200).json(vouchers);
  } catch (error) {
    console.error("Error fetching vouchers:", error);
    res.status(500).json({ message: "Failed to fetch vouchers" });
  }
});

router.get("/vouchersZA", async (req, res) => {
  const { search } = req.query; // Get search query from request

  try {
    const vouchers = await User.findAll({
      where: search
        ? { nama_voucher: { [Op.like]: `%${search}%` } } // Search condition
        : undefined, // No condition if no search query
      order: [["nama_voucher", "DESC"]], // Sort by newest date
    });

    res.status(200).json(vouchers);
  } catch (error) {
    console.error("Error fetching vouchers:", error);
    res.status(500).json({ message: "Failed to fetch vouchers" });
  }
});

router.get("/vouchersAZ", async (req, res) => {
  const { search } = req.query; // Get search query from request

  try {
    const vouchers = await User.findAll({
      where: search
        ? { nama_voucher: { [Op.like]: `%${search}%` } } // Search condition
        : undefined, // No condition if no search query
      order: [["nama_voucher", "ASC"]], // Sort by newest date
    });

    res.status(200).json(vouchers);
  } catch (error) {
    console.error("Error fetching vouchers:", error);
    res.status(500).json({ message: "Failed to fetch vouchers" });
  }
});

router.get("/vouchersPL", async (req, res) => {
  const { search } = req.query; // Get search query from request

  try {
    const vouchers = await User.findAll({
      where: search
        ? { nama_voucher: { [Op.like]: `%${search}%` } } // Search condition
        : undefined, // No condition if no search query
      order: [["stok", "DESC"]], // Sort by newest date
    });

    res.status(200).json(vouchers);
  } catch (error) {
    console.error("Error fetching vouchers:", error);
    res.status(500).json({ message: "Failed to fetch vouchers" });
  }
});

router.get("/vouchersMN", async (req, res) => {
  const { search } = req.query; // Get search query from request

  try {
    const vouchers = await User.findAll({
      where: search
        ? { nama_voucher: { [Op.like]: `%${search}%` } } // Search condition
        : undefined, // No condition if no search query
      order: [["stok", "ASC"]], // Sort by newest date
    });

    res.status(200).json(vouchers);
  } catch (error) {
    console.error("Error fetching vouchers:", error);
    res.status(500).json({ message: "Failed to fetch vouchers" });
  }
});





module.exports = router;