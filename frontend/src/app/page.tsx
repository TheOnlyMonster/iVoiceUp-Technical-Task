import React from "react";
import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";

const HomePage: React.FC = () => {
  return (
    <Box bg={"gray.50"} minH="100vh" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <Container maxW="6xl" py={16} textAlign="center">
        <Stack gap={4} align="center">
          <Heading as="h2" size="2xl" color={"gray.800"} fontWeight="bold">
            Welcome to Company
          </Heading>
          <Text fontSize="lg" color={"gray.600"} maxW="xl">
            We provide top-notch solutions to help your business grow. Discover
            our services and see how we can assist you in achieving your goals.
          </Text>
        </Stack>
      </Container>

      <Container maxW="6xl" py={16}>
        <Stack gap={4}>
          <Heading as="h3" size="xl" textAlign="center" color={"gray.800"}>
            Our Services
          </Heading>
          <Stack
            direction={{ base: "column", md: "row" }}
            gap={4}
            justify="center"
          >
            <Box
              bg={"white"}
              p={8}
              borderRadius="md"
              boxShadow="lg"
              textAlign="center"
            >
              <Heading color={"gray.600"} as="h4" size="md" mb={2}>
                Service 1
              </Heading>
              <Text color={"gray.600"}>
                High-quality service to meet your needs.
              </Text>
            </Box>

            <Box
              bg={"white"}
              p={8}
              borderRadius="md"
              boxShadow="lg"
              textAlign="center"
            >
              <Heading color={"gray.600"} as="h4" size="md" mb={2}>
                Service 2
              </Heading>
              <Text color={"gray.600"}>
                Expert solutions tailored to your business.
              </Text>
            </Box>

            <Box
              bg={"white"}
              p={8}
              borderRadius="md"
              boxShadow="lg"
              textAlign="center"
            >
              <Heading color={"gray.600"} as="h4" size="md" mb={2}>
                Service 3
              </Heading>
              <Text color={"gray.600"}>
                Reliable and efficient results for your success.
              </Text>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default HomePage;
