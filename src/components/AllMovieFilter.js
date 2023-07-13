import { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FMultiCheckbox, FRadioGroup } from "./form";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import apiService from "../app/apiService";
import LoadingScreen from "./LoadingScreen";
import { useForm } from "react-hook-form";
import { CloseFullscreen } from "@mui/icons-material";





function AllMovieFilter() {


const allMovie = ["allMovie"];
 
  

  return (
    <Stack spacing={3} sx={{ p: 3, width: 250 }}>
      
       
        <Stack spacing={1}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            All Movie
          </Typography>
          {/* <FMultiCheckbox name="genres" options={genres.map((genre) => genre.name)}/> */}
          <FRadioGroup
            name="allMovie"
            options={allMovie.map((movie) => movie )}
            
            row={false}
            />
        </Stack>
        
        
      


      
    </Stack>
  );
}

export default AllMovieFilter;