import { CheckCircleOutline, HomeMax, LogoutSharp } from '@mui/icons-material';
import React from 'react';

const AdminHome = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <div className='flex items-center gap-5 shadow-md p-4 rounded-md hover:shadow-2xl transition duration-700'>
                <div className='bg-blue-100 p-3 rounded-xl'>
                    <HomeMax style={{ fontSize: '40px' }}/>
                </div>
                <div>
                <h1 className='font-bold text-3xl'>7,463</h1>
                <p>New Bookings</p>
                </div>
            </div>
            <div className='flex items-center gap-5 shadow-md p-4 rounded-md hover:shadow-2xl transition duration-700'>
                <div className='bg-blue-100 p-3 rounded-xl'>
                    <HomeMax style={{ fontSize: '40px' }}/>
                </div>
                <div>
                <h1 className='font-bold text-3xl'>76,463</h1>
                <p>Total Bookings</p>
                </div>
            </div>


            <div className='flex items-center gap-5 shadow-md p-4 rounded-md hover:shadow-2xl transition duration-700'>
                <div className='bg-blue-100 p-3 rounded-xl'>
                    <CheckCircleOutline style={{ fontSize: '40px' }}/>
                </div>
                <div>
                <h1 className='font-bold text-3xl'>67</h1>
                <p>Check In</p>
                </div>
            </div>

            <div className='flex items-center gap-5 shadow-md p-4 rounded-md hover:shadow-2xl transition duration-700'>
                <div className='bg-blue-100 p-3 rounded-xl'>
                    <LogoutSharp style={{ fontSize: '40px' }}/>
                </div>
                <div>
                <h1 className='font-bold text-3xl'>45</h1>
                <p>Check Out</p>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;