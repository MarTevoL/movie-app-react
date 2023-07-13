import {  Stack, Typography } from "@mui/material";
import {  FRadioGroup } from "./form";





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