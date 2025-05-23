import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import Podekex from "./pages/Pokedex.jsx";
import About from "./pages/About.jsx";
import PokemonInfo from "./pages/PokemonInfo.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Podekex />} />
      <Route path="/about" element={<About />} />
      <Route path="/pokemon/:name" element={<PokemonInfo />} />
    </Routes>
  </HashRouter>
);
