import React,{useState,useEffect} from 'react'
import { getSession, useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { testURL } from '@/testURL';

export default function  Index() {
   const router = useRouter();
   const [dataCart,setCart]= useState([]);
   const [dataTotalProduct,setTotalProduct]= useState("");
   const [dataJumlahProduct,setJumlahProduct]= useState("");
   const [dataJumlahPesanan,setJumlahPesanan]= useState("");
   const [quantity, setQuantity] = useState(1);

   const [dataAmbilVoc,setAmbilVoc] = useState(0)
   const [kodeVoc, setKodeVoc]= useState()
   const [berat,setBerat] = useState()
   const [testBerat, setTestBerat] = useState(0)

  const [codeProvince, setCodeProvince] = useState(1);
  const [codeCities, setCodeCities] = useState(1);

  const [courier, setCourier] = useState();
  const [service, setService] = useState([]);
  const [costShipping, setCostShipiing] = useState(0);

  const [citiesByState, setCitiesByState] = useState([]);
  const [cities, setCities] = useState([]);
  const [zipcode, setZipcode] = useState();

  const[dataEmail, SetEmail] = useState();
  const[dataNo_telp, SetNo_telp] = useState();
  const[dataNama_depan, SetNama_depan] = useState();
  const[dataNama_belakang, SetNama_belakang] = useState();
  const[dataProvinsi, Setprovinsi] = useState();
  const[dataKota, Setkota] = useState();
  const[dataKodePos, SetKodepos] = useState();
  const[dataKecamatan, SetKecamatan] = useState();
  const[dataKelurahan, SetKelurahan] = useState();
  const[dataAlamat_lengkap, SetAlamat_lengkap] = useState();


  const[snapToken, setSnapToken]= useState();
  const { data: session, status } = useSession();

   useEffect(() => {
      const fetchProvinces = async () => {
        try {
          const response = await axios.get(`${testURL}/api/ongkir/provinsi`);
          if (
            response.data &&
            response.data.rajaongkir &&
            response.data.rajaongkir.results
          ) {
            setCitiesByState(response.data.rajaongkir.results);
            
          } else {
            console.error('Unexpected API response structure for provinces');
          }
        } catch (error) {
          console.error('Error fetching provinces:', error);
        }
      };
      fetchProvinces();
    }, []);
  
    useEffect(() => {
      const fetchCities = async () => {
        try {
          const response = await axios.get(
            `${testURL}/api/ongkir/kota?province_id=${codeProvince}`,
          );
          setCities(response.data.rajaongkir.results);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      };
      fetchCities();
    }, [codeProvince]);

    useEffect(() => {
      const ambilBerat = async ()=>{
         try {
            axios.get(`${testURL}/api/beratcart?id_user=${session.user.id_user}`)
            .then(response => setTestBerat(response.data.total))
            .catch(error => console.error("Error fetching user data:", error));
         } catch (err) {
            console.log("data tidak ditemukan")
         }
      }
      ambilBerat();
    }, [session]);
    console.log("TEST",testBerat);
    useEffect(() => {
      const fetchDataUser = async () => {
         if (!session || !session.user?.id_user) {
            console.log("Session atau user ID tidak valid.");
            return;
         }
   
         try {
            const response = await axios.get(`${testURL}/api/ambiluser?id_user=${session.user.id_user}`);
   
            if (response.status === 200) {
               const data = response.data;
               SetEmail(data.email);
               SetNo_telp(data.no_telp);
               SetNama_depan(data.nama_depan);
               SetNama_belakang(data.nama_belakang);
               SetKecamatan(data.kecamatan);
               SetKelurahan(data.kelurahan);
               SetAlamat_lengkap(data.alamat_lengkap);
               SetKodepos(data.kode_pos);
            } else {
               console.log(`Error: Server mengembalikan status ${response.status}`);
            }
         } catch (err) {
            console.error("Terjadi kesalahan saat mengambil data user:", err);
         }
      };
   
      fetchDataUser();
   }, [session]);

    const handleCheckVoucher = async () => {
      try {
        const response = await axios.get(`${testURL}/api/ambilvoucher?kode_voucher=${kodeVoc}`);
        setAmbilVoc(response.data.potongan);
        Swal.fire({
          icon: 'success',
          title: 'Voucher berhasil digunakan!',
          text: `Diskon: Rp${response.data.potongan}`,
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal memproses voucher',
          text: 'Kode voucher tidak valid atau terjadi kesalahan.',
        });
      }
    };

    useEffect(() => {
      const checkCostService = async () => {
        const tempCodeCities = parseInt(codeCities);
        const tempCodeOrigin = parseInt(409);
        if (!courier || !codeCities ) {
          console.log('Missing required data for shipping cost calculation');
          return;
        }
        try {
          const response = await axios.post(`${testURL}/api/ongkir`, {
            origin: tempCodeOrigin,
            destination: tempCodeCities,
            weight: testBerat,
            courier: courier,
            originType:"city",
            destinationType:"city",
          });
  
          if (response.data && response.data.length > 0) {
            setService(response.data);
          } else {
            console.log('No shipping services returned.');
            setService([]);
          }
        } catch (error) {
          console.error('Error fetching shipping cost:', error);
        }
      };
  
      checkCostService();
    }, [courier, codeCities, testBerat ]);
   
   
   useEffect(() => {
      const fetchDataCart = async () => {
        try {
          const response = await axios.get(`${testURL}/api/cart?id=${session.user.id_user}`);
          setCart(response.data.data);
          setTotalProduct(response.data.totalProducts)
          setJumlahProduct(response.data.jumlahProducts)
          setJumlahPesanan(response.data.totalPesanans)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      if (session) {
        fetchDataCart();
      }
    }, [session]);
    const formatCurrency = (value) => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(value);
    };

    const calculateSubtotal = () => {
      return dataCart.reduce(
        (acc, item) => acc + item.Produk.total_harga * item.jumlah_produk,
        0,
      );
    };
    const subtotal = calculateSubtotal();
    const tax = subtotal * 0.12;
    
    const totalcak = subtotal + tax + parseInt(costShipping) - dataAmbilVoc;
    
    useEffect(() => {
      const loadMidtransScript = () => {
        const scriptTag = document.createElement('script');
        scriptTag.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
        scriptTag.setAttribute('data-client-key', process.env.CLIENT_KEY);
        document.body.appendChild(scriptTag);
      };
      loadMidtransScript();
    }, []);
    const combineAddress = () => {
      return `${dataAlamat_lengkap}, Kelurahan ${dataKelurahan}, Kecamatan ${dataKecamatan}, Provinsi ${dataProvinsi},Kota ${dataKota} ,Kode Pos ${dataKodePos}`;
    };
  
    const handleBuyNow = async () => {
      const completeAddress = combineAddress();
      try {
        const response = await axios.post(
          `${testURL}/api/checkout?id=${session.user.id_user}`,
          {
            email : dataEmail,
            no_hp: dataNo_telp,
            nama_depan: dataNama_depan,
            nama_belakang: dataNama_belakang,
            alamat_lengkap: completeAddress,
            total_beli : parseInt(totalcak),
            courier : courier,
            service : service,
            ongkir : parseInt(costShipping),
            pajak : parseInt(tax),
            subtotal : parseInt(subtotal),
            potongan : parseInt(dataAmbilVoc)
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const { token } = response.data;
        setSnapToken(token);
        window.snap.pay(token, {
          onSuccess: async function (result) {
            try {
              const response = await axios.post(`${testURL}/api/update-pengiriman`, {
                id_beli: result.order_id, 
              });
              if (response.status === 200) {
                console.log("Pembayaran berhasil");
                router.push("/home");
              } else {
                console.error("Gagal memperbarui status pengiriman");
                router.push("/home");
              }
              
            } catch (error) {
              console.error("Error updating pengiriman status:", error);
            }
          },
          onPending: function (result) {
            alert('Payment pending:' + result);
          },
          onError: function (result) {
            alert('Payment error:' + result);
          },
          onClose: function () {
            console.log('Payment popup closed');
            router.push('/home');
          },
        });
      } catch (error) {
        console.error('Payment error:', error);
      }
    };

  return (
    <div className="container mx-auto p-5">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 ">
            {/* Left Column - Contact and Shipping Info */}
            <div className="lg:col-span-7 bg-white p-6 rounded-lg shadow-lg">
               <h2 className="text-lg font-semibold mb-4">Informasi Kontak</h2>
               <div>
                  <div className="mb-6">
                     <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
                     <input
                      type="email"
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
                      value={dataEmail}
                      onChange={(e) => SetEmail(e.target.value)}
                      autoComplete="email"
                      disabled
                      placeholder="Masukkan Email"
                    />
                  </div>
                  <div className="mb-6">
                     <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
                     <input type="text"
                     name="no_telp"
                     defaultValue={dataNo_telp}
                     onChange={(e)=>SetNo_telp(e.target.value)}
                     placeholder="Nomor Telepon"
                     autoComplete="tel"
                     disabled
                     className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <h2 className="text-lg font-semibold mb-4">Informasi Pengiriman</h2>
                  <div className="grid grid-cols-2 gap-6 mb-6">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nama Depan</label>
                        <input 
                        type="text"
                        name="nama_depan"
                        defaultValue={dataNama_depan}
                        onChange={(e)=>SetNama_depan(e.target.value)}
                        placeholder="Nama Depan"
                        autoComplete="given-name"
                        disabled
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500" />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nama Belakang</label>
                        <input type="text"
                        name="nama_belakang"
                        defaultValue={dataNama_belakang}
                        onChange={(e)=>SetNama_belakang(e.target.value)}
                        placeholder="Nama Belakang"
                        autoComplete="family-name"
                        disabled
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500" />
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 mb-6">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Provinsi</label>
                        <select
                            onChange={(e) => {
                              setCodeProvince(e.target.value);
                              const provinceName = citiesByState.find(item => item.province_id === e.target.value)?.province || "";
                              Setprovinsi(provinceName);
                            }}
                           className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black shadow-sm"
                        >
                           <option value="#">Please select province...</option>
                           {citiesByState.map((item, i) => (
                           <option key={i} value={item.province_id}>
                              {item.province}
                           </option>
                           ))}
                     </select>
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Kota/Kabupaten</label>
                        <select
                            onChange={(e) => {
                              setCodeCities(e.target.value);
                              const cityName = cities.find(item => item.city_id === e.target.value)?.city_name || "";
                              Setkota(cityName);
                            }}
                           className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black shadow-sm"
                        >
                           <option className="text-black" value="#">
                           Please select cities...
                           </option>
                           {cities.map((item, i) => (
                           <option className="text-black" key={i} value={item.city_id}>
                              {item.city_name}
                           </option>
                           ))}
                        </select>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 mb-6">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Kecamatan</label>
                        <input 
                        type="text"
                        name="kecamatan"
                        value={dataKecamatan}
                        onChange={(e)=>SetKecamatan(e.target.value)}
                        placeholder="Kecamatan"
                        disabled
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500" />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Kelurahan/Desa</label>
                        <input 
                        type="text"
                        name="kelurahan"
                        value={dataKelurahan}
                        onChange={(e)=>SetKelurahan(e.target.value)}
                        placeholder="Kelurahan/Desa"
                        disabled
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500" />
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 mb-6">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Kode Pos</label>
                        <input 
                        type="number"
                        name="kode_pos"
                        value={dataKodePos}
                        onChange={(e)=>SetKodepos(e.target.value)}
                        placeholder="Kode Pos"
                        autoComplete="postal-code"
                        disabled
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500" />
                     </div>
                     
                  </div>
                  <div className="mb-6">
                     <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap</label>
                     <textarea
                        type="text"
                        name="alamat_lengkap"
                        value={dataAlamat_lengkap}
                        onChange={(e)=>SetAlamat_lengkap(e.target.value)}
                        placeholder="Alamat Lengkap"
                        rows={4}
                        disabled
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        autoComplete="street-address"
                     />
                  </div>
                  {/* <div className="mb-4">
                    <h3 className="text-lg font-semibold">Alamat Lengkap:</h3>
                    <p>{combineAddress()}</p>
                  </div> */}
                  
                  {/* Delivery Method */}
                  <h2 className="text-lg font-semibold mb-4">Delivery method</h2>
                     <div className="grid grid-cols-2 gap-4 mb-6">
                     <label className="border rounded-md p-4 cursor-pointer flex items-center">
                     <select
                           onChange={(e) => setCourier(e.target.value)}
                           className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black shadow-sm"
                        >
                           <option value="#">Please select courier...</option>
                           <option value="jne">JNE (Jalur Nugraha Ekakurir)</option>
                           <option value="tiki">TIKI (Titipan Kilat)</option>
                           <option value="pos">POS Indonesia</option>
                           <option value="jnt">J&T Express</option>
                           <option value="sicepat">SiCepat Express</option>
                           <option value="ninja">Ninja Xpress</option>
                           <option value="wahana">Wahana Express</option>
                           <option value="anteraja">Anteraja</option>
                        </select>
                        </label>

                     <label className="border rounded-md p-4 cursor-pointer flex items-center">
                     <select
                        onChange={(e) => setCostShipiing(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black shadow-sm"
                     >
                        <option className="text-black" value="#">
                           Please select service...
                        </option>
                        {service.map((item, i) => (
                           <option key={i} value={item.cost[0].value}>
                           {item.service}
                           </option>
                        ))}
                     </select>
                     </label>

                  </div>
               </div>
               <h2 className="text-lg font-semibold mb-4">Masukkan Voucher</h2>
                  <div className="grid grid-cols-2 gap-6 mb-6">
                     <input type="text" 
                     onChange={(e)=>setKodeVoc(e.target.value)}
                     className="w-full border border-gray-300 rounded-md p-2  focus:ring-2 focus:ring-indigo-500" />
                     <button className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition" onClick={handleCheckVoucher}>
                     Cek Voucher
                     </button>
                  </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-5 bg-white p-6 rounded-lg shadow-lg">
               <h2 className="text-lg font-semibold mb-4">Order summary</h2>
               
                     <div className="mb-6">
                     {dataCart.map((item,index) => (
                     <div key={item.id_cart} className="flex justify-between mb-4">
                        <div className="flex items-center">
                           <img src={`${testURL}/assets/images/product/${item.Produk.ProdukFotos[0].nama}`}  alt="Product 1" className="w-16 h-16 rounded-md mr-4" />
                           <div>
                              <p className="text-sm font-medium">{item.Produk.nama_produk}</p>
                              <p className="text-sm text-gray-500">{item.Produk.nama_brand}</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className="text-sm">{formatCurrency(item.Produk.total_harga)}</p>
                           <p className="w-16 border border-gray-300 rounded-md p-1" disable>{item.jumlah_produk}</p>
                           {/* <input type="number" className="w-16 border border-gray-300 rounded-md p-1" defaultValue={1} /> */}
                        </div>
                     </div>
                      ))}
                  </div>
               
               {/* Pricing Details */}
               <div className="mb-6">
                  <div className="flex justify-between text-sm">
                     <p className="text-gray-500">Subtotal</p>
                     <p className="font-medium">{formatCurrency(subtotal)}</p>
                  </div>
                  <div className="flex justify-between text-sm">
                     <p className="text-gray-500">Shipping</p>
                     <p className="font-medium">{formatCurrency(costShipping)}</p>
                  </div>
                  <div className="flex justify-between text-sm">
                     <p className="text-gray-500">Taxes</p>
                     <p className="font-medium">{formatCurrency(tax)}</p>
                  </div>
                  <div className="flex justify-between text-sm">
                     <p className="text-gray-500">Voucher</p>
                     <p className="font-medium">{formatCurrency(dataAmbilVoc)}</p>
                  </div>
                  <div className="flex justify-between text-lg font-semibold mt-4">
                     <p>Total</p>
                     <p>{formatCurrency(totalcak)}</p>
                  </div>
               </div>
               {/* Confirm Order Button */}
               <div className="text-center">
                  <button  onClick={handleBuyNow} className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition">
                     Confirm order
                  </button>
               </div>
               
            </div>
         </div>
      </div>
  )
}
export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  if (session.user.role === 'Pegawai' || session.user.role === 'Admin') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {
      ...session,
    },
  };
}
