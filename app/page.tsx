import Navbar from "@/Components/Navbar"
import Sidebar from "@/Components/Sidebar"
import Mainpage from "@/Components/Mainpage"
import Footer from "@/Components/Footer"

export default function Home() {
  return (
    <div className="bg-gray-100 h-scroll">
    <Navbar />
    <Sidebar />
    <div className="flex justify-center items-center">
    <Mainpage />
    </div>
    <Footer />
 
  
    </div>
  )
}
