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
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
            alt="Current chat"
        />
        <Box sx={{ml: 2}}>
            <Typography variant="subtitle1" fontWeight="medium">
                {participantName}
            </Typography>
            <Box sx={{display: "flex", alignItems: "center"}}>
                <BsCircleFill
                    size={8}
                    style={{color: "#44b700", marginRight: 4}}
                />
                <Typography variant="caption" color="text.secondary">
                    Online
                </Typography>
            </Box>
        </Box>
    </Box>
);

export default ChatHeader;