import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>
            Quản Lý Kho
          </Typography>

          <Button color="inherit" onClick={() => navigate("/home")}>Home</Button>
          <Button color="inherit" onClick={() => navigate("/import")}>Nhập hàng</Button>
          <Button color="inherit" onClick={() => navigate("/export")}>Xuất hàng</Button>
          <Button color="inherit" onClick={() => navigate("/settings")}>Cài đặt</Button>
          <Button color="inherit" onClick={() => navigate("/import-history")}>LSNH</Button>
          <Button color="inherit" onClick={logout}>Đăng xuất</Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 4 }}>{children}</Box>
    </>
  );
}

export default Layout;