"use client";
import { useEffect, useState } from "react";
import Preloader from "@/components/Preloader/Preloader";
import CursorGlow from "@/components/CursorGlow/CursorGlow";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Gallery from "@/components/Gallery/Gallery";
import Projects from "@/components/Projects/Projects";
import About from "@/components/About/About";
import Blog from "@/components/Blog/Blog";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import BackToTop from "@/components/BackToTop/BackToTop";

export default function Home() {
  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");
    elementsToAnimate.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Preloader />
      <CursorGlow />
      <Navbar />
      <Hero />
      <Gallery />
      <Projects />
      <About />
      <Blog />
      <Contact />
      <Footer />
      <BackToTop />
    </>
  );
}
