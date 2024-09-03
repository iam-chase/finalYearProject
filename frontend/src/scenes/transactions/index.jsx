import React, { useState } from "react";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api"; // Your existing query hook to fetch data
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import axios from "axios"; // Import axios for making requests

const Transactions = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ userId: "", products: "", cost: "" });

  // Use hook to fetch transactions data
  const { data, isLoading, refetch } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const handleAddTransactionClick = () => {
    setShowForm(!showForm); // Toggle form visibility
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send new transaction data to the backend
      await axios.post("http://localhost:5000/transactions", formData);
      alert("Transaction added successfully!");

      // Reset form fields and hide the form
      setFormData({ userId: "", products: "", cost: "" });
      setShowForm(false);

      // Refetch the transactions data to update the grid
      refetch();
    } catch (error) {
      console.error(error.response ? error.response.data.error : error.message);
      alert("Failed to add transaction. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "userId", headerName: "User ID", flex: 1 },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />

      {/* Add Transaction Button */}
      <Box display="flex" justifyContent="space-between" mb="1rem">
        <Box></Box>
        <Button variant="contained" color="primary" onClick={handleAddTransactionClick}>
          {showForm ? "Cancel" : "Add Transaction"}
        </Button>
      </Box>

      {/* Conditional Rendering of Add Transaction Form */}
      {showForm && (
        <Box component="form" onSubmit={handleSubmit} mb="1rem">
          <TextField
            label="User ID"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Products"
            name="products"
            value={formData.products}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Cost"
            name="cost"
            type="number"
            value={formData.cost}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      )}

      {/* DataGrid */}
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.transactions) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default Transactions;
