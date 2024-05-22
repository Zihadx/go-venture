import Banner from "@/components/Banner/Banner";
import BlogsPage from "@/components/Blogs/Blogs";
import CountryPage from "@/components/Country/Country";
import AboutUsPage from "@/components/AboutUs/AboutUs";
import DestinationsPage from "@/components/Destinations/Destinations";
import ServicesPage from "@/components/Services/Services";
import JoinUsPage from "@/components/JoinUs/JoinUs";

const HomePage = async () => {
  const countriesRes = await fetch("http://localhost:5000/api/v1/countries", {
    cache: "no-cache",
  });
  const hotelsRes = await fetch("http://localhost:5000/api/v1/hotels", {
    cache: "no-cache",
  });
  const destinationsRes = await fetch("http://localhost:5000/api/v1/destinations", {
    cache: "no-cache",
  });

  const countries = await countriesRes.json();
  const destinations = await destinationsRes.json();
  const hotels = await hotelsRes.json()


 



  return (
    <div>
      <Banner />
      <ServicesPage />
      <CountryPage countries={countries} />
      <JoinUsPage/>
      <DestinationsPage destinations={destinations}/>
      <AboutUsPage />
      <BlogsPage />
    </div>
  );
};

export default HomePage;
