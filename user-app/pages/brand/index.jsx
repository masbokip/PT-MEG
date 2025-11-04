'use client'
import React,{ useEffect,useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import { testURL } from '@/testURL';

export default function Index() {
  const { data: session } = useSession();
  const [brandData, setBrandData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const router = useRouter();
  const handleLearnMore = (nama_brand) => {
    router.push(`/product/brand/${nama_brand}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${testURL}/api/brands`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setBrandData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching brand data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  const totalPages = Math.ceil(brandData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = brandData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-black">Brand Produk</h2>
        <p className="text-gray-500 mt-2">Temukan berbagai macam produk sesuai brand favorit pilihan anda</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {currentItems.map((brand) => (
          <div
            key={brand.id_brand}
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="w-64 h-32 relative mb-4 flex items-center justify-center">
                <img
                  src={`${testURL}/assets/images/brand/${brand.foto}`}
                  alt={`${brand.nama_brand} logo`}
                  width={200}
                  height={10}
                  className="object-contain"
                />
              </div>
            <h3 className="text-xl font-semibold text-gray-800">{brand.nama_brand}</h3>
            <button
            className="mt-2 text-indigo-600 font-medium"
            onClick={() => handleLearnMore(brand.nama_brand)}>
              Telusuri Produk
           </button>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center items-center mt-10 gap-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-indigo-300"
        >
          Previous
        </button>
        <span className="text-gray-600">Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-indigo-300"
        >
          Next
        </button>
      </div>
    </section>
  )
}
