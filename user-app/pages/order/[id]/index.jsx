import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import { testURL } from '@/testURL';

export default function Index() {
    const router = useRouter();
    const { id } = router.query;
    const { data: session } = useSession();
    const [orderData, setOrderData] = useState({ order: {}, products: [] });
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(''); 
    useEffect(() => {
        const fetchOrderData = async () => {
          try {
            const response = await axios.get(`${testURL}/api/pesanan/${id}`);
            setOrderData(response.data);
          } catch (err) {
            setError(err.message || "Terjadi kesalahan saat memuat data");
          } finally {
            setLoading(false);
          }
        };
        fetchOrderData();
      }, [id]);
      const formatCurrency = (value) => {
          return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
          }).format(value);
        };
      if (loading) {
        return <p>Memuat data...</p>;
      }
    
      if (error) {
        return <p>Error: {error}</p>;
      }
  return (
    <section class="bg-white py-8 antialiased md:py-16">
    <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <h2 class="text-xl font-semibold text-gray-900  sm:text-2xl text-center">
    Informasi Pesanan {orderData.order.id_beli}
    </h2>
    <div class="mt-6 space-y-4 border-b border-t bg-gray-50 py-8 sm:mt-8">
        <h4 class="text-lg font-semibold text-gray-900 ">Data Informasi Pesanan</h4>
        <dl>
          <dt class="text-base font-medium text-gray-900 ">Nomor Pesanan </dt>
          <dd class="mt-1 text-base font-normal text-gray-500 ">{orderData.order.id_beli}</dd>
        </dl>
        <dl>
          <dt class="text-base font-medium text-gray-900">Data Diri Pelanggan</dt>
          <dd class="mt-1 text-base font-normal text-gray-500 ">{orderData.order.nama_depan} {orderData.order.nama_belakang} {orderData.order.no_hp}</dd>
          <dd class="mt-1 text-base font-normal text-gray-500 ">{orderData.order.alamat_lengkap}</dd>
        </dl>
        <dl>
          <dt class="text-base font-medium text-gray-900 ">Data Pengiriman</dt>
          <dd class="mt-1 text-base font-normal text-gray-500  uppercase"> {orderData.order.courier}</dd>
        </dl>
        <dl>
          <dt class="text-base font-medium text-gray-900 ">Resi Pengiriman</dt>
          <dd class="mt-1 text-base font-normal text-gray-500 ">{orderData.order.resi}</dd>
        </dl>
         </div>
             {orderData.products.map((produk) => (
                <div key={produk.id_beli_produk} class="space-y-4 p-6">
                    <div class="flex items-center gap-6">
                    <a href="#" class="h-14 w-14 shrink-0">
                        <img
                        className="h-full w-full object-cover"
                        src={
                            produk.photo?.nama
                            ? `${testURL}/assets/images/product/${produk.photo.nama}`
                            : '/placeholder.png'
                        }
                        alt={`Foto ${produk.nama_produk}`}
                        />
                    </a>
                    <a href="#" class="min-w-0 flex-1 font-medium text-gray-900 hover:underline ">
                        Produk {produk.nama_produk}
                    </a>
                    </div>
                    <div class="flex items-center justify-between gap-4">
                    <p class="text-sm font-normal text-gray-500 ">
                        <span class="font-medium text-gray-900 "></span> {produk.nama_kategori}
                    </p>
                    <div class="flex items-center justify-end gap-4">
                        <p class="text-base font-normal text-gray-900 ">x{produk.jumlah}</p>
                        <p class="text-xl font-bold leading-tight text-gray-900 ">{formatCurrency(produk.harga)}</p>
                    </div>
                    </div>
                </div>
                ))}
          <div class="space-y-4 bg-gray-50 p-6">
          <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
              <dt class="text-lg font-bold text-gray-900">Sub Total</dt>
              <dd class="text-lg font-bold text-gray-900">{formatCurrency(orderData.order.subtotal)}</dd>
            </dl>
            <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
              <dt class="text-lg font-bold text-gray-900">Biaya Pengiriman</dt>
              <dd class="text-lg font-bold text-gray-900">{formatCurrency(orderData.order.ongkir)}</dd>
            </dl>
            <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
              <dt class="text-lg font-bold text-gray-900">Pajak</dt>
              <dd class="text-lg font-bold text-gray-900">{formatCurrency(orderData.order.pajak)}</dd>
            </dl>
            <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
              <dt class="text-lg font-bold text-gray-900">Potongan Harga</dt>
              <dd class="text-lg font-bold text-gray-900">{formatCurrency(orderData.order.potongan)}</dd>
            </dl>
            <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
              <dt class="text-lg font-bold text-gray-900">Total Pembelian</dt>
              <dd class="text-lg font-bold text-gray-900">{formatCurrency(orderData.order.total_beli)}</dd>
            </dl>
          </div>
      </div>
  </section>
  )
}
// export async function getServerSideProps(ctx) {
//   const session = await getSession(ctx);

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }
//   if (session.user.role === 'Pegawai' || session.user.role === 'Admin') {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {
//       ...session,
//     },
//   };
// }
