import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Html5QrcodeScanner } from "html5-qrcode";

import { createImport, getStocks } from "../services/importService";
import Layout from "../components/Layout";

const ImportPage = () => {
  const [code, setCode] = useState("");
  const [quantity, setQuantity] = useState("");

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const [stocks, setStocks] = useState([]);

  const [scan, setScan] = useState(false);

  /* ================= TỒN KHO ================= */

  const fetchStocks = async () => {
    const res = await getStocks();

    const formatted = res.data.map((item) => ({
      id: item._id,
      name: item.name,
      quantity: item.quantity,
      attributes: item.attributes
        .map((a) => `${a.key}: ${a.value}`)
        .join(" | "),
    }));

    setStocks(formatted);
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  /* ================= NHẬP HÀNG ================= */

  const handleSubmit = async () => {
    try {
      setError(null);
      setMessage(null);

      await createImport({
        code,
        quantity,
        user: localStorage.getItem("user"),
      });

      setMessage("Nhập hàng thành công");

      setCode("");
      setQuantity("");

      fetchStocks();
    } catch (err) {
      setError(err.response?.data?.message || "Lỗi nhập hàng");
    }
  };

  /* ================= QR SCANNER ================= */

  const startScanner = () => {
    setScan(true);

    setTimeout(() => {
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: 250 },
        false
      );

      scanner.render(
        (decodedText) => {
          setCode(decodedText);
          scanner.clear();
          setScan(false);
        },
        () => {}
      );
    }, 200);
  };

  /* ================= COLUMNS ================= */

  const columns = [
    { field: "name", headerName: "Mã sản phẩm", flex: 1 },
    { field: "attributes", headerName: "Thuộc tính", flex: 2 },
    { field: "quantity", headerName: "Số lượng tồn", type: "number", flex: 1 },
  ];

  return (
    <Layout>
      <Container>

        {/* ===== TIÊU ĐỀ ===== */}

        <Typography variant="h4" mt={4} mb={3}>
          Nhập hàng
        </Typography>

        {/* ===== FORM NHẬP ===== */}

        <Box display="flex" gap={2} mb={3}>
          <TextField
            label="Mã sản phẩm"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <TextField
            label="Số lượng"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <Button variant="contained" onClick={handleSubmit}>
            Nhập
          </Button>

          <Button variant="outlined" onClick={startScanner}>
            Quét QR
          </Button>
        </Box>

        {/* ===== CAMERA QR ===== */}

        {scan && (
          <Box mb={3}>
            <div id="qr-reader" style={{ width: "300px" }} />
          </Box>
        )}

        {/* ===== THÔNG BÁO ===== */}

        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        {/* ===== TỒN KHO ===== */}

        <Typography variant="h5" mt={5} mb={2}>
          Tồn kho
        </Typography>

        <Box style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={stocks}
            columns={columns}
            pageSizeOptions={[5, 10, 20]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }}
          />
        </Box>

      </Container>
    </Layout>
  );
};

export default ImportPage;