import { useEffect, useState } from "react";
import {
  Card,
  Grid,
  Container,
  Typography,
  Box,
  Stack,
  Rating,
  Divider,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";
import CreditList from "../components/CreditList";
import MovieImageList from "../components/MovieImageList";
import { Alert } from "@mui/material";

const url = "https://image.tmdb.org/t/p/w500";

function DetailPage() {
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      const getMovie = async () => {
        setLoading(true);
        try {
          const res = await apiService.get(`/movie/${params.id}`);
          setMovie(res.data);
          setError("");
        } catch (error) {
          console.log(error);
          setError(error.message);
        }
        setLoading(false);
      };
      getMovie();
    }
  }, [params]);

  useEffect(() => {
    if (params.id) {
      const getCredits = async () => {
        setLoading(true);
        try {
          const res = await apiService.get(`/movie/${params.id}/credits`);
          console.log("res", res);
          setCredits(res.data.cast);
          setError("");
        } catch (error) {
          console.log(error);
          setError(error.message);
        }
        setLoading(false);
      };
      getCredits();
    }
  }, [params]);


  useEffect(() => {
    if (params.id) {
      const getImages = async () => {
        setLoading(true);
        try {
          const res = await apiService.get(`/movie/${params.id}/images`);
          setImages(res.data.backdrops);
          setError("");
        } catch (error) {
          console.log(error);
          setError(error.message);
        }
        setLoading(false);
      };
      getImages();
    }
  }, [params]);

console.log("credit", credits);

  return (
    <Container sx={{ my: 3 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          Movies
        </Link>
        <Typography color="text.primary">{movie?.original_title}</Typography>
      </Breadcrumbs>
      <Box sx={{ position: "relative", height: 1 }}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <>
                {movie && (
                  <Card>
                    <Grid container>
                      <Grid item xs={12} md={6}>
                        <Box p={2}>
                          <Box
                            sx={{
                              borderRadius: 2,
                              overflow: "hidden",
                              display: "flex",
                            }}
                          >
                            <Box
                              component="img"
                              sx={{
                                width: 1,
                                height: 1,
                              }}
                              src={`${url}${movie.backdrop_path}`}
                              alt="product"
                            />
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography
                          variant="h5"
                          sx={{
                            mt: 2,
                            mb: 1,
                            display: "block",
                            textTransform: "uppercase",
                            color:
                               "info.main",
                          }}
                        >
                          {movie.title}
                        </Typography>
                        <Typography variant="h6" paragraph>
                          {movie.tagline}
                        </Typography>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          sx={{ mb: 2 }}
                        >
                          <Rating
                            value={movie.vote_average/2}
                            precision={0.5}
                            readOnly
                          />
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            ({movie.vote_count} reviews)
                          </Typography>
                        </Stack>
                        

                        <Divider sx={{ borderStyle: "dashed" }} />
                        <Box>
                          <ReactMarkdown
                            rehypePlugins={[rehypeRaw]}
                            children={movie.overview}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Card>
                )}
                {!movie && (
                  <Typography variant="h6">404 Product not found</Typography>
                )}
              </>
            )}
          </>
        )}
      </Box>
      <Box sx={{ position: "relative", height: 1 , marginTop: "10px", marginBottom: "20px"}}>

          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <>
                {credits && (
                  <CreditList credits={credits} />)
                }
                </>
              )}
            </>
          )}

      </Box>
      <Box sx={{ position: "relative", height: 1 , marginTop: "10px", marginBottom: "20px"}}>

          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <>
                {images && (
                  <MovieImageList itemData={images} />)
                }
                </>
              )}
            </>
          )}

      </Box>
    </Container>
  );
}

export default DetailPage;