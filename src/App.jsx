import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/index"
import Belajar from './pages/belajar';
import id from './pages/id'
import TentangKami from './pages/tentang-kami';
import Kuis from "./pages/kuis"
import detailKuis from './pages/detailKuis'
import NotFound from "./pages/NotFound"

const App = () => {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Home />}  />
      <Route path="/belajar" element={<Belajar />} />
      <Route path="/Kuis" element={<Kuis />} />
      <Route path="/tentang-kami" element={<TentangKami />} />
      <Route path="/belajar/:id" Component={id} />
      <Route path="/kuis/:id" Component={detailKuis} />
      <Route path="/kuis/:id/soal/:soalId" Component={detailKuis} />
      <Route path="*" element={<NotFound />} />     
    </Routes>
  </Router>
  
  );
};

export default App;
