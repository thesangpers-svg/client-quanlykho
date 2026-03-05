import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { loginUser, registerUser } from "../services/authService";

function AuthPage() {
  const [form, setForm] = useState({
    name: "",
    password: "",
  });

  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let data;

      if (isLogin) {
        data = await loginUser(form);
      } else {
        data = await registerUser(form);
      }

      // ================= LOGIN THÀNH CÔNG =================
      if (isLogin && data.token) {
        // Lưu token
        localStorage.setItem("token", data.token);

        // 🔥 Lưu tên tài khoản để dùng cho nhập hàng
        localStorage.setItem("user", form.name);

        navigate("/home");
      }

      // ================= ĐĂNG KÝ THÀNH CÔNG =================
      if (!isLogin) {
        setMessage("Đăng ký thành công. Hãy đăng nhập.");
        setIsLogin(true);
      }

    } catch (err) {
      setMessage(
        err.response?.data?.message || "Có lỗi xảy ra"
      );
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AuthForm
          form={form}
          isLogin={isLogin}
          loading={loading}
          message={message}
          onChange={handleChange}
          onSubmit={handleSubmit}
          toggleMode={() => {
            setIsLogin(!isLogin);
            setMessage("");
          }}
        />
      </Box>
    </Container>
  );
}

export default AuthPage;