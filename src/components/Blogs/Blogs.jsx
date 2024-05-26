import React from 'react';
import BlogsCard from '../ui/CardDesign/BlogsCard/BlogsCard';
import { Button } from '@mui/material';
import Link from 'next/link';

const BlogsPage = ({blogs}) => {
    
    return (
        <div className='custom-container mt-20'>
            <div className='m-1/2 mx-auto text-center space-y-4'>
                <h1 className='text-4xl font-semibold'>
                Recent Articles & Posts
                </h1>
                <p>Stay updated with our latest travel articles and posts. Discover new destinations and travel tips.</p>
            </div>
           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
            {
                blogs.data.slice(0, 3).map(blog=> <BlogsCard key={blog._id} blog={blog}/>)
            }
           </div>
           <Link href={'/all-blogs'} className="flex justify-end items-center mt-6">
      <Button
        variant="contained"
        color="primary"
        className=" bg-primary text-white"
      >
        Read All <span className="font-bold mx-2">{blogs.data.length}+</span> Blogs
      </Button>
      </Link>
        </div>
    );
};

export default BlogsPage;