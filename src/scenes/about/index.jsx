import MealSpotterLogoDarkMode from "../../assets/mealspotterdarkmode.svg";
import MealSpotterLogoLightMode from "../../assets/mealspotterlightmode.svg";
import React from "react";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import "./about.css"
import { tokens } from "../../theme";
import {useTheme } from "@mui/material";
import Grid from '@mui/material/Grid';
import Profile from "../../assets/profile.png"
//import Logo from "../../assets/SoundBendorLogo.png"
import GitHubIcon from '@mui/icons-material/GitHub';
import { IconButton } from '@mui/material';

const About = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Container fixed>
            <div>
                {theme.palette.mode === "dark" ? (
                    <img src={MealSpotterLogoDarkMode} alt="mealspotter.svg" class="logo" />
                ) : (
                    <img src={MealSpotterLogoLightMode} alt="mealspotter.svg" class="logo" />
                )}
            </div>
            <h1>Food Image Data Collection</h1>
            <Box sx={{ width: 1000, margin: 'auto' }}>
                <p class="about">
                    <span>Meal Spotter </span> streamlines nutritional tracking for the healthcare industry using pictures of food. As part of soundbendor, Meal Spotter is an online dashboard that allows medical professionals to
                    intuitively keep track of information such as patient, food, and statistical trends. Using machine
                    learning, Meal Spotter can dynamically display data extracted from a single image. Tedious tasks
                    such recording the percentage of food a patient has eaten can now be automated, providing more
                    consistent and accurate information for everyone.
                </p>
            </Box>

            <Box sx={{ width: '100%', height: "700px", marginTop: "50px" }}>
                <h1 class="team">About the Team Members</h1>
                <Grid container paddingLeft="10px" paddingRight="60px" justify="space-around" className="team-grid" autoHeight>
                    <Grid item xs={6} className="member">
                        <div class="column">
                            <img src={Profile} alt="mealspotter.svg" class="logo" />
                        </div>
                        <div class="column">
                            <h1 class="name"> Jayson Kildea </h1>
                            <h2 class="role"> Back-end Development / Full-stack Communication</h2>
                            <h2 class="contact">kildeaj@oregonstate.edu</h2>
                            <p class="intro"> Set up system components using AWS, including the Web server, Middleware server, and Database. Developed methodology and implementation for full-stack communication.</p>
                        </div>

                    </Grid>
                    <Grid item xs={6} className="member">
                        <div class="column">
                            <img src={Profile} alt="mealspotter.svg" class="logo" />
                        </div>
                        <div class="column">
                            <h1 class="name"> Luke Reynolds</h1>
                            <h2 class="role"> Front-end Development / UI Designer</h2>
                            <h2 class="contact"> reynollu@oregonstate.edu</h2>
                            <p class="intro"> Worked with React JS, Nivo Charts, and Material UI to set up the website/dashboard. Collaborated with team in order to connect both to ensure full stack functionality.</p>
                        </div>
                    </Grid>
                    <Grid item xs={6} className="member">
                        <div class="column">
                            <img src={Profile} alt="mealspotter.svg" class="logo" />
                        </div>
                        <div class="column">
                            <h1 class="name"> Himanshu Dhir</h1>
                            <h2 class="role"> Database Administrator</h2>
                            <h2 class="contact">dhirh@oregonstate.edu</h2>
                            <p class="intro"> Worked with MYSQL to store all the important data such as users and Food Items.</p>
                        </div>
                    </Grid>
                    <Grid item xs={6} className="member">
                        <div class="column">
                            <img src={Profile} alt="mealspotter.svg" class="logo" />
                        </div>
                        <div class="column">
                            <h1 class="name"> Chih Yun Wu</h1>
                            <h2 class="role"> Front-end Development</h2>
                            <h2 class="contact">wuchihy@oregonstate.edu</h2>
                            <p class="intro"> Worked with React JS and React component libraries to build web application and to create interactive user interfaces.</p>
                        </div>
                    </Grid>
                </Grid>

                <div class="footer">
                    <h3 class="info">MealSpotter is owned by Soundbendor and is part of Oregon State University <a class="info" href="https://soundbendor.org">(https://soundbendor.org)</a></h3>
                    <h3 class="info">Visit our GitHub <IconButton href="https://github.com/Soundbendor/food-image-dashboard" color="primary"> <GitHubIcon fontSize="large" style={{ color: 'black' }} /></IconButton> </h3>
                </div>
            </Box>


        </Container>

    );
}

export default About;
