"use client";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  company: {
    name: string;
  };
  phone: string;
}

import {
    Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function AllUsers() {
    const [Users, setUsers] = useState<User[]>([]);
    const [skip, setSkip] = useState(0);

  useEffect(() => {
    const getUsers = async () => {
      const fetchData = await fetch(
        `https://dummyjson.com/users?limit=10&skip=${skip}`
      );
      const getUsers = await fetchData.json();
      setUsers(getUsers.users);
    };

    getUsers();
  });
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Company</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstName + user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.company.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

          <Stack spacing={2}>
              <Pagination
                  count={10}
                  page={skip}
                  onChange={(e, value) => setSkip(value)}
              />
      </Stack>
    </>
  );
}
