import "./App.css";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Typo from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Autocomplete, Card, ListItem, TextField } from "@mui/material";
import { SpeedInsights } from "@vercel/speed-insights/react";

function Home() {
  const [dogs, setDogs] = useState([]);

  const [options, setOptions] = useState([]);
  //const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  const fetchDogData = async () => {
    try {
      const res = await fetch("https://api.thedogapi.com/v1/breeds");
      const data = await res.json();
      const names = data.map((item) => item.name); // Extract names
      setOptions(names);
      setDogs(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDogData();
  }, []);

  const searchForDog = async (e) => {
    try {
      const res = await fetch(
        `https://api.thedogapi.com/v1/breeds/search?q=${e}`
      );
      const data = await res.json();
      setDogs(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    console.log(e);

    searchForDog(e);
    //setSearched(true);
  };

  const handleClick = (text) => {
    navigate(`/info/${text}`);
  };

  return (
    <>
      <Container>
        <SpeedInsights />
        <Box sx={{ m: 2 }}>
          <Typo variant="h2">Welcome to Dog Info.</Typo>
        </Box>
        <Card sx={{ m: 2 }}>
          <Autocomplete
            sx={{ m: 1 }}
            disablePortal
            id="combo-box-demo"
            options={options}
            onChange={(e, newValue) => handleSubmit(newValue)}
            renderInput={(options) => (
              <TextField {...options} label="Dogs Breed" />
            )}
          />
        </Card>
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          {dogs.map((item) => {
            return (
              <Grid key={item.id} item>
                <Paper
                  onClick={() => {
                    handleClick(item.name);
                  }}
                  sx={{
                    height: 200,
                    width: 128,
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                  }}
                >
                  <img
                    style={{ width: 128, height: 120 }}
                    //https://cdn2.thedogapi.com/images/BJa4kxc4X_1280.jpg, https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg
                    src={
                      "https://cdn2.thedogapi.com/images/" +
                      item.reference_image_id +
                      ".jpg"
                    }
                    alt={item.name}
                  />

                  <ListItem>{item.name}</ListItem>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}

export default Home;
