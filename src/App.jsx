import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import MyNavbar from "./components/Navbar";
import MyHero from "./components/Hero";
import Mysection from "./components/Section";
import SectionHow from "./components/SectionHow";

import ReviewCarousel from "./components/ReviewCarousel";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import SharedAlbumView from "./components/SharedAlbumView";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/album/share/:shareCode" element={<SharedAlbumView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
