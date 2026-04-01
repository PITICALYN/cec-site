import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Courses from '../components/Courses';
import Stats from '../components/Stats';
import Cta from '../components/Cta';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import AdminToolbar from '../components/AdminToolbar';

const Home = () => {
  return (
    <div className="home-page">
      <AdminToolbar />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Courses />
        <Cta />
        <Testimonials />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Home;
