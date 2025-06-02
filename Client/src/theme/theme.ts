import { createTheme, type Theme } from "@mui/material/styles";

const theme = (mode: "light" | "dark"): Theme =>
    createTheme({
        palette: {
            mode,
            ...(mode === 'light'
                ? {
                    // Light theme
                    primary: {
                        main: "#2E2E2E", // Dark Grey for text/icons
                    },
                    secondary: {
                        main: "#c9c7c7", // Medium Grey
                    },
                    background: {
                        default: "#F5F5F5", // Light neutral grey
                    },
                    text: {
                        primary: "#1C1C1C", // Almost black
                        secondary: "#5E5E5E",
                    },
                    action: {
                        hover: "#F5F5F5", // Soft amber hover
                        selected: "#FFF8E1",
                    }
                }
                : {
                    // Dark theme
                    primary: {
                        main: "#E0E0E0", // Light grey for contrast
                    },
                    secondary: {
                        main: "#4A4A4A", // Dark grey
                    },
                    background: {
                        default: "#383535", // Deep black background
                    },
                    text: {
                        primary: "#FFFFFF",
                        secondary: "#B3B3B3",
                    },
                    action: {
                        hover: "#383535", // Same amber for consistency
                        selected: "#333300", // Darker amber shade
                    }
                }),
        },

        typography: {
            fontFamily: `"Roboto", sans-serif`,
            body1: { fontFamily: `"Roboto"`, fontWeight: 400, fontSize: 18, lineHeight: 1.5, letterSpacing: "2px" },
            body2: { fontFamily: `"Roboto"`, fontSize: 16 },
        },

        shape: {
            borderRadius: 3,
        },
    });
export default theme;