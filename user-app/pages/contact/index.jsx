import React from 'react'
import { getSession, useSession } from 'next-auth/react';
export default function Page() {
  const { data: session } = useSession();
  return (
    <>
    <section class="bg-white py-8 antialiased md:py-8 text-black">
    <div class="mx-auto grid max-w-screen-xl px-4 pb-8 md:grid-cols-12 lg:gap-12 lg:pb-16 xl:gap-0">
      <div class="content-center justify-self-start md:col-span-7 md:text-start">
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight md:max-w-2xl md:text-5xl xl:text-6xl">Customer Service<br /></h1>
        <p class=" max-w-2xl text-gray-500 md:mb-12 md:text-lg mb-3 lg:mb-5 lg:text-xl">Butuh bantuan? Tim kami hadir untuk memberikan solusi terbaik bagi Anda</p>
        <a href="#" class="inline-block rounded-lg bg-primary-700 px-6 py-3.5 text-center font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300">Shop Now</a>
      </div>
      <div class="hidden md:col-span-5 md:mt-0 md:flex">
        <img src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/girl-shopping-list.svg" alt="shopping illustration" />
      </div>
    </div>
  </section>
  <section class="bg-gray-100">
    <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <h2 class="mb-8 text-4xl tracking-tight font-extrabold text-gray-900">Tanya Jawab Umum</h2>
        <div class="grid pt-8 text-left border-t border-gray-200 md:gap-16 md:grid-cols-2">
            <div>
                <div class="mb-10">
                    <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900">
                        <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                        Apa saja jenis produk yang tersedia di website ini?
                    </h3>
                    <p class="text-gray-800">Kami menyediakan berbagai macam produk elektrikal seperti alat-alat listrik, kabel, sakelar, lampu LED, panel listrik, dan peralatan elektronik lainnya.</p>
                </div>
                <div class="mb-10">                        
                    <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900">
                        <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                        Bagaimana cara melakukan pembelian?
                    </h3>
                    <p class="text-gray-800">Anda dapat melakukan pembelian dengan menambahkan produk yang diinginkan ke keranjang belanja, kemudian melanjutkan ke halaman checkout untuk mengisi detail pengiriman dan pembayaran.</p>
                </div>
                <div class="mb-10">
                    <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900">
                        <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                        Apakah produk di sini memiliki garansi?
                    </h3>
                    <p class="text-gray-900">Ya, semua produk yang kami jual dilengkapi dengan garansi resmi dari pabrik dan toko. Lama garansi tergantung pada jenis produk yang dibeli.</p>
                </div>
                <div class="mb-10">
                    <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900">
                        <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                        Apa metode pembayaran yang tersedia?
                    </h3>
                    <p class="text-gray-900">Kami menerima pembayaran melalui transfer bank, kartu kredit, e-wallet (seperti Gopay, OVO, Dana), dan metode pembayaran lainnya yang tertera di halaman checkout.</p>
                </div>
                <div class="mb-10">
                    <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900">
                        <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                        Berapa lama waktu pengiriman pesanan?
                    </h3>
                    <p class="text-gray-900">Lama pengiriman bergantung pada lokasi Anda. Untuk wilayah dalam kota, biasanya memakan waktu 1-3 hari kerja, sedangkan untuk wilayah luar kota bisa memakan waktu hingga 7 hari kerja.
                    </p>
                </div>
            </div>
            <div>
                <div class="mb-10">
                    <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900">
                        <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                        Apakah saya bisa membatalkan pesanan setelah pembayaran?
                    </h3>
                    <p class="text-gray-900">Pesanan dapat dibatalkan sebelum barang dikirim. Untuk proses pembatalan, dapat melakukan pada halaman pesanan saya. Untuk melakukan pengembalian dana, silakan hubungi tim layanan pelanggan kami. Proses pengembalian dana bisa memakan waktu hingga 3 hari kerja.</p>
                </div>
                <div class="mb-10">
                    <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900">
                        <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                        Bagaimana cara menghubungi layanan pelanggan?
                    </h3>
                    <p class="text-gray-900">Anda dapat menghubungi layanan pelanggan kami melalui email, dan WhatsApp yang tersedia di website.</p>
                </div>
                <div class="mb-10">
                    <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900">
                        <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                        Apakah ada potongan harga atau promo tertentu?
                    </h3>
                    <p class="text-gray-900">Kami mengadakan promo menarik dan diskon khusus untuk produk tertentu. Informasi promo terbaru dapat dilihat di halaman promo atau banner di website kami.</p>
                </div>
                <div class="mb-10">
                    <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900">
                        <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                        Apakah produk yang saya beli bisa dikembalikan?
                    </h3>
                    <p class="text-gray-900">Ya, kami menyediakan kebijakan pengembalian produk jika produk yang diterima cacat atau tidak sesuai dengan pesanan. Silakan hubungi tim layanan pelanggan kami dengan melampirkan vidio unboxing barang yang telah diterima.</p>
                </div>
            </div>
        </div>
    </div>
  </section>
  <div className="bg-white py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Kami senang mendengar dari Anda!</h2>
          <p className="mt-2 text-gray-600">Stay in touch with us</p>
        </div>
  
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-7xl mx-auto">
          {/* Address Card */}
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg shadow-md p-8">
            <img
              className="h-16 w-16 mb-4"
              src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
              alt="Building icon"
            />
            <p className="text-center text-gray-700">
            Jl. Bhineka No.45 A, Tropodo Wetan, Tropodo, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256
            </p>
          </div>
  
          {/* Email Card */}
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg shadow-md p-8">
            <img
              className="h-16 w-16 mb-4"
              src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
              alt="Email icon"
            />
            <p className="text-center text-gray-700">
              megaheragunakarya@gmail.com
            </p>
          </div>
  
          {/* Phone Card */}
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg shadow-md p-8">
            <img
              className="h-16 w-16 mb-4"
              src="https://cdn-icons-png.flaticon.com/512/724/724664.png"
              alt="Phone icon"
            />
            <p className="text-center text-gray-700">
              +(62) 8560 705 6760<br />
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

