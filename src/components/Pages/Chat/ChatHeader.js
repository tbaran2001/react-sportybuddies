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
            src={mainPhotoUrl} // Dynamic photo URL
            alt={participantName} // Alt text for accessibility
            style={{
                width: 48, // Adjust size as needed
                height: 48,
                borderRadius: "50%", // Makes the image round like an avatar
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