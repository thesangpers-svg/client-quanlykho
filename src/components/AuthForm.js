import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function AuthForm({
  form,
  isLogin,
  loading,
  message,
  onChange,
  onSubmit,
  toggleMode,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card sx={{ width: 400, p: 3 }}>
      <CardContent>
        <Typography variant="h4" align="center" gutterBottom>
          {isLogin ? "Đăng Nhập" : "Đăng Ký"}
        </Typography>

        {message && <Alert sx={{ mb: 2 }}>{message}</Alert>}

        <form onSubmit={onSubmit}>
          <TextField
            fullWidth
            label="Tên"
            name="name"
            margin="normal"
            value={form.name}
            onChange={onChange}
          />

          <TextField
            fullWidth
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            name="password"
            margin="normal"
            value={form.password}
            onChange={onChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading
              ? "Đang xử lý..."
              : isLogin
              ? "Đăng Nhập"
              : "Đăng Ký"}
          </Button>
        </form>

        <Button onClick={toggleMode} sx={{ mt: 2 }}>
          {isLogin
            ? "Chưa có tài khoản? Đăng ký"
            : "Đã có tài khoản? Đăng nhập"}
        </Button>
      </CardContent>
    </Card>
  );
}

export default AuthForm;