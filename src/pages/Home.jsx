import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { homeSection } from "../data/HomeSection";

import parse from "html-react-parser";
import "../styles/Home.css";
import { aboutSection } from "../data/AboutSection";
import { servicesSection } from "../data/ServicesSection";
import Services from "../components/Services";

function Home() {
  return (
    <>
      <Navbar />
      <div className="wrapper">
        {/* home */}
        <section id="home">
          <img src={homeSection.Image} />
          <div className="kolom">{parse(homeSection.content)}</div>
        </section>

        {/* About */}
        <section id="about">
          <div className="kolom">{parse(aboutSection.content)}</div>
          <img src={aboutSection.Image} />
        </section>
      </div>

      {/* Service */}
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
