import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const Home = () => {
  const [cats, setCats] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchCatData = async () => {
      try {
        const res = await fetch("https://api.thecatapi.com/v1/breeds");
        const data = await res.json();
        setCats(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCatData();
  }, []);

  const searchForCat = async () => {
    try {
      const res = await fetch(
        `https://api.thecatapi.com/v1/breeds/search?q=${text}`
      );
      const data = await res.json();
      setCats(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchForCat();
  };

  return (
    <>
      {!cats ? (
        <Typography
          variant="h3"
          align="center"
          color="textPrimary"
          sx={{ py: 10 }}
        >
          Loading...
        </Typography>
      ) : (
        <Container sx={{ py: 4 }}>
          <Box textAlign="center">
            <Typography variant="h3" component="h1" gutterBottom>
              The Cat Breed
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              This Application is Powered By{" "}
              <a
                href="https://thedogapi.com"
                style={{ textDecoration: "underline", color: "blue" }}
              >
                The Cat App
              </a>
            </Typography>
            <form onSubmit={handleSubmit} autoComplete="off">
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search For Cat Breed"
                value={text}
                onChange={(e) => setText(e.target.value)}
                sx={{ mb: 4 }}
              />
            </form>
          </Box>
          <Grid container spacing={4}>
            {cats.map((cat, i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <Card
                  component={Link}
                  to={`/${cat.name}`}
                  sx={{ textDecoration: "none" }}
                >
                  <CardMedia
                    component="img"
                    image={`https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`}
                    alt={cat.name}
                    sx={{ height: 240 }}
                  />
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {cat.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      They're Very Good at Being {cat.temperament}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </>
  );
};

export default Home;
