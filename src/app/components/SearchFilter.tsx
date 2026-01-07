"use client";

import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "./AllUsers";

export default function SearchFilter() {
  const [getUsers, setGetUsers] = useState<User[]>([]);
  const [searched, setSearched] = useState("");
  //   const [searchResult, setSearchResult] = useState<User>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/users");
        const getData = await response.json();
        setGetUsers(getData);
      } catch (error) {
        console.error("Error is:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    if (searched) {
      const lowerCaseSearch = searched.toLowerCase();
      getUsers.filter(
        (user) => (
          lowerCaseSearch.includes(user.firstName),
          lowerCaseSearch.includes(user.lastName),
          lowerCaseSearch.includes(user.email),
          lowerCaseSearch.includes(user.company.name),
          lowerCaseSearch.includes(user.gender),
          lowerCaseSearch.includes(user.phone)
        )
      );
    }
  };

  return (
    <>
      <TextField
        placeholder="Search Users..."
        variant="outlined"
        fullWidth
        value={searched}
        onChange={(e) => setSearched(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
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
    </>
  );
}
