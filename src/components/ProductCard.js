import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import IMG_URL from "../app/config"

const url = "https://image.tmdb.org/t/p/w500";

function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/product/${product.id}`)}>
      <CardActionArea>
        <CardMedia
          component="img"
          
          image={`${url}${product.poster_path}`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="Button text" component="h3" noWrap>
            {product.original_title}
          </Typography>
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Typography variant="subtitle1">
              {product.vote_average}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;