import { motion as m } from "framer-motion";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { container, item } from "./Animation";
import Button from "./Tombol";
import React, { useState } from "react";

export default function Card({ name, desc, to, isSelected, onClick }) {

  return (
    <Link to={to} className="rounded-3xl lg:rounded-4xl focus:outline-none focus:ring focus:ring-gray-700">
      <m.button
        layout
        transition={{ duration: 0.4, ease: "easeOut" }}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        variants={item}
        onClick={onClick}
        className={`${isSelected ? `row-span-1 lg:row-span-2 col-span-1 sm:col-span-2 w-full h-full` : `h-40 md:h-48 lg:h-full w-full`} aspect-auto lg:aspect-square px-8 xl:px-16 py-10 xl:py-10 gap-y-5 md:gap-7 xl:gap-y-10 bg-gray-800 hover:bg-gray-950 active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-100 rounded-3xl lg:rounded-4xl flex flex-col items-center justify-center text-warna1 text-center cursor-pointer`}
      >
        <m.h2
          layout="position"
          variants={item}
          className="text-2xl md:text-3xl xl:text-4xl font-bold"
        >
          {name}
        </m.h2>

        {
          isSelected ? (
            <>
              <m.div variants={item} className="text-base md:text-xl font-normal leading-normal md:leading-7">
                <p>
                  {desc} setelah menekan tombol belajar, kamera akan otomatis menyala agar
                  kamu bisa mempraktikannya.
                </p>
              </m.div>
              <m.div variants={item} className="flex flex-col gap-y-4">
                <Button variant="secondary" text="belajar" to={to} />
                <button
                  className="duration-200 text-white font-normal text-base md:text-xl
              tracking-tight hover:underline"
                  onClick={onClick}
                >
                  batal
                </button>
              </m.div>
            </>
          ) : null
        }
      </m.button >
    </Link >

  );
}
