"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Box, Text, Input, Button, Flex, Stack } from "@chakra-ui/react";
import { getEmployeeById, updateEmployee } from "@/services/employeeService";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useAuth } from "@/AuthContext";
import Employee from "@/interfaces/Employee";
import Loading from "@/components/authentication/authLoading";

const EmployeeDetailsPage: React.FC = () => {
  const { id } = useParams();
  const { getToken } = useAuth();
  const [employee, setEmployee] = useState<Employee>();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data: Employee = await getEmployeeById(id as string, getToken());
        data.id = id as string;
        setEmployee(data);
      } catch (error) {
        console.error("Failed to fetch employee details", error);
      }
    };

    fetchEmployee();
  }, [id, getToken]);

  const handleSave = async () => {
    if (!employee) return;

    try {
      const updatedEmployee = await updateEmployee(employee, getToken());
      setEmployee(updatedEmployee);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update employee details", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setEmployee((prevEmployee) => {
      if (!prevEmployee) return prevEmployee;
      return {
        ...prevEmployee,
        [field]: e.target.value,
      };
    });
  };

  if (!employee) {
    return (
      <Loading>
        <Text>Loading...</Text>
      </Loading>
    )
  }

  return (
    <Loading>
      <Flex
        justify="center"
        align="center"
        minHeight="100vh"
        bg="gray.50"
        p={6}
      >
        <Box
          bg="white"
          p={8}
          boxShadow="lg"
          borderRadius="md"
          width="full"
          maxW="600px"
        >
          <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
            Edit Employee Details
          </Text>

          <Stack gap={4}>
            {/* First Name */}
            <FormControl isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
                readOnly={!isEditing}
                value={employee.fname}
                onChange={(e) => handleChange(e, "fname")}
                placeholder="First Name"
              />
            </FormControl>

            {/* Last Name */}
            <FormControl isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
                readOnly={!isEditing}
                value={employee.lname}
                onChange={(e) => handleChange(e, "lname")}
                placeholder="Last Name"
              />
            </FormControl>

            {/* Email */}
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                readOnly={!isEditing}
                value={employee.email}
                onChange={(e) => handleChange(e, "email")}
                placeholder="Email"
              />
            </FormControl>

            {/* Salary */}
            <FormControl isRequired>
              <FormLabel>Salary</FormLabel>
              <Input
                readOnly={!isEditing}
                value={employee.salary}
                onChange={(e) => handleChange(e, "salary")}
                placeholder="Salary"
                type="number"
              />
            </FormControl>

            {/* Action Buttons */}
            <Flex justify="space-between" mt={6}>
              <Button
                colorScheme="blue"
                variant="outline"
                onClick={() => setIsEditing((prev) => !prev)}
              >
                {isEditing ? "Cancel" : "Edit"}
              </Button>
              {isEditing && (
                <Button colorScheme="green" onClick={handleSave}>
                  Save Changes
                </Button>
              )}
            </Flex>
          </Stack>
        </Box>
      </Flex>
    </Loading>
  );
};

export default EmployeeDetailsPage;
