import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";


export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}