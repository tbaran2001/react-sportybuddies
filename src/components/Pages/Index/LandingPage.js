import React, { useState } from "react";
import {
    AppBar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    IconButton,
    Paper,
    Stepper,
    Step,
    StepLabel,
    Typography,
    TextField,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import {FaRunning, FaUserFriends, FaMapMarkerAlt, FaShieldAlt, FaRocketchat} from "react-icons/fa";

const HeroSection = styled(Box)(({ theme }) => ({
    background: `url("https://images.unsplash.com/photo-1517466787929-bc90951d0974") center/cover no-repeat`,
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    position: "relative",
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)"
    }
}));

const FeatureCard = styled(Card)(({ theme }) => ({
    height: "100%",
    transition: "transform 0.3s",
    "&:hover": {
        transform: "translateY(-10px)"
    }
}));

const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: 30,
    padding: "12px 30px",
    fontSize: "1.1rem",
    transition: "transform 0.3s",
    "&:hover": {
        transform: "scale(1.05)"
    }
}));

const features = [
    {
        icon: <FaRunning size={40} />,
        title: "Sports Matching Algorithm",
        description: "Find partners matching your skill level and sports preferences"
    },
    {
        icon: <FaUserFriends size={40} />,
        title: "Skill Level Filtering",
        description: "Connect with players at your experience level"
    },
    {
        icon: <FaMapMarkerAlt size={40} />,
        title: "Location-Based Connections",
        description: "Find sports buddies in your area"
    },
    {
        icon: <FaRocketchat size={40} />,
        title: "Chat!",
        description: "Chat and meet your matches"
    }
];

const steps = [
    "Create your profile",
    "Set your preferences",
    "Match with partners",
    "Start playing!"
];

const LandingPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [activeStep] = useState(0);
    const [email, setEmail] = useState("");

    return (
        <Box style={{backgroundColor:"#162c46", width:"100%"}}>
            <HeroSection>
                <Container>
                    <Box position="relative" color="white" maxWidth={600}>
                        <Typography variant="h2" fontWeight="bold" mb={2}>
                            Find Your Perfect Sports Buddy
                        </Typography>
                        <Typography variant="h5" mb={4}>
                            Connect, Play, Enjoy with Like-Minded Athletes
                        </Typography>
                        <StyledButton variant="contained" color="primary" size="large">
                            Start Matching
                        </StyledButton>
                    </Box>
                </Container>
            </HeroSection>

            <Container>
                <Box py={8}>
                    <Typography variant="h3" textAlign="center" mb={6}>
                        Why SportyBuddies
                    </Typography>
                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <FeatureCard>
                                    <CardContent>
                                        <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                                            {feature.icon}
                                            <Typography variant="h6" my={2}>{feature.title}</Typography>
                                            <Typography color="text.secondary">{feature.description}</Typography>
                                        </Box>
                                    </CardContent>
                                </FeatureCard>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box py={8}>
                    <Typography variant="h3" textAlign="center" mb={6}>
                        How It Works
                    </Typography>
                    <Stepper activeStep={activeStep} orientation={isMobile ? "vertical" : "horizontal"}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
            </Container>

            <Box bgcolor="primary.main" color="white" py={4}>
                <Container>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" gutterBottom>SportyBuddies ®</Typography>
                        </Grid>

                    </Grid>
                </Container>
            </Box>

        </Box>
    );
};

export default LandingPage;