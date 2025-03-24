import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light", // Set initial mode (light/dark)
    useSystemColorMode: false, // Use system preference if true
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "gray.100", // Dark or Light Background
        color: props.colorMode === "dark" ? "whiteAlpha.900" : "gray.800", // Adjust text color
      },
    }),
  },
});

export default theme;
