import React from 'react';

const DashFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className='text-center border-t p-4 mt-10'>
            <h1>Copyright © {currentYear}. All rights reserved.</h1>
        </div>
    );
};

export default DashFooter;
