import React, {useEffect, useState} from "react";
import {
    Box,
    Typography,
    Paper,
    useTheme, List,
} from "@mui/material";
import {styled} from "@mui/system";
import Body from "../../Body";
import {useApi} from "../../../contexts/ApiProvider";
import {getBuddies} from "../../../api/buddiesApi";
import {BuddyItem} from "./BuddyItem";


const StyledPaper = styled(Paper)(({theme}) => ({
    padding: theme.spacing(2),
}));


export default function BuddiesPage() {
    const theme = useTheme();
    const api = useApi();
    const [buddies, setBuddies] = useState([]);

    useEffect(() => {
        (async () => {
            const buddies = await getBuddies(api);
            setBuddies(buddies);
        })();
    }, [api]);

    return (
        <Body sidebar>
            <Box flex={4}>
                <StyledPaper>
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{fontWeight: "bold", color: theme.palette.text.primary}}
                    >
                        Twoi znajomi
                    </Typography>
                    <List>
                        {buddies.map((buddy) => (
                            <BuddyItem
                                key={buddy.id}
                                buddy={buddy}
                            />
                        ))}
                    </List>
                </StyledPaper>
            </Box>
        </Body>
    );
};
