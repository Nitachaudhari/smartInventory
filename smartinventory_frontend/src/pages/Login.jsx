import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Input, Button, Box } from "@chakra-ui/react";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      alert("Login successful");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <Box>
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin}>Login</Button>
    </Box>
  );
};

export default Login;
