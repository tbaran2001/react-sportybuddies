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
import { FaAndroid, FaApple, FaRunning, FaUserFriends, FaMapMarkerAlt, FaShieldAlt } from "react-icons/fa";
import { BiMenuAltRight } from "react-icons/bi";

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
        title: "Algorytm dopasowania sportowego",
        description: "Znajdź partnerów pasujących do Twojego poziomu umiejętności i preferencji sportowych"
    },
    {
        icon: <FaUserFriends size={40} />,
        title: "Filtrowanie według poziomu umiejętności",
        description: "Łącz się z graczami na Twoim poziomie doświadczenia"
    },
    {
        icon: <FaMapMarkerAlt size={40} />,
        title: "Lokalizacje w Twojej okolicy",
        description: "Znajdź sportowych partnerów w pobliżu"
    },
    {
        icon: <FaShieldAlt size={40} />,
        title: "Bezpieczne spotkania",
        description: "Zweryfikowane profile i bezpieczne miejsca spotkań"
    }
];

const testimonials = [
    {
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
        name: "Sarah Johnson",
        sport: "Tenis",
        quote: "Znalazłam idealnego partnera do tenisa w ciągu tygodnia!"
    },
    {
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        name: "Michael Chen",
        sport: "Koszykówka",
        quote: "Wspaniała społeczność miłośników koszykówki."
    },
    {
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
        name: "Emma Wilson",
        sport: "Bieganie",
        quote: "Nigdy więcej nie biegam sama dzięki tej aplikacji."
    }
];

const steps = [
    "Utwórz swój profil",
    "Ustaw preferencje",
    "Dopasuj się do partnerów",
    "Zacznij grać!"
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
                            Znajdź idealnego partnera do aktywności sportowych
                        </Typography>
                        <Typography variant="h5" mb={4}>
                            Łącz się, graj i ciesz się z osobami o podobnych zainteresowaniach
                        </Typography>
                        <StyledButton variant="contained" color="primary" size="large">
                            Zaczynamy!
                        </StyledButton>
                    </Box>
                </Container>
            </HeroSection>

            <Container>
                <Box py={8}>
                    <Typography variant="h3" textAlign="center" mb={6}>
                        Why Choose SportsBuddy
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
                        Jak to działa
                    </Typography>
                    <Stepper activeStep={activeStep} orientation={isMobile ? "vertical" : "horizontal"}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>

                <Box py={8}>
                    <Typography variant="h3" textAlign="center" mb={6}>
                        Co o nas mówią inni
                    </Typography>
                    <Grid container spacing={4}>
                        {testimonials.map((testimonial, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Paper elevation={3} sx={{ p: 3 }}>
                                    <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                                        <Box
                                            component="img"
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            sx={{
                                                width: 100,
                                                height: 100,
                                                borderRadius: "50%",
                                                mb: 2
                                            }}
                                        />
                                        <Typography variant="h6">{testimonial.name}</Typography>
                                        <Typography color="primary" gutterBottom>{testimonial.sport}</Typography>
                                        <Typography>"{testimonial.quote}"</Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>

            <Box bgcolor="primary.main" color="white" py={4}>
                <Container>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" gutterBottom>O SportyBuddies</Typography>
                            <Typography>Łącz się z entuzjastami sportu i znajdź idealne dopasowanie do każdej aktywności.</Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" gutterBottom>Szybkie linki</Typography>
                            <Typography>Polityka prywatności</Typography>
                            <Typography>Warunki korzystania</Typography>
                            <Typography>Skontaktuj się z nami</Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" gutterBottom>Łącz się z nami</Typography>
                            <Typography>Śledź nas w mediach społecznościowych, aby być na bieżąco z nowościami i wydarzeniami społecznościowymi.</Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

        </Box>
    );
};

export default LandingPage;