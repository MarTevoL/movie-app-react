import React, { useState, useEffect,  } from "react";
import { Alert, Box,  Container, Stack, Typography } from "@mui/material";
import MovieList from "../components/MovieList";
import apiService from "../app/apiService";
import Pagination from '@mui/material/Pagination';
import LoadingScreen from "../components/LoadingScreen";
import { useParams } from "react-router-dom";


function QueryPage() {

  const [movies, setMovies] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPage, setTotalPage] = useState(500)
  const params = useParams();
  
console.log("query to page",params.query);
  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const res = await apiService.get("/search/movie",{
          params : {
            query: params.query.trim(),
            page: pageNum
            
          }
        });
        setMovies(res.data.results);
        setTotalPage(res.data.total_pages);
        
        setError("");
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    getMovies();
  }, [pageNum,params.query]);







 const PaginationBox = () => {
    return (
      <Box sx={{display:"flex",justifyContent:"center"}}>
      <Pagination page={pageNum} onChange={(e,page) => setPageNum(page)} count={totalPage} shape="rounded" color="primary" variant="outlined"/>
</Box>
    );
  }

  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
      

      <Stack sx={{ flexGrow: 1 }}>
        <Typography variant="h5">{`Results for "${params.query.trim()}" `}</Typography>
        
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





export default QueryPage;