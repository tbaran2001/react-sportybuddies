import React, {useEffect, useState} from "react";
import {
    Box,
    Typography,
    ListItem,
    Button,
    Paper,
    useTheme, List,
} from "@mui/material";
import {styled} from "@mui/system";
import Body from "../../Body";
import {useApi} from "../../../contexts/ApiProvider";
import {getBuddies} from "../../../api/buddies";
import {BuddyItem} from "./BuddyItem";


const StyledPaper = styled(Paper)(({theme}) => ({
    padding: theme.spacing(2),
}));


export default function UserBuddiesPage() {
    const theme = useTheme();
    const api = useApi();
    const [buddies, setBuddies] = useState([]);

    useEffect(() => {
        (async () => {
            const buddies = await getBuddies(api);
            setBuddies(buddies);
        })();
    }, [api]);

    const handleSendMessage = (name) => {
        console.log(`Send message to ${name}`);
    };

    return (
        <Body sidebar>
            <Box flex={4}>
                <StyledPaper>
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{fontWeight: "bold", color: theme.palette.text.primary}}
                    >
                        My Buddies
                    </Typography>
                    <List>
                        {buddies.map((buddy) => (
                            <BuddyItem
                                key={buddy.id}
                                buddy={buddy}
                                onSendMessage={handleSendMessage}
                            />
                        ))}
                    </List>
                </StyledPaper>
            </Box>
        </Body>
    );
};
