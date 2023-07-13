import React  from 'react';
import { Grid,Box} from "@mui/material";
import CreditCard from './CreditCard';

function CreditList({ credits }) {
const first12Cast = credits.slice(0,12);
  return (
    <Box>

    <Grid container spacing={1} mt={1}>
      {first12Cast.map((credit, index) => (
        <Grid key={credit.id} item xs={3} md={2} lg={2}>
          <CreditCard credit={credit} />
        </Grid>
      ))}
    </Grid>

      </Box>
  );
}

export default CreditList;

