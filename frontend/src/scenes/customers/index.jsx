import React, { useState } from "react";
import { Box, Button, Modal, TextField, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetCustomersQuery, useAddCustomerMutation, useDeleteCustomerMutation } from "state/api";
import Header from "components/Header";

const Customers = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetCustomersQuery();
  const [addCustomer] = useAddCustomerMutation();
  const [deleteCustomer] = useDeleteCustomerMutation();

  // State for modal and form
  const [openModal, setOpenModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    country: "",
    occupation: "",
    role: ""
  });

  const handleAddCustomer = async () => {
    await addCustomer(newCustomer);
    setOpenModal(false); // Close modal after submission
    setNewCustomer({
      name: "",
      email: "",
      phoneNumber: "",
      country: "",
      occupation: "",
      role: ""
    });
  };

  const handleDeleteCustomer = async (id) => {
    await deleteCustomer(id);
  };

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3"),
    },
    { field: "country", headerName: "Country", flex: 0.4 },
    { field: "occupation", headerName: "Occupation", flex: 1 },
    { field: "role", headerName: "Role", flex: 0.5 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <Button
          color="secondary"
          onClick={() => handleDeleteCustomer(params.row._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      {/* Container for Header and Button */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
        <Header title="CUSTOMERS" subtitle="List of Customers" />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenModal(true)}
        >
          Add New Customer
        </Button>
      </Box>

      <Box mt="40px" height="75vh">
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
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
        />
      </Box>

      {/* Add Customer Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          p="2rem"
          bgcolor={theme.palette.background.alt}
          borderRadius="8px"
          width="300px"
          mx="auto"
          mt="10vh"
          display="flex"
          flexDirection="column"
        >
          <TextField
            label="Name"
            value={newCustomer.name}
            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
            sx={{ mb: "1rem" }}
          />
          <TextField
            label="Email"
            value={newCustomer.email}
            onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
            sx={{ mb: "1rem" }}
          />
          <TextField
            label="Phone Number"
            value={newCustomer.phoneNumber}
            onChange={(e) => setNewCustomer({ ...newCustomer, phoneNumber: e.target.value })}
            sx={{ mb: "1rem" }}
          />
          <TextField
            label="Country"
            value={newCustomer.country}
            onChange={(e) => setNewCustomer({ ...newCustomer, country: e.target.value })}
            sx={{ mb: "1rem" }}
          />
          <TextField
            label="Occupation"
            value={newCustomer.occupation}
            onChange={(e) => setNewCustomer({ ...newCustomer, occupation: e.target.value })}
            sx={{ mb: "1rem" }}
          />
          <TextField
            label="Role"
            value={newCustomer.role}
            onChange={(e) => setNewCustomer({ ...newCustomer, role: e.target.value })}
            sx={{ mb: "1rem" }}
          />
          <Button variant="contained" color="primary" onClick={handleAddCustomer}>
            Submit
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Customers;
