import React from "react";
import Image from "next/image";
import Link from "next/link";

const BlogsCard = ({ blog }) => {
  const { title, author, authorImage, date, excerpt, image } = blog;
  const publishedDate = new Date(date).toLocaleDateString("en-CA");

  return (
    <div className="shadow-lg relative  border rounded-sm overflow-hidden group">
      <div className="relative overflow-hidden h-48 w-full">
        <Image src={image} alt={title} layout="fill" objectFit="cover" className="h-48 w-full group-hover:transform group-hover:scale-110 transition duration-700 ease-in-out"/>
      </div>
      
      <div className="p-4">
        <h1 className="text-2xl font-bold">{title.slice(0, 28)}...</h1>
        <div className="flex items-center mt-2">
          <div
            className="rounded-full overflow-hidden"
            style={{ width: "40px", height: "40px" }}
          >
            <Image
              src={authorImage}
              alt="author"
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-semibold">{author}</p>
            <p className="text-xs text-gray-600">{publishedDate}</p>
          </div>
        </div>
        <p className="mt-4 text-gray-700">{excerpt.slice(0, 80)}...</p>
        <Link href="#" className="inline-block mt-4 text-primary hover:underline">
          Read More
        </Link>
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-[#2095ae] border-b-4 border-[#2095ae] transition-all duration-700 transform scale-x-0 origin-left group-hover:scale-x-100"></div>
    </div>
  );
};

export default BlogsCard;
