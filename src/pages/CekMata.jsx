import { useState, useEffect } from "react";
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
  const [isUploaded, setIsUploaded] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [userId] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = () => {
      navigate("/", { replace: true });
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  const handleUploadClick = () => {
    setShowFileInput(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (file && validTypes.includes(file.type)) {
      setSelectedFile(file);
      setIsUploaded(false);
      setPredictionResult(null);
    } else {
      alert("Hanya file JPG, JPEG, dan PNG yang diperbolehkan.");
      event.target.value = null;
      setSelectedFile(null);
    }
  };

  const handleCancelUpload = () => {
    setShowFileInput(false);
    setSelectedFile(null);
    setIsUploaded(false);
    setPredictionResult(null);
  };

  const handleSendImage = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("file_path", selectedFile);

    try {
      setIsUploading(true);
      const response = await axios.post("https://82d6-36-66-204-109.ngrok-free.app/foto-mata", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Gambar berhasil dikirim!");
      console.log("Upload response:", response.data);
      setIsUploaded(true);
    } catch (error) {
      alert("Gagal mengunggah gambar!");
      console.error("Upload error:", error.response?.data || error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handlePredictImage = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post("https://82d6-36-66-204-109.ngrok-free.app/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Prediction result:", response.data);
      setPredictionResult({
        kelas: response.data.result,
        akurasi: response.data.akurasi
      });
    } catch (error) {
      alert("Gagal melakukan prediksi!");
      console.error("Prediction error:", error.response?.data || error.message);
    }
  };

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
          {/* Gambar preview atau logo */}
          <div style={{ marginBottom: "10px" }}>
            {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}
              />
            ) : (
              <img
                src={cekMataSection.ImageUpload}
                alt="Unggah Foto"
                style={{ width: "150px", height: "150px" }}
              />
            )}
          </div>

          {/* Tombol Upload */}
          {!showFileInput && (
            <button className="btn-cek" onClick={handleUploadClick}>
              Upload Foto
            </button>
          )}

          {/* Input File dan Tombol Aksi */}
          {showFileInput && (
            <div className="file-input">
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
              />
              {selectedFile && (
                <p>File Terpilih: {selectedFile.name}</p>
              )}
              <div className="button-row">
                {!isUploaded ? (
                  <>
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
                  </>
                ) : (
                  <>
                    {!predictionResult && (
                      <button className="btn-cek" onClick={handlePredictImage}>
                        Prediksi
                      </button>
                    )}
                    {predictionResult && (
                      <div className="hasil-prediksi">
                        <p><strong>Hasil:</strong> {predictionResult.kelas}</p>
                        <p><strong>Akurasi:</strong> {(parseFloat(predictionResult.akurasi) * 100).toFixed(2)}%</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default CekMata;
