import { Box, Flex, HStack, IconButton } from "@chakra-ui/react";
import * as React from "react";
import NextLink from "next/link";

const Links = ["About", "Contact"];

const NavLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
  <NextLink href={href} passHref>
    <Box
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: "gray.700",
      }}
    >
      {children}
    </Box>
  </NextLink>
);

export default function NavBar() {
  return (
    <Box bg={"gray.800"} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton size={"md"} aria-label={"Open Menu"} display={{ md: "none" }} />
        <HStack gap={8} alignItems={"center"}>
          <HStack as={"nav"} gap={8} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link} href={`/${link.toLowerCase()}`}>
                {link}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <NavLink href="/login">Sign In</NavLink>
        </Flex>
      </Flex>
    </Box>
  );
}
