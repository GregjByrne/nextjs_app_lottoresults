"use client";
import { useClerk } from "@clerk/nextjs";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutLink() {
  const { signOut } = useClerk();
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.push("/"); // or wherever you want to land after logout
  }

  return (
    <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="flex items-center rounded-sm hover:bg-blue-600 w-50">
        <LogOutIcon size={16} color="#3921e8" />
        <span className="ml-4">
            Logout
        </span>
    </a>
  );
}