import { Outlet } from "react-router-dom";
import { Box ,useColorModeValue} from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  const bgColor = useColorModeValue("gray.100","gray.900")
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" bg={bgColor}>
      {/* Navbar */}
      <Navbar />

      {/* Main Content Area - Takes Remaining Space */}
      <Box flex="1">
        <Outlet />
      </Box>

      {/* Footer Always at the Bottom */}
      <Footer />
    </Box>
  );
};

export default Layout;
