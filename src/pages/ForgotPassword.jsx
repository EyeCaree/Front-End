import React, { useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Styling menggunakan styled-components
const PageWrapper = styled.div`
  min-height: 100vh;
  background-color:rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Poppins', sans-serif;
`;

const Card = styled.div`
  background: #fff;
  padding: 2rem 2.5rem;
  border-radius: 16px;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h2`
  color: #0d96e0;
  margin-bottom: 0.6rem;
`;

const Subtitle = styled.p`
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1.2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: #0d96e0;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: #0d96e0;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    const toastId = toast.info("Silakan cek email Anda untuk reset password.", {
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      render: () => (
        <div>
          Silakan cek email Anda.
          <button onClick={() => handleOkClick(toastId)}>OK</button>
        </div>
      ),
    });

    setLoading(true);
    try {
      await fetch("https://back-end-production-faf7.up.railway.app/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
    } catch (error) {
      toast.error("Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  const handleOkClick = (id) => {
    toast.update(id, {
      render: "Cek inbox Gmail Anda!",
      type: toast.TYPE.SUCCESS,
      autoClose: 5000,
    });
  };

  return (
    <PageWrapper>
      <Card>
        <Title>Forgot Password</Title>
        <Subtitle>Masukkan email Anda untuk mengatur ulang password.</Subtitle>
        <form onSubmit={handlePasswordReset}>
          <Input
            type="email"
            placeholder="Alamat email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Mengirim..." : "Reset Password"}
          </Button>
        </form>
        <ToastContainer />
      </Card>
    </PageWrapper>
  );
};

export default ForgotPassword;
