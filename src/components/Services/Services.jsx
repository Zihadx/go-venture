import {
  ContactSupportOutlined,
  FamilyRestroomOutlined,
  ShapeLineOutlined,
  VerifiedOutlined,
} from "@mui/icons-material";
import React from "react";

const ServicesPage = () => {
  return (
    <div className="custom-container my-16">
      <div className="w-full md:w-1/2 mx-auto text-center">
        <h1 className="text-4xl font-semibold">Why Choose Go-Venture&apos;s tour</h1>
        <p>
          Relax in top-tier hotels and resorts, selected for their exceptional
          service and comfort, to make your stay memorable.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">


        
        <div className="text-center mt-10 p-8 border rounded-md space-y-4 transition-all duration-500 ease-in-out hover:bg-[#2095ae] hover:text-white origin-bottom group cursor-pointer">
          <ShapeLineOutlined className="text-[#2095ae] group-hover:text-white text-6xl"></ShapeLineOutlined>
          <h1 className="text-2xl font-medium">Personalized Itineraries</h1>
          <small>
            Tailored travel plans to suit your preferences and interests.
          </small>
        </div>


        <div className="text-center mt-10 p-8 border rounded-md space-y-4 transition-all duration-500 ease-in-out hover:bg-[#2095ae] hover:text-white origin-bottom group cursor-pointer">
          <FamilyRestroomOutlined className="text-[#2095ae] group-hover:text-white text-6xl"></FamilyRestroomOutlined>
          <h1 className="text-2xl font-medium">Family-Friendly Packages</h1>
          <small>Travel options designed for family fun and convenience.</small>
        </div>

        <div className="text-center mt-10 p-8 border rounded-md space-y-4 transition-all duration-500 ease-in-out hover:bg-[#2095ae] hover:text-white origin-bottom group cursor-pointer">
          <ContactSupportOutlined className="text-[#2095ae] group-hover:text-white text-6xl"></ContactSupportOutlined>
          <h1 className="text-2xl font-medium">24/7 Customer Support</h1>
          <small>Around-the-clock assistance for a worry-free journey.</small>
        </div>

        <div className="text-center mt-10 p-8 border rounded-md space-y-4 transition-all duration-500 ease-in-out hover:bg-[#2095ae] hover:text-white origin-bottom group cursor-pointer">
          <VerifiedOutlined className="text-[#2095ae] group-hover:text-white text-6xl"></VerifiedOutlined>
          <h1 className="text-2xl font-medium">
            We Are 100% Trusted Tour Agency
          </h1>
          <small>
            Trusted for reliable, top-notch service to make your dream vacation
            a reality.
          </small>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
