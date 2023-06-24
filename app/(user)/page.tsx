"use client"

import Feed from "@/components/Feed";
import Navigation from "@/components/Navigation";
import SideBar from "@/components/SideBar";
import { UserContext } from "@/contexts/UserContext";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter, redirect } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [posts, setPosts]:any = useState([]);
  const [profile, setProfile]:any = useState(null);
  // let onPost: any

  useEffect(() => {
    fetchPosts();
  }, [])

  useEffect(() => {
    if (!session?.user.id) {
      return;
    }
    supabase.from('profiles')
      .select()
      .eq('id', session?.user.id)
      .then(result => {
        if (result.data?.length) {
          setProfile(result?.data[0])
        }
      })
  }, [session?.user.id]);

  function fetchPosts() {
    supabase.from('posts')
      .select('id, content, created_at, photos, profiles(id, name, avatar)')
      .is('parent', null)
      .order('created_at', {ascending: false})
      .then(result => {
        setPosts(result?.data)
      })
  };

  if (!session) {
    redirect('/login')
  }
  // console.log(session)

  return (
    <UserContext.Provider value={{ profile, fetchPosts }}>
      <main>
        <Feed posts={posts} />
      </main>
    </UserContext.Provider>
  )
}
