"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import adminApi from "@/services/api";

// Redirects users to dashboard if logged in or login page if unauthenticated.
export default function AdminRootPage() {
  const router = useRouter();

  useEffect(() => {
    if (adminApi.isAuthenticated()) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#0b57d0] border-t-transparent" />
    </div>
  );
}
