import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    rating: '',
    supply: ''
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/products', product);
      alert(res.data.msg);
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Create Product
      </Typography>
      <TextField
        label="Name"
        name="name"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />
      <TextField
        label="Description"
        name="description"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />
      <TextField
        label="Category"
        name="category"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />
      <TextField
        label="Rating"
        name="rating"
        type="number"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />
      <TextField
        label="Supply"
        name="supply"
        type="number"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: '1rem' }}>
        Create Product
      </Button>
    </Box>
  );
};

export default CreateProduct;
