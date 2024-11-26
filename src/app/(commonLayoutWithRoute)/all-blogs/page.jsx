import DestinationsSmallCard from "@/components/ui/Destinations/DestinationsSmallCard";
import Image from "next/image";
import bannerImage from "@/assets/All-image/all-destinations-banner2.jpg";
import DestinationFilter from "@/utils/AllDestinations/Filter";
import BlogsCard from "@/components/ui/CardDesign/BlogsCard/BlogsCard";

const AllBlogsPage = async () => {
  const res = await fetch("https://go-venture-server.vercel.app/api/v1/blogs");
  const blogs = await res.json();
  // console.log(blogs);
  return (
    <div>
      <div className="relative w-full mb-10">
        <Image
          src={bannerImage}
          width={400}
          height={400}
          alt="Banner"
          className="object-cover w-full h-[400px]"
        />
        <div className="absolute inset-0 bg-primary bg-opacity-60 flex items-center justify-center text-center">
          <div className="lg:w-1/2 w-full text-center">
            <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold">
              Blogs Page: TO-DO
            </h1>
            <p className="text-white text-md mt-4">
              Find your next adventure. Discover the world&apos;s most stunning
              and unseen destinations.
            </p>
          </div>
        </div>
      </div>

      {/*--------All Blogs --------- */}
      <div className="flex-row lg:flex justify-between items-baseline gap-10 custom-container mb-10">
        {/*-------- Blogs Filtering --------- */}
        <div className="lg:w-1/3 w-full lg:sticky top-0 self-start mb-4">
          {/* <DestinationFilter  destinations={destinations}/> */}
          <h1 className="bg-red-400 text-center p-2 text-2xl">Filter</h1>
          <h1 className="bg-green-400 mt-4 text-center p-2 text-2xl">To-Do</h1>
        </div>

        {/*--------All Blogs  --------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 relative lg:w-2/3 w-full overflow-y-auto">
          {blogs.data.map((blog) => (
            <BlogsCard key={blog._id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllBlogsPage;
