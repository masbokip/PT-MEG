const axios = require('axios');
const midtransClient = require('midtrans-client');
const express = require("express");
const { Op, Sequelize, Transaction,fn, col, where, literal } = require("sequelize");
const router = express.Router();
const ProdukFoto = require("../../models/PhotoProduct");
const { v4: uuidv4 } = require('uuid');
const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const Carts = require("../../models/Carts");
const CartProducts = require("../../models/CartProducts");
const Product = require("../../models/Product");
const PhotoProducts = require("../../models/PhotoProduct");
const Beli = require("../../models/Beli");
const BeliProduk = require("../../models/BeliProduk");
const Transaksi = require("../../models/Transaksi");
const TransaksiProduk = require("../../models/TransaksiProduk");
const jwt = require("jsonwebtoken");

const snap = new midtransClient.Snap({
    isProduction: false, 
    serverKey: process.env.SERVER_KEY,
  });
const coreClient = new midtransClient.CoreApi({
      isProduction: false,
      serverKey: process.env.SERVER_KEY,
      clientKey: process.env.CLIENT_KEY
  });

router.get('/produk-terjual-bijian', async (req, res) => {
  try {
    const produkTerjual = await BeliProduk.findAll({
      attributes: [
        'id_produk',
        [fn('SUM', col('jumlah')), 'total_terjual']
      ],
      include: [
        {
          model: Beli,
          attributes: [],
          where: {
            status_pengiriman: {
              [Op.ne]: 5
            }
          }
        }
      ],
      group: ['id_produk'],
    });
    const result = produkTerjual.map(row => row.toJSON());
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat memproses data.',
    });
  }
});

router.get('/produk-terjual-terbanyak', async (req, res) => {
  try {
    const produkTerjual = await BeliProduk.findAll({
      attributes: [
        'id_produk',
        [fn('SUM', col('jumlah')), 'total_terjual']
      ],
      include: [
        {
          model: Produk,
          attributes: ['nama_produk', 'harga', 'stok'], 
        },
        {
          model: Beli,
          attributes: [], 
          where: {
            status_pengiriman: {
              [Op.ne]: 5, 
            },
          },
        },
      ],
      group: ['id_produk', 'Produk.id_produk'],
      order: [[fn('SUM', col('jumlah')), 'DESC']],
    });

    const result = produkTerjual.map(row => row.toJSON());

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat memproses data.',
    });
  }
});

router.get('/produk-terjual', async (req, res) => {
  try {
    const totalTerjual = await BeliProduk.findAll({
      attributes: [[fn('SUM', col('jumlah')), 'total_terjual']],
      include: [
        {
          model: Beli,
          attributes: [],
          where: {
            status_pengiriman: {
              [Op.ne]: 5,
            },
          },
        },
      ],
    });
    const total = totalTerjual[0]?.toJSON().total_terjual || 0;

    res.status(200).json({
      success: true,
      total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat memproses data.',
    });
  }
});

