import React from 'react';
import SpecialOfferCard from '../ui/SpecialOfferCard/SpecialOfferCard';

const SpecialOffer = ({specialOfferData, destinations}) => {
    return (
        <div className="custom-container mt-20">
           <div className="w-full md:w-1/2 text-center mx-auto space-y-4">
           <h1 className="text-4xl font-semibold">Epic Special Offer</h1>
            <p>Unlock incredible discounts on your favorite products. Don&apos;t miss out on these limited-time deals!</p>
           </div>


           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        {specialOfferData.map((specialOffer) => {
          const destination = destinations.data.find(
            (dest) => dest._id === specialOffer.destinationId
          );
          return (
            <SpecialOfferCard
              key={specialOffer._id}
              specialOffer={specialOffer}
              destination={destination}
            />
          );
        })}
      </div>
        </div>
    );
};

export default SpecialOffer;