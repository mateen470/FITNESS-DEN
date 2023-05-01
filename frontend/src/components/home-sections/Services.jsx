import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Modal,
  Grid,
  Paper,
  Container,
  CardMedia,
} from "@mui/material";
import blogCard from "../../assets/blogCard.svg";
import blogSide from "../../assets/blogSide.svg";
import dietCard from "../../assets/dietCard.svg";
import dietSide from "../../assets/dietSide.svg";
import foodCard from "../../assets/foodCard.svg";
import foodSide from "../../assets/foodSide.svg";
import gymCard from "../../assets/gymCard.svg";
import gymSide from "../../assets/gymSide.svg";
import storeCard from "../../assets/storeCard.svg";
import storeSide from "../../assets/storeSide.svg";
import workoutCard from "../../assets/workoutCard.svg";
import workoutSide from "../../assets/workoutSide.svg";

const cardsData = [
  {
    id: 1,
    title: "Workout Plans",
    description: "Card 1 description",
    expandedContent: `Card 1 expanded content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Quisque vel laoreet sapien. Pellentesque scelerisque massa nec venenatis feugiat. 
      In hac habitasse platea dictumst. Donec dignissim dolor eget neque consectetur, 
      sit amet facilisis libero euismod. Proin ac blandit nisl.`,
    cardImage: workoutCard,
    sideImage: workoutSide,
  },
  {
    id: 2,
    title: "Diet Plans",
    description: "Card 2 description",
    expandedContent: `Card 2 expanded content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Quisque vel laoreet sapien. Pellentesque scelerisque massa nec venenatis feugiat. 
      In hac habitasse platea dictumst. Donec dignissim dolor eget neque consectetur, 
      sit amet facilisis libero euismod. Proin ac blandit nisl.`,
    cardImage: dietCard,
    sideImage: dietSide,
  },
  {
    id: 3,
    title: "Gym Essentials Store",
    description: "Card 3 description",
    expandedContent: `Card 3 expanded content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Quisque vel laoreet sapien. Pellentesque scelerisque massa nec venenatis feugiat. 
      In hac habitasse platea dictumst. Donec dignissim dolor eget neque consectetur, 
      sit amet facilisis libero euismod. Proin ac blandit nisl.`,
    cardImage: storeCard,
    sideImage: storeSide,
  },
  {
    id: 4,
    title: "Fitness Blogs",
    description: "Card 4 description",
    expandedContent: `Card 4 expanded content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Quisque vel laoreet sapien. Pellentesque scelerisque massa nec venenatis feugiat. 
      In hac habitasse platea dictumst. Donec dignissim dolor eget neque consectetur, 
      sit amet facilisis libero euismod. Proin ac blandit nisl.`,
    cardImage: blogCard,
    sideImage: blogSide,
  },
  {
    id: 5,
    title: "Find Gym Nearby",
    description: "Card 5 description",
    expandedContent: `Card 5 expanded content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Quisque vel laoreet sapien. Pellentesque scelerisque massa nec venenatis feugiat. 
      In hac habitasse platea dictumst. Donec dignissim dolor eget neque consectetur, 
      sit amet facilisis libero euismod. Proin ac blandit nisl.`,
    cardImage: gymCard,
    sideImage: gymSide,
  },
  {
    id: 6,
    title: "Find Nutrition Facts",
    description: "Card 5 description",
    expandedContent: `Card 5 expanded content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Quisque vel laoreet sapien. Pellentesque scelerisque massa nec venenatis feugiat. 
      In hac habitasse platea dictumst. Donec dignissim dolor eget neque consectetur, 
      sit amet facilisis libero euismod. Proin ac blandit nisl.`,
    cardImage: foodCard,
    sideImage: foodSide,
  },
];

const CustomCard = ({ data }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  return (
    <Box position="relative">
      <Card
        onClick={handleClick}
        sx={{
          width: "100%",
          height: "100%",
          padding: 2,
          cursor: "pointer",
          borderTopRightRadius: "20%",
          borderBottomLeftRadius: "20%",
          background: "rgba(255, 255, 255, 0.336)",
        }}
      >
        <CardContent>
          <Typography variant="h4" color={"white"}>
            {data.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.description}
          </Typography>
        </CardContent>
      </Card>

      <Modal open={isExpanded} onClose={handleClose} sx={{ border: "none" }}>
        <Paper
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70%",
            height: "70%",
            padding: 2,
            overflowY: "auto",
            border: "none",
            backgroundImage: `url(${data.cardImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          onClick={handleClose}
        >
          <Typography variant="h4" component="div">
            {data.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {data.expandedContent}
          </Typography>
        </Paper>
      </Modal>
    </Box>
  );
};
const Services = () => {
  return (
    <Container>
      <Typography color={"white"} variant="h2" textAlign={"center"} my={4}>
        What we Offer!
      </Typography>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {cardsData.map((data, index) => (
          <React.Fragment key={data.id}>
            {index % 2 === 0 ? (
              <>
                <Grid item xs={6}>
                  <CustomCard data={data} />
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={data.sideImage}
                    style={{
                      width: index === 0 ? "300px" : "250px",
                      height: index === 0 ? "200px" : "250px",
                    }}
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={data.sideImage}
                    style={{
                      width: index === 1 || index === 5 ? "300px" : "250px",
                      height: index === 1 || index === 5 ? "300px" : "250px",
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomCard data={data} />
                </Grid>
              </>
            )}
          </React.Fragment>
        ))}
      </Grid>
    </Container>
  );
};

export default Services;
