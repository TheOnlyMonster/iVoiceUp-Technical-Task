"use client";

import React, { useState } from "react";
import { Box, Button, Container, Input, Stack } from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control";
import { login } from "../../services/authService";
import { validateEmail, validatePassword } from "../../utils/validation";
import { AxiosError } from "axios";
import { useAuth } from "@/AuthContext";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [backendError, setBackendError] = useState("");
  const { signIn, isLoggedIn, getToken } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (isLoggedIn || getToken()) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, router, getToken]);

  const handleSubmit = async () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setEmailError(emailError);
    setPasswordError(passwordError);
    setBackendError("");

    if (!emailError && !passwordError) {
      try {

        const response = await login(email, password);
        console.log("Login successful", response);
        signIn(response.token);

      } catch (error: unknown) {

        if (error instanceof AxiosError) {
          console.log("Login failed", error);
          setBackendError(error.response?.data.message);
        } else {
          setBackendError("An unknown error occurred");
        }

      }
    }
  };

  return (
    <Box bg="gray.50" minH="100vh" display="flex" justifyContent="center" alignItems="center" color={"black"}>
      <Container maxW="md" bg="white" p={8} boxShadow="md" borderRadius="md">
        <Stack gap={4}>
          <FormControl id="email" isInvalid={!!emailError}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailError(validateEmail(email))}
            />
            {emailError && <FormErrorMessage color={"red"}>{emailError}</FormErrorMessage>}
          </FormControl>
          <FormControl id="password" isInvalid={!!passwordError}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setPasswordError(validatePassword(password))}
            />
            {passwordError && <FormErrorMessage color={"red"}>{passwordError}</FormErrorMessage>}
          </FormControl>
          {backendError && <Box color={"red"}>{backendError}</Box>}
          <Button 
            colorScheme="blue" 
            size="lg" 
            mt={4} 
            onClick={handleSubmit}
            _hover={{ bg: "blue.500" }}
          >
            Login
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default LoginPage;