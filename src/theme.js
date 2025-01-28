import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#198b67',
        },
        secondary: {
            main: '#198b67',
        },
        background: {
            default: '#031004',
            paper: '#031004',
        },
        text: {
            primary: '#dcf9e0',
        },
    },
    typography: {
        allVariants: {
            color: "#dcf9e0",
        },
    },
});

export default theme;
