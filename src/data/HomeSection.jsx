import HomeImage from "../asset/good-eye.png";
// export const homeSection = {
//   Image: HomeImage,
//   content:
//     '<h2>Sehatkan Matamu, Mulai dari Sekarang</h2><p>Gunakan Eye Care App untuk deteksi dini kesehatan mata. Cek sekarang dan lindungi penglihatanmu!</p><p><a href="/CekMata" className="tbl-pink">Cek Mata Sekarang</a></p>',
// };

import { Link } from "react-router-dom";

export const homeSection = {
  Image: HomeImage,
  content: (
    <>
      <h2>Sehatkan Matamu, Mulai dari Sekarang</h2>
      <p>Gunakan Eye Care App untuk deteksi dini kesehatan mata.</p>
      <Link to="/CekMata" className="tbl-pink">
        Cek Mata Sekarang
      </Link>
    </>
  ),
};
