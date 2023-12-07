import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';


export default function Button({ variant, text, to, navigate}) {
  switch (variant) {
    case "outline":
      return (
        <Link
          to={to}
          className="duration-200 text-blue-300 px-10 md:px-20 py-4 md:py-5 rounded-full border-4 border-primary-500 hover:bg-primary-900 hover:border-0 text-primary-500 font-medium text-lg md:text-xl tracking-tight "
        >
          {text}
        </Link>
      );

    case "secondary":
      return (
        <Link
          to={to}
          className="duration-200 px-10 md:px-20 py-4 md:py-5 rounded-full bg-blue-400 hover:bg-blue-800 text-black font-medium text-lg md:text-xl tracking-tight "
        >
          {text}
        </Link>
      );

    case "naked":
      return (
        <Link
          to={to}
          onClick={() => navigate()}
          className="duration-200 px-2 py-1 rounded-xl text-black font-normal text-base md:text-xl tracking-tight hover:underline focus:outline-none focus:ring-2 focus:ring-black "
        >
          {text}
        </Link>
      );

    case "naked-disabled":
      return (
        <a className="duration-200 px-2 py-1 rounded-xl text-teal-200 font-normal text-base md:text-xl tracking-tight cursor-not-allowed">
          {text}
        </a>
      );

    default:
      return (
        <Link
          to={to}
          className="duration-200 px-10 md:px-20 py-4 md:py-5 rounded-full bg-gray-900 hover:bg-gray-950 active:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-500 text-warna1 font-medium text-base md:text-xl tracking-tight "
        >
          {text}
        </Link>
      );
  }
}
