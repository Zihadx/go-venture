import DestinationsSmallCard from "@/components/ui/Destinations/DestinationsSmallCard";

const DestinationsByCountryPage = async ({ params }) => {
    const { countryId } = params; 

    const destinationRes = await fetch(`http://localhost:5000/api/v1/countries/${countryId}/destinations`);
    const destinationData = await destinationRes.json();

    console.log(destinationData);

    
    return (
        <div className="custom-container ">
            <h1>{destinationData.length}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {
                destinationData.map(destination=> <DestinationsSmallCard key={destination._id} destination={destination}></DestinationsSmallCard>)
            }
            </div>
        </div>
    );
};

export default DestinationsByCountryPage;
