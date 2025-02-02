import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Badge,
    Menu,
    MenuItem,
    Box,
    Avatar, ListItemIcon, Button,
} from "@mui/material";
import { styled } from "@mui/system";
import {
    FaEnvelope,
    FaBell,
    FaUser,
    FaSignOutAlt,
    FaUserCircle,
} from "react-icons/fa";
import { useUser } from "../../contexts/UserProvider";
import {Link, useNavigate} from "react-router-dom";
import {useApi} from "../../contexts/ApiProvider";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: "#162c46",
    backgroundImage: "none",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
}));

const LogoContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
});

const Logo = styled("img")({
    height: "40px",
    width: "40px",
    objectFit: "contain",
});

const IconContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "16px",
});

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { user, logout } = useUser();
    const navigate = useNavigate();
    const api = useApi();

    const [messageCount] = useState();
    const [notificationCount] = useState();

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfileClick = () => {
        navigate("/ProfilePage");
        handleClose();
    };

    const handleLogout = () => {
        logout();
        handleClose();
    };

    const handleSignIn = () => {
        navigate("/login");
    };

    const handleSignUp = () => {
        navigate("/register");
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <StyledAppBar position="static">
                <Toolbar>
                    <LogoContainer sx={{ flexGrow: 1 }}>
                        <Typography
                            variant="h6"
                            component={Link}
                            to="/"
                            sx={{ textDecoration: "none", fontWeight: 600 }}
                        >
                            SportyBuddies
                        </Typography>
                    </LogoContainer>

                    {api.isAuthenticated() ? (
                        <IconContainer>
                            <IconButton
                                aria-label="Show messages"
                            >
                                <Badge badgeContent={messageCount} color="error">
                                    <FaEnvelope size={24} />
                                </Badge>
                            </IconButton>

                            <IconButton
                                aria-label="Show notifications"
                            >
                                <Badge badgeContent={notificationCount} color="error">
                                    <FaBell size={24} />
                                </Badge>
                            </IconButton>

                            <IconButton
                                aria-label="Profile settings"
                                onClick={handleProfileMenuOpen}
                            >
                                <Avatar sx={{ bgcolor: "#1976d2" }}>
                                    <FaUserCircle size={24} />
                                </Avatar>
                            </IconButton>
                        </IconContainer>
                    ) : (
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleSignIn}
                            >
                                Zaloguj się
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSignUp}
                            >
                                Utwórz konto
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </StyledAppBar>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem onClick={handleProfileClick}>
                    <ListItemIcon>
                        <FaUser size={20} />
                    </ListItemIcon>
                    <Typography>Profil</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <FaSignOutAlt size={20} />
                    </ListItemIcon>
                    <Typography>Wyloguj się</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default Navbar;