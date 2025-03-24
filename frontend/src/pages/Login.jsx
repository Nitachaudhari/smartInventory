import { useState, useContext } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";

const Auth = () => {
  const { setUser, setToken } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login & Register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // For registration
  const navigate = useNavigate();
  const toast = useToast();

  const handleAuth = async () => {
    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";

    const body = isLogin ? { email, password } : { name, email, password };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.token) {
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("token", data.token);

      toast({
        title: isLogin ? "Login Successful!" : "Registration Successful!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/dashboard");
    } else {
      toast({
        title: "Error",
        description: data.message || "Invalid credentials!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
    <Container maxW="md" mt={10}>
      <Box
        p={6}
        borderRadius="lg"
        boxShadow="lg"
        bg="white"
        textAlign="center"
      >
        <Heading size="lg" mb={4}>
          {isLogin ? "Login" : "Register"}
        </Heading>
        <VStack spacing={4}>
          {!isLogin && (
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          )}
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button colorScheme="blue" w="full" onClick={handleAuth}>
            {isLogin ? "Login" : "Register"}
          </Button>
          <Text fontSize="sm">
            {isLogin ? "New here?" : "Already have an account?"}{" "}
            <Button variant="link" colorScheme="blue" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Register" : "Login"}
            </Button>
          </Text>
        </VStack>
      </Box>
    </Container>
    </>
    
  );
};

export default Auth;
