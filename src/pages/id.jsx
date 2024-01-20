import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import ReactPlayer from "react-player";
// import Head from "next/head";
import { useParams } from 'react-router-dom';
import { motion as m } from "framer-motion";
import Button from "../components/Tombol";
import { container, item } from "../components/Animation";
import Webcam from "react-webcam";
import { Icon } from "@iconify/react";
import { labelMap } from "../lib/utilities";
import * as tf from "@tensorflow/tfjs";
import Swal from 'sweetalert2';

const LazyData = lazy(() => import('./api/data'));

export default function Halaman({ fallback }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await import('./api/data');
        setData(result.default.Huruf);
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchData();
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
     <DetailBelajar data={data} />
    </Suspense>
      
  );
}




function DetailBelajar({data}) {

    const [alertShown, setAlertShown] = useState(false);

    
    const {id} = useParams()
    const parsedId = parseInt(id, 10); // Mengubah id menjadi integer
    const selectedHuruf = data.find(huruf => huruf.id === parsedId);
    const {name, shortName, desc, image, video} = selectedHuruf  
   

  const [objectName, setObjectName] = useState("");

  const [objectScore, setObjectScore] = useState("");

  const [gambar, setGambar] = useState(true);

  const [deteksi, setDeteksi] = useState(true);

  const webcamRef = useRef(null);

  const netRef = useRef(null);

  const requestRef = useRef(null);

   // Fungsi useEffect akan dijalankan setiap kali nilai objectScore berubah
   useEffect(() => {
    // Check apakah objectScore lebih dari 0.8 dan alert belum ditampilkan
    if (objectScore && objectScore > 0.8 && !alertShown) {
      // Menampilkan SweetAlert
      Swal.fire({
        title: `Kamu berhasil praktik ${name}`,
        icon: 'success',
        confirmButtonText: "OK"
      }).then((result) => {
        // Menandai bahwa alert sudah ditampilkan
        setAlertShown(true);

        // Refresh halaman
        if (result.isConfirmed) {
          window.location.reload();
        }
        
      });
    }
  }, [objectScore, alertShown]);

  //deteksi ketika webcam tidak aktif
  const deteksiWebcam = () => {
    setDeteksi(false);
  };
  

  const runDeteksi = async () => {
    // disables WebGL and forces TFJS to act more like Python!
    tf.ENV.set("WEBGL_PACK", true);

    // load model
    const loadedNet = await tf.loadGraphModel("/assets/model/model.json");
    netRef.current = loadedNet;

    // Start the loop
    detectLoop();
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      tf.engine().startScope();
      const tensor = tf.browser
        .fromPixels(video)
        .resizeNearestNeighbor([224, 224]) // change the image size
        .expandDims()
        .toFloat()
        .reverse(-1); // RGB -> BGR
      const predictions = await net.predict(tensor).data();

      const sorting = Array.from(predictions)
        .map((p, i) => ({
          probability: p,
          className: labelMap[i],
        }))
        .filter((item) => item.className === shortName);

      // console.log(sorting)

      // Set objectName state dengan className dari sorting
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
      // Clean up the loop and interval when the component is unmounted
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-screen mx-auto">
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
              <span>{name}</span>
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
                url={video}
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
                src={image}
                alt={desc}
                loading="lazy" // This is similar to the "priority" attribute for lazy loading
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
          {id <= 1 ? (
            <Button variant="naked-disabled" text="< sebelumnya" />
          ) : (
            <Button
              variant="naked"
              text="< sebelumnya"
              to={`/belajar/${parsedId - 1}`}
            />
          )}
          <Button variant="naked" text="kembali" to="/belajar" />
          {id >= 26 ? (
            <Button variant="naked-disabled" text="selanjutnya >" />
          ) : (
            <Button
              variant="naked"
              text="selanjutnya >"
              to={`/belajar/${parsedId + 1}`}
              
            />
          )}
        </m.footer>
      </div>
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
                  {console.log(objectScore)}
                  {objectScore ? (objectScore * 100).toFixed(1) + "%" : "0%"}
              </m.p>

              </m.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
