import Image from "next/image";
import Link from "next/link";

const CountyBigCard = ({ country }) => {
  return (
    // <Link href={`/countries/${country.id}/destinations`}>
      <div
        key={country.id}
        className="card w-full shadow-xl relative overflow-hidden group rounded-md"
      >
        <Image
          src={country.image}
          width={400}
          height={100}
          alt="country"
          className="h-[536px] w-full rounded-md group-hover:transform group-hover:scale-110 transition duration-700 ease-in-out"
        ></Image>

        <div className="absolute inset-0 cursor-pointer bg-gradient-secondary bg-opacity-50 flex justify-center items-end text-white rounded-md">
          <h1 className="text-2xl font-medium p-4">{country.name}</h1>

          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white opacity-0 hover:opacity-100 bg-black bg-opacity-50 space-y-4 transition-all duration-700 ease-in-out transform -translate-y-full group-hover:translate-y-0">
            <h1 className="text-2xl">{country.title}</h1>
            <small>{country.descriptions}</small>
          </div>
        </div>
      </div>
    // </Link>
  );
};

export default CountyBigCard;
