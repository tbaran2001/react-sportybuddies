import React, {useEffect, useState} from 'react';
import {Stack, Box} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import {styled} from "@mui/material/styles";
import Body from "../../Body";
import UserCard from "../../UserCard/UserCard";
import {useApi} from "../../../contexts/ApiProvider";
import {getRandomMatch, swipeMatch} from "../../../api/matching";
import Spinner from "react-bootstrap/Spinner";

const SwipeBox = styled(Box)(({theme}) => ({
    flex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}));

export default function UserMatchingPage() {
    const api = useApi();
    const [match, setMatch] = useState();

    useEffect(() => {
        (async () => {
            const match = await getRandomMatch(api);
            setMatch(match);
        })();
    }, []);

    const swipe = async (direction) => {
        const newMatch = await swipeMatch(api, match.id, direction);
        setMatch(newMatch);
    };

    return (
        <Body sidebar>
            {(match === undefined || match === null) ? (
                <Spinner animation="border"/>
            ) : (
                <Stack flex={4} direction="row" spacing={2} justifyContent={"space-between"}>
                    <SwipeBox>
                        <IconButton onClick={() => swipe('left')} aria-label="Swipe Left" size="large">
                            <ThumbDownOutlinedIcon fontSize="large"/>
                        </IconButton>
                    </SwipeBox>
                    <UserCard user={match.matchedUser} userSports={match.matchedUser.sports}/>
                    <SwipeBox>
                        <IconButton onClick={() => swipe('right')} aria-label="Swipe Right" size="large">
                            <FavoriteBorderOutlinedIcon fontSize="large"/>
                        </IconButton>
                    </SwipeBox>
                </Stack>
            )}
        </Body>
    );
}