"use client";

import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import * as React from "react";
import NextLink from "next/link";
import { getCookie } from "cookies-next";

const Links = ["About", "Contact"];
const NavLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
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
    >
      {children}
    </Box>
  </NextLink>
);

export default function NavBar() {
  const [loading, setLoading] = React.useState(true);
  const [token, setToken] = React.useState<string | undefined>("");

  React.useEffect(() => {
    const retrievedToken = getCookie("token");
    setToken(retrievedToken as string);
    setLoading(false);
  }, []);

  return (
    <Box bg={"gray.800"} px={4} boxShadow="sm">
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <HStack as={"nav"} gap={6}>
          {Links.map((link) => (
            <NavLink key={link} href={`/${link.toLowerCase()}`}>
              {link}
            </NavLink>
          ))}
        </HStack>

        <Flex alignItems={"center"}>
          {!loading && (
            <>
              {token ? (
                <NavLink href="/logout">Logout</NavLink>
              ) : (
                <NavLink href="/login">Sign In</NavLink>
              )}
            </>
          )}
          {loading && (
            <Text color="gray.300" fontSize="sm">
              Loading...
            </Text>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
