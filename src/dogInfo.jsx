import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DogInfo() {
  const [dogs, setDogs] = useState([]);
  const { text } = useParams();

  const searchForDog = async () => {
    try {
      const res = await fetch(
        `https://api.thedogapi.com/v1/breeds/search?q=${text}`
      );
      const data = await res.json();
      console.log(data);
      setDogs(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    searchForDog(text);
  }, []);
  return (
    <>
      <Container>
        {dogs.map((item) => {
          return (
            <Card key={item.id}>
              <Grid2
                display={"flex"}
                flexDirection={"column"}
                flexWrap={"wrap"}
                alignContent={"center"}
                justifyContent={"center"}
                spacing={2}
              >
                <Typography gutterBottom variant="h3" component="div">
                  {item.name}
                </Typography>
                <CardMedia>
                  <img
                    style={{ width: 320, height: 320 }}
                    //https://cdn2.thedogapi.com/images/BJa4kxc4X_1280.jpg, https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg
                    src={
                      "https://cdn2.thedogapi.com/images/" +
                      item.reference_image_id +
                      ".jpg"
                    }
                    alt={item.name}
                  />
                </CardMedia>
                <Typography variant="body" textTransform={"capitalize"}>
                  breed for : {item.bred_for}
                </Typography>
                <Typography textTransform={"capitalize"}>
                  breed group : {item.breed_group}
                </Typography>
                <Typography textTransform={"capitalize"}>
                  country code : {item.country_code}
                </Typography>
                <Typography textTransform={"capitalize"}>
                  life span : {item.life_span}
                </Typography>
                <Typography textTransform={"capitalize"}>
                  temperament : {item.temperament}
                </Typography>
                <Typography textTransform={"capitalize"}>
                  weight : {item.weight.metric} Kgs
                </Typography>
                <Typography textTransform={"capitalize"}>
                  height : {item.height.metric} cm
                </Typography>
              </Grid2>
            </Card>
          );
        })}
        <Button sx={{ m: 1 }} variant="outlined" href="/">
          Back
        </Button>
      </Container>
    </>
  );
}
export default DogInfo;
