
import NavbarPart1 from "@/components/shared/Navbar/NavbarPart1";
import { authOptions } from "@/utils/authOptions/authOptions";
import { getServerSession } from "next-auth";
const layout = async ({ children }) => {
  
  const session = await getServerSession(authOptions)
  return (
    <div>
      <NavbarPart1 session={session} />
      <div className="min-h-screen w-full">
        {children}
        
      </div>
    </div>
  );
};

export default layout;
