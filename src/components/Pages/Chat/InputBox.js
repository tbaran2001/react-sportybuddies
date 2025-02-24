import {Box} from "@mui/material";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import React from "react";
import {IoSend} from "react-icons/io5";

const InputBox = ({message, setMessage, onSendMessage}) => {
    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            onSendMessage();
        }
    };

    return (
        <Box
            sx={{
                p: 2,
                backgroundColor: "background.primary",
                borderTop: 1,
                borderColor: "divider",
            }}
        >
            <Box sx={{display: "flex", alignItems: "flex-end"}}>
                <TextField
                    fullWidth
                    multiline
                    maxRows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Your message..."
                    variant="outlined"
                    sx={{mr: 1}}
                />
                <IconButton
                    color="primary"
                    onClick={onSendMessage}
                    aria-label="send message"
                >
                    <IoSend/>
                </IconButton>
            </Box>
        </Box>
    );
};

export default InputBox;