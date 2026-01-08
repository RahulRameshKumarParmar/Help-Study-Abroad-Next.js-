"use client";

import {
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useAppSelector } from "../store/hooks";

export default function User() {
  const selectedUser = useAppSelector((state) => state.users.fullDetails);
  return (
    <>
      <Button component={Link} href="/dashboard">
        Back to Users
      </Button>

      <Container maxWidth="sm">
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Avatar
                src={selectedUser?.image}
                sx={{ width: 80, height: 80 }}
              />
              <Typography variant="body1">ID : {selectedUser?.id}</Typography>
              <Typography variant="body1">
                Name : {selectedUser?.firstName} + {selectedUser?.lastName}
              </Typography>
              <Typography variant="body1">
                Email : {selectedUser?.email}
              </Typography>
              <Typography variant="body1">Age : {selectedUser?.age}</Typography>
              <Typography variant="body1">
                Gender : {selectedUser?.gender}
              </Typography>
              <Typography variant="body1">
                Phone : {selectedUser?.phone}
              </Typography>
              <Typography variant="body1">
                Birth Date : {selectedUser?.birthDate}
              </Typography>
              <Typography variant="body1">
                Address : {selectedUser?.address.address}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
