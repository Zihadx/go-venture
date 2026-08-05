import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import NavbarPart1 from "@/components/shared/Navbar/NavbarPart1";
import { authOptions } from "@/utils/authOptions/authOptions";
import { getServerSession } from "next-auth";
const layout = async ({ children }) => {
  
  const session = await getServerSession(authOptions)
  return (
    <div>
      <NavbarPart1 session={session} />
      <Navbar session={session}/>
      <div className="min-h-screen w-full">
        {children}
        
      </div>
      <Footer />
    </div>
  );
};

export default layout;
