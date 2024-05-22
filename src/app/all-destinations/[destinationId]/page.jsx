
const DestinationsDetailsPage = async({params}) => {
    const res = await fetch(`http://localhost:5000/api/v1/destinations/${params.destinationId}`)
    const destination = await res.json()
    const destinationData = destination.data
    console.log(destinationData)
    return (
        <div>
            <h1>{destinationData.title}</h1>
        </div>
    );
};

export default DestinationsDetailsPage;