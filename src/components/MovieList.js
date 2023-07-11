import React, { useContext } from 'react';
import { Grid,Box } from "@mui/material";
import MovieCard from "./MovieCard";

function MovieList({ products, loading }) {
  return (
    <Box>

    <Grid container spacing={2} mt={1}>
      {products.map((product, index) => (
        <Grid key={product.id} item xs={6} md={4} lg={3}>
          <MovieCard product={product} />
        </Grid>
      ))}
    </Grid>

      </Box>
  );
}

export default MovieList;