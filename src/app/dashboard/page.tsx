"use client";

import { Button, Container, Typography } from "@mui/material";
import AuthGuard from "../components/AuthGuard";
import AllUsers from "../components/AllUsers";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Welcome To Dashboard
        </Typography>

        <Link href={"/products"}>
          <Button>All Products</Button>
        </Link>

        <AllUsers />
      </Container>
    </AuthGuard>
  );
}
