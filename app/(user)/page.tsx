"use client"

import Feed from "@/components/Feed";
import Navigation from "@/components/Navigation";
import SideBar from "@/components/SideBar";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter, redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  if (!session) {
    redirect('/login')
  }
  console.log(session)

  return (
    <main>
      <Feed />
    </main>
  )
}
