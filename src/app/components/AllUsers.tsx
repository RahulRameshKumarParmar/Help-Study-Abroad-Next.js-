"use client";

export interface User {
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
import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

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
  }, [skip]);

  const [filterUsers, setFilterUsers] = useState<User[]>([]);
  const [filterResult, setFilterResult] = useState<User[]>([]);
  const [searched, setSearched] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/users");
        const getData = await response.json();
        setFilterUsers(getData.users);
      } catch (error) {
        console.error("Error is:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleSearch = () => {
      if (searched !== "") {
        const lowerCaseSearch = searched.toLowerCase();
        const filter = filterUsers.filter(
          (user) =>
            user.firstName.toLowerCase().includes(lowerCaseSearch) ||
            user.lastName.toLowerCase().includes(lowerCaseSearch) ||
            user.email.toLowerCase().includes(lowerCaseSearch) ||
            user.company.name.toLowerCase().includes(lowerCaseSearch) ||
            user.gender.toLowerCase().includes(lowerCaseSearch) ||
            user.phone.toLowerCase().includes(lowerCaseSearch)
        );
        setFilterResult(filter);
      }
    };

    handleSearch();
  }, [searched]);

  return (
    <>
      <TextField
        placeholder="Search Users..."
        variant="outlined"
        fullWidth
        value={searched}
        onChange={(e) => setSearched(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          },
        }}
      />

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
            {searched !== ""
              ? filterResult.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.firstName + user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.company.name}</TableCell>
                  </TableRow>
                ))
              : Users.map((user) => (
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
