import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";

function CountryDtls() {
  const { state }: { state: any } = useLocation();
  let navigate = useNavigate();
  return (
    <Container maxWidth="md">
      <Button sx={{ my: 2 }} variant="outlined" onClick={() => navigate("/")}>
        Back
      </Button>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={6}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardMedia component="img" image={state.flags[0]} alt="random" />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {state.name.common}
              </Typography>
              <Typography>
                <strong>population: </strong>
                {state.population}
              </Typography>
              <Typography>
                <strong>demonyms: </strong>
                {state.demonyms?.eng?.f}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CountryDtls;
