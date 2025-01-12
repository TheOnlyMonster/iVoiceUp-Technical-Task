"use client";

import React, { useState } from "react";
import { Box, Text, Input, Button, Flex, Stack } from "@chakra-ui/react";
import { createEmployee } from "@/services/employeeService";  
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useAuth } from "@/AuthContext";
import Employee from "@/interfaces/Employee";
import Loading from "@/components/authentication/authLoading";

const NewEmployeePage: React.FC = () => {
  const { getToken } = useAuth();
  const [employee, setEmployee] = useState<Employee>({
    id: "",
    fname: "",
    lname: "",
    email: "",
    salary: 0,
    attendance: [],
  });

  const handleSubmit = async () => {
    if (!employee.fname || !employee.lname || !employee.email || !employee.salary) {
      console.log("Please fill in all fields");
      return;
    }

    try {

      await createEmployee(employee, getToken());

    } catch (error) {

      console.error("Failed to create employee", error);

    } 
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [field]: e.target.value,
    }));
  };

  return (
    <Loading>
      <Flex justify="center" align="center" minHeight="100vh" bg="gray.50" p={6}>
        <Box
          bg="white"
          p={8}
          boxShadow="lg"
          borderRadius="md"
          width="full"
          maxW="600px"
        >
          <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
            Create New Employee
          </Text>

          <Stack gap={4}>
            {/* First Name */}
            <FormControl isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
                value={employee.fname}
                onChange={(e) => handleChange(e, "fname")}
                placeholder="First Name"
              />
            </FormControl>

            {/* Last Name */}
            <FormControl isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
                value={employee.lname}
                onChange={(e) => handleChange(e, "lname")}
                placeholder="Last Name"
              />
            </FormControl>

            {/* Email */}
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                value={employee.email}
                onChange={(e) => handleChange(e, "email")}
                placeholder="Email"
              />
            </FormControl>

            {/* Salary */}
            <FormControl isRequired>
              <FormLabel>Salary</FormLabel>
              <Input
                value={employee.salary}
                onChange={(e) => handleChange(e, "salary")}
                placeholder="Salary"
                type="number"
              />
            </FormControl>

            {/* Submit Button */}
            <Flex justify="center" mt={6}>
              <Button
                colorScheme="green"
                onClick={handleSubmit}
              >
                Create Employee
              </Button>
            </Flex>
          </Stack>
        </Box>
      </Flex>
    </Loading>
  );
};

export default NewEmployeePage;
