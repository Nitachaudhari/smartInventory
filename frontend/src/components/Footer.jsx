import { Box, Container, Flex, Link, Text } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <Box bg="gray.800" color="white" py={6} mt={10}>
      <Container maxW="container.xl">
        <Flex direction={["column", "row"]} justify="space-between" align="center">
          {/* Left Section - Brand Name */}
          <Text fontSize="lg" fontWeight="bold">
            Smart Inventory &copy; {new Date().getFullYear()}
          </Text>

          {/* Center - Navigation Links
          <Flex gap={4} my={[4, 0]}>
            <Link href="/" _hover={{ textDecoration: "underline" }}>Home</Link>
            <Link href="/dashboard" _hover={{ textDecoration: "underline" }}>Dashboard</Link>
            <Link href="/inventory" _hover={{ textDecoration: "underline" }}>Inventory</Link>
            <Link href="/scan-barcode" _hover={{ textDecoration: "underline" }}>Scan Barcode</Link>
          </Flex> */}

          {/* Right Section - Social Media Icons */}
          <Flex gap={4}>
            <Link href="#" isExternal><FaFacebook size="20px" /></Link>
            <Link href="#" isExternal><FaTwitter size="20px" /></Link>
            <Link href="#" isExternal><FaInstagram size="20px" /></Link>
            <Link href="#" isExternal><FaLinkedin size="20px" /></Link>
          </Flex>
        </Flex>

        {/* Bottom Text */}
        <Text fontSize="sm" textAlign="center" mt={4} opacity={0.7}>
          Designed & Developed by Smart Inventory Team
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
