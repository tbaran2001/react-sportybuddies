import React, {useState} from "react";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    CircularProgress,
    Paper,
} from "@mui/material";
import {styled} from "@mui/system";
import {FaEye, FaEyeSlash, FaEnvelope, FaLock} from "react-icons/fa";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useUser} from "../../../contexts/UserProvider";

const StyledPaper = styled(Paper)(({theme}) => ({
    padding: "2rem",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
}));

const StyledTextField = styled(TextField)(({theme}) => ({
    marginBottom: "1rem",
    "& .MuiOutlinedInput-root": {
        borderRadius: "8px"
    }
}));

const StyledButton = styled(Button)(({theme}) => ({
    borderRadius: "8px",
    padding: "0.75rem 2rem"
}));

export default function SignInPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({email: "", password: ""});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const {login} = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {email, password} = formData;
        const result = await login(email, password);
        if (result === 'fail') {
            return;
        } else if (result === 'ok') {
            let next = '/';
            if (location.state && location.state.next) {
                next = location.state.next;
            }
            navigate(next);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{mt: 8, mb: 8}}>
                <StyledPaper>
                    <Typography variant="h4" align="center" gutterBottom>
                        Sign In
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <StyledTextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FaEnvelope/>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <StyledTextField
                                fullWidth
                                label="Password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FaLock/>
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <FaEyeSlash/> : <FaEye/>}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <StyledButton
                                fullWidth
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24}/> : "Sign In"}
                            </StyledButton>
                            <Button fullWidth component={Link} to="/register">
                                Don't have an account? Sign Up
                            </Button>
                        </Box>
                    </form>
                </StyledPaper>
            </Box>
        </Container>
    );
};
