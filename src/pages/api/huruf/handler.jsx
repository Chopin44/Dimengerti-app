// HandlerComponent.js
import React, { useState, useEffect } from "react";
import data from "../data";

function HandlerComponent() {
  const [huruf, setHuruf] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async  () => {
      try {
        const { Huruf } = data ;
        // console.log(Huruf) // Ganti dengan endpoint API sesuai dengan konfigurasi server Anda

        
        setHuruf(Huruf);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!huruf) return <div>Data tidak ditemukan</div>;

  return (
    data
  );
}

export default HandlerComponent;
