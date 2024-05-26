import React from 'react';
import Image from 'next/image';

const BlogsCard = ({ blog }) => {
  const { title, author, authorImage, date, excerpt, image } = blog;

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <h1>Hi</h1>
      <div className="relative h-48 w-full">
        <Image src={image} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className="p-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex items-center mt-2">
          <Image
            src={authorImage}
            alt={author}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="ml-3">
            <p className="text-sm font-semibold">{author}</p>
            <p className="text-xs text-gray-600">{date}</p>
          </div>
        </div>
        <p className="mt-4 text-gray-700">{excerpt}</p>
        <a href="#" className="inline-block mt-4 text-blue-500 hover:underline">
          Read More
        </a>
      </div>
    </div>
  );
};

export default BlogsCard;
