"use client";

import { Box, Flex, HStack } from "@chakra-ui/react";
import * as React from "react";
import NextLink from "next/link";
import { useAuth } from "@/AuthContext";

const Links = ["About", "Contact"];
const NavLink = ({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode;
  href: string;
  onClick?: () => void;
}) => (
  <NextLink href={href} passHref>
    <Box
      px={4}
      py={2}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: "gray.700",
        color: "white",
      }}
      color="gray.300"
      fontWeight="medium"
      onClick={onClick}
    >
      {children}
    </Box>
  </NextLink>
);

export default function NavBar() {
  const { isLoggedIn, signOut } = useAuth();

  return (
    <Box bg={"gray.800"} px={4} boxShadow="sm">
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        {/* Navigation Links */}
        <HStack as={"nav"} gap={6}>
          {Links.map((link) => (
            <NavLink key={link} href={`/${link.toLowerCase()}`}>
              {link}
            </NavLink>
          ))}
        </HStack>

        {/* Auth Links */}
        <Flex alignItems={"center"}>
          {isLoggedIn ? (
            <NavLink href="#" onClick={signOut}>
              Logout
            </NavLink>
          ) : (
            <NavLink href="/login">Sign In</NavLink>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
