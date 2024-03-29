import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import ReactPlayer from "react-player";
import { useParams } from 'react-router-dom';
import { motion as m } from "framer-motion";
import Button from "../components/Tombol";
import { container, item } from "../components/Animation";
import Webcam from "react-webcam";
import { Icon } from "@iconify/react";
import { labelMap } from "../lib/utilities";
import * as tf from "@tensorflow/tfjs";
import Swal from 'sweetalert2';

const LazyData = lazy(() => import('./api/kuis'));

export default function Halaman({ fallback }) {
  
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await import('./api/kuis');
        const dataKuis = result.default.Kuis;
        // console.log(dataKuis);

        setData(result.default.Kuis);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchData();
  }, []);

  // Check if 'nilai' is already present in localStorage
  useEffect(() => {
    const existingNilai = localStorage.getItem("nilai");
    if (existingNilai === null) {
      // If 'nilai' doesn't exist, set its initial value to 0
      localStorage.setItem("nilai", "0");
    }
  }, []);


  if (isLoading)
    return (
      <div className="flex flex-row justify-center min-h-screen gap-2 items-center text-base md:text-lg lg:text-xl tracking-tight">
        <Icon icon="line-md:loading-loop" /> <h1>memuat...</h1>
      </div>
    );
  if (isError)
    return (
      <div className="flex flex-col gap-10 justify-center min-h-screen items-center">
        <div className="flex flex-row gap-2 text-base md:text-lg lg:text-xl tracking-tight items-center">
          <Icon icon="line-md:cancel" /> <h1>gagal memuat data...</h1>
        </div>
        <Button text="kembali" href="/belajar" />
      </div>
    );

  return (
    <Suspense fallback={<div>Loading data...</div>}>
      
      <DetailKuis data={data} />
    </Suspense>
  );
}


