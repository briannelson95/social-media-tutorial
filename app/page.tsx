import Feed from "@/components/Feed";
import SideBar from "@/components/SideBar";

export default function Home() {
  return (
    <main className="flex min-h-screen max-w-4xl mx-auto mt-4">
      <div className="grid grid-cols-3 gap-4 w-full">
        <SideBar />
        <Feed />
      </div>
    </main>
  )
}
