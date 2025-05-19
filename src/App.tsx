import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Team from './components/Team';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
          <Navbar />
          <Hero />
          <Services />
          <About />
          <Team />
          <Portfolio />
          <Testimonials />
          <Contact />
          <Footer />
          <Chatbot />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;