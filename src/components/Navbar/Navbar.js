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
    SwipeableDrawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Avatar,
    useMediaQuery,
    useTheme
} from "@mui/material";
import { styled } from "@mui/system";
import {
    FaBars,
    FaEnvelope,
    FaBell,
    FaUser,
    FaSignOutAlt,
    FaUserCircle
} from "react-icons/fa";
import {useUser} from "../../contexts/UserProvider";
import {useNavigate} from "react-router-dom";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
}));

const LogoContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px"
});

const Logo = styled("img")({
    height: "40px",
    width: "40px",
    objectFit: "contain"
});

const IconContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "16px"
});

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { user, logout } = useUser();
    const navigate = useNavigate();

    const [messageCount] = useState(3);
    const [notificationCount] = useState(5);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfileClick = () => {
        navigate("/profile");
        handleClose();
    };

    const handleLogout = () => {
        logout();
        handleClose();
    };

    const drawer = (
        <List>
            <ListItem button aria-label="Messages">
                <ListItemIcon>
                    <Badge badgeContent={messageCount} color="error">
                        <FaEnvelope size={24} />
                    </Badge>
                </ListItemIcon>
                <ListItemText primary="Messages" />
            </ListItem>
            <ListItem button aria-label="Notifications">
                <ListItemIcon>
                    <Badge badgeContent={notificationCount} color="error">
                        <FaBell size={24} />
                    </Badge>
                </ListItemIcon>
                <ListItemText primary="Notifications" />
            </ListItem>
            <ListItem button onClick={handleProfileMenuOpen} aria-label="Profile">
                <ListItemIcon>
                    <FaUser size={24} />
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </ListItem>
        </List>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <StyledAppBar position="static">
                <Toolbar>
                    <LogoContainer sx={{ flexGrow: 1 }}>
                        {isMobile && (
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2, color: "#333" }}
                            >
                                <FaBars />
                            </IconButton>
                        )}
                        <Logo
                            src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead"
                            alt="Company Logo"
                        />
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: "#333", fontWeight: 600 }}
                        >
                            SportyBuddies
                        </Typography>
                    </LogoContainer>

                    {!isMobile && (
                        <IconContainer>
                            <IconButton
                                aria-label="Show messages"
                                sx={{ color: "#333" }}
                            >
                                <Badge badgeContent={messageCount} color="error">
                                    <FaEnvelope size={24} />
                                </Badge>
                            </IconButton>

                            <IconButton
                                aria-label="Show notifications"
                                sx={{ color: "#333" }}
                            >
                                <Badge badgeContent={notificationCount} color="error">
                                    <FaBell size={24} />
                                </Badge>
                            </IconButton>

                            <IconButton
                                aria-label="Profile settings"
                                onClick={handleProfileMenuOpen}
                                sx={{ color: "#333" }}
                            >
                                <Avatar sx={{ bgcolor: "#1976d2" }}>
                                    <FaUserCircle size={24} />
                                </Avatar>
                            </IconButton>
                        </IconContainer>
                    )}
                </Toolbar>
            </StyledAppBar>

            <SwipeableDrawer
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                onOpen={handleDrawerToggle}
            >
                {drawer}
            </SwipeableDrawer>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
            >
                <MenuItem onClick={handleProfileClick}>
                    <ListItemIcon>
                        <FaUser size={20} />
                    </ListItemIcon>
                    <Typography>Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <FaSignOutAlt size={20} />
                    </ListItemIcon>
                    <Typography>Logout</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default Navbar;