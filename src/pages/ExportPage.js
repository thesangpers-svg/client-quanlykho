// import { useState, useEffect } from "react";
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Box,
//   Alert,
// } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { Html5QrcodeScanner } from "html5-qrcode";

// import {
//   createExport,
//   getExportHistory,
//   deleteExport,
//   updateExport,
// } from "../services/exportService";

// import Layout from "../components/Layout";

// const ExportPage = () => {
//   const [code, setCode] = useState("");
//   const [quantity, setQuantity] = useState(1);

//   const [message, setMessage] = useState(null);
//   const [error, setError] = useState(null);

//   const [rows, setRows] = useState([]);

//   const [scan, setScan] = useState(false);

//   // ================= LẤY LỊCH SỬ =================
//   const fetchHistory = async () => {
//     try {
//       const res = await getExportHistory();

//       const formatted = res.data.map((item) => ({
//         id: item._id,
//         name: item.name,
//         quantity: item.quantity,
//         exportedBy: item.exportedBy || "Không rõ",
//         attributes: item.attributes
//           ?.map((a) => `${a.key}: ${a.value}`)
//           .join(" | "),
//         createdAt: item.createdAt
//           ? new Date(item.createdAt).toLocaleString()
//           : "",
//       }));

//       setRows(formatted);
//     } catch (err) {
//       console.error("Lỗi tải lịch sử xuất", err);
//     }
//   };

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   // ================= XUẤT HÀNG =================
//   const handleSubmit = async (scanCode = null) => {
//     try {
//       setError(null);
//       setMessage(null);

//       const exportCode = scanCode || code;

//       await createExport({
//         code: exportCode,
//         quantity: 1, // 🔥 mặc định xuất 1 khi quét
//         user: localStorage.getItem("user"),
//       });

//       setMessage("Xuất hàng thành công");

//       setCode("");
//       setQuantity(1);

//       fetchHistory();
//     } catch (err) {
//       setError(err.response?.data?.message || "Lỗi xuất hàng");
//     }
//   };

//   // ================= QR SCAN =================
//   const startScanner = () => {
//     setScan(true);

//     setTimeout(() => {
//       const scanner = new Html5QrcodeScanner(
//         "qr-reader",
//         { fps: 10, qrbox: 250 },
//         false
//       );

//       scanner.render(
//         async (decodedText) => {
//           scanner.clear();
//           setScan(false);

//           // 🔥 QUÉT XONG → XUẤT LUÔN
//           await handleSubmit(decodedText);
//         },
//         () => {}
//       );
//     }, 200);
//   };

//   // ================= XÓA =================
//   const handleDelete = async (id) => {
//     if (!window.confirm("Bạn có chắc muốn xóa?")) return;

//     await deleteExport(id);
//     fetchHistory();
//   };

//   // ================= SỬA =================
//   const handleEdit = async (row) => {
//     const newQuantity = prompt("Nhập số lượng mới:", row.quantity);

//     if (!newQuantity) return;

//     try {
//       await updateExport(row.id, {
//         quantity: newQuantity,
//       });

//       fetchHistory();
//     } catch (err) {
//       alert(err.response?.data?.message || "Lỗi cập nhật");
//     }
//   };

//   // ================= COLUMNS =================
//   const columns = [
//     { field: "name", headerName: "Mã sản phẩm", flex: 1 },
//     { field: "attributes", headerName: "Thuộc tính", flex: 2 },
//     { field: "quantity", headerName: "Số lượng xuất", flex: 1 },
//     { field: "exportedBy", headerName: "Người xuất", flex: 1 },
//     { field: "createdAt", headerName: "Thời gian", flex: 1.5 },

//     {
//       field: "actions",
//       headerName: "Thao tác",
//       flex: 1.5,
//       renderCell: (params) => (
//         <>
//           <Button size="small" onClick={() => handleEdit(params.row)}>
//             Sửa
//           </Button>

//           <Button
//             size="small"
//             color="error"
//             onClick={() => handleDelete(params.row.id)}
//           >
//             Xóa
//           </Button>
//         </>
//       ),
//     },
//   ];

//   return (
//     <Layout>
//       <Container>
//         {/* FORM XUẤT */}
//         <Typography variant="h4" mt={4} mb={3}>
//           Xuất hàng
//         </Typography>

//         <Box display="flex" gap={2} mb={3}>
//           <TextField
//             label="Mã sản phẩm"
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//           />

//           <TextField
//             label="Số lượng"
//             type="number"
//             value={quantity}
//             onChange={(e) => setQuantity(e.target.value)}
//           />

