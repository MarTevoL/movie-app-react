import { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FMultiCheckbox, FRadioGroup } from "./form";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import apiService from "../app/apiService";
import LoadingScreen from "./LoadingScreen";
import { useForm } from "react-hook-form";
import { CloseFullscreen } from "@mui/icons-material";





function MovieFilter() {
const [genres, setGenres] = useState(null);
const [loading, setLoading] = useState(true);

// const methods = useForm()
// const {watch} = methods;

// const filter = watch();

  useEffect(() => {
    const getGenres = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(`/genre/movie/list`);
        setGenres(res.data.genres);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getGenres();
  }, []);
  
  console.log(genres);

  return (
    <Stack spacing={3} sx={{ p: 3, width: 250 }}>
      
        {loading ? (
          <LoadingScreen/> 
        ) : (
           <Stack spacing={1}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Genres
          </Typography>
          <FMultiCheckbox name="genres" options={genres.map((genre) => genre.name)}/>
          {/* <FRadioGroup
            name="genres"
            options={genres.map((genre) => genre.name)}
            
            row={false}
            /> */}
        </Stack>
        )}
        
      


      
    </Stack>
  );
}

export default MovieFilter;