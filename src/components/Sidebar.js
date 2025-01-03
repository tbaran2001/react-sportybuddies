import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PeopleIcon from '@mui/icons-material/People';
import JoinInnerIcon from '@mui/icons-material/JoinInner';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    const navItems = [
        { path: "/UserProfilePage", label: "Profile", icon: <AccountBoxIcon /> },
        { path: "/UserMatchingPage", label: "Matching", icon: <JoinInnerIcon /> },
        { path: "/UserBuddiesPage", label: "Buddies", icon: <PeopleIcon /> },
    ];

    return (
        <Box flex={1} p={2} sx={{
            display: { xs: "none", sm: "block" },
            borderRight: "1px solid rgba(255, 255, 255, 0.1)",
        }}>
            <Box position="fixed">
                <List>
                    {navItems.map((item) => (
                        <ListItem key={item.path} disablePadding>
                            <ListItemButton
                                component={NavLink}
                                to={item.path}
                                sx={{
                                    '&.active': {
                                        backgroundColor: "rgba(0, 123, 255, 0.1)",
                                        color: "primary.main",
                                    },
                                    '&:hover': {
                                        backgroundColor: "rgba(0, 123, 255, 0.2)",
                                    }
                                }}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
}
