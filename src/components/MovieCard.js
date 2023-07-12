import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const url = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/movie/${movie.id}`)}>
      <CardActionArea>
        <CardMedia
          component="img"
          
          image={`${url}${movie.poster_path}`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="Button text" component="h3" noWrap>
            {movie.original_title}
          </Typography>
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Typography variant="subtitle1">
              {movie.vote_average}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;