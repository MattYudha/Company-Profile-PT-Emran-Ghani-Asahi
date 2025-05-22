import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import BusinessCards from './pages/BusinessCards';
import Brochures from './pages/Brochures';
import Flyers from './pages/Flyers';
import Banners from './pages/Banners';
import Posters from './pages/Posters';
import LogoDesign from './pages/LogoDesign';
import BrandIdentity from './pages/BrandIdentity';
import Packaging from './pages/Packaging';
import Illustration from './pages/Illustration';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <ThemeProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/business-cards" element={<BusinessCards />} />
              <Route path="/brochures" element={<Brochures />} />
              <Route path="/flyers" element={<Flyers />} />
              <Route path="/banners" element={<Banners />} />
              <Route path="/posters" element={<Posters />} />
              <Route path="/logo-design" element={<LogoDesign />} />
              <Route path="/brand-identity" element={<BrandIdentity />} />
              <Route path="/packaging" element={<Packaging />} />
              <Route path="/illustration" element={<Illustration />} />
            </Routes>
            <Footer />
            <Chatbot />
          </div>
        </ThemeProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;