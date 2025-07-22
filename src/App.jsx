import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("https://nandaputric-suararasa.hf.space/");
    }, 30000); // ping setiap 30 detik

    return () => clearInterval(interval); // bersihkan interval saat unmount
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}
