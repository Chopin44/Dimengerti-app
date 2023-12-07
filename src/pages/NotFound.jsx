import { motion as m } from "framer-motion";
import Button from "../components/Tombol";
import Logo from "../components/Logo";
import { container, item } from "../components/Animation";
import { Link } from "react-router-dom";


export default function NotFound() {

  return (
    <>
      

      <div className="text-black-500 flex flex-col justify-between items-center min-h-screen container mx-auto p-5">
        <m.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={container}
          className="text-center w-full lg:w-3/4 xl:w-1/2 my-auto"
        >
          <m.div variants={item}>
            <h1 className="animate__animated animate__tada mx-auto w-fit text-5xl lg:text-6xl font-black tracking-tighter hover:underline duration-100 ease-out">
              <Link href="/">
                <span>Error 404</span>
                <span className="text-secondary-600">.</span>
              </Link>
            </h1>
          </m.div>
          <m.p variants={item} className="mt-8 md:mt-8 lg:mt-12 mb-10 md:mb-12 lg:mb-16 text-base md:text-xl lg:text-2xl tracking-tight">
            Halaman yang Anda cari tidak ditemukan.
          </m.p>
          <m.div
            variants={item}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="w-fit mx-auto"
          >
            <Button text="kembali" to="/" />
          </m.div>
        </m.div>

      </div>
    </>
  );
}
