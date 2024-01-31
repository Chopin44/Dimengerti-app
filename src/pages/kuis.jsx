import { motion as m } from "framer-motion";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import Logo from "../components/Logo";
import Button from "../components/Tombol";
import Card from "../components/Kartu";
import Pagination from "../components/Pagination";
import { paginate } from "../lib/Paginate";
import { container, item } from "../components/Animation";
import data from "../pages/api/kuis"



export default function Kuis() {
  localStorage.setItem("popup", true)
  localStorage.setItem("timer", false)
  const [dataKuis, setData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData =  () => {
      try {
        const { Kuis } = data;
        setData(Kuis)
        console.log("Data berhasil diambil:", Kuis);
      } catch (error) {
        setIsError(true);
        console.error("Terjadi kesalahan:", error);
      }
    };
  
    fetchData();
  }, []);
  
  console.log(data.Kuis.length)
  const paginatedPosts = paginate(data.Kuis, currentPage, pageSize);


  return (
    <div className="text-black p-5 flex flex-col justify-between items-center min-h-screen overflow-hidden container mx-auto">
      <m.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={container}
        className="text-center w-full lg:w-1/2 mt-10 md:mt-20"
      >
        <m.div variants={item}>
          <Logo />
        </m.div>
        <m.p variants={item} className="my-4 text-base md:text-xl tracking-tight">
          pilih huruf untuk dipelajari
        </m.p>
      </m.div>
      <m.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={container}
        className="my-10 w-full xl:w-4/5"
      >
        <div className="flex flex-row justify-center items-center w-full gap-0 lg:gap-8 xl:gap-16">
          {!data ? null : (
            <m.div variants={item} className="hidden lg:flex">
              {currentPage <= 1 ? (
                <button
                  key={currentPage}
                  className="w-12 h-12 flex items-center justify-center duration-200 rounded-full bg-gray-500 text-warna1 font-medium text-lg md:text-2xl tracking-tight cursor-not-allowed focus:outline-none focus:ring focus:ring-gray-100"
                >
                  <Icon
                    icon="line-md:arrow-left"
                  />
                </button>
              ) : (
                <button
                  key={currentPage}
                  className="w-12 h-12 flex items-center justify-center duration-200 rounded-full bg-gray-800 hover:bg-gray-950 active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-100 text-warna1 font-medium text-lg md:text-2xl tracking-tight"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <Icon
                    icon="line-md:arrow-left"
                  />
                </button>
              )}
            </m.div>
          )}
          {isError ? (
            <div className="flex flex-col gap-10 justify-center items-center">
              <div className="flex flex-row gap-2 text-base md:text-lg lg:text-xl tracking-tight items-center">
                <Icon icon="line-md:cancel" /> <h1>gagal memuat data...</h1>
              </div>
              <Button text="muat ulang" to="/" />
            </div>
          ) : !data ? (
            <div className="flex flex-row justify-center gap-2 items-center text-base md:text-lg lg:text-xltracking-tight">
              <Icon icon="line-md:loading-loop" /> <h1>memuat...</h1>
            </div>
          ) : (
            <m.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={container}
              className="grid grid-rows-1 lg:grid-rows-2 w-full lg:w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid-flow-row gap-4 sm:gap-4 lg:gap-4 xl:gap-5"
            >
              {paginatedPosts.map((kuis) => (
                <Card
                key={kuis.id} // Make sure to provide a unique key for each card
                name={kuis.soal}
                // onClick={localStorage.setItem("popup", true)}
                to={`/kuis/${kuis.id}/soal/${kuis.isi.find(isiObject => isiObject.id).id}`}
              />
                
               
              ))}
            </m.div>
          )}
          {!data ? null : (
            <m.div variants={item} className="hidden lg:flex">
              {currentPage >= 2 ? (
                <button
                  key={currentPage}
                  className="w-12 h-12 flex items-center justify-center duration-200 rounded-full bg-gray-500 text-warna1 font-medium text-lg md:text-2xl tracking-tight cursor-not-allowed focus:outline-none focus:ring focus:ring-gray-100"
                >
                  <Icon
                    icon="line-md:arrow-right"
                  />
                </button>
              ) : (
                <button
                  key={currentPage}
                  className="w-12 h-12 flex items-center justify-center duration-200 rounded-full bg-gray-950 hover:bg-gray-800 active:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-100 text-warna1 font-medium text-lg md:text-2xl tracking-tight"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  <Icon
                    icon="line-md:arrow-right"
                  />
                </button>
              )}
            </m.div>
          )}
        </div>
        {!data ? null : (
          <div className="flex justify-between mx-auto items-center mt-10 w-full md:w-1/2">
            <Pagination
              items={data.Kuis.length} 
              currentPage={currentPage} 
              pageSize={pageSize} 
              onPageChange={onPageChange}
            />
          </div>
        )}
      </m.div>
      <m.footer
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={item}
        className="text-center my-4 lg:my-10"
      >
        <Button variant="naked" text="tentang kami" to="/tentang-kami" />
      </m.footer>
    </div>
  );
}
