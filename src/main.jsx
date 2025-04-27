import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Podekex from "./pages/Pokedex.jsx";
import About from "./pages/About.jsx";
import PokemonInfo from "./pages/PokemonInfo.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/web2-pokedex/" element={<Podekex />} />
      <Route path="/web2-pokedex/about" element={<About />} />
      <Route path="/web2-pokedex/pokemon/:name" element={<PokemonInfo />} />
    </Routes>
  </BrowserRouter>
);
