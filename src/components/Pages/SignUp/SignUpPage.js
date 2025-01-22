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
    Paper, MenuItem, Select, FormControl, InputLabel
} from "@mui/material";
import {styled} from "@mui/system";
import {FaEye, FaEyeSlash, FaUserAlt, FaEnvelope, FaLock, FaCalendarAlt} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import {registerUser} from "../../../api/auth";
import {useApi} from "../../../contexts/ApiProvider";
import {useFlash} from "../../../contexts/FlashProvider";
import {useUser} from "../../../contexts/ProfileProvider";

const StyledPaper = styled(Paper)(({theme}) => ({
    padding: "2rem",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
}));

const StyledTextField = styled(TextField)(({theme}) => ({
    marginBottom: "1.5rem",
    "& .MuiOutlinedInput-root": {
        borderRadius: "8px"
    }
}));

const StyledButton = styled(Button)(({theme}) => ({
    borderRadius: "8px",
    padding: "0.75rem 2rem",
    marginBottom: "1rem"
}));

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        dob: "",
        gender: ""
    });
    const [dobError, setDobError] = useState("");
    const [genderError, setGenderError] = useState("");
    const [loading, setLoading] = useState(false);

    const flash = useFlash();
    const {login} = useUser();
    const navigate = useNavigate();
    const api = useApi();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
        if (name === "dob") {
            validateDOB(value);
        }
    };

    const validateDOB = (dob) => {
        const currentDate = new Date();
        const birthDate = new Date(dob);
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        const monthDiff = currentDate.getMonth() - birthDate.getMonth();
        const dayDiff = currentDate.getDate() - birthDate.getDate();

        if (
            age < 18 ||
            (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0))) ||
            birthDate > currentDate
        ) {
            setDobError("You must be at least 18 years old.");
        } else {
            setDobError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {username, email, password, confirmPassword, dob, gender} = formData;

        const result = await registerUser(api, email, password, username, dob, gender);
        if (!result.ok) {
            flash("Registration failed", "danger");
            return;
        }

        flash("You have successfully registered!", "success");
        await login(email, password);
        navigate("/userprofilepage");

    };

    return (
        <Container maxWidth="sm">
            <Box sx={{mt: 8, mb: 8}}>
                <StyledPaper>
                    <Typography variant="h4" align="center" gutterBottom>
                        Register
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <StyledTextField
                                fullWidth
                                label="Username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FaUserAlt/>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <StyledTextField
                                fullWidth
                                label="Date of Birth"
                                name="dob"
                                type="date"
                                value={formData.dob}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FaCalendarAlt/>
                                        </InputAdornment>
                                    )
                                }}
                                error={!!dobError}
                                helperText={dobError}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <FormControl fullWidth sx={{ marginBottom: "1.5rem" }}>
                                <InputLabel id="gender-label">Gender</InputLabel>
                                <Select
                                    labelId="gender-label"
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={(e) => {
                                        setFormData((prev) => ({ ...prev, gender: e.target.value }));
                                        setGenderError("");
                                    }}
                                    error={!!genderError}
                                >
                                    <MenuItem value={1}>Male</MenuItem>
                                    <MenuItem value={2}>Female</MenuItem>
                                </Select>
                                {genderError && (
                                    <Typography color="error" variant="caption">
                                        {genderError}
                                    </Typography>
                                )}
                            </FormControl>
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
                            <StyledTextField
                                fullWidth
                                label="Confirm Password"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                value={formData.confirmPassword}
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
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <FaEyeSlash/> : <FaEye/>}
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
                                {loading ? <CircularProgress size={24}/> : "Register"}
                            </StyledButton>
                            <Button fullWidth component={Link} to="/login">
                                Already have an account? Login
                            </Button>
                        </Box>
                    </form>
                </StyledPaper>
            </Box>
        </Container>
    );
};

export default SignUp;
