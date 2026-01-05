"use client";

import { Container, Typography } from "@mui/material";
import AuthGuard from "../components/AuthGuard";
import AllUsers from "../components/AllUsers";

export default function DashboardPage() {

  return (
    <AuthGuard>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{mb: 5}}>Welcome To Dashboard</Typography>

        <AllUsers />

      </Container>
    </AuthGuard>
  );
}
