import { motion as m } from "framer-motion";
import { Icon, InlineIcon } from "@iconify/react";
import Button from "../components/Tombol";
import Logo from "../components/Logo";

import { container, item } from "../components/Animation";

export default function Home() {

  const handleDownloadClick = () => {
    // Add your download logic or function here
    console.log('Download button clicked!');
  };

  return (
    
    <div className="text-black-500 flex flex-col justify-between items-center min-h-screen container mx-auto p-5">
      <m.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={container}
        className="text-center w-full lg:w-3/4 xl:w-1/2 my-auto"
      >
        <m.div variants={item}>
          <Logo />
        </m.div>
        <m.p variants={item} className="mt-8 md:mt-8 lg:mt-12 mb-10 md:mb-12 lg:mb-16 text-base md:text-xl lg:text-2xl tracking-tight">
          Aplikasi untuk belajar Sistem Isyarat Bahasa Indonesia dengan
          menggunakan machine learning
        </m.p>
        
        <m.div
          variants={item}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          className="w-fit mx-auto"
        >
          <Button text="Mulai Belajar" to="/belajar" />
        </m.div>

       
        
      </m.div>

      <m.div
         initial="hidden"
         animate="visible"
         exit="exit"
         variants={container}
         className="text-center w-full lg:w-3/4 xl:w-1/2 my-4"
      >
        <m.div
            variants={item}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="w-fit mx-auto"
            onClick={handleDownloadClick}
          >
            <Button variant='download' text="Download Aplikasi Dimengerti" />   
        </m.div>
      </m.div>
      

      <m.footer
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={item}
        className="text-center text-xs md:text-base bottom-0 w-full md:w-3/4 lg:w-1/2"
      >
        <p>
          website ini menggunakan kamera, silakan izinkan penggunaan kamera
          untuk website ini. tidak ada data yang akan dikirimkan.
        </p>
      </m.footer>
    </div>
  );
}
