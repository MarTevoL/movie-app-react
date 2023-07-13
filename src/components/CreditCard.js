import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack } from "@mui/material";

const url = "https://image.tmdb.org/t/p/w500";

function CreditCard({ credit }) {
  return (
    <Card >
      <CardActionArea>
        <CardMedia
          component="img"
          
          image={`${url}${credit.profile_path}`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="Button text" component="h3" noWrap>
            {credit.name}
          </Typography>
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            justifyContent="flex-start"
          >
            <Typography variant="subtitle2">
              {credit.character}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CreditCard;