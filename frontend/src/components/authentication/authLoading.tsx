"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/AuthContext";
import { Box, Spinner, Text } from "@chakra-ui/react";

interface LoadingProps {
  children: React.ReactNode;
}

const Loading: React.FC<LoadingProps> = ({ children }) => {

  const { isLoggedIn, getToken } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const token = getToken();

    if (!isLoggedIn && !token) {

      router.push("/login");

    } else {

      setIsLoading(false);
      
    }
  }, [isLoggedIn, getToken, router]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bg="gray.50"
      >
        <Spinner size="xl" color="blue.500" />
        <Text ml={4} fontSize="xl">
          Loading...
        </Text>
      </Box>
    );
  }

  return <>{children}</>;
};

export default Loading;
