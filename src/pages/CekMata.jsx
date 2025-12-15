import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/CekMata.css";
import { cekMataSection } from "../data/CekMataSection";
import WebcamCapture from "../components/WebcamCapture";

function CekMata() {
  const [showFileInput, setShowFileInput] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const navigate = useNavigate();

  // 🔄 Reset semua state
  const handleReset = () => {
    setShowFileInput(false);
    setSelectedFile(null);
    setIsUploading(false);
    setShowWebcam(false);
    setPredictionResult(null);
    setUploadError(null);
  };

  const handleUploadClick = () => {
    if (predictionResult) {
      handleReset();
    }
    setShowFileInput(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (file && validTypes.includes(file.type)) {
      setSelectedFile(file);
      setUploadError(null);
    } else {
      alert("Hanya file JPG, JPEG, dan PNG yang diperbolehkan.");
      event.target.value = null;
      setSelectedFile(null);
      setUploadError("Tipe file tidak valid.");
    }
  };

  const handleCancelUpload = () => {
    setShowFileInput(false);
    setSelectedFile(null);
    setUploadError(null);
  };

  // ✅ Fungsi upload ke backend Flask (ubah URL sesuai backend kamu)
  const handleSendImage = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      setIsUploading(true);
      setUploadError(null);

      const response = await fetch("https://back-end-production-faf7.up.railway.app/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Gagal menjalankan prediksi.");
      }

      const result = data.result;

      if (result.kelas.toLowerCase() === "bukan mata") {
        setUploadError("Tidak Ada Objek Mata Terdeteksi, silakan coba lagi.");
        setPredictionResult(null);
      } else {
        setPredictionResult({
          kelas: result.kelas,
          akurasi: result.akurasi,
          originalImage: URL.createObjectURL(selectedFile),
        });
        setSelectedFile(null);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError(error.message || "Gagal menghubungi server.");
    } finally {
      setIsUploading(false);
    }
  };

  // ✅ Jika webcam aktif
  if (showWebcam) {
    return (
      <WebcamCapture
        onCaptureComplete={(resultData) => {
          if (
            resultData.kelas &&
            resultData.kelas.toLowerCase() === "bukan mata"
          ) {
            setUploadError("Tidak Ada Objek Mata Terdeteksi, silakan coba lagi.");
            setPredictionResult(null);
          } else {
            setPredictionResult(resultData);
          }
          setShowWebcam(false);
        }}
        onCancel={handleReset}
      />
    );
  }

  // ✅ Komponen untuk menampilkan hasil prediksi
  const PredictionDisplay = () => {
    if (!predictionResult) return null;

    const { kelas, akurasi, originalImage } = predictionResult;

    return (
      <div className="prediction-result">
        <h3>Hasil Cek Mata Anda</h3>
        <div className="image-preview-container">
          <img
            src={originalImage}
            alt="Mata yang diunggah"
            className="uploaded-image-preview"
          />
        </div>
        <p className="prediction-class">
          Hasil Prediksi: <strong>{kelas.replace(/_/g, " ")}</strong>
        </p>
        <p className="confidence-score">Tingkat Kepercayaan: {akurasi}</p>

        <button className="btn-ulang" onClick={handleReset}>
          Cek Lagi
        </button>
      </div>
    );
  };

  return (
    <div>
      <Navbar />

      {/* Hasil prediksi */}
      <PredictionDisplay />

      {/* Pesan error */}
      {uploadError && <div className="error-message">{uploadError}</div>}

      {/* Menu utama */}
      {!predictionResult && !showWebcam && (
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
      )}
    </div>
  );
}

export default CekMata;