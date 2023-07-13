import React, { useState, useEffect,  } from "react";
import { Alert, Box, Button, Container, Stack,Paper } from "@mui/material";
import MovieFilter from "../components/MovieFilter";
import MovieSearch from "../components/MovieSearch";
import MovieList from "../components/MovieList";
import { FormProvider } from "../components/form";
import { useForm } from "react-hook-form";
import apiService from "../app/apiService";
import Pagination from '@mui/material/Pagination';
import LoadingScreen from "../components/LoadingScreen";
import { genreNumber } from "../ultils";
import { useNavigate } from "react-router-dom";


function HomePage() {

  const [movies, setMovies] = useState([]);
  const [pageNumP, setPageNumP] = useState(1);
  const [pageNumQ, setPageNumQ] = useState(1);
  const [pageNumGenMovie, setPageNumGenMovie] = useState(1);
  const [genreNum, setGenreNum] = useState()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPage, setTotalPage] = useState(500)
  const defaultValues = {
    genres: [],
    searchQuery :" ",
  };
  const methods = useForm({
    defaultValues,
  });
  const { watch } = methods;
  const genreFilter = watch("genres");
  const searchQuery = watch("searchQuery");
  
  const isDisplayGenreMovie = !!genreFilter.length;
  const isDisplayQueryMovie = !(searchQuery.trim().length === 0);
  const navigate = useNavigate();

  

  useEffect(()=>{
    setPageNumQ(1);
  },[searchQuery]);

  useEffect(() => {
    if (isDisplayGenreMovie ) {
      return
    }
    const getMovies = async () => {
      setLoading(true);
      try {
        const res = await apiService.get("/movie/popular",{
          params : {
            page: pageNumP,
            
          }
        });
        setMovies(res.data.results);
        setError("");
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    getMovies();
  }, [pageNumP,isDisplayGenreMovie]);

  useEffect(() => {
    if (!isDisplayGenreMovie ) {
     return 
    }
    const getMoviesWithGenre = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(`/discover/movie`,{
          params : {
            with_genres: genreNum,
            page: pageNumGenMovie,
            
          }
        });
        setMovies(res.data.results);
        setError("");
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    getMoviesWithGenre();
  }, [genreNum,pageNumGenMovie,isDisplayGenreMovie]);

  useEffect(() => {
    setGenreNum(genreNumber(genreFilter));
    if (isDisplayGenreMovie ) {
      setPageNumGenMovie(1);
    } else {
      
      setPageNumP(1);
    }
  },[genreFilter,genreNum,isDisplayGenreMovie]);


  function handleSubmitQuery() {
    console.log("query",searchQuery);
    navigate(`/search/${searchQuery}`);
  }




 const PaginationBox = () => {
    return (
      <Box sx={{display:"flex",justifyContent:"center"}}>
      <Pagination page={isDisplayGenreMovie ? pageNumGenMovie : pageNumP} onChange={(e,page) =>{isDisplayGenreMovie ? setPageNumGenMovie(page) : setPageNumP(page)}} count={ isDisplayQueryMovie ? totalPage : 500} shape="rounded" color="primary" variant="outlined"/>
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
            spacing={1}
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent="space-around"
            mb={2}
          ><Paper>

            <MovieSearch />
           <Button variant="text" onClick={()=>handleSubmitQuery()}>Search</Button>
          </Paper>
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