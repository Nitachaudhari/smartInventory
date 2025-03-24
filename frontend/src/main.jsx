import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App.jsx";
import { InventoryProvider } from "./context/InventoryContext.jsx";
import theme from './theme'

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <InventoryProvider>
      <App />
    </InventoryProvider>
  </ChakraProvider>
);
