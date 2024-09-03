import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    rating: '',
    supply: ''
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error(error.response.data.error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/products/${id}`, product);
      alert('Product updated successfully!');
      navigate('/');
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Update Product
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={product.name}
        fullWidth
        margin="normal"
        onChange={handleChange}
      />
      <TextField
        label="Price"
        name="price"
        value={product.price}
        type="number"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />
      <TextField
        label="Description"
        name="description"
        value={product.description}
        fullWidth
        margin="normal"
        onChange={handleChange}
      />
      <TextField
        label="Category"
        name="category"
        value={product.category}
        fullWidth
        margin="normal"
        onChange={handleChange}
      />
      <TextField
        label="Rating"
        name="rating"
        value={product.rating}
        type="number"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />
      <TextField
        label="Supply"
        name="supply"
        value={product.supply}
        type="number"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: '1rem' }}>
        Update Product
      </Button>
    </Box>
  );
};

export default UpdateProduct;
