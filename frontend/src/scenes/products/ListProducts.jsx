import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Button, Collapse, Box } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [expanded, setExpanded] = useState(null); // Track which product is expanded
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/products');
        setProducts(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`); // Redirect to update product page
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      <List>
        {products.map(product => (
          <ListItem key={product._id} sx={{ marginBottom: '1rem', boxShadow: 3, borderRadius: 2, padding: 2 }}>
            <ListItemText
              primary={product.name}
              secondary={`Price: $${product.price}`}
            />
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ marginRight: '1rem' }} 
              onClick={() => toggleExpand(product._id)}
            >
              {expanded === product._id ? <ExpandLess /> : <ExpandMore />} 
              {expanded === product._id ? 'See Less' : 'See More'}
            </Button>
            <Button 
              variant="contained" 
              color="secondary" 
              sx={{ marginRight: '1rem' }} 
              onClick={() => handleUpdate(product._id)}
            >
              Update
            </Button>
            <Button 
              variant="contained" 
              color="error" 
              onClick={() => handleDelete(product._id)}
            >
              Delete
            </Button>
            <Collapse in={expanded === product._id} timeout="auto" unmountOnExit>
              <Box sx={{ marginTop: '1rem' }}>
                <Typography variant="body2">
                  <strong>Description:</strong> {product.description}
                </Typography>
                <Typography variant="body2">
                  <strong>Category:</strong> {product.category}
                </Typography>
                <Typography variant="body2">
                  <strong>Rating:</strong> {product.rating}
                </Typography>
                <Typography variant="body2">
                  <strong>Supply:</strong> {product.supply}
                </Typography>
              </Box>
            </Collapse>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ProductList;
