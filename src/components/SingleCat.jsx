import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

export const SingleCat = () => {
  const [cat, setCat] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    const fetchSingleCatData = async () => {
      try {
        const res = await fetch(
          `https://api.thecatapi.com/v1/breeds/search?q=${name}`
        );
        const data = await res.json();
        setCat(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSingleCatData();
  }, [name]);

  return (
    <Container sx={{ py: 4 }}>
      {cat.map((item, i) => (
        <Grid
          container
          spacing={4}
          key={i}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                image={`https://cdn2.thecatapi.com/images/${item.reference_image_id}.jpg`}
                alt={item.name}
                sx={{ borderRadius: 1 }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h3" component="h1" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                  {item.description}
                </Typography>
                <ul>
                  <li>
                    <Typography variant="body1">
                      <strong>Behaviour: </strong>
                      {item.temperament}
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <strong>Weight: </strong>
                      {item.weight.metric} Kgs
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <strong>Origin: </strong>
                      {item.origin}
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <strong>Life-Span: </strong>
                      {item.life_span}
                    </Typography>
                  </li>
                </ul>
                <Button
                  component={Link}
                  to="/"
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  &larr; BACK
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ))}
    </Container>
  );
};

export default SingleCat;
