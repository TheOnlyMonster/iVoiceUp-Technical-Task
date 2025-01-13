"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Button,
  Heading,
  Spinner,
  Stack,
  Input,
} from "@chakra-ui/react";
import { Table } from "@chakra-ui/table";
import { Select } from "@chakra-ui/select";
import { Thead, Tbody, Tr, Th, Td } from "@chakra-ui/table";
import { getAttendanceByEmployeeId, createAttendance } from "@/services/attendanceService";
import { useAuth } from "@/AuthContext";
import Loading from "@/components/authentication/authLoading";
import { useParams } from "next/navigation";
import Attendance from "@/interfaces/Attendance";

const AttendancePage: React.FC = () => {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [newAttendance, setNewAttendance] = useState<Attendance>({ employeeId: "", date: new Date(), status: "Present" });
  const { getToken } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    const fetchAttendance = async () => {
      try {

        const token = getToken();
        const { attendance, totalPages } = await getAttendanceByEmployeeId(id as string, page, token);
        setAttendance(attendance);
        setTotalPages(totalPages);

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch attendance", error);
      }
    };

    if (id) {
      fetchAttendance();
    }
  }, [id, page, getToken]);

  const handlePageChange = (newPage: number) => {
    setLoading(true);
    setPage(newPage);
  };

  const handleAddAttendance = async () => {
    try {
      const token = getToken();
      const newRecord = {
        employeeId: id as string,
        date: newAttendance?.date,
        status: newAttendance?.status,
      };
      await createAttendance(newRecord, token);
      setPage(1);
      setAttendance((prev) => [newRecord, ...prev]);
      setNewAttendance({ employeeId: "", date: new Date(), status: "Present" });
      
    } catch (error) {
      console.error("Failed to add attendance", error);
    }
  };

  return (
    <Loading>
      <Flex
        direction="column"
        alignItems="center"
        bg="white"
        p={6}
        boxShadow="base"
        color={"black"}
      >
        <Box maxW="800px" w="full">
          <Flex justifyContent="space-between" alignItems="center" mb={6}>
            <Heading as="h1" size="lg" textAlign="center" w="full">
              Attendance for Employee
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
              <Table
                variant="simple"
                colorScheme="gray"
                width={"100%"}
                textAlign={"center"}
              >
                <Thead bg="gray.100">
                  <Tr>
                    <Th>Date</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {attendance.map((record, index) => (
                  <Tr key={index} _hover={{ bg: "gray.200" }}>
                    <Td>{new Date(record.date).toLocaleDateString()}</Td>
                    <Td>{record.status}</Td>
                  </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}
          <Flex direction="column" mt={6} gap={4}>
            <Input
              type="date"
              value={newAttendance?.date.toISOString().split("T")[0]}
              onChange={(e) => setNewAttendance({ ...newAttendance, date: new Date(e.target.value) })}
            />
            <Select
              value={newAttendance?.status}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewAttendance({ ...newAttendance, status: e.target.value as "Present" | "Absent" })}
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </Select>
            <Button onClick={handleAddAttendance} colorScheme="blue">
              Add Attendance
            </Button>
          </Flex>
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
    </Loading>
  );
};

export default AttendancePage;