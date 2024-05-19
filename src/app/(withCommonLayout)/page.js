import Banner from "@/components/Banner/Banner";
import BlogsPage from "@/components/Blogs/Blogs";
import CountryPage from "@/components/Country/Country";
import AboutUsPage from "@/components/Destinations/AboutUs/AboutUs";
import DestinationsPage from "@/components/Destinations/Destinations";
import ServicesPage from "@/components/Destinations/Services/Services";
import JoinUsPage from "@/components/JoinUs/JoinUs";

const HomePage = async () => {
  const res = await fetch("http://localhost:5000/api/v1/countries", {
    cache: "no-cache",
  });
  const countries = await res.json();
  console.log(countries);

  return (
    <div>
      <Banner />
      <ServicesPage />
      <CountryPage countries={countries} />
      <JoinUsPage/>
      <DestinationsPage />
      <AboutUsPage />
      <BlogsPage />
    </div>
  );
};

export default HomePage;
