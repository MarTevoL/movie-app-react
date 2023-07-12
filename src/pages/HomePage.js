import React, { useState, useEffect,  } from "react";
import { Alert, Box, Container, Stack } from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import MovieFilter from "../components/MovieFilter";
import MovieSearch from "../components/MovieSearch";
import MovieList from "../components/MovieList";
import { FormProvider } from "../components/form";
import apiService from "../app/apiService";
import { genreNumber } from "../ultils";
import GenreMovieList from "../components/GenreMovieList";


function HomePage() {


  const methods = useForm();
 
  

 

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
        {/* <MovieList/> */}
        <GenreMovieList/>
      </Stack>
    </Container>
  );
}





export default HomePage;