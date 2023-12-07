
import { motion as m } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import Button from "../components/Tombol";
import { container, item } from "../components/Animation";
import { Icon } from "@iconify-icon/react";

export default function TentangKami() {
  return (
    <>
      {/* <Head>
        <title>belajar SIBI - tentang kami</title>
      </Head> */}

      <div className="text-black-500 mx-auto flex flex-col items-center min-h-screen md:w-3/4 container p-5">
        <m.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={container}
          className="text-center mt-10 md:mt-20"
        >
          <m.div variants={item}>
            <Logo />
          </m.div>
        </m.div>
        <m.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={container}
          className="my-8 md:my-10 text-center text-base md:text-xl tracking-tight leading-relaxed"
        >
          <m.p variants={item} className="items-center">
            dibuat dengan sepenuh{" "}
            <Icon
              className="animate__animated animate__heartBeat animate__infinite"
              icon="fluent-emoji:red-heart"
              inline="true"
            />{" "}
            oleh :
            <br />
            Rodhi Andriansah{" "}
            <span className="text-xs md:text-base">(202400115)</span>
          </m.p>
          <m.p variants={item} className="font-bold mt-10">
            dengan bimbingan{" "}
            <Icon icon="fluent-emoji:folded-hands" inline={true} /> :
          </m.p>
          <m.ol variants={item}>
            <li>
            Eny Jumiati M.Kom.{" "}
              <span className="text-xs md:text-base">(pembimbing 1)</span>
            </li>
            <li>
            Agus Ilyas, M.Kom.{" "}
              <span className="text-xs md:text-base">(pembimbing 2)</span>
            </li>
            <li>
              <span className="text-xs md:text-base">
                <Link
                  to="https://www.stmik-wp.ac.id/"
                  target="blank"
                  rel="nofollow"
                  className="hover:underline"
                >
                  STMIK Widya Pratama Kota Pekalongan
                </Link>
              </span>
            </li>
          </m.ol>
          <m.p variants={item} className="mt-10">
            aplikasi ini dikembangkan untuk memudahkan dalam belajar huruf dalam
            Sistem Isyarat Bahasa Indonesia.
          </m.p>
          <m.p variants={item} className="font-bold mt-10">
            dengan menggunakan{" "}
            <span className="text-xs md:text-base font-normal">(assets)</span> :
          </m.p>
          <m.ol variants={item}>
            <li>
              <Link
                to="https://www.kaggle.com/datasets/adityaalassad/sibi-sign-language"
                target="blank"
                rel="nofollow"
                className="hover:underline"
              >
                dataset : Datasets SIBI Sign Language Alphabets by Aditya Al Assad
              </Link>
            </li>
            <li>
              <Link
                to="https://github.com/cyberalien/line-md"
                target="blank"
                rel="nofollow"
                className="hover:underline"
              >
                icon : Material Line Icons by Vjacheslav Trushkin
              </Link>
            </li>
            <li>
              <Link
                to="https://github.com/microsoft/fluentui-emoji"
                target="blank"
                rel="nofollow"
                className="hover:underline"
              >
                emoji : Fluent Emoji by Microsoft
              </Link>
            </li>
            <li>
              <Link
                to="https://pmpk.kemdikbud.go.id/sibi/"
                target="blank"
                rel="nofollow"
                className="hover:underline"
              >
                video : Kamus SIBI oleh{" "}
                <Link
                  to="https://pmpk.kemdikbud.go.id/"
                  target="blank"
                  rel="nofollow"
                  className="hover:underline"
                >
                  Direktorat PMPK
                </Link>
              </Link>
            </li>
          </m.ol>
          <m.p variants={item} className="font-bold mt-10">
            inspirasi{" "}
            <span className="text-xs md:text-base font-normal">
              (thank you)
            </span>{" "}
            :
          </m.p>
          <m.ol variants={item}>
            <li>
              <Link
                to="https://hearme.id/"
                target="blank"
                rel="nofollow"
                className="hover:underline"
              >
                Hear Me
              </Link>
            </li>
            <li>
              <Link
                to="https://fingerspelling.xyz/"
                target="blank"
                rel="nofollow"
                className="hover:underline"
              >
                fingerspelling
              </Link>
            </li>
          </m.ol>
        </m.div>
        <m.footer
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={container}
          className="text-center my-4 md:my-6"
        >
          <m.div variants={item}>
            <Button variant="primary" text="kembali" to="/belajar" />
          </m.div>
        </m.footer>
      </div>
    </>
  );
}
