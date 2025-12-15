import React, { useState } from "react";
import styled from "styled-components";
import { useSearchParams, useNavigate } from "react-router-dom";

// Styled components
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  font-family: 'Arial', sans-serif;
`;

const FormWrapper = styled.form`
  background-color: #fff;
  padding: 3rem 1rem;
  border-radius: 12px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 400px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  text-align: center;
  color: #0d96e0;
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #0d96e0;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
`;

const ErrorText = styled.p`
  color: red;
  text-align: center;
  margin-bottom: 1rem;
`;

const SuccessText = styled.p`
  color: green;
  text-align: center;
  margin-bottom: 1rem;
`;

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Password tidak sama!");
      return;
    }

    try {
      const response = await fetch("https://back-end-production-faf7.up.railway.app/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          email: email,
          password: newPassword,
          password_confirmation: confirmPassword,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("Password berhasil direset. Mengarahkan ke halaman login...");
        setError("");

        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 2000);
      } else {
        setError(data.message || "Terjadi kesalahan.");
      }
    } catch (err) {
      setError("Gagal menghubungi server.");
    }
  };

  if (!token || !email) {
    return (
      <Container>
        <Title>Token tidak valid atau sudah kadaluarsa.</Title>
      </Container>
    );
  }

  return (
    <Container>
      <FormWrapper onSubmit={handleSubmit}>
        <Title>Reset Password</Title>
        {error && <ErrorText>{error}</ErrorText>}
        {success && <SuccessText>{success}</SuccessText>}
        <label>New Password</label>
        <Input
          type="password"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <label>Confirm Password</label>
        <Input
          type="password"
          placeholder="Confirm your new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit">Reset Password</Button>
      </FormWrapper>
    </Container>
  );
}

export default ResetPassword;
