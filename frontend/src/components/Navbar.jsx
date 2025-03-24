import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Text,
  Spacer,
  IconButton,
  useColorMode,
  useColorModeValue,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion"; // Import Framer Motion
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { token, setToken, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box bg={useColorModeValue("teal.500", "teal.700")} px={4} py={3} color="white">
      <Flex align="center" maxW="1200px" mx="auto">
        <Text fontSize="xl" fontWeight="bold">
          Smart Inventory
        </Text>
        <Spacer />

        {/* Desktop Navigation (Hidden on small screens) */}
        <HStack spacing={6} display={{ base: "none", md: "flex" }}>
          <NavLinks token={token} handleLogout={handleLogout} />
          <IconButton
            icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
            isRound
            onClick={toggleColorMode}
            aria-label="Toggle Dark Mode"
            bg="transparent"
            color="white"
            _hover={{ bg: "teal.600" }}
          />
        </HStack>

        {/* Mobile Menu Button */}
        <IconButton
          display={{ base: "flex", md: "none" }}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant="ghost"
          color="white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        />
      </Flex>

      {/* Mobile Navigation Menu with Animations */}
      {isOpen && (
        <VStack bg="teal.600" p={4} spacing={4} display={{ md: "none" }}>
          <NavLinks token={token} handleLogout={handleLogout} isMobile />
        </VStack>
      )}
    </Box>
  );
};

// Component for Animated Navigation Links
const NavLinks = ({ token, handleLogout, isMobile }) => {
  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard", auth: true },
    { label: "Inventory", path: "/inventory", auth: true },
    { label: "Scan Barcode", path: "/scan-barcode", auth: true, isButton: true },
    { label: "Logout", action: handleLogout, auth: true, isButton: true, colorScheme: "red" },
    { label: "Login", path: "/login", auth: false, isButton: true, colorScheme: "green" },
  ];

  return (
    <>
      {menuItems
        .filter((item) => token ? item.auth !== false : !item.auth)
        .map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }} // Each item appears one after another
          >
            {item.isButton ? (
              item.action ? (
                <Button
                  variant="outline"
                  colorScheme={item.colorScheme}
                  onClick={item.action}
                  width={isMobile ? "full" : "auto"}
                >
                  {item.label}
                </Button>
              ) : (
                <Link to={item.path}>
                  <Button
                    variant="solid"
                    colorScheme={item.colorScheme}
                    width={isMobile ? "full" : "auto"}
                  >
                    {item.label}
                  </Button>
                </Link>
              )
            ) : (
              <Link to={item.path}>
                <Text fontSize="lg">{item.label}</Text>
              </Link>
            )}
          </motion.div>
        ))}
    </>
  );
};

export default Navbar;
