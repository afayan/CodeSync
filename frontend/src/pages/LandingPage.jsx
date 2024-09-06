import './Landing.css';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Herosection/Hero';
import Objectives from '../components/Objectives/Objectives';
import Contact from '../components/Contactus/Contact';
import Footer from '../components/Footer/Footer';
import { useState, useEffect } from 'react';

function LandingPage() {
  return (
    <>
      <div className="fade-in">
        <Navbar />
      </div>
      <div className="fade-in">
        <Hero />
      </div>
      <div className="fade-in">
        <Objectives />
      </div>
      <div className="fade-in">
        <Contact />
      </div>
      <div className="fade-in">
        <Footer />
      </div>
    </>
  );
}

export default LandingPage;