import { Card, CardContent, Container, Grid, Typography, Box, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);

      // Update local state to remove the product
      const updateProducts = products.filter(product => product.id !== id);
      setProducts(updateProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Loading state
  if (loading) {
    return (
      <Container>
        <Typography variant="h6" align="center">Loading products...</Typography>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error" align="center">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          marginBottom: 4,
          fontWeight: 'bold'
        }}
      >
        Simple Card List
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{
                height: '100%',
                position: 'relative',
                overflow: 'visible'
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: 0,
                  paddingTop: '75%',
                  overflow: 'hidden'
                }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,100,100,0.7)'
                    }
                  }}
                  onClick={() => handleDelete(product.id)}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>

              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
