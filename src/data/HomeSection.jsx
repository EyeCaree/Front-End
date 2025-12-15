// import HomeImage from "../asset/good-eye.png";
// export const homeSection = {
//   Image: HomeImage,
//   content:
//     '<h2>Sehatkan Matamu, Mulai dari Sekarang</h2><p>Gunakan Eye Care App untuk deteksi dini kesehatan mata. Cek sekarang dan lindungi penglihatanmu!</p><p><a href="/CekMata" className="tbl-pink">Cek Mata Sekarang</a></p>',
// };

import { useNavigate } from "react-router-dom";
import HomeImage from "../asset/good-eye.png";
import { cekMataSection } from "../data/CekMataSection";

function HomeSection() {
  const navigate = useNavigate();

  return (
    <section>
      <img src={HomeImage} alt="Eye Care" />

      <h2>Sehatkan Matamu, Mulai dari Sekarang</h2>
      <p>
        Gunakan Eye Care App untuk deteksi dini kesehatan mata.
        Cek sekarang dan lindungi penglihatanmu!
      </p>

      <button
        className="tbl-pink"
        onClick={() => navigate("../data/CekMataSection")}
      >
        Cek Mata Sekarang
      </button>
    </section>
  );
}

export default HomeSection;
