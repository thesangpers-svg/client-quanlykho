import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Layout from "../components/Layout";
import { getStocks } from "../services/importService";

const HomePage = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [search, setSearch] = useState("");
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [lowStock, setLowStock] = useState([]);

  // ================= FETCH STOCK =================
  const fetchStocks = async () => {
    try {
      const res = await getStocks();

      const formatted = res.data.map((item) => ({
        id: item._id,
        name: item.name,
        quantity: item.quantity,
      }));

      setRows(formatted);
      setFilteredRows(formatted);

      // 🔥 Tính tổng tồn kho
      const total = formatted.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      setTotalQuantity(total);

      // 🔥 Lọc tồn kho dưới 5
      const low = formatted.filter(
        (item) => item.quantity < 5
      );
      setLowStock(low);

    } catch (err) {
      console.error("Lỗi lấy tồn kho", err);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  // ================= SEARCH =================
  useEffect(() => {
    const filtered = rows.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredRows(filtered);
  }, [search, rows]);

  // ================= COLUMNS =================
  const columns = [
    { field: "name", headerName: "Mã hàng", flex: 1 },
    { field: "quantity", headerName: "Số lượng tồn", flex: 1 },
  ];

  const warningColumns = [
    { field: "name", headerName: "Mã hàng", flex: 1 },
    { field: "quantity", headerName: "Số lượng", flex: 1 },
  ];

  return (
    <Layout>
      <Container>
        <Typography variant="h4" mt={4} mb={3}>
          Trang chủ - Quản lý tồn kho
        </Typography>

        <Box display="flex" gap={3}>

          {/* ================= LEFT SIDE ================= */}
          <Box flex={1}>
            {/* Tổng tồn */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6">
                Tổng tồn kho
              </Typography>
              <Typography variant="h4" color="primary">
                {totalQuantity}
              </Typography>
            </Paper>

            {/* Tìm kiếm */}
            <TextField
              fullWidth
              label="Tìm theo mã hàng..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ mb: 2 }}
            />

            {/* Bảng tồn kho */}
            <Box sx={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={filteredRows}
                columns={columns}
                pageSizeOptions={[5, 10]}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 5, page: 0 },
                  },
                }}
              />
            </Box>
          </Box>

          {/* ================= RIGHT SIDE ================= */}
          <Box flex={1}>
            <Paper sx={{ p: 3 }}>
              <Typography
                variant="h6"
                color="error"
                mb={2}
              >
                ⚠ Sản phẩm tồn kho dưới 5
              </Typography>

              <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={lowStock}
                  columns={warningColumns}
                  pageSizeOptions={[5]}
                  initialState={{
                    pagination: {
                      paginationModel: { pageSize: 5, page: 0 },
                    },
                  }}
                  getRowClassName={() => "low-stock-row"}
                  sx={{
                    "& .low-stock-row": {
                      backgroundColor: "#ffebee",
                      color: "#d32f2f",
                      fontWeight: "bold",
                    },
                  }}
                />
              </Box>
            </Paper>
          </Box>

        </Box>
      </Container>
    </Layout>
  );
};

export default HomePage;