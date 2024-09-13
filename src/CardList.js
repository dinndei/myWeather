import React from "react";
import Card from "./Card";
import { Grid, Container, Typography } from "@mui/material";
const CardList = () => {
let cityArr=["Eilat","Alaska","New York","London"];
    return (
    
        <Container>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
         מזג אוויר ברחבי העולם
        </Typography>
        <Grid container spacing={8}>
          {cityArr.map((item, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card city={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
}

export default CardList;