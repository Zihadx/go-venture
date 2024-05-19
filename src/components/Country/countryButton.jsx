"use client"

const CountryButton = ({ showAll, setShowAll }) => {
  const handleSeeMoreClick = () => {
    setShowAll(true);
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <button
        onClick={handleSeeMoreClick}
        className="w-full lg:w-1/2 md:h-20 button-primary text-xl"
      >
        See more
      </button>
    </div>
  );
};

export default CountryButton;

