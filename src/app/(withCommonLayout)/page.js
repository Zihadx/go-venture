import Banner from "@/components/Banner/Banner";
import CountryPage from "@/components/Country/Country";
import AboutUsPage from "@/components/AboutUs/AboutUs";
import DestinationsPage from "@/components/Destinations/Destinations";
import ServicesPage from "@/components/Services/Services";
import JoinUsPage from "@/components/JoinUs/JoinUs";
import BlogsPage from "@/components/Blogs/Blogs";
import HotDeals from "@/components/Hot-Deals/HotDeals";
import SpecialOffer from "@/components/SpecialOffer/SpecialOffer";
import MobileApps from "@/components/MobileApps/MobileApps";
import ClientReviewsSection from "@/components/ClientReview/ClientReviews";
import SearchBar from "@/components/SearchBar/SearchBar";

const HomePage = async () => {
  const countriesRes = await fetch(
    "https://go-venture-server.vercel.app/api/v1/countries",
    {
      cache: "no-cache",
    }
  );

  const hotelsRes = await fetch(
    "https://go-venture-server.vercel.app/api/v1/hotels",
    {
      cache: "no-cache",
    }
  );

  const destinationsRes = await fetch(
    "https://go-venture-server.vercel.app/api/v1/destinations",
    {
      cache: "no-cache",
    }
  );

  const blogsRes = await fetch(
    "https://go-venture-server.vercel.app/api/v1/blogs",
    {
      cache: "no-cache",
    }
  );
  const offerRes = await fetch(
    "https://go-venture-server.vercel.app/api/v1/offers",
    {
      cache: "no-cache",
    }
  );

  const countries = await countriesRes.json();
  const destinations = await destinationsRes.json();
  const hotels = await hotelsRes.json();
  const blogs = await blogsRes.json();

  const offerData = await offerRes.json();
  const hotDealData = offerData.data.filter((deal) => deal.type === "Hot Deal");
  const specialOfferData = offerData.data.filter(
    (deal) => deal.type === "Special Offer"
  );

  return (
    <div>
      <Banner />
      <SearchBar />
      <ServicesPage />
      <CountryPage countries={countries} />
      <JoinUsPage />
      <DestinationsPage destinations={destinations} />
      <AboutUsPage />
      <SpecialOffer
        specialOfferData={specialOfferData}
        destinations={destinations}
      />
      <MobileApps />
      <HotDeals hotDealData={hotDealData} destinations={destinations} />
      <ClientReviewsSection />
      <BlogsPage blogs={blogs} />
    </div>
  );
};

export default HomePage;
