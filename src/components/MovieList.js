import React, { useContext, useState, useEffect } from 'react';
import { Grid,Box, Alert } from "@mui/material";
import MovieCard from "./MovieCard";
import apiService from '../app/apiService';
import LoadingScreen from "../components/LoadingScreen";
import Pagination from '@mui/material/Pagination';

function MovieList() {

  const [movies, setMovies] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const pageCount = 500; // "page must be less than or equal to 500"

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(`/movie/popular`,{
          params : {
            page: pageNum,
          }
        });
        setMovies(res.data.results);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getMovies();
  }, [pageNum]);


  const PaginationBox = () => {
    return (
      <Box sx={{display:"flex",justifyContent:"center"}}>
      <Pagination page={pageNum} onChange={(e,page) => {
        setPageNum(page);
        }} count={pageCount} shape="rounded" color="primary" variant="outlined"/>
</Box>
    );
  }

  return (
    <>
    <PaginationBox/>
        <Box sx={{ position: "relative", height: 1 , marginTop: "10px", marginBottom: "20px"}}>
     {loading ? (
       <LoadingScreen />
       ) : (
         <>
              {error ? (
                <Alert severity="error">{error}</Alert>
                ) : (
                  <Box>

                <Grid container spacing={2} mt={1}>
                  {movies.map((movie, index) => (
                    <Grid key={movie.id} item xs={6} md={4} lg={3}>
                      <MovieCard movie={movie} />
                    </Grid>
                  ))}
                </Grid>
            
                  </Box>
              )}
            </>
          )}
          </Box>
          <PaginationBox/>
          </>
   
  );
}

export default MovieList;