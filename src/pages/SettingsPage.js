import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  IconButton,
  Grid,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import Layout from "../components/Layout";
import {
  createObject,
  getObjects,
  updateObject,
  deleteObject,
} from "../services/objectService";

function SettingsPage() {
  const [name, setName] = useState("");
  const [attributes, setAttributes] = useState([{ key: "", value: "" }]);
  const [objects, setObjects] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchObjects();
  }, []);

  const fetchObjects = async () => {
    const res = await getObjects();
    setObjects(res.data);
  };

  const handleChange = (index, field, value) => {
    const updated = [...attributes];
    updated[index][field] = value;
    setAttributes(updated);
  };

  const addAttribute = () => {
    setAttributes([...attributes, { key: "", value: "" }]);
  };

  const removeAttribute = (index) => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const cleanAttributes = attributes.filter(
      (attr) => attr.key && attr.value
    );

    if (editingId) {
      await updateObject(editingId, {
        name,
        attributes: cleanAttributes,
      });
      setEditingId(null);
    } else {
      await createObject({
        name,
        attributes: cleanAttributes,
      });
    }

    setName("");
    setAttributes([{ key: "", value: "" }]);
    fetchObjects();
  };

  const handleEdit = (obj) => {
    setName(obj.name);
    setAttributes(obj.attributes);
    setEditingId(obj._id);
  };

  const handleDelete = async (id) => {
    await deleteObject(id);
    fetchObjects();
  };

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Cài Đặt
      </Typography>

      {/* FORM */}
      <Paper sx={{ p: 3, mt: 2 }}>
        <TextField
          fullWidth
          label="Tên đối tượng"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />

        {attributes.map((attr, index) => (
          <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
            <Grid item xs={5}>
              <TextField
                fullWidth
                label="Tên thuộc tính"
                value={attr.key}
                onChange={(e) =>
                  handleChange(index, "key", e.target.value)
                }
              />
            </Grid>

            <Grid item xs={5}>
              <TextField
                fullWidth
                label="Giá trị"
                value={attr.value}
                onChange={(e) =>
                  handleChange(index, "value", e.target.value)
                }
              />
            </Grid>

            <Grid item xs={2}>
              <IconButton
                color="error"
                onClick={() => removeAttribute(index)}
              >
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        <Button startIcon={<Add />} onClick={addAttribute}>
          Thêm thuộc tính
        </Button>

        <Button
          variant="contained"
          sx={{ ml: 2 }}
          onClick={handleSubmit}
        >
          {editingId ? "Cập nhật" : "Lưu"}
        </Button>
      </Paper>

      {/* GRID HIỂN THỊ */}
      <Grid container spacing={2} sx={{ mt: 3 }}>
        {objects.map((obj) => (
          <Grid item xs={12} md={6} lg={4} key={obj._id}>
            <Paper sx={{ p: 2 }} elevation={3}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold" }}
                >
                  {obj.name}
                </Typography>

                <Box>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(obj)}
                  >
                    <Edit />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => handleDelete(obj._id)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                  mt: 2,
                }}
              >
                {obj.attributes.map((attr, i) => (
                  <Box
                    key={i}
                    sx={{
                      px: 2,
                      py: 1,
                      bgcolor: "#f5f5f5",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="body2">
                      <strong>{attr.key}:</strong>{" "}
                      {attr.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export default SettingsPage;