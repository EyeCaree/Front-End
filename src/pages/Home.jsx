import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { homeSection } from "../data/HomeSection";
import { aboutSection } from "../data/AboutSection";
import { servicesSection } from "../data/ServicesSection";
import Services from "../components/Services";

import HeaderSlider from "../components/HeaderSlide"; // Tambahan
import parse from "html-react-parser";
import "../styles/Home.css";


function Home({ setAuth }) {
  return (
    <>
      {/* Kirim setAuth ke Navbar agar bisa logout */}
      <Navbar setAuth={setAuth} />
      <HeaderSlider />
      <div className="wrapper">
        {/* Home Section */}
        <section id="home">
          {homeSection.Image && (
            <img src={homeSection.Image} alt="Eye care home visual" />
          )}
          <div className="kolom">{parse(homeSection.content)}</div>
        </section>

        {/* About Section */}
        <section id="about">
          <div className="kolom">{parse(aboutSection.content)}</div>
          {aboutSection.Image && (
            <img src={aboutSection.Image} alt="About Eye care" />
          )}
        </section>
      </div>

      {/* Services Section */}
      <section id="services">
        <div className="tengah">
          <div className="kolom">{parse(servicesSection.content)}</div>
          <Services />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