function DetailKuis({ data }) {
  const [localStorageNilai, setLocalStorageNilai] = useState(
    parseInt(localStorage.getItem("nilai")) || 0
  );
  const [correctPracticeHandled, setCorrectPracticeHandled] = useState(false);
  const [alertShown, setAlertShown] = useState(false);
  const [mulaiKuis, setMulaiKuis] = useState(false)


  const closeTutorial = () => {
    const namaSoal = data.find((kuis) => kuis.id === parsedId).soal;
  
    Swal.fire({
      title: `Selamat datang di Kuis ${namaSoal}`,
      html: `
        <div style="text-align: justify; color: #333; font-family: 'Arial', sans-serif; padding: 15px;">
          <p>Tutorial singkat tentang cara mengikuti kuis ini:</p>
          <br>
          <ul style="list-style-type: square; margin-left: 20px;">
            <li>Pastikan kamera kamu diaktifkan!</li>
            <li>Terdapat timer pada kuis ini selama 5 detik.</li>
            <li>Pastikan kamu menirukan gambar atau video dengan benar agar mendapatkan score.</li>
          </ul>
          <br>
          <p>Klik <b>"Mulai Kuis"</b> untuk memulai!</p>
        </div>
      `,
      showCloseButton: false,
      confirmButtonText: "<b>Mulai Kuis</b>",
      confirmButtonColor: "#F4CE14",
      background: "#F5F7F8",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("popup");
        const kondisiKuis = localStorage.setItem("timer", true);
        setMulaiKuis(kondisiKuis);
      }
    });
  };
  
  
  useEffect(() => {
    const kondisiPopUp = localStorage.getItem("popup")
    console.log(kondisiPopUp)
    if (kondisiPopUp === "true") {
      closeTutorial();
    } 
  }, []);

  let dataName;
  let dataHuruf;
  let dataImage;
  let dataVideo;

  const { id } = useParams();
  const { soalId } = useParams();
  //console.log(soalId);
  const parsedsoalId = parseInt(soalId, 10);
  const parsedId = parseInt(id, 10);

  const { isi } = data.find((kuis) => kuis.id === parsedId);
  const specificIsiObject = isi.find((isiObject) => isiObject.id === parsedsoalId);

  if (specificIsiObject) {
    const { name, shortName, image, video } = specificIsiObject;
    dataName = name;
    dataHuruf = shortName;
    dataImage = image;
    dataVideo = video;
  }
 

  const [objectName, setObjectName] = useState("");
  const [objectScore, setObjectScore] = useState("");
  const [gambar, setGambar] = useState(true);
  const [deteksi, setDeteksi] = useState(true);
  const [timer, setTimer] = useState(10);
  const [nilai, setNilai] = useState(0);

  const webcamRef = useRef(null);
  const netRef = useRef(null);
  const requestRef = useRef(null);

  const deteksiWebcam = () => {
    setDeteksi(false);
  };

  const runDeteksi = async () => {
    tf.ENV.set("WEBGL_PACK", true);
    const loadedNet = await tf.loadGraphModel("/assets/model/model.json");
    netRef.current = loadedNet;
    detectLoop();
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      tf.engine().startScope();
      const tensor = tf.browser
        .fromPixels(video)
        .resizeNearestNeighbor([224, 224])
        .expandDims()
        .toFloat()
        .reverse(-1);
      const predictions = await net.predict(tensor).data();

      const sorting = Array.from(predictions)
        .map((p, i) => ({
          probability: p,
          className: labelMap[i],
        }))
        .filter((item) => item.className === dataHuruf);
      

      if (sorting.length > 0) {
        setObjectName(sorting[0].className);
        setObjectScore(sorting[0].probability);
      }
      tf.engine().endScope();
    }
  };

  const detectLoop = () => {
    const net = netRef.current;
    if (net) {
      detect(net);
      requestRef.current = requestAnimationFrame(detectLoop);
    }
  };

  useEffect(() => {
    runDeteksi();

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Update localStorageNilai when the 'nilai' in localStorage changes
    const handleStorageChange = () => {
      setLocalStorageNilai(parseInt(localStorage.getItem("nilai")) || 0);
    };

    // Attach the event listener for storage change
    window.addEventListener("storage", handleStorageChange);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // Empty dependency array to run the effect only once


  const handleResetNilai = () => {
    localStorage.setItem("nilai", 0);
  };

  const resetTimer = () => {
    setTimer(10);
  };

  const handleCorrectPractice = () => {
    resetTimer();
    // Your existing code for handling correct practice...
    Swal.fire({
      title: `Kamu berhasil praktik ${dataHuruf}`,
      icon: 'success',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        // Retrieve current nilai from localStorage
      const currentNilai = parseInt(localStorage.getItem("nilai")) || 0;
      
      // Increase the score by 1 for each correct practice
      const newNilai = currentNilai + 1;
      
      // Update the nilai in localStorage
      localStorage.setItem("nilai", newNilai);

      // Optionally, you can reload the page or navigate to the next page here
      const nextPageId = parsedsoalId + 1;
      window.location.href = `/kuis/${parsedId}/soal/${nextPageId}`;
      }
    });
    
  };

  const goToNextPage = () => {
    const nextPageId = parsedsoalId + 1;
    // Limit navigation to a maximum of 5 pages
    if (nextPageId <= 6) {
      window.location.href = `/kuis/${parsedId}/soal/${nextPageId}`;
    } else {
      // If on the 5th page, you can choose to handle it differently
      console.log("Reached the maximum number of pages");
    }

  };

  useEffect(() => {
    let intervalId;
    const kondisiMulai = localStorage.getItem("timer")
    if (kondisiMulai == "true") {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(intervalId);
            goToNextPage();
            return 0;
          }
        });
      }, 1000);
    } else {
      // If mulaiKuis is false, clear the interval
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [localStorage.getItem("timer")]);

  useEffect(() => {
    if (objectScore && objectScore > 0.8 && !correctPracticeHandled) {
      handleCorrectPractice();
      setCorrectPracticeHandled(true); // Set the flag to indicate that it has been handled
    }
  }, [objectScore, correctPracticeHandled]);

  return (
    <div className="flex flex-col lg:flex-row h-screen mx-auto">
       

      {soalId <= 5 && (
      <div className="w-full lg:w-1/2 h-1/2 lg:h-full p-6 text-black-500 flex flex-col justify-between items-center">
        <m.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={container}
          className="text-center mt-0 lg:mt-10 2xl:mt-20"
        >
          <m.div variants={item}>
            <h1 className="animate__animated animate__bounceIn mx-auto w-fit text-2xl md:text-4xl 2xl:text-5xl font-black tracking-tighter duration-100 ease-out">
              <span>{dataName}</span>
              <span className="text-secondary-600">.</span>
            </h1>
          </m.div>

          <div className="flex gap-x-5">
            <m.div variants={item} className="my-2 md:my-4">
              <button
                onClick={() => setGambar(true)}
                className={`duration-200 px-2 py-1 text-black-500 font-normal text-base md:text-xl tracking-tight hover:underline ${
                  gambar && `text-primary-500 underline`
                }`}
              >
                gambar
              </button>
            </m.div>
            <m.div variants={item} className="my-2 md:my-4">
              <button
                onClick={() => setGambar(false)}
                className={`duration-200 px-2 py-1 text-black-500 font-normal text-base md:text-xl tracking-tight hover:underline ${
                  !gambar && `text-primary-500 underline`
                }`}
              >
                video
              </button>
            </m.div>
          </div>
        </m.div>

        <m.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={container}
          className="my-0 md:my-3 lg:my-10 w-full h-full md:h-1/2 flex items-center justify-center text-2xl tracking-tight"
        >
          {!gambar ? (
            <m.div
              variants={item}
              className="flex h-full md:h-full w-full justify-center items-center"
            >
              <ReactPlayer
                url={dataVideo}
                playing={true}
                loop={true}
                pip={false}
                controls={false}
                className="overflow-hidden w-full max-h-60 md:max-h-full aspect-video"
              />
            </m.div>
          ) : (
            <m.div
              variants={item}
              className="flex h-full justify-center items-center"
            >
              <img
                className="overflow-hidden w-full max-h-60 md:max-h-full aspect-auto"
                src={dataImage}
                alt={dataName}
                loading="lazy"
                draggable={false}
              />
            </m.div>
          )}
        </m.div>

        <m.footer
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={item}
          className="text-center my-4 md:my-10 flex justify-between w-full 2xl:w-3/4"
        >
          {soalId <= 1 ? (
            <Button variant="naked-disabled" text="< sebelumnya" />
          ) : (
            <Button
              variant="naked-2"
              text="< sebelumnya"
              to={`/kuis/${parsedId}/soal/${parsedsoalId - 1}`}
            />
          )}
          <Button variant="naked" text="kembali" onClick={handleResetNilai} to="/kuis" />
          {soalId >= 5 ? (
            <Button variant="naked-disabled" text="selanjutnya >" />
          ) : (
            <Button
              variant="naked-2"
              text="selanjutnya >"
              to={`/kuis/${parsedId}/soal/${parsedsoalId + 1}`}
              onClick={() => {}}
            />
          )}
        </m.footer>

     
      </div> )}

      {soalId <= 5 && (
      <m.div className='flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20'>
        <p className='lg:text-9xl font-extrabold text-gray-300 text-4xl'>{timer}</p>
      </m.div>
    )}


      {soalId > 5 && (
        <div className="w-full h-screen flex items-center justify-center text-warna1">
          <div className="bg-gray-800 text-center p-8 rounded-lg shadow-lg">
            <div className="text-3xl font-bold mb-4">Selamat! Kamu Telah Menyelesaikan Kuis 🎉🎉</div>
            <div className="text-2xl font-bold mb-4">Jumlah Nilai Kamu:</div>
            <div className="text-4xl font-bold mb-4">{localStorageNilai}</div>
            <p className="text-xl mb-8">Teruskan usahamu!</p>
            <div className='text-center'>
              <Button variant="secondary" text="Kembali ke Kuis" onClick={handleResetNilai} to="/kuis" />
            </div>
          </div>
        </div>
      )}


      {soalId <=5 && (
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex justify-between">
        <Webcam
          id="webcam"
          className="w-full lg:w-1/2 h-1/2 lg:h-screen object-cover object-left absolute"
          audio={false}
          ref={webcamRef}
          mirrored={true}
          onUserMediaError={deteksiWebcam}
          videoConstraints={{
            facingMode: "user",
            height: 256,
            width: 256,
          }}
        />
        <div
          className={`${
            !deteksi
              ? `bg-gray-900 justify-center`
              : ` justify-between`
          } z-10 h-full w-full right flex flex-col items-center p-6 lg:p-10 text-white text-sm md:text-xl`}
        >
          <m.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={container}
            className="flex items-center gap-2"
          >
            {!deteksi ? (
              <div className="group flex flex-col my-auto gap-4">
                <div className="bg-red-500 px-5 py-2 flex items-center gap-2 md:gap-4 w-fit mx-auto rounded-xl">
                  <span className="w-2 lg:w-3 h-2 lg:h-3 bg-red-700 rounded-full animate-ping absolute"></span>
                  <span className="w-2 lg:w-3 h-2 lg:h-3 bg-red-700 rounded-full relative"></span>
                  kamera tidak aktif
                </div>
                <div className="bg-red-500 px-5 py-3 items-center text-center gap-4 rounded-xl text-xs lg:text-base transition-all duration-200">
                  Silakan berikan izin untuk mengakses kamera pada peramban
                  anda.
                </div>
              </div>
            ) : (
              <>
                <span className="w-2 lg:w-3 h-2 lg:h-3 bg-green-500 rounded-full animate-ping absolute"></span>
                <span className="w-2 lg:w-3 h-2 lg:h-3 bg-green-500 rounded-full relative "></span>
                kamera aktif
              </>
            )}
          </m.div>

          {!deteksi ? null : (
            <div className="flex flex-col gap-4">
              <m.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={container}
                className="text-center bg-primary-500/80 rounded-xl lg:rounded-2xl py-2 lg:py-4 px-5 lg:px-10"
              >
                <m.p variants={item}>tingkat kecocokan :</m.p>
                <m.p variants={item}>
                  {/* {console.log(objectScore)} */}
                  {objectScore ? (objectScore * 100).toFixed(1) + "%" : "0%"}
                </m.p>
              </m.div>
            </div>
          )}
        </div>
      </div>
      )}
      
    </div>
  );
}
