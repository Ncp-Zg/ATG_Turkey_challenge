import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import CurrencyPage from "./pages/CurrencyPage";
import Navbar from "./components/UI/Navbar";
import SingleCurrencyPage from "./pages/SingleCurrencyPage";
import { useState } from "react";

function App() {

  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <Navbar setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Navigate to="/currency" replace />} />
        <Route path="/currency" element={<CurrencyPage search={search} />} />
        <Route path="/currency/:code" element={<SingleCurrencyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
