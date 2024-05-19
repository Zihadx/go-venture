import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";

const layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen w-full">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default layout;
