import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { Box, Card } from '@mui/material';
import { ListAltOutlined } from '@mui/icons-material';
import { BsThreeDotsVertical } from 'react-icons/bs';
const DisputeManagement = () => {
    const [disputes, setDisputes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cookies] = useCookies();
    const getDispute = async () => {
        try {
            const response = await fetch("https://nino-backend.vercel.app/api/jobDispute", {
                method: "GET",
                headers: {
                    "Authorization": cookies.grinderUser.token,
                    "Content-Type": "application/json"
                },

            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result?.message || "An error occurred while fetching disputes");
            }
            if (!response.ok) {
                throw new Error(result?.message || "An error occurred while submitting the dispute");
            }
            setLoading(false)
            setDisputes(result.disputes);

        } catch (error) {
            console.error("Dispute Error:", error);
            toast.error(`Error: ${error.message}`);
            return null;
        }
    };
    useEffect(() => {
        getDispute()
    }, [])
    return <div className='pt-5 container mx-auto my-1'>
        <div>
            <div className='rounded-2 primary-color p-5'>
                <h1 className='text-center text-white fw-bold'>Dispute Management</h1>
                <p className='text-center text-white'>Manage and resolve disputes related to your jobs</p>
            </div>
        </div>
        {loading ? (
            <div className='text-center p-4 d-flex justify-content-center align-items-center m-auto text-center' style={{ width: '100%', height: 'calc(100vh - 300px)' }}>
                <p>Loading...</p>
            </div>
        ) : (
            <div className='mt-5'>

                <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginBottom: 2 }}>
                    <Card className='p-2 rounded-1 d-flex align-items-center ' sx={{ width: '100%', maxWidth: 300, backgroundColor: '#fff', boxShadow: 1 }}>
                        <div className='p-2 rounded-2 d-flex justify-content-center align-items-center' style={{ backgroundColor: '#f5f5f5', width: 80, height: 80 }}>
                            <ListAltOutlined sx={{ fontSize: 40, color: '#ef6e0b' }} />
                        </div>
                        <div className='flex flex-column justify-content-around ms-2'>
                            <p className='fw-6 text-secondary-subtle mb-1' style={{}}>Total Disputes</p>
                            <h3 className='fw-bold fs-1'> {disputes.length}</h3>
                        </div>
                    </Card>
                </Box>
                <div className='w-100 p-1  mt-3 d-flex g-1'>
                    {disputes.map(dispute => (
                        <div className='w-100  d-flex justify-content-between align-items-center bg-white p-2 rounded px-2'>
                            <div>
                                <h5 className='fw-bold' style={{ fontSize: '14px' }}>{dispute?.job?.title}</h5>
                                <p className='mb-0 text-secondary'>
                                    {dispute.description}
                                </p>
                            </div>
                            <div className=' position-relative d-flex gap-2' style={{ cursor: 'pointer' }}>

                                <button className='btn bg-primary-subtle rounded-1 p-2'>Resolve</button>
                                <button className='btn bg-danger-subtle rounded-1 p-2'>Contact Admin</button>
                                {/* <BsThreeDotsVertical className='text-secondary-subtle' />
                                <div className='p-2 rounded-1 bg-white d-flex flex-col shadow shadow-sm position-absolute' style={{ left: '-100px', top: '-10px' }}>
                                    <div className='w-100 p-2 rounded  '>
                                        <p>
                                            Resolve
                                        </p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    ))}

                </div>


            </div>
        )}
    </div>
};

export default DisputeManagement;