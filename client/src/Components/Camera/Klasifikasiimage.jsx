import React from "react";
import styled, { keyframes } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

// Animasi fade-in
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #e3f2fd, #bbdefb);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Container = styled.div`
  max-width: 600px;
  background: white;
  padding: 32px;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: 'Segoe UI', sans-serif;
  animation: ${fadeIn} 0.6s ease;
`;

const Title = styled.h2`
  color: #1565c0;
  margin-bottom: 16px;
  font-size: 26px;
`;

const ImagePreview = styled.img`
  width: 100%;
  max-width: 320px;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  margin: 20px 0;
`;

const ResultBox = styled.div`
  background-color: #bbdefb;
  color: #0d47a1;
  padding: 18px;
  font-size: 20px;
  font-weight: 600;
  border-radius: 12px;
  margin-bottom: 24px;
`;

const Button = styled.button`
  padding: 12px 24px;
  background-color: #42a5f5;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #1e88e5;
  }
`;

const KlasifikasiImage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const capturedImage = location.state?.image;

  const mockResult = "Kemungkinan Katarak Ringan";

  const handleBack = () => {
    navigate("/");
  };

  if (!capturedImage) {
    return (
      <PageWrapper>
        <Container>
          <p>Tidak ada gambar yang dikirim. Silakan ambil ulang gambar.</p>
          <Button onClick={handleBack}>Kembali</Button>
        </Container>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Container>
        <Title>Hasil Klasifikasi</Title>
        <ImagePreview src={capturedImage} alt="Hasil Mata" />
        <ResultBox>{mockResult}</ResultBox>
        <Button onClick={handleBack}>Lihat Rekomendasi</Button>
      </Container>
    </PageWrapper>
  );
};

export default KlasifikasiImage;
