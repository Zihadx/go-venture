import React from 'react';
import BlogsCard from '../ui/CardDesign/BlogsCard';

const BlogsPage = ({blogs}) => {
    const blog = blogs.data
    return (
        <div>
            <h1>Blogs: </h1>
            <BlogsCard blog={blog}/>
        </div>
    );
};

export default BlogsPage;