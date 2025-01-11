import { Box, Flex, HStack, Link, IconButton } from "@chakra-ui/react";
import * as React from "react";

const Links = ["About", "Contact"];

const NavLink = ({ children }: { children: React.ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: "gray.700",
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function NavBar() {

  return (
    <Box bg={"gray.800"} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
        />
        <HStack gap={8} alignItems={"center"}>
          <HStack
            as={"nav"}
            gap={8}
            display={{ base: "none", md: "flex" }}
          >
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <Link px={2} py={1} rounded={"md"} href={"#"}>
            Sign In
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}