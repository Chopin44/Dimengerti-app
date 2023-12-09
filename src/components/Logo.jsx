import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

export default function Logo() {
  return (
    <h1 className="animate__animated animate__bounceIn mx-auto w-fit text-5xl lg:text-6xl font-IBM tracking-tighter hover:underline duration-100 ease-out">
      <Link to="/">
        <span>Dimengerti App</span>
      </Link>
    </h1>
  );
}
