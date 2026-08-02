import HotDealsCard from "../ui/CardDesign/HotDealsCard/HotDealsCard";

const HotDeals = ({ hotDealData, destinations }) => {
  return (
    <div className="custom-container mt-20">
      <div className="w-full md:w-1/2 text-center mx-auto space-y-4">
        <h1 className="text-4xl font-semibold">Hot Deals Galore!</h1>
        <p className="">
          Experience more for less with our scorching hot deals! Whether
          it&apos;s a thrilling safari adventure or a tranquil retreat,
          we&apos;ve got you covered.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
        {hotDealData.map((hotDeal) => {
          const destination = destinations.data.find(
            (dest) => dest._id === hotDeal.destinationId
          );
          return (
            <HotDealsCard
              key={hotDeal._id}
              hotDeal={hotDeal}
              destination={destination}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HotDeals;
