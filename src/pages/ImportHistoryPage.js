import { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getHistory } from "../services/importService";
import Layout from "../components/Layout";
import { deleteImport, updateImport } from "../services/importService";
import { Button } from "@mui/material";
const ImportHistoryPage = () => {
  const [rows, setRows] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await getHistory();

      const formatted = res.data.map((item) => ({
        id: item._id,
        name: item.name,
        quantity: item.quantity,
        importedBy: item.importedBy || "Không rõ", // 🔥 thêm
        attributes: item.attributes
          ?.map((a) => `${a.key}: ${a.value}`)
          .join(" | "),
        createdAt: item.createdAt
          ? new Date(item.createdAt).toLocaleString()
          : "",
      }));

      setRows(formatted);
    } catch (err) {
      console.error("Lỗi tải lịch sử", err);
    }
  };
const handleDelete = async (id) => {
  if (!window.confirm("Bạn có chắc muốn xóa?")) return;

  await deleteImport(id);
  fetchHistory();
};

const handleEdit = async (row) => {
  const newQuantity = prompt("Nhập số lượng mới:", row.quantity);

  if (!newQuantity) return;

  await updateImport(row.id, { quantity: newQuantity });
  fetchHistory();
};
  useEffect(() => {
    fetchHistory();
  }, []);

  const columns = [
  { field: "name", headerName: "Mã sản phẩm", flex: 1 },
  { field: "attributes", headerName: "Thuộc tính", flex: 2 },
  { field: "quantity", headerName: "Số lượng nhập", flex: 1 },
  { field: "importedBy", headerName: "Người nhập", flex: 1 },
  { field: "createdAt", headerName: "Thời gian", flex: 1.5 },

  {
    field: "actions",
    headerName: "Thao tác",
    flex: 1.5,
    renderCell: (params) => (
      <>
        <Button
          size="small"
          onClick={() => handleEdit(params.row)}
        >
          Sửa
        </Button>

        <Button
          size="small"
          color="error"
          onClick={() => handleDelete(params.row.id)}
        >
          Xóa
        </Button>
      </>
    ),
  },
];

  return (
    <Layout>
      <Container>
        <Typography variant="h4" mt={4} mb={3}>
          Lịch sử nhập hàng
        </Typography>

        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
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

export default ImportHistoryPage;