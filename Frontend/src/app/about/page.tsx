"use client";
import { useRef, useEffect, useState } from "react";

import { Heart, Users, Handshake } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import { Mochiy_Pop_One, Fredoka } from "next/font/google";

const mochiyPopOne = Mochiy_Pop_One({
  subsets: ["latin"],
  weight: ["400"],
});
const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const AboutPage = () => {

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const moveSlide = (direction: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return; // hindari null error

    const slides = carousel.children.length;
    if (slides === 0) return; // hindari pembagian dengan nol
    const newIndex = (currentIndex + direction + slides) % slides;
    setCurrentIndex(newIndex);
    carousel.style.transform = `translateX(-${newIndex * 100}%)`;
  };


  const stats = [
    {
      icon: Handshake,
      value: "10+",
      label: "Mitra UMKM",
    },
    {
      icon: Heart,
      value: "50+",
      label: "Jenis Produk",
    },
    {
      icon: Users,
      value: "20+",
      label: "Tenaga Kerja",
    },
  ];
  const imageUrls = [
    "https://www.plantoys.com/cdn/shop/files/5468_-_Main_-_sq.jpg?v=1736326555&width=720",
    "https://www.plantoys.com/cdn/shop/files/5513_-_Main_-_sq.jpg?v=1736325206&width=720",
    "https://www.plantoys.com/cdn/shop/files/3601_-_Main_-_sq.jpg?v=1740988991&width=720",
    "https://www.plantoys.com/cdn/shop/files/5264_-_Main_-_sq.jpg?v=1737537624&width=720",
    "https://www.plantoys.com/cdn/shop/files/4646_-_Main_-_sq.jpg?v=1737706381&width=720",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % imageUrls.length);
    }, 4000); // Ganti gambar setiap 4 detik
    return () => clearInterval(interval);
  }, [imageUrls.length]);

  return (
    <div className="text-gray-800 min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      {/* Hero section */}
      <section className="relative h-[470px] bg-[#ff5b35]/80 text-white overflow-hidden">
        {/* Efek Glow */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 opacity-30 blur-3xl rounded-full"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-green-300 opacity-30 blur-3xl rounded-full"></div>

        {/* Konten Tengah Hero */}
        <div className="flex flex-col items-center justify-center h-full z-10 relative text-center px-4">
          <h1 className="font-mochiyPopOne text-5xl md:text-6xl font-bold mb-4">
            Zyifini <span className="text-yellow-400">Edukasi</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl">
            Transforming education through innovative toys while empowering
            Indonesian communities to thrive in the global marketplace.
          </p>
        </div>
      </section>

      {/* Statistik di bawah tapi tidak menambah tinggi hero */}
      <section>
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 translate-y-4/2 z-20">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 px-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-md shadow-lg w-56 p-4 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group"
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-orange-600 to-yellow-300 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon size={28} className="text-white" />
                </div>
                <div
                  className={`${fredoka.className} text-3xl font-bold bg-gradient-to-r from-orange-600 via-orange-400 via-yellow-300 via-green-400 to-white bg-clip-text text-transparent`}
                >
                  {stat.value}
                </div>
                <div
                  className={`${fredoka.className} text-gray-600 text-sm font-medium`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY Section (Setelah Statistik) */}
      <section className="relative w-full overflow-hidden mt-0 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
          {/* Kiri: Teks */}
          <div className="flex flex-col justify-center px-8 md:px-16 py-25 z-10">
            <h2
              className={`${mochiyPopOne.className} text-5xl font-bold text-[#1c2957] mb-6`}
            >
              CERITA KAMI
            </h2>
            <p
              className={`${fredoka.className} text-[#292d32] text-lg mb-4 leading-relaxed max-w-xl`}
            >
              Misi kami adalah menumbuhkan imajinasi dan rasa ingin tahu
              anak-anak sejak usia dini melalui mainan edukatif yang ramah anak,
              mulai dari bayi hingga anak usia sekolah. Kami juga menghadirkan
              produk dekorasi rumah yang estetik dan bernilai seni, buatan
              tangan pengrajin lokal, sebagai bentuk kontribusi dalam
              melestarikan budaya Indonesia.
            </p>

            <p
              className={`${fredoka.className}  text-[#ff5b35] text-lg font-semibold`}
            >
              Mainan Edukatif & Dekorasi Bermakna, untuk Masa Depan Cerah Anak
              Indonesia.<sup>®</sup>
            </p>
          </div>

          {/* Kanan: Gambar berubah setiap 4 detik */}
          <div className="relative w-full h-[500px] hidden md:flex items-center justify-center overflow-hidden">
            <div className="w-[60%] h-[60%] rounded-lg overflow-hidden ">
              <img
                key={currentImage}
                src={imageUrls[currentImage]}
                alt="Our Story"
                className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
              />
            </div>
          </div>
        </div>
      </section>
      {/* We Believe In Section */}

      <section className=" bg-white py-0">
        {" "}
        <div className="max-w-6xl mx-auto px-70 text-center">
          {" "}
          <h2
            className={`${mochiyPopOne.className} text-3xl font-bold text-[#1c2957] mb-6`}
          >
            WE BELIEVE IN
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Item 1 */}
            <div className="flex flex-col items-center">
              <img
                src="/images/s31.png"
                alt="Open-Ended Play"
                className="h-35 w-auto mb-6"
              />
              <p
                className={`${mochiyPopOne.className}   text-[#ff5b35] font-semibold text-sm`}
              >
                Bermain Tanpa Batas
              </p>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col items-center">
              <img
                src="/images/s32.png"
                alt="Screen-Free Time"
                className="h-35 w-auto mb-6"
              />
              <p
                className={`${mochiyPopOne.className}   text-[#ff5b35] font-semibold text-sm break-words max-w-[130px]`}
              >
                Waktu Bebas Layar
              </p>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col items-center">
              <img
                src="/images/s33.png"
                alt="Sustainably Made Toys"
                className="h-35 w-auto mb-6"
              />
              <p
                className={`${mochiyPopOne.className}   text-[#ff5b35] font-semibold text-sm  break-words max-w-[130px]`}
              >
                Produk Ramah Lingkungan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Short Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center text-center md:text-left gap-8">
            {/* Left Icon */}
            <div className="flex justify-center md:justify-start">
              <img
                src="/images/rocket.png"
                alt="Rocket Icon"
                className="h-50 w-auto mt-40"
              />
            </div>

            {/* Text Content */}
            <div>
              <h2
                className={`${mochiyPopOne.className} text-3xl font-bold text-center text-[#1c2957] mb-5`}
              >
                TENTANG KAMI
              </h2>
              <p
                className={`${fredoka.className} text-[#292d32] text-lg leading-relaxed text-center`}
              >
                Dari mainan kayu klasik hingga set bermain peran yang realistis,
                produk Legowo menginspirasi imajinasi dan kreativitas anak
                melalui permainan tanpa layar dan terbuka. Kami menciptakan
                mainan berkualitas tinggi dengan penuh ketelitian agar dapat
                diwariskan dari generasi ke generasi. Saat anak bermain dengan
                Legowo, segalanya menjadi mungkin!
              </p>
            </div>

            {/* Right Icon */}
            <div className="flex justify-center md:justify-end">
              <img
                src="/images/astronot.png"
                alt="Astronaut Icon"
                className="h-50 w-auto -mt-20"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Vision & Mission */}
        <section className="-mt-16 py-0 px-6 md:px-24 bg-white text-center">
          <h2
            className={`${mochiyPopOne.className} text-3xl md:text-4xl font-bold text-[#1c2957] mb-14`}
          >
            VISI & MISI
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="bg-[#f9f9fb] p-6 rounded-2xl shadow-sm">
              <div className="flex justify-center mb-4">
                <img
                  src="https://www.melissaanddoug.com/cdn/shop/files/OurStory_OpenEndedPlay_Doodles_Imaginative.png?v=1658947380&width=260"
                  alt="Sustainably Made Toys"
                  className="h-28 w-auto mb-6"
                />
              </div>
              <h3
                className={`${mochiyPopOne.className} text-xl font-semibold text-[#1c2957] mb-2`}
              >
                {" "}
                It’s Imaginative
              </h3>
              <p className={`${fredoka.className} text-[#3e3e3e] text-base`}>
                Menghadirkan produk yang mendorong daya imajinasi dan
                kreativitas anak-anak dalam bermain dan belajar.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#f9f9fb] p-6 rounded-2xl shadow-sm">
              <div className="flex justify-center mb-4">
                <img
                  src="https://www.melissaanddoug.com/cdn/shop/files/OurStory_OpenEndedPlay_Doodles_KidPowered.png?v=1658947381&width=260"
                  alt="Sustainably Made Toys"
                  className="h-28 w-auto mb-6"
                />
              </div>
              <h3
                className={`${mochiyPopOne.className} text-xl font-semibold text-[#1c2957] mb-2`}
              >
                It’s Kid-Powered
              </h3>
              <p className={`${fredoka.className} text-[#3e3e3e] text-base`}>
                Mengembangkan mainan dan alat edukasi yang bebas dari teknologi
                layar dan daya baterai.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#f9f9fb] p-6 rounded-2xl shadow-sm">
              <div className="flex justify-center mb-4">
                <img
                  src="https://www.melissaanddoug.com/cdn/shop/files/OurStory_OpenEndedPlay_Doodles_SkillBuilding_6d36640f-91fb-4f7b-85a2-5900ef2548fe.png?v=1659036151&width=260"
                  alt="Sustainably Made Toys"
                  className="h-28 w-auto mb-6"
                />
              </div>
              <h3
                className={`${mochiyPopOne.className} text-xl font-semibold text-[#1c2957] mb-2`}
              >
                {" "}
                It’s Skill Building
              </h3>
              <p className={`${fredoka.className} text-[#3e3e3e] text-base`}>
                Memberikan nilai edukatif dalam setiap produk untuk membantu
                anak mengembangkan kemampuan berpikir.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#f9f9fb] p-6 rounded-2xl shadow-sm">
              <div className="flex justify-center mb-4">
                <img
                  src="https://www.melissaanddoug.com/cdn/shop/files/OurStory_OpenEndedPlay_Doodles_Fun_6f27ae62-01e7-4c92-b675-c4b1d556d9b9.png?v=1659036151&width=260"
                  alt="Sustainably Made Toys"
                  className="h-28 w-auto mb-6"
                />
              </div>
              <h3
                className={`${mochiyPopOne.className} text-xl font-semibold text-[#1c2957] mb-2`}
              >
                It’s Fun!
              </h3>
              <p className={`${fredoka.className} text-[#3e3e3e] text-base`}>
                Membuat setiap pengalaman bermain menjadi menyenangkan, penuh
                warna, dan penuh kejutan.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Galery */}
      {/* <section className=" py-12">
        <div className="relative max-w-6xl mx-auto overflow-hidden">
          {/* Carousel */}
      {/* <div
        ref={carouselRef}
        className="flex transition-transform duration-500 ease-in-out"
      > */}
      {/* Slide 1 */}
      {/* <div className="min-w-full flex flex-col items-center px-8">
              <div className="bg-[#a9d28f] rounded-lg p-10 text-center">
                <div className="text-5xl mb-4">📘</div>
                <h2 className="text-2xl font-bold text-green-900 mb-2">
                  Galeri Legowo
                </h2>
                <p className="text-green-800">
                  Learn how it all started with a dream to bring imagination
                  into children's hands.
                </p>
              </div>
            </div> */}

      {/* Slide 2 */}
      {/* <div className="min-w-full flex flex-col items-center px-8">
              <div className="bg-white rounded-lg p-10 text-center">
                <img
                  src="https://images.unsplash.com/photo-1616587891345-658b5cbd860c"
                  alt="Toys"
                  className="rounded-xl mb-4"
                />
                <h2 className="text-xl font-bold text-green-900 mb-2">
                  30+ Years of Safe Toys
                </h2>
                <p className="text-green-800 text-sm">
                  Since 1988, we’ve created meaningful toys that inspire
                  hands-on, open-ended play.
                </p>
              </div>
            </div> */}

      {/* Slide 3 */}
      {/* <div className="min-w-full flex flex-col items-center px-8">
              <div className="bg-white rounded-lg p-10 text-center">
                <img
                  src="https://images.unsplash.com/photo-1602016752627-f48b127f9a83"
                  alt="Promise"
                  className="rounded-xl mb-4"
                />
                <h2 className="text-xl font-bold text-green-900 mb-2">
                  Our Promise
                </h2>
                <p className="text-green-800 text-sm">
                  Every product is a commitment to the highest quality standards
                  for kids everywhere.
                </p>
              </div>
            </div>
          </div> */}

      {/* Navigation Buttons */}
      {/* <button
            onClick={() => moveSlide(-1)}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-green-700 text-white rounded-full w-10 h-10"
          >
            ❮
          </button>
          <button
            onClick={() => moveSlide(1)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-700 text-white rounded-full w-10 h-10"
          >
            ❯
          </button>
        </div>
      </section> */}

      <FAQSection />
      <Footer />
    </div>
  );
};

export default AboutPage;
