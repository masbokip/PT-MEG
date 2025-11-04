import React,{useState, useEffect} from 'react';
import { getSession, useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Swal from "sweetalert2";
import { testURL } from '@/testURL';

export default function Index() {
    const router = useRouter();
      const [dataCart,setCart]= useState([]);
      const { data: session } = useSession();
    useEffect(() => {
            const fetchDataCart = async () => {
              try {
                const response = await axios.get(`${testURL}/api/favorite?id=${session.user.id_user}`);
                setCart(response.data.data);
                if (response.data.data.length === 0) {
                  Swal.fire({
                      title: 'Produk Favorit Kosong',
                      text: 'Tidak ada produk di dalam Produk Favorit Anda.',
                      icon: 'info',
                      confirmButtonText: 'OK',
                            });
                    }
              } catch (error) {
                Swal.fire({
                      title: 'Produk Favorit Kosong',
                      text: 'Tidak ada produk di dalam Produk Favorit Anda.',
                      icon: 'info',
                      confirmButtonText: 'OK',
                    });
              }
            };
            if (session) {
              fetchDataCart();
            }
          }, [session]);

const addToCartSingle = async (productId) => {
      try {
        const response = await axios.post(`${testURL}/api/cartsingle`, {
          id_user: session.user?.id_user,
          id_produk: productId,
        });
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.data.message,
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
          }).then(() => {
            window.location.reload();
          });
        }
      } catch (error) {
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while added item to cart',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
        });
        window.location.reload();
      }
    };

      const deleete = async (id_favorite_produk) => {
        try {
          await axios
            .delete(`${testURL}/api/favorite?id=${id_favorite_produk}`)
            .then(router.reload());
        } catch (error) {
          alert('Error: ' + error.message);
        }
    }

  return (
    <div className='bg-white'>
    <div className="p-8 bg-white">
      <h2 className="text-4xl font-bold text-indigo-900 mb-4">Produk Favorit</h2>
      <div className="overflow-x-auto bg-white">
        <table className="w-full text-left border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-gray-600 font-semibold">Foto Produk</th>
              <th className="px-4 py-2 text-gray-600 font-semibold">Nama Produk</th>
              <th className="px-4 py-2 text-gray-600 font-semibold">Masukkan Keranjang</th>
              <th className="px-4 py-2 text-gray-600 font-semibold">Harga</th>
              <th className="px-4 py-2 text-gray-600 font-semibold">Hapus</th>
            </tr>
          </thead>
          <tbody>
            {dataCart.map((item,index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="px-4 py-4">
                  <div className="w-16 h-16 relative">
                    <img
                      src={`${testURL}/assets/images/product/${item.Produk.ProdukFotos[0].nama}`}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                </td>
                <td className="px-4 py-4 text-gray-800">{item.Produk.nama_produk}</td>
                <td className="px-4 py-4">
                  <button
                  onClick={() => {
                  addToCartSingle(item.Produk.id_produk);
                  deleete(item.id_favorite_produk);
                  }} 
                  disabled={item.Produk.stok<=0}
                  className="px-4 py-2 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700 transition">
                    Add To Cart
                  </button>
                </td>
                <td className="px-4 py-4 text-gray-800">Rp {item.Produk.total_harga}</td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => deleete(item.id_favorite_produk)}
                    className="text-red-500 font-semibold"
                  >
                    &times;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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