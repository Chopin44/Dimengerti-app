import { motion as m } from "framer-motion";
import { useEffect, useState } from 'react';
import Button from "../components/Tombol";
import Logo from "../components/Logo";
import { container, item } from "../components/Animation";

export default function Home() {
  const [installable, setInstallable] = useState(false);
  const [appInstalled, setAppInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallable(true);
      window.deferredInstallPrompt = event;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Memanggil fungsi untuk mengecek status instalasi saat komponen dimuat
    checkInstallationStatus();

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (window.deferredInstallPrompt) {
      window.deferredInstallPrompt.prompt();
      window.deferredInstallPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
          checkInstallationStatus()
        } else {
          console.log('User dismissed the install prompt');
        }
        setInstallable(false);
        window.deferredInstallPrompt = null;
      });
    }
  };

    // Fungsi untuk memeriksa apakah aplikasi sudah diinstall
    const isAppInstalled = () => {
      return (
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone
      );
    };
  
    // Fungsi untuk memeriksa status instalasi dan mengupdate state
    const checkInstallationStatus = () => {
      if (isAppInstalled()) {
        setAppInstalled(true);
        console.log("app installed!")
      } else {
        setAppInstalled(false);
        console.log("app belum diinstall")
      }
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
          <Button text="Mulai Belajar SIBI" to="/belajar" />
          
        </m.div>

        <m.div
          variants={item}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          className="w-fit mx-auto mt-16"
        >
          <Button text="Kuis" to="/kuis" />
          
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
          onClick={handleInstallClick}
        >
          <Button variant='download' text={appInstalled ? "App Installed" : "Download Aplikasi Dimengerti"} disabled={appInstalled} />
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
