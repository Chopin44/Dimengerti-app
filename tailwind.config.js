/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        warna1: "#F5F7F8",
        warna2: "#F4CE14",
        warna3: "#495E57",
        warna4: "#45474B",
      },
      fontFamily: {
        IBM: ["IBM Plex Mono"],
      },
      screens: {
        smini: "320px",
        mini: "376px",
        iphoneP: "390px",
        iphoneMax: "428px",
      },
    },
  },
  plugins: [],
};
