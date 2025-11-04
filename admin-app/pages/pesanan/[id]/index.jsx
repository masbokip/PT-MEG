import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/router";
import { testURL } from '@/testURL';

export default function OrderDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [orderData, setOrderData] = useState({ order: {}, products: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

    if (id) {
      fetchOrderData();
    }
  }, [id]);

  const formatCurrency = (value) => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(value);
    };

  const totalPages = Math.ceil(orderData.products.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orderData.products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-lg">
      <div className="py-8 px-4 mx-auto w-full lg:py-6">
        <h2 className="mb-4 text-xl font-bold text-white">Detail Pesanan</h2>
        <form>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-white">Nama Pelanggan</label>
              <input
                type="text"
                value={`${orderData.order.nama_depan} ${orderData.order.nama_belakang}`}
                readOnly
                className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 disable"
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-white">No Hp</label>
              <input
                type="text"
                value={orderData.order.no_hp || ''}
                readOnly
                className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 disable"
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-white">Resi</label>
              <input
                type="text"
                value={orderData.order.resi || ''}
                readOnly
                className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 disable"
              />
            </div>
            <input
            type="text"
            value={orderData.order.courier?.toUpperCase() || ''}
            readOnly
            className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 disable"
            style={{ textTransform: 'uppercase' }}
            />
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-white ">Alamat Lengkap</label>
              <textarea
                value={orderData.order.alamat_lengkap || ''}
                readOnly
                rows="4"
                className="block w-full text-sm text-black bg-gray-300 rounded-lg border border-gray-300 disable "
              ></textarea>
            </div>
            <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-white">Total Beli</label>
              <input
                type="text"
                value={formatCurrency(orderData.order.total_beli) || ''}
                readOnly
                className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 disable"
              />
            </div>
          </div>
        </form>
      </div>

      <div className="rounded-lg border border-gray-800 bg-gray-900 p-4 sm:p-6 shadow-lg mt-5">
  <h4 className="mb-4 text-base sm:text-lg font-semibold text-white">Daftar Produk</h4>
  <div className="flex flex-col">
    {/* Header Row */}
    <div className="hidden sm:grid sm:grid-cols-6 bg-gray-800 p-2 sm:p-4 text-xs sm:text-sm font-semibold text-gray-400 text-center">
      <div>No</div>
      <div>Foto</div>
      <div>Nama Produk</div>
      <div>Jumlah</div>
      <div>Harga</div>
      <div>Total</div>
    </div>

    {/* Data Rows */}
    {currentItems.map((product, index) => (
      <div
        key={product.id_beli_produk}
        className="flex flex-col sm:grid sm:grid-cols-6 items-center border-b border-gray-800 p-2 sm:p-4 text-xs sm:text-sm text-gray-300 space-y-2 sm:space-y-0"
      >
        <div className="sm:text-center">{index + 1 + indexOfFirstItem}</div>
        <div className="flex justify-center sm:justify-start">
          <img
            src={`${testURL}/assets/images/product/${product.photo.nama}`}
            alt={product.nama_produk}
            className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
          />
        </div>
        <div className="sm:text-center">{product.nama_produk}</div>
        <div className="text-center">x{product.jumlah} </div>
        <div className="text-center">{formatCurrency(product.total_harga)}</div>
        <div className="text-center">{formatCurrency(product.total_harga * product.jumlah)}</div>
      </div>
    ))}

    {/* Pagination */}
    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-2 sm:space-y-0">
      <button
        className="px-4 py-2 text-xs sm:text-sm text-white bg-gray-800 rounded-lg hover:bg-gray-700"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <p className="text-xs sm:text-sm text-white">
        Page {currentPage} of {totalPages}
      </p>
      <button
        className="px-4 py-2 text-xs sm:text-sm text-white bg-gray-800 rounded-lg hover:bg-gray-700"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  </div>
</div>

    </section>
  );
}
