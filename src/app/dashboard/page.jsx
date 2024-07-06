

const HomePage = async () => {
  const countriesRes = await fetch("http://localhost:5000/api/v1/countries", {
    cache: "no-cache",
  });

  const hotelsRes = await fetch("http://localhost:5000/api/v1/hotels", {
    cache: "no-cache",
  });

  const destinationsRes = await fetch(
    "http://localhost:5000/api/v1/destinations",
    {
      cache: "no-cache",
    }
  );

  const blogsRes = await fetch("http://localhost:5000/api/v1/blogs", {
    cache: "no-cache",
  });
  const offerRes = await fetch("http://localhost:5000/api/v1/offers", {
    cache: "no-cache",
  });

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
     <h1>Hi dashboard.............</h1>
    </div>
  );
};

export default HomePage;