router.get("/totalpembelian", async (req, res) => {
    try {
      const totalProducts = await Beli.count({
        where: {
          status_pengiriman: { [Op.ne]: 7 },
        },
      });
      res.json({ total: totalProducts });
    } catch (error) {
      console.error("Error fetching total produk:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.get("/totalselesai", async (req, res) => {
    try {
      const totalProducts = await Beli.count({
        where: {
          status_pengiriman: 4,
        },
      });
      res.json({ total: totalProducts });
    } catch (error) {
      console.error("Error fetching total produk:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.get("/totalbatal", async (req, res) => {
    try {
      const totalProducts = await Beli.count({
        where: {
          status_pengiriman: 5,
        },
      });
      res.json({ total: totalProducts });
    } catch (error) {
      console.error("Error fetching total produk:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.get("/totaldikirim", async (req, res) => {
    try {
      const totalProducts = await Beli.count({
        where: {
          status_pengiriman: 3,
        },
      });
      res.json({ total: totalProducts });
    } catch (error) {
      console.error("Error fetching total produk:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.get("/totalproses", async (req, res) => {
    try {
      const totalProducts = await Beli.count({
        where: {
          status_pengiriman: 2,
        },
      });
      res.json({ total: totalProducts });
    } catch (error) {
      console.error("Error fetching total produk:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.get("/pesananrefund", async (req, res) => {
    try {
      const totalProducts = await Beli.count({
        where: {
          status_pembayaran: 3,
        },
      });
      res.json({ total: totalProducts });
    } catch (error) {
      console.error("Error fetching total produk:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

router.get("/totalpesanan", async (req, res) => {
    try {
      const totalPembelian = await Beli.sum("total_beli", {
        where: {
          status_pengiriman: { [Op.ne]: 5 },
        },
      });
  
      res.json({ total: totalPembelian });
    } catch (error) {
      console.error("Error fetching total pembelian:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.get("/totalrefund", async (req, res) => {
    try {
      const totalPembelian = await Beli.sum("total_beli", {
        where: {
          status_pembayaran: 3,
        },
      });
  
      res.json({ total: totalPembelian });
    } catch (error) {
      console.error("Error fetching total pembelian:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

router.post('/ongkir', async (req, res) => {
  const { origin, destination, weight, courier, originType, destinationType } = req.body;

  // Pastikan semua data yang diperlukan ada
  if (!origin || !destination || !weight || !courier || !originType || !destinationType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Request ke API RajaOngkir untuk biaya ongkir
    const response = await axios.post(
      `https://pro.rajaongkir.com/api/cost`,
      { origin, destination, originType, destinationType, weight, courier },
      { headers: { key: process.env.RAJAONGKIR_API } } // Pastikan kunci API didefinisikan dengan benar di env
    );

    // Mengecek apakah respons data valid dan sesuai yang diharapkan
    if (response.data && response.data.rajaongkir && response.data.rajaongkir.results) {
      const costs = response.data.rajaongkir.results[0].costs;
      
      // Pastikan ada biaya ongkir yang tersedia
      if (costs && costs.length > 0) {
        return res.status(200).json(costs);
      } else {
        return res.status(204).json({ message: 'No shipping costs available' });
      }
    } else {
      throw new Error('Unexpected API response structure');
    }
  } catch (error) {
    // Menangani kesalahan jaringan atau kesalahan lainnya
    console.error('Error fetching shipping costs:', error);
    if (error.response) {
      // Kesalahan di dalam respons API eksternal
      return res.status(500).json({ error: `Error from RajaOngkir API: ${error.response.data?.status?.description || error.message}` });
    } else if (error.request) {
      // Jika tidak ada respons yang diterima
      return res.status(500).json({ error: 'No response from RajaOngkir API' });
    } else {
      // Kesalahan dalam konfigurasi atau pemanggilan
      return res.status(500).json({ error: `Unexpected error: ${error.message}` });
    }
  }
});

router.get('/ongkir/provinsi', async function (req, res) {
  try {
      const response = await axios.get(
          '	https://pro.rajaongkir.com/api/province',
          {
              headers: {
                  key: process.env.RAJAONGKIR_API,
                  'content-type': 'application/x-www-form-urlencoded',
              },
          }
      );
      const data = response.data;
      res.status(200).json(data);
  } catch (error) {
      console.error('Error fetching provinces:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'An error occurred while fetching provinces', details: error.response ? error.response.data : error.message });
  }
});

router.get('/ongkir/kota', async function (req, res) {
  const { province_id } = req.query;
  if (!province_id) {
      return res.status(400).json({ error: 'province_id is required' });
  }
  try {
      const response = await axios.get(`https://pro.rajaongkir.com/api/city?province=${province_id}`, {
          headers: {
              key: process.env.RAJAONGKIR_API,
              'content-type': 'application/x-www-form-urlencoded',
          },
      });
      const data = response.data;
      const formattedResponse = {
          rajaongkir: {
              query: { province: province_id },
              status: data.rajaongkir.status,
              results: data.rajaongkir.results.map(item => ({
                  city_id: item.city_id,
                  province_id: item.province_id,
                  province: item.province,
                  type: item.type,
                  city_name: item.city_name,
                  postal_code: item.postal_code
              }))
          }
      };
      res.status(200).json(formattedResponse);
  } catch (error) {
      console.error('Error fetching city data:', error);
      res.status(500).json({ error: 'An error occurred while fetching city data' });
  }
});

router.get('/ongkir/subdistrict', async function (req, res) {
  const { city_id } = req.query;
  
  if (!city_id) {
      return res.status(400).json({ error: 'city_id is required' });
  }

  try {
      const response = await axios.get(`https://pro.rajaongkir.com/api/subdistrict?city=${city_id}`, {
          headers: {
              key: process.env.RAJAONGKIR_API,
              'content-type': 'application/x-www-form-urlencoded',
          },
      });

      const data = response.data;
      const formattedResponse = {
          rajaongkir: {
              query: { city: city_id },
              status: data.rajaongkir.status,
              results: data.rajaongkir.results.map(item => ({
                  type: item.type,
                  subdistrict_name: item.subdistrict_name
              }))
          }
      };

      res.status(200).json(formattedResponse);
  } catch (error) {
      console.error('Error fetching subdistrict data:', error);
      res.status(500).json({ error: 'An error occurred while fetching subdistrict data' });
  }
});
router.post('/checkout', async function (req, res) {
    const { id } = req.query;
    const { email, no_hp, nama_depan, nama_belakang, alamat_lengkap, total_beli,courier,service,ongkir,pajak,subtotal,potongan } = req.body; 
    const testdata = parseInt(total_beli,10);
    const dataCart = await Carts.findOne({
      where: {
        id_user: {
          [Op.like]: id
        }
      }
    });
  
    try {
      let newIdOrderPayment = uuidv4().replace(/-/g, '').substring(0, 7);
      const transactionDetails = {
        transaction_details: {
          order_id: newIdOrderPayment,
          gross_amount: testdata,
        },
        customer_details: {
          first_name: nama_depan,
          last_name: nama_belakang,
          email: email,
          phone: no_hp  
        },
      };
      const transaction = await snap.createTransaction(transactionDetails);
      const snapToken = transaction.token;
      const data = await Beli.create({
        id_beli: newIdOrderPayment,
        id_user: id,
        nama_depan:nama_depan,
        nama_belakang:nama_belakang,
        email: email,
        alamat_lengkap :alamat_lengkap ,
        total_beli: testdata,
        no_hp: no_hp,
        courier: courier,
        resi: "TUNGGU KONFIRMASI PESANAN",
        status_pembayaran: 1,
        status_pengiriman: 1,
        status:1,
        service:service,
        subtotal:subtotal,
        ongkir : ongkir,
        pajak : pajak,
        potongan : potongan,
        created_at: Date.now()
      });
  
      let newIdPrefixOrderItem = "OREDRITM";
  
      let highestIdEntryOrderItem = await BeliProduk.findOne({
        where: {
          id_beli_produk: {
            [Op.like]: `${newIdPrefixOrderItem}%`
          }
        },
        order: [['id_beli_produk', 'DESC']]
      });
  
      let newIdNumberOrderItem = 1;
      if (highestIdEntryOrderItem) {
        let highestIdOrderItem = highestIdEntryOrderItem.id_beli_produk;
        let numericPartOrderItem = highestIdOrderItem.replace(newIdPrefixOrderItem, '');
        newIdNumberOrderItem = parseInt(numericPartOrderItem, 10) + 1;
      }
      let newIdOrderItem = newIdPrefixOrderItem + newIdNumberOrderItem.toString().padStart(3, '0');
  
      const cartProducts = await CartProducts.findAll({
        where: {
          id_cart: dataCart.id_cart
        },
        include: [
          {
            model: Product,
          }
        ]
      });
  
      for (const cartProduct of cartProducts) {
          const product = cartProduct.Produk;
      if (product.stok < cartProduct.jumlah_produk) {
          throw new Error(`Stok tidak mencukupi untuk produk: ${product.nama_produk}`);
      }
      await product.update({
        stok: product.stok - cartProduct.jumlah_produk
      });
        await BeliProduk.create({
          id_beli_produk: newIdOrderItem,
          id_beli: newIdOrderPayment,
          id_produk: cartProduct.id_produk,
          jumlah: cartProduct.jumlah_produk,
          harga: 0,
          created_at: Date.now()
        });
        newIdNumberOrderItem++;
        newIdOrderItem = newIdPrefixOrderItem + newIdNumberOrderItem.toString().padStart(3, '0');
      }
  
      await CartProducts.destroy({
        where: {
          id_cart: {
            [Op.like] : dataCart.id_cart
          }
        }
      });
  
      await Carts.destroy({
        where: {
          id_user: {
            [Op.like]: id
          }
        }
      });
    console.log("WEEEE" + snapToken)
      res.status(200).json({ token: snapToken, data});
     
    } catch (error) {
      console.error('Midtrans transaction error:', error);
      res.status(500).json({ error: 'Failed to create transaction' });
    }
  });
  router.put("/update-resi/:id", async function (req, res) {
    try {
        const { id } = req.params;
        const { resi } = req.body;

        const updated = await Beli.update(
            { resi },
            { where: { id_beli: id } }
        );

        if (updated[0] === 0) {
            return res.status(404).json({ message: "Data not found or already updated." });
        }

        return res.status(200).json({ message: "Resi updated successfully." });
    } catch (err) {
        return res.status(400).json({ message: "Failed to update resi." });
    }
});

  const updatePengiriman = async (req, res) => {
    const { id_beli } = req.body;
    try {
      const beli = await Beli.findOne({ where: { id_beli } });
      if (!beli) {
        return res.status(404).json({ message: "Data tidak ditemukan" });
      }
      beli.status_pengiriman = 2;
      beli.status_pembayaran = 2;
      await beli.save();
  
      res.status(200).json({ message: "Status pengiriman berhasil diperbarui" });
    } catch (error) {
      console.error("Error updating pengiriman:", error);
      res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
  };
  router.post("/update-pengiriman", updatePengiriman);

  router.get("/daftarreport", async function (req, res) {
    try {
      const data = await Beli.findAll({
        where: {
          status: 1,
          status_pengiriman: { [Op.ne]: 5 },
        },
        order:[["total_beli", "DESC"]],
      });
      return res.status(200).json(data);
    } catch (err) {
      return res.status(400).send("Failed to get data pembelian");
    }
  });

  router.get("/daftarbeli", async function (req, res) {
    try {
      const data = await Beli.findAll({
        where: {
          status: 1
        },
        order:[["created_at", "DESC"]],
      });
      return res.status(200).json(data);
    } catch (err) {
      return res.status(400).send("Failed to get data pembelian");
    }
  });
  router.get("/daftarmasuk", async function (req, res) {
    try {
      const data = await Beli.findAll({
        where: {
          status_pengiriman: 1
        },
        order:[["created_at", "DESC"]],
      });
      return res.status(200).json(data);
    } catch (err) {
      return res.status(400).send("Failed to get data pembelian");
    }
  });
  router.get("/daftarsiapkirim", async function (req, res) {
    try {
      const data = await Beli.findAll({
        where: {
          status_pengiriman: 2
        },
        order:[["created_at", "DESC"]],
      });
      return res.status(200).json(data);
    } catch (err) {
      return res.status(400).send("Failed to get data pembelian");
    }
  });
  router.get("/daftardikirim", async function (req, res) {
    try {
      const data = await Beli.findAll({
        where: {
          status_pengiriman: 3
        },
        order:[["created_at", "DESC"]],
      });
      return res.status(200).json(data);
    } catch (err) {
      return res.status(400).send("Failed to get data pembelian");
    }
  });
  router.get("/daftarselesai", async function (req, res) {
    try {
      const data = await Beli.findAll({
        where: {
          status_pengiriman: 4
        },
        order:[["created_at", "DESC"]],
      });
      return res.status(200).json(data);
    } catch (err) {
      return res.status(400).send("Failed to get data pembelian");
    }
  });
  router.get("/daftardibatalkan", async function (req, res) {
    try {
      const data = await Beli.findAll({
        where: {
          status_pengiriman: 5
        },
        order:[["created_at", "DESC"]],
      });
      return res.status(200).json(data);
    } catch (err) {
      return res.status(400).send("Failed to get data pembelian");
    }
  });

  // UPDATE STATUS CODE \\
  router.post("/update-status", async (req, res) => {
    const { id_beli } = req.body;
  
    try {
      const updatedBeli = await Beli.update(
        { status_pengiriman: 3, resi: "RESI SEDANG DIPROSES" },
        { where: { id_beli } }
      );
  
      if (updatedBeli[0] === 0) {
        return res.status(404).json({ message: "ID tidak ditemukan" });
      }
  
      res.json({ message: "Status berhasil diperbarui" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Terjadi kesalahan server" });
    }
  });
  router.post("/cancel-status", async (req, res) => {
    const { id_beli } = req.body;
  
    try {
      const updatedBeli = await Beli.update(
        { status_pengiriman: 5, resi: "DIBATALKAN" },
        { where: { id_beli } }
      );
  
      if (updatedBeli[0] === 0) {
        return res.status(404).json({ message: "ID tidak ditemukan" });
      }
      const beliProdukList = await BeliProduk.findAll({
        where: { id_beli },
      });
  
      if (!beliProdukList.length) {
        return res.status(404).json({ message: "Tidak ada produk terkait" });
      }
      for (const beliProduk of beliProdukList) {
        const produk = await Product.findOne({
          where: { id_produk: beliProduk.id_produk }
        });
  
        if (produk) {
          await Product.update(
            { stok: produk.stok + beliProduk.jumlah },
            { where: { id_produk: beliProduk.id_produk } }
          );
        }
      }
      res.json({ message: "Status berhasil diperbarui dan stok dikembalikan" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Terjadi kesalahan server" });
    }
  });
  router.post("/selesai-status", async (req, res) => {
    const { id_beli } = req.body;
  
    try {
      const updatedBeli = await Beli.update(
        { status_pengiriman: 4 },
        { where: { id_beli } }
      );
  
      if (updatedBeli[0] === 0) {
        return res.status(404).json({ message: "ID tidak ditemukan" });
      }
  
      res.json({ message: "Status berhasil diperbarui" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Terjadi kesalahan server" });
    }
  });

  router.post("/refund-status", async (req, res) => {
    const { id_beli } = req.body;
  
    try {
      const updatedBeli = await Beli.update(
        { status_pembayaran: 3, resi: "DANA TELAH DIREFUND" },
        { where: { id_beli } }
      );
  
      if (updatedBeli[0] === 0) {
        return res.status(404).json({ message: "ID tidak ditemukan" });
      }
  
      res.json({ message: "Status berhasil diperbarui" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Terjadi kesalahan server" });
    }
  });

  // router.get("/daftarbelicust", async function (req, res) {
  //   try {
  //     const { id } = req.query;
  //     const { search } = req.query;
  
  //     if (!id) {
  //       return res.status(400).json({ message: "id_user tidak disertakan" });
  //     }
  //     const data = await Beli.findAll({
  //       where:search
  //       ? {
  //         status: 1,
  //         id_user:id, 
  //         id_pesanan: { [Op.like]: `%${search}%` }
  //       }: {status : 1},
  //       order: [["created_at", "DESC"]],
  //     });
  
  //     return res.status(200).json(data);
  //   } catch (err) {
  //     console.error(err);
  //     return res.status(400).send("Failed to get data pembelian");
  //   }
  // });

  router.get("/daftarbelicust", async function (req, res) {
    try {
      const { id } = req.query;
  
      if (!id) {
        return res.status(400).json({ message: "id_user tidak disertakan" });
      }
      const data = await Beli.findAll({
        where: {
          status: 1,
          id_user:id, 
        },
        order: [["created_at", "DESC"]],
      });
  
      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      return res.status(400).send("Failed to get data pembelian");
    }
  });
  router.get("/daftarmasukcust", async function (req, res) {
    try {
      const { id } = req.query;
  
      if (!id) {
        return res.status(400).json({ message: "id_user tidak disertakan" });
      }
      const data = await Beli.findAll({
        where: {
          status_pengiriman: 1,
          id_user:id, 
        },
        order: [["created_at", "DESC"]],
      });
  
      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      return res.status(400).send("Failed to get data pembelian");
    }
  });
  router.get("/daftarsiapkirimcust", async function (req, res) {
    try {
      const { id } = req.query;
  
      if (!id) {
        return res.status(400).json({ message: "id_user tidak disertakan" });
      }
      const data = await Beli.findAll({
        where: {
          status_pengiriman: 2,
          id_user:id, 
        },
        order: [["created_at", "DESC"]],
      });
  
      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      return res.status(400).send("Failed to get data pembelian");
    }
  });
  router.get("/daftardikirimcust", async function (req, res) {
    try {
      const { id } = req.query;
  
      if (!id) {
        return res.status(400).json({ message: "id_user tidak disertakan" });
      }
      const data = await Beli.findAll({
        where: {
          status_pengiriman: 3,
          id_user:id, 
        },
        order: [["created_at", "DESC"]],
      });
  
      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      return res.status(400).send("Failed to get data pembelian");
    }
  });
  router.get("/daftarselesaicust", async function (req, res) {
    try {
      const { id } = req.query;
  
      if (!id) {
        return res.status(400).json({ message: "id_user tidak disertakan" });
      }
      const data = await Beli.findAll({
        where: {
          status_pengiriman: 4,
          id_user:id, 
        },
        order: [["created_at", "DESC"]],
      });
  
      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      return res.status(400).send("Failed to get data pembelian");
    }
  });
  router.get("/daftardibatalkancust", async function (req, res) {
    try {
      const { id } = req.query;
  
      if (!id) {
        return res.status(400).json({ message: "id_user tidak disertakan" });
      }
      const data = await Beli.findAll({
        where: {
          status_pengiriman: 5,
          id_user:id, 
        },
        order: [["created_at", "DESC"]],
      });
  
      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      return res.status(400).send("Failed to get data pembelian");
    }
  });

  router.get("/pesanan/:id", async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).json({ message: "ID pesanan tidak valid" });
    }
  
    try {
      const order = await Beli.findOne({
        where: { id_beli: id },
        include: [
          {
            model: BeliProduk,
            include: [
              {
                model: Product,
                attributes: ["id_produk", "nama_produk", "nama_kategori","total_harga"],
                include: [
                  {
                    model: ProdukFoto,
                    attributes: ["nama", "number"],
                    where: { number: 1 },
                    required: false,
                  },
                ],
              },
            ],
          },
        ],
      });
      if (!order) {
        return res.status(404).json({ message: "Pesanan tidak ditemukan" });
      }
      const response = {
        order: {
          id_beli: order.id_beli,
          nama_depan: order.nama_depan,
          nama_belakang: order.nama_belakang,
          alamat_lengkap: order.alamat_lengkap,
          total_beli: order.total_beli,
          no_hp: order.no_hp,
          courier: order.courier,
          resi: order.resi,
          email: order.email,
          status_pembayaran: order.status_pembayaran,
          status_pengiriman: order.status_pengiriman,
          status: order.status,
          created_at: order.created_at,
          ongkir : order.ongkir,
          pajak : order.pajak,
          subtotal : order.subtotal,
          potongan : order.potongan
        },
        products: order.BeliProduks.map((item) => ({
          id_beli_produk: item.id_beli_produk,
          id_produk: item.id_produk,
          nama_produk: item.Produk?.nama_produk || "Tidak Ditemukan",
          kategori: item.Produk?.nama_kategori || "Tidak Ditemukan",
          harga: item.Produk?.total_harga,
          jumlah: item.jumlah,
          total_harga: item.Produk?.total_harga,
          photo: item.Produk?.ProdukFotos.length
            ? item.Produk.ProdukFotos[0]
            : null,
        })),
      };
  
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching order:", error.message);
      return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
  });
router.get("/total-beli", async (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ message: "Tanggal awal dan akhir diperlukan" });
    }
    try {
        const result = await Beli.findAll({
            attributes: [
                [fn("SUM", col("total_beli")), "total_beli"],
            ],
            where: {
                [Op.and]: [
                    where(fn("DATE", col("created_at")), {
                        [Op.between]: [
                            fn("DATE", new Date(startDate)),
                            fn("DATE", new Date(endDate))
                        ]
                    }),
                    { status_pengiriman: { [Op.ne]: 5 } }
                ]
            },
        });
        
        const totalBeli = result[0]?.get("total_beli") || 0;
        
        res.status(200).json({ total_beli: totalBeli});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
});


router.get("/list-beli", async (req, res) => {
  const { startDate, endDate } = req.query;
  if (!startDate || !endDate) {
      return res.status(400).json({ message: "Tanggal awal dan akhir diperlukan" });
  }
  try {
      const beliList = await Beli.findAll({
          where: {
              [Op.and]: [
                  where(fn("DATE", col("created_at")), {
                      [Op.between]: [fn("DATE", new Date(startDate)), fn("DATE", new Date(endDate))]
                  })
              ]
          },
          order: [["created_at", "DESC"]]
      });
      res.status(200).json({ data: beliList });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
});







module.exports = router;