import Image from "next/image";
import Link from "next/link";

const CountrySmallCard = ({ country }) => {
  return (
    // <Link href={`/countries/${country.id}/destinations`}>
      <div key={country.id} className="relative">
        <div className="card w-full shadow-xl relative overflow-hidden group rounded-md">
          <Image
            src={country.image}
            width={400}
            height={100}
            alt="country"
            className="h-64 w-full group-hover:transform group-hover:scale-110 transition duration-700 ease-in-out"
          />
          <div className="absolute inset-0 cursor-pointer bg-gradient-secondary bg-opacity-50 flex justify-center items-end text-white rounded-md">
            <h1 className="text-2xl font-medium p-4">{country.name}</h1>

            <h1 className="absolute inset-0 text-xl font-medium flex flex-col justify-center items-center text-center text-white opacity-0 hover:opacity-100 bg-black bg-opacity-50 space-y-4 transition-all duration-700 ease-in-out transform -translate-y-full group-hover:translate-y-0">
              {country.title}
            </h1>
          </div>
        </div>
      </div>
    // </Link>
  );
};

export default CountrySmallCard;
