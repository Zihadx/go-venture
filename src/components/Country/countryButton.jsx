"use client"

const CountryButton = ({ showAll, setShowAll }) => {
  const handleSeeMoreClick = () => {
    setShowAll(true);
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <button
        onClick={handleSeeMoreClick}
        className="button-primary text-sm"
      >
        See more
      </button>
    </div>
  );
};

export default CountryButton;

