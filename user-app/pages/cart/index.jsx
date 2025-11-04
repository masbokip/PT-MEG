import React,{useState, useEffect} from 'react';
import { getSession, useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { testURL } from '@/testURL';
export default function Index() {
    const router = useRouter();
    const [dataCart,setCart]= useState([]);
    const [dataTotalProduct,setTotalProduct]= useState("");
    const [dataJumlahProduct,setJumlahProduct]= useState("");
    const [dataJumlahPesanan,setJumlahPesanan]= useState("");
    const [quantity, setQuantity] = useState(1);
    const { data: session } = useSession();
    
    useEffect(() => {
        const fetchDataCart = async () => {
          try {
            const response = await axios.get(`${testURL}/api/cart?id=${session.user.id_user}`);
            setCart(response.data.data);
            setTotalProduct(response.data.totalProducts)
            setJumlahProduct(response.data.jumlahProducts)
            setJumlahPesanan(response.data.totalPesanans)
            if (response.data.data.length === 0) {
              Swal.fire({
                title: 'Keranjang Kosong',
                text: 'Tidak ada produk di dalam keranjang Anda.',
                icon: 'info',
                confirmButtonText: 'OK',
              });
            }
          } catch (error) {
            Swal.fire({
              title: 'Keranjang Kosong',
              text: 'Tidak ada produk di dalam keranjang Anda.',
              icon: 'info',
              confirmButtonText: 'OK',
            });
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

    
    const updateQuantity = async (id_cart_produk, newQty) => {
        try {
          const response = await axios.put(
            `${testURL}/api/cart?id=${id_cart_produk}`,
            {
              qty: newQty,
            },
          );
    
          if (response.status === 200) {
            setCart((prevDataCart) =>
              prevDataCart.map((item) =>
                item.id_cart_produk === id_cart_produk
                  ? { ...item, qty: newQty }
                  : item,
              ),
            );
          }
        } catch (error) {
          if (error.response && error.response.status === 400) {
            alert(error.response.data.message);
          }
        }
      };
    const increment = (id_cart_produk, currentQty) => {
        const newQty = currentQty + 1;
        updateQuantity(id_cart_produk, newQty);
        if (updateQuantity) {
          router.reload();
        }
      };
    
      const decrement = (id_cart_produk, currentQty) => {
        if (currentQty > 1) {
          const newQty = currentQty - 1;
          updateQuantity(id_cart_produk, newQty);
        }
        if (updateQuantity) {
          router.reload();
        }
      };
      
      const handleInputChange = (e, id_cart_produk) => {
        const newQty = parseInt(e.target.value);
        if (!isNaN(newQty) && newQty > 0) {
          updateQuantity(id_cart_produk, newQty);
        }
        if (updateQuantity) {
            item.jumlah_produk = newQty;
          router.reload();
        }
      };

      const calculateSubtotal = () => {
        return dataCart.reduce(
          (acc, item) => acc + item.Produk.total_harga * item.jumlah_produk,
          0,
        );
      };
      const subtotal = calculateSubtotal();
      const deleete = async (id_cart_produk) => {
        try {
          await axios
            .delete(`${testURL}/api/cart?id=${id_cart_produk}`)
            .then(router.reload());
        } catch (error) {
          alert('Error: ' + error.message);
        }
    }

    return (
        <section
            class="relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
            <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
                <div class="grid grid-cols-12">
                    <div
                        class="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
                        <div class="flex items-center justify-between pb-8 border-b border-gray-300">
                            <h2 class="font-manrope font-bold text-3xl leading-10 text-black">Keranjang Belanjaan</h2>
                            <h2 class="font-manrope font-bold text-xl leading-8 text-gray-600">{dataTotalProduct} Produk</h2>
                        </div>

                        {/* Header Grid */}
                        <div class="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                            <div class="col-span-12 md:col-span-6">
                                <p class="font-normal text-lg leading-8 text-gray-400">Detail Produk</p>
                            </div>
                            <div class="col-span-12 md:col-span-5">
                                <div class="grid grid-cols-5">
                                    <div class="col-span-2">
                                        <p class="font-normal text-lg leading-8 text-gray-400 text-center">Jumlah</p>
                                    </div>
                                    <div class="col-span-2">
                                        <p class="font-normal text-lg leading-8 text-gray-400 text-center">Total</p>
                                    </div>
                                    <div class="col-span-1">
                                        <p class="font-normal text-lg leading-8 text-gray-400 text-center">Hapus</p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                        {/* Product Item */}
                {dataCart.map((item, index) => (
                <div key={item.id_cart_produk} className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6 border-b border-gray-200 group">
                    
                    <div className="w-full md:max-w-[126px]">
                      <img src={`${testURL}/assets/images/product/${item.Produk.ProdukFotos[0].nama}`} alt="foto produk"
                          className="mx-auto rounded-xl object-cover" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-5 w-full">
                      <div className="md:col-span-2">
                          <div className="flex flex-col max-[500px]:items-center gap-3">
                            <h6 className="font-semibold text-base leading-7 text-black">{item.Produk.nama_produk}</h6>
                            <h6 className="font-normal text-base leading-7 text-gray-500">{item.Produk.nama_brand}</h6>
                            <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">{formatCurrency(item.Produk.total_harga)}</h6>
                          </div>
                      </div>
                      <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                          <div className="flex items-center border rounded-lg overflow-hidden">
                            <button onClick={() => decrement(item.id_cart_produk, item.jumlah_produk)} className="px-4 py-2 text-xl">-</button>
                            <span onChange={(e) => handleInputChange(e, item.id_cart_produk)} className="px-4 py-2">{item.jumlah_produk}</span>
                            <button onClick={() => increment(item.id_cart_produk, item.jumlah_produk)} className="px-4 py-2 text-xl">+</button>
                          </div>
                      </div>
                      <div className="flex items-right max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                          <p className="font-bold text-lg leading-8 text-gray-600 text-right transition-all duration-300 group-hover:text-indigo-600">{formatCurrency(item.Produk.total_harga * item.jumlah_produk)}</p>
                      </div>
                      <div className="flex items-center justify-center h-full max-md:mt-3">
                          <button
                            onClick={() => deleete(item.id_cart_produk)}
                            className="text-red-600 hover:text-red-800 transition-all duration-300">
                            &times;
                          </button>
                      </div>
                    </div>
                </div>
              ))}
                    </div>
                    <div
                        class="col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
                        <h2 class="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                            Total Pesanan</h2>
                        <div class="mt-8">
                            <div class="flex items-center justify-between pb-6">
                                <p class="font-normal text-lg leading-8 text-black">{dataJumlahProduct} Item</p>
                                <p class="font-medium text-lg leading-8 text-black">{formatCurrency(subtotal)}</p>
                            </div>
                            
       
                          <Link href="checkout" className="text-gray-400 hover:text-white">
                            <button  class="w-full text-center bg-indigo-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700">
                            Checkout
                            </button>
                          </Link>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
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