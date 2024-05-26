import Banner from "@/components/Banner/Banner";
import CountryPage from "@/components/Country/Country";
import AboutUsPage from "@/components/AboutUs/AboutUs";
import DestinationsPage from "@/components/Destinations/Destinations";
import ServicesPage from "@/components/Services/Services";
import JoinUsPage from "@/components/JoinUs/JoinUs";
import BlogsPage from "@/components/Blogs/Blogs";

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

  const blogsRes = await fetch("http://localhost:5000/api/v1/blogs", {
    cache: "no-cache",
  });

  const countries = await countriesRes.json();
  const destinations = await destinationsRes.json();
  const hotels = await hotelsRes.json()
  const blogs = await blogsRes.json()


 



  return (
    <div>
      <Banner />
      <ServicesPage />
      <CountryPage countries={countries} />
      <JoinUsPage/>
      <DestinationsPage destinations={destinations}/>
      <AboutUsPage />
     <BlogsPage blogs={blogs}/>
    </div>
  );
};

export default HomePage;
