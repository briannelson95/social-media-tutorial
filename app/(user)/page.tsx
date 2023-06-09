"use client"

import Feed from "@/components/Feed";
import { UserContext } from "@/contexts/UserContext";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [posts, setPosts]:any = useState([]);
  const [profile, setProfile]:any = useState(null);

  useEffect(() => {
    if (!session?.user.id) {
      redirect('/login')
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

  useEffect(() => {
    fetchPosts();
  }, [])

  function fetchPosts() {
    supabase.from('posts')
      .select('id, content, created_at, photos, profiles(id, name, avatar)')
        .is('parent', null)
        .order('created_at', {ascending: false})
        .then(result => {
          setPosts(result?.data)
        })
  };

  return (
    <UserContext.Provider value={{ profile, fetchPosts }}>
      <main>
        <Feed posts={posts} />
      </main>
    </UserContext.Provider>
  )
}
