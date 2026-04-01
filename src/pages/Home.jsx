import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Courses from '../components/Courses';
import Stats from '../components/Stats';
import Cta from '../components/Cta';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import ReviewNotifier from '../components/ReviewNotifier';
import WhatsAppButton from '../components/WhatsAppButton';
import AdminToolbar from '../components/AdminToolbar';

const Home = () => {
  return (
    <div className="home-page">
      <AdminToolbar />
      <Navbar />
      <Hero />
      <Stats />
      <Courses />
      <Cta />
      <Testimonials />
      <Footer />
      <WhatsAppButton />
      <ReviewNotifier />
    </div>
  );
};

export default Home;
