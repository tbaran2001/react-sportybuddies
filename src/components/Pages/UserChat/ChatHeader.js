import {Avatar, Box, Typography} from "@mui/material";
import {BsCircleFill} from "react-icons/bs";

const ChatHeader = ({participantName}) => (
    <Box
        sx={{
            p: 2,
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
        }}
    >
        <Avatar
            alt="Current chat"
        />
        <Box sx={{ml: 2}}>
            <Typography variant="subtitle1" fontWeight="medium">
                {participantName}
            </Typography>
        </Box>
    </Box>
);

export default ChatHeader;