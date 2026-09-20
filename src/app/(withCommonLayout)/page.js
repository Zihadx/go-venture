import Banner from "@/components/Banner/Banner";
import CountryPage from "@/components/Country/Country";
import AboutUsPage from "@/components/AboutUs/AboutUs";
import ServicesPage from "@/components/Services/Services";
import JoinUsPage from "@/components/JoinUs/JoinUs";

import SpecialOffer from "@/components/SpecialOffer/SpecialOffer";

import ClientReviewsSection from "@/components/ClientReview/ClientReviews";
import DestinationsPage from "@/components/Destinations/Destinations";
import MobileApps from "@/components/MobileApps/MobileApps";
import SearchBar from "@/components/SearchBar/SearchBar";


const HomePage = async () => {
  const [countriesRes, hotelsRes, destinationsRes, blogsRes, offerRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/countries`, { cache: "no-cache" }),
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/hotels`, { cache: "no-cache" }),
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/destinations`, { cache: "no-cache" }),
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/blogs`, { cache: "no-cache" }),
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/offers`, { cache: "no-cache" }),
  ]);

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
      <MobileApps  />
      {/* <HotDeals hotDealData={hotDealData} destinations={destinations} /> */}
      <ClientReviewsSection />
    </div>
  );
};

export default HomePage;
