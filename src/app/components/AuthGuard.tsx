"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAppSelector } from "../store/store";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuth) {
      router.replace("/login");
    }
  }, [isAuth, router]);

  return <>{children}</>;
}
