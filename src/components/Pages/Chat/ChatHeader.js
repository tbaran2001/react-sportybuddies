import {Avatar, Box, Typography} from "@mui/material";
import {BsCircleFill} from "react-icons/bs";

const ChatHeader = ({participantName,mainPhotoUrl}) => (
    <Box
        sx={{
            p: 2,
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
        }}
    >
        <img
            src={mainPhotoUrl}
            alt={participantName}
            style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                objectFit: "cover",
            }}
        />
        <Box sx={{ml: 2}}>
            <Typography variant="subtitle1" fontWeight="medium">
                {participantName}
            </Typography>
        </Box>
    </Box>
);

export default ChatHeader;