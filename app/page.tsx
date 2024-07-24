import Navbar from "@/Components/Navbar"
import Sidebar from "@/Components/Sidebar"
import Mainpage from "@/Components/Mainpage"

export default function Home() {
  return (
    <div className="bg-gray-100 h-screen">
    <Navbar />
    <Sidebar />
    <div className="flex justify-center items-center">
    <Mainpage />
    </div>
 
  
    </div>
  )
}
