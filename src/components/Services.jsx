import { servicesSection } from '../data/ServicesSection';
import '../styles/Services.css'

function Services() {
  return (
    <div className="service-list">
      <div className="kartu-service">
      <img src={servicesSection.ImageDeteksi} />
        <p>Mendeteksi Mata Melalui Tangkap Foto dan Upload Foto</p>
      </div>
      <div className="kartu-service">
      <img src={servicesSection.ImageCatatan} />
        <p>Memberikan Informasi Akurasi Analisis</p>
      </div>
      <div className="kartu-service">
      <img src={servicesSection.ImageRekomendasi} />
        <p>Membantu Pemeriksaan Mandiri</p>
      </div>
    </div>
  );
}

export default Services;
