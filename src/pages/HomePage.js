import React, { useState, useEffect,  } from "react";
import { Alert, Box, Container, Stack } from "@mui/material";
import MovieFilter from "../components/MovieFilter";
import MovieSearch from "../components/MovieSearch";
import MovieList from "../components/MovieList";
import { FormProvider } from "../components/form";
import { useForm, useWatch } from "react-hook-form";
import apiService from "../app/apiService";
import Pagination from '@mui/material/Pagination';
import LoadingScreen from "../components/LoadingScreen";
import { genreNumber } from "../ultils";


function HomePage() {

  const [movies, setMovies] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [genreNum, setGenreNum] = useState([1])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const defaultValues = {
    
    genres: [],
    
  };
  const methods = useForm({
    defaultValues,
  });

  const pageCount = 500; // "page must be less than or equal to 500"

  const { watch, } = methods;
  const genreFilter = watch("genres");
  // const filterProducts = applyFilter(products, filters);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const res = await apiService.get("/movie/popular",{
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
    console.log(genreNum);
    setGenreNum(genreNumber(genreFilter))
    console.log(genreNum);
    setPageNum(1)
  },[genreFilter])
  

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
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
      <Stack>
        <FormProvider methods={methods}>
          <MovieFilter />
        </FormProvider>
      </Stack>

      <Stack sx={{ flexGrow: 1 }}>
        <FormProvider methods={methods}>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
            mb={2}
          >
            <MovieSearch />
           
          </Stack>
        </FormProvider>
         <PaginationBox/>
        <Box sx={{ position: "relative", height: 1 , marginTop: "10px", marginBottom: "20px"}}>

          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <MovieList movies={movies} />
              )}
            </>
          )}

        </Box>
        <PaginationBox/>
      </Stack>
    </Container>
  );
}





export default HomePage;