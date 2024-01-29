import { motion as m } from "framer-motion";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { container, item } from "./Animation";
import Button from "./Tombol";
import React, { useState } from "react";

export default function Card({ name, to,  onClick }) {

  return (
    <Link to={to} className="rounded-3xl lg:rounded-4xl focus:outline-none focus:ring focus:ring-gray-700">
      <m.button
        layout
        transition={{ duration: 0.4, ease: "easeOut" }}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        variants={item}
        onClick={onClick}
        className={`h-40 md:h-48 lg:h-full w-full aspect-auto lg:aspect-square px-8 xl:px-16 py-10 xl:py-10 gap-y-5 md:gap-7 xl:gap-y-10 bg-gray-800 hover:bg-gray-950 active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-100 rounded-3xl lg:rounded-4xl flex flex-col items-center justify-center text-warna1 text-center cursor-pointer`}
      >
        <m.h2
          layout="position"
          variants={item}
          className="text-2xl md:text-3xl xl:text-4xl font-bold"
        >
          {name}
        </m.h2>

       
      </m.button >
    </Link >

  );
}