//           <Button variant="contained" onClick={() => handleSubmit()}>
//             Xuất
//           </Button>

//           {/* QUÉT QR */}
//           <Button variant="outlined" onClick={startScanner}>
//             Quét QR
//           </Button>
//         </Box>

//         {/* CAMERA */}
//         {scan && (
//           <Box mb={3}>
//             <div id="qr-reader" style={{ width: "300px" }} />
//           </Box>
//         )}

//         {message && <Alert severity="success">{message}</Alert>}
//         {error && <Alert severity="error">{error}</Alert>}

//         {/* LỊCH SỬ */}
//         <Typography variant="h5" mt={5} mb={2}>
//           Lịch sử xuất hàng
//         </Typography>

//         <Box sx={{ height: 500, width: "100%" }}>
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             pageSizeOptions={[5, 10, 20]}
//             initialState={{
//               pagination: {
//                 paginationModel: { pageSize: 5, page: 0 },
//               },
//             }}
//           />
//         </Box>
//       </Container>
//     </Layout>
//   );
// };

// export default ExportPage;
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

import {
  createExport,
  getExportHistory,
  deleteExport,
  updateExport,
} from "../services/exportService";

import Layout from "../components/Layout";

const ExportPage = () => {
  const [code, setCode] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const [rows, setRows] = useState([]);

  const [scan, setScan] = useState(false);

  // ================= LẤY LỊCH SỬ =================
  const fetchHistory = async () => {
    try {
      const res = await getExportHistory();

      const formatted = res.data.map((item) => ({
        id: item._id,
        name: item.name,
        quantity: item.quantity,
        exportedBy: item.exportedBy || "Không rõ",
        attributes: item.attributes
          ?.map((a) => `${a.key}: ${a.value}`)
          .join(" | "),
        createdAt: item.createdAt
          ? new Date(item.createdAt).toLocaleString()
          : "",
      }));

      setRows(formatted);
    } catch (err) {
      console.error("Lỗi tải lịch sử xuất", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // ================= XUẤT HÀNG =================
  const handleSubmit = async (scanCode = null) => {
    try {
      setError(null);
      setMessage(null);

      const exportCode = scanCode || code;

      await createExport({
        code: exportCode,
        quantity: scanCode ? 1 : Number(quantity), // 🔥 FIX QUAN TRỌNG
        user: localStorage.getItem("user"),
      });

      setMessage("Xuất hàng thành công");

      setCode("");
      setQuantity(1);

      fetchHistory();
    } catch (err) {
      setError(err.response?.data?.message || "Lỗi xuất hàng");
    }
  };

  // ================= QR SCAN =================
  const startScanner = () => {
    setScan(true);

    setTimeout(() => {
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: 250 },
        false
      );

      scanner.render(
        async (decodedText) => {
          scanner.clear();
          setScan(false);

          // 🔥 Quét xong xuất luôn
          await handleSubmit(decodedText);
        },
        () => {}
      );
    }, 200);
  };

  // ================= XÓA =================
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa?")) return;

    await deleteExport(id);
    fetchHistory();
  };

  // ================= SỬA =================
  const handleEdit = async (row) => {
    const newQuantity = prompt("Nhập số lượng mới:", row.quantity);

    if (!newQuantity) return;

    try {
      await updateExport(row.id, {
        quantity: newQuantity,
      });

      fetchHistory();
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi cập nhật");
    }
  };

  // ================= COLUMNS =================
  const columns = [
    { field: "name", headerName: "Mã sản phẩm", flex: 1 },
    { field: "attributes", headerName: "Thuộc tính", flex: 2 },
    { field: "quantity", headerName: "Số lượng xuất", flex: 1 },
    { field: "exportedBy", headerName: "Người xuất", flex: 1 },
    { field: "createdAt", headerName: "Thời gian", flex: 1.5 },

    {
      field: "actions",
      headerName: "Thao tác",
      flex: 1.5,
      renderCell: (params) => (
        <>
          <Button size="small" onClick={() => handleEdit(params.row)}>
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
          Xuất hàng
        </Typography>

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

          <Button variant="contained" onClick={() => handleSubmit()}>
            Xuất
          </Button>

          <Button variant="outlined" onClick={startScanner}>
            Quét QR
          </Button>
        </Box>

        {scan && (
          <Box mb={3}>
            <div id="qr-reader" style={{ width: "300px" }} />
          </Box>
        )}

        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        <Typography variant="h5" mt={5} mb={2}>
          Lịch sử xuất hàng
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

export default ExportPage;