import React from 'react'
import { FcPositiveDynamic, FcCollaboration, FcOnlineSupport, FcWorkflow, FcIdea, FcPlanner  } from "react-icons/fc";
import { getSession, useSession } from 'next-auth/react';
export default function Index() {
const { data: session } = useSession();
  return (
    <>
    <section class="py-16 relative  mr-0 bg-white ">
    <div class="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div class="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
            <div class="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
                <div class="w-full flex-col justify-center items-start gap-8 flex">
                    <div class="flex-col justify-start lg:items-start items-center gap-4 flex">
                        <div class="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                            <h2
                                class="text-black text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                                PT Megah Era Gunakarya</h2>
                            <p
                                class="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                                PT Megah Era Gunakarya merupakan salah satu supplier lampu terkemuka pada industri ini. Kami menyediakan berbagai jenis lampu untuk kebutuhan rumah tangga, komersial, dan industri. Produk kami meliputi lampu LED, lampu neon, lampu pijar, lampu fluorescent, dan lampu sorot. Kami memiliki tim ahli yang telatih dalam bidang penjualan dan pemasaran, serta memiliki pengalaman dalam memberikan solusi pencahayaan yang tepat untuk pelanggan kami.</p>
                        </div>
                    </div>
                    <div class="w-full flex-col justify-center items-start gap-6 flex">
                        <div class="w-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                            <div
                                class="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                                <h4 class="text-gray-900 text-2xl font-bold font-manrope leading-9">2014</h4>
                                <p class="text-gray-500 text-base font-normal leading-relaxed">Kualitas Terbangun Melalui Pengalaman</p>
                            </div>
                            <div
                                class="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                                <h4 class="text-gray-900 text-2xl font-bold font-manrope leading-9">125+ Produk
                                </h4>
                                <p class="text-gray-500 text-base font-normal leading-relaxed">Membangun Kepercayaan Lewat Konsistensi</p>
                            </div>
                        </div>
                        <div class="w-full h-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                            <div
                                class="w-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                                <h4 class="text-gray-900 text-2xl font-bold font-manrope leading-9">10+ Brand</h4>
                                <p class="text-gray-500 text-base font-normal leading-relaxed">Integritas Terbukti dengan Kinerja</p>
                            </div>
                            <div
                                class="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                                <h4 class="text-gray-900 text-2xl font-bold font-manrope leading-9">10+ Kategori</h4>
                                <p class="text-gray-500 text-base font-normal leading-relaxed">Keandalan Terbentuk dari Keunggulan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full lg:justify-start justify-center items-start flex">
                <div
                    class="sm:w-[564px] w-full sm:h-[646px] h-full sm:bg-white rounded-3xl sm:border border-gray-200 relative">
                    <img class="sm:mt-5 sm:ml-5 w-full h-full rounded-3xl object-cover"
                        src="https://pagedone.io/asset/uploads/1717742431.png" alt="about Us image" />
                </div>
            </div>
        </div>
    </div>
</section>  
    <section class="bg-gray-100">
    <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div class="max-w-screen-md mb-8 lg:mb-16">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">Visi & Misi</h2>
            <p class="text-gray-500 sm:text-xl">Light up your World, Expand your Brigtness</p>
        </div>
        <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            <div>
                <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12">
                    <FcPositiveDynamic class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 " />
                </div>
                <h3 class="mb-2 text-xl font-bold text-gray-900">Kompeten</h3>
                <p class="text-gray-500">Membantu dalam penyediaan kebutuhan lampu dan alat listrik yang didistribusikan melalui toko listrik, bangunan, supermarket, minimarket, institusi, dan pengguna langsung</p>
            </div>
            <div>
                <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12">
                    <FcCollaboration class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6"/>
                </div>
                <h3 class="mb-2 text-xl font-bold text-gray-900 ">Kolaborasi</h3>
                <p class="text-gray-500 ">Ikut ambil bagian dalam upaya pemerintah untuk menjadikan Indonesia lebih maju dalam menungkatkan pembangunan terutama dibidang penerangan</p>
            </div>
            <div>
                <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 ">
                    <FcOnlineSupport class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 " />     
                </div>
                <h3 class="mb-2 text-xl font-bold text-gray-900">Adaptif</h3>
                <p class="text-gray-500 ">Menjadi perusahan distribusi lampu serta alat listrik dengan berbagai macam jenis dan merk</p>
            </div>
            <div>
                <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12">
                    <FcWorkflow class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 "/>
                </div>
                <h3 class="mb-2 text-xl font-bold text-gray-900">Andal</h3>
                <p class="text-gray-500">Memberikan solusi kepada konsumen dibidang penerangan yang berfungsi dengan baik darri segi pencahayaan, keamanan, dan keindahan.</p>
            </div>
            <div>
                <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12">
                    <FcIdea class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6" />
                </div>
                <h3 class="mb-2 text-xl font-bold text-gray-900">Kredibel</h3>
                <p class="text-gray-500">Menjadi perusahaan distribusi yang terbaik dan terlengkap serta menjadi kepercayaan baik dari masyarakat,pelaku usaha, maupun instansi pemerintah. </p>
            </div>
            <div>
                <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12">
                    <FcPlanner class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6" />
                </div>
                <h3 class="mb-2 text-xl font-bold text-gray-900">Sinergi</h3>
                <p class="text-gray-500">Membangun kinerja yang saling menguntungkan antara pelanggan dan mitra kerja</p>
            </div>
        </div>
    </div>
  </section>
    <section className="relative pt-24 pb-36 bg-white">
                    
        <div className="container mx-auto px-4">
                        {/* Section title */}
            <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">KUNJUNGI KAMI</h2>
            <p className="text-lg text-gray-600">Jelajahi toko kami dan temukan penawaran menarik yang menanti Anda!</p>
             </div>
            {/* Contact Form and Map */}
                <div className="flex flex-wrap -mx-4">
            {/* Map Section */}
                 <div className="w-full px-10 mt-12 lg:mt-0">
                 <div className="rounded-lg overflow-hidden shadow-lg">
                 <iframe
                className="w-full h-80"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.976074139686!2d112.76173807500071!3d-7.356578192652413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e527e08ec85b%3A0xf893d925734a39e8!2sPT.%20Megah%20Era%20Gunakarya.!5e0!3m2!1sid!2sid!4v1728562859386!5m2!1sid!2sid"
                allowFullScreen=""
                loading="lazy"
                ></iframe>
                </div>
        </div>
        </div>
        </div>
    </section>
    </>
    

  )
}
