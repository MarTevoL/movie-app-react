import React, { useContext, useState, useEffect } from 'react';
import { Grid,Box, Alert } from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import MovieCard from "./MovieCard";
import apiService from '../app/apiService';
import LoadingScreen from "../components/LoadingScreen";
import Pagination from '@mui/material/Pagination';
import { genreNumber } from "../ultils";

function GenreMovieList() {

  const [movies, setMovies] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(true);
  const [genreNum, setGenreNum] = useState()
  const [error, setError] = useState("");
  const pageCount = 500; // "page must be less than or equal to 500"const methods = useForm();

  const methods = useForm();
  const { watch } = methods;
  const filter = watch("genres");

  useEffect(() => {
    const getMoviesWithGenre = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(`/discover/movie`,{
          params : {
            with_genres: genreNum,
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
    getMoviesWithGenre();
  }, [genreNum,pageNum]);

  useEffect(() => {
    setGenreNum(genreNumber(filter))
  },[filter])


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

export default GenreMovieList;