import { Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js</h1>
      <Link href={"/login"}>
        <Button variant="contained">Login</Button>
      </Link>
    </div>
  );
}
