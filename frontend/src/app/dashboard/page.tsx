"use client";

import React, { useEffect, useState } from "react";
import {
  IconButton,
  Box,
  Flex,
  Button,
  Heading,
  Spinner,
  Text,
  Stack,
} from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/table";
import { getAllEmployees } from "@/services/employeeService";
import { useAuth } from "@/AuthContext";

interface Employee {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  salary: number;
}

const DashboardPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { isLoggedIn, signOut, getToken } = useAuth();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {

        if (!isLoggedIn && !getToken()) {
          throw new Error("Unauthorized");
        }

        const { employees, totalPages } = await getAllEmployees(page, getToken());
        setEmployees(employees);
        setTotalPages(totalPages);
        setLoading(false);

      } catch (error) {

        console.error("Failed to fetch employees", error);
        signOut();

      }
    };

    fetchEmployees();
  }, [page, signOut, isLoggedIn, getToken]);

  const handlePageChange = (newPage: number) => {
    setLoading(true);
    setPage(newPage);
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      bg="white"
      minHeight="100vh"
      p={6}
      boxShadow="base"
      color={"black"}
    >
      <Box maxW="800px" w="full">
        <Flex justifyContent="space-between" alignItems="center" mb={6}>
          <Heading as="h1" size="lg" textAlign="center" w="full">
            Employee Dashboard
          </Heading>
        </Flex>
        {loading ? (
          <Flex justifyContent="center" alignItems="center" minHeight="50vh">
            <Spinner size="xl" color="blue.500" />
          </Flex>
        ) : (
          <Box
            border="1px"
            borderColor="gray.200"
            borderRadius="md"
            overflow="hidden"
            boxShadow="sm"
            bg="gray.50"
            p={4}
          >
            <Table variant="simple" colorScheme="gray" width={"100%"} textAlign={"center"}>
              <Thead bg="gray.100">
                <Tr>
                  <Th>First Name</Th>
                  <Th>Last Name</Th>
                  <Th>Email</Th>
                  <Th>Salary</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {employees.map((employee) => (
                  <Tr key={employee._id} _hover={{ bg: "gray.200" }}>
                    <Td>{employee.fname}</Td>
                    <Td>{employee.lname}</Td>
                    <Td>{employee.email}</Td>
                    <Td>${employee.salary.toLocaleString()}</Td>
                    <Td>
                      <IconButton
                        aria-label="Edit Employee"
                        onClick={(e) => e.stopPropagation()}
                        size="sm"
                        colorScheme="blue"
                        mr={2}
                      >
                        <Text fontSize="lg">✎</Text>
                      </IconButton>
                      <IconButton
                        aria-label="Add Attendance"
                        onClick={(e) => e.stopPropagation()}
                        size="sm"
                        colorScheme="green"
                      >
                        <Text fontSize="lg">✔</Text>
                      </IconButton>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
        <Flex justifyContent="center" mt={6}>
          <Stack direction="row" gap={4}>
            <Button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              colorScheme="blue"
              variant="outline"
            >
              Previous
            </Button>
            <Button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              colorScheme="blue"
            >
              Next
            </Button>
          </Stack>
        </Flex>
      </Box>
    </Flex>
  );
};

export default DashboardPage;
