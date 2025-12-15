import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

// ========== Styled Components ==========
const Container = styled.div`
  max-width: 420px;
  margin: 0 auto;
  padding: 24px;
  text-align: center;
  font-family: 'Segoe UI', sans-serif;
`;

const Title = styled.h2`
  font-size: 20px;
  color: #2c3e50;
  margin-bottom: 10px;
`;

const Instruction = styled.p`
  font-size: 14px;
  color: #777;
  margin-bottom: 20px;
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 2;
  background: #000;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0,0,0,0.2);
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CircleFrame = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150px;
  height: 150px;
  transform: translate(-50%, -50%);
  border: 2px dashed #00bcd4;
  border-radius: 50%;
  pointer-events: none;
  z-index: 2;
`;

const Canvas = styled.canvas`
  display: none;
`;

const ImagePreview = styled.img`
  width: 100%;
  margin-top: 20px;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.15);
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 22px;
  background-color: #1e88e5;
  color: #fff;
  font-size: 15px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  &:hover {
    background-color: #1565c0;
  }
`;

const NextButton = styled(Button)`
  background-color: #43a047;
  margin-top: 10px;
  &:hover {
    background-color: #2e7d32;
  }
`;

const CancelButton = styled(Button)`
  background-color: #e53935;
  margin-left: 10px;
  &:hover {
    background-color: #c62828;
  }
`;

// ========== Helper Fungsi ==========
const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

// ========== Komponen Utama ==========
const WebcamCapture = ({ onCaptureComplete, onCancel }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    startWebcam();
    return stopWebcam;
  }, []);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setMediaStream(stream);
    } catch (error) {
      console.error("Webcam error:", error);
    }
  };

  const stopWebcam = () => {
    mediaStream?.getTracks().forEach((track) => track.stop());
    setMediaStream(null);
  };

  const checkImageQuality = (imageData) => {
    const img = new Image();
    img.src = imageData;
    return new Promise((resolve, reject) => {
      img.onload = () => {
        if (img.width < 150 || img.height < 150) {
          reject("Resolusi gambar tidak boleh kurang dari 150x150.");
        } else if (img.width > 2048 || img.height > 2048) {
          reject("Resolusi gambar tidak boleh lebih dari 2048x2048.");
        } else {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

          let brightness = 0;
          for (let i = 0; i < pixels.length; i += 4) {
            brightness += (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
          }
          brightness /= pixels.length / 4;

          const isBrightEnough = brightness > 40;
          resolve(isBrightEnough);
        }
      };
      img.onerror = () => reject("Gagal memuat gambar.");
    });
  };

  const captureImage = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const cropWidth = 150;
    const cropHeight = 150;
    const cropX = canvas.width / 2 - cropWidth / 2;
    const cropY = canvas.height / 2 - cropHeight / 2;

    const croppedCanvas = document.createElement("canvas");
    croppedCanvas.width = cropWidth;
    croppedCanvas.height = cropHeight;
    const croppedCtx = croppedCanvas.getContext("2d");
    croppedCtx.drawImage(video, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

    const imageData = croppedCanvas.toDataURL("image/jpeg");

    try {
      const isQualityGood = await checkImageQuality(imageData);
      if (isQualityGood) {
        setCapturedImage(imageData);
        stopWebcam();
      } else {
        alert("Gambar terlalu gelap atau buram, silakan ulangi pengambilan gambar.");
      }
    } catch (error) {
      alert(error);
    }
  };

  // ✅ kirim ke endpoint backend pakai FETCH
  const handleNext = async () => {
    if (!capturedImage || !onCaptureComplete) return;
    setIsProcessing(true);

    const imageFile = dataURLtoFile(capturedImage, "captured_eye.jpeg");
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch("https://back-end-production-faf7.up.railway.app/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Gagal menjalankan prediksi.");
      }

      onCaptureComplete({
        kelas: data.result.kelas,
        akurasi: data.result.akurasi,
        originalImage: capturedImage,
      });
    } catch (error) {
      console.error("Prediction error:", error);
      alert("Gagal mengirim gambar atau mendapatkan prediksi!");
      onCancel();
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    startWebcam();
  };

  return (
    <Container>
      <Title>Ambil Gambar Mata Anda</Title>
      <Instruction>Pastikan mata berada di dalam lingkaran biru</Instruction>

      {capturedImage ? (
        <>
          <ImagePreview src={capturedImage} alt="Hasil Capture" />
          <NextButton onClick={handleNext} disabled={isProcessing}>
            {isProcessing ? "Memproses..." : "Kirim dan Cek"}
          </NextButton>
          <Button onClick={handleRetake} disabled={isProcessing}>
            Ambil Ulang
          </Button>
        </>
      ) : (
        <>
          <VideoWrapper>
            <Video ref={videoRef} autoPlay muted playsInline />
            <CircleFrame />
          </VideoWrapper>
          <Canvas ref={canvasRef} />
          <Button onClick={captureImage} disabled={isProcessing}>
            Ambil Gambar
          </Button>
          <CancelButton onClick={onCancel} disabled={isProcessing}>
            Batal
          </CancelButton>
        </>
      )}
    </Container>
  );
};

export default WebcamCapture;