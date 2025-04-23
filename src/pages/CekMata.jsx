import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/CekMata.css";
import { cekMataSection } from "../data/CekMataSection";
import axios from "axios";
import WebcamCapture from "../components/WebcamCapture";

function CekMata() {
  const [showFileInput, setShowFileInput] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false); // untuk kontrol webcam

  const handleUploadClick = () => {
    setShowFileInput(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (file && validTypes.includes(file.type)) {
      setSelectedFile(file);
    } else {
      alert("Hanya file JPG, JPEG, dan PNG yang diperbolehkan.");
      event.target.value = null;
      setSelectedFile(null);
    }
  };

  const handleCancelUpload = () => {
    setShowFileInput(false);
    setSelectedFile(null);
  };

  const handleSendImage = async () => {
    if (!selectedFile) return;
  
    const formData = new FormData();
    formData.append("file", selectedFile);
  
    try {
      setIsUploading(true);
      const response = await axios.post("http://192.168.1.8:8000/foto-mata", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      alert("Gambar berhasil dikirim!");
      console.log("Response:", response.data);
    } catch (error) {
      alert("Gagal mengunggah gambar!");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };
  

  // Jika webcam aktif, tampilkan WebcamCapture
  if (showWebcam) {
    return <WebcamCapture />;
  }

  return (
    <div>
      <Navbar />
      <div className="button-container">
        {/* Ambil Foto */}
        <section className="ambil-foto">
          <img src={cekMataSection.ImageAmbil} alt="Ambil Foto" />
          <button className="btn-cek" onClick={() => setShowWebcam(true)}>
            Ambil Foto
          </button>
        </section>

        {/* Upload Foto */}
        <section className="upload-foto">
          <img src={cekMataSection.ImageUpload} alt="Unggah Foto" />

          {!showFileInput && (
            <button className="btn-cek" onClick={handleUploadClick}>
              Upload Foto
            </button>
          )}

          {showFileInput && (
            <div className="file-input">
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
              />
              {selectedFile && <p>File Terpilih: {selectedFile.name}</p>}

              <div className="button-row">
                {selectedFile && (
                  <button
                    className="btn-kirim"
                    onClick={handleSendImage}
                    disabled={isUploading}
                  >
                    {isUploading ? "Mengirim..." : "Kirim Gambar"}
                  </button>
                )}
                <button className="btn-batal" onClick={handleCancelUpload}>
                  Batal
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default CekMata;
