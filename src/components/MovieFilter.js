import { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FMultiCheckbox, FRadioGroup } from "./form";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import apiService from "../app/apiService";
import LoadingScreen from "./LoadingScreen";

export const SORT_BY_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "priceDesc", label: "Price: High-Low" },
  { value: "priceAsc", label: "Price: Low-High" },
];

export const FILTER_GENDER_OPTIONS = ["Men", "Women", "Kids"];

export const FILTER_CATEGORY_OPTIONS = [
  "All",
  "Shose",
  "Apparel",
  "Accessories",
];

export const FILTER_PRICE_OPTIONS = [
  { value: "below", label: "Below $25" },
  { value: "between", label: "Between $25 - $75" },
  { value: "above", label: "Above $75" },
];

function MovieFilter({ resetFilter }) {
const [genres, setGenres] = useState(null);
  const [loading, setLoading] = useState(true);

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
      {/* <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Gender
        </Typography>
        <FMultiCheckbox
          name="gender"
          options={FILTER_GENDER_OPTIONS}
          sx={{ width: 1 }}
        />
      </Stack> */}
        {loading ? (
          <LoadingScreen/> 
        ) : (
           <Stack spacing={1}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Genres
          </Typography>
          <FRadioGroup
            name="genres"
            options={genres.map((genre) => genre.name)}
            
            row={false}
            />
        </Stack>
        )}
        
      

      {/* <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Price
        </Typography>
        <FRadioGroup
          name="priceRange"
          options={FILTER_PRICE_OPTIONS.map((item) => item.value)}
          getOptionLabel={FILTER_PRICE_OPTIONS.map((item) => item.label)}
        />
      </Stack> */}

      <Box>
        <Button
          size="large"
          type="submit"
          color="inherit"
          variant="outlined"
          onClick={() => resetFilter()}
          startIcon={<ClearAllIcon />}
        >
          Clear All
        </Button>
      </Box>
    </Stack>
  );
}

export default MovieFilter;