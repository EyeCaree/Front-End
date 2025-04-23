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
        <p>Memberikan Informasi Perawatan Mata Secara Umum</p>
      </div>
      <div className="kartu-service">
      <img src={servicesSection.ImageRekomendasi} />
        <p>Memberikan Solusi Umum Hasil Deteksi</p>
      </div>
    </div>
  );
}

export default Services;
