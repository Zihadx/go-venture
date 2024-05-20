
const DestinationsPage = ({destinations}) => {
    return (
        <div className="custom-container my-16">
            <div className="w-full md:w-1/2 text-center mx-auto space-y-4">
            <h1 className="text-4xl font-semibold">Discover Your Next Adventure {destinations.data.length}</h1>
            <p>Explore curated destinations with Go-Venture&apos;s. Whether for adventure, relaxation, or culture, we have the perfect spot for you. Start your journey today.</p>
            </div>
        </div>
    );
};

export default DestinationsPage;