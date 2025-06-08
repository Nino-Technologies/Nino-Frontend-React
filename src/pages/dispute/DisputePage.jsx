import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { Box, Card } from '@mui/material';
import { ListAltOutlined } from '@mui/icons-material';
const DisputeManagement = () => {
    const [disputes, setDisputes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cookies] = useCookies();
    useEffect(() => {
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
                    <Card className='p-2 rounded-1 d-flex align-items-center g-2' sx={{ width: '100%', maxWidth: 300, backgroundColor: '#fff', boxShadow: 3 }}>
                        <div className='p-2 rounded-2 d-flex justify-content-center align-items-center' style={{ backgroundColor: '#f5f5f5', width: 80, height: 80 }}>
                            <ListAltOutlined sx={{ fontSize: 40, color: '#ef6e0b' }} />
                        </div>
                        <div className='flex flex-column justify-content-around '>
                            <p className='fw-6 text-secondary-subtle' style={{}}>Total Disputes</p>
                            <h3 className='fw-bold fs-1'> {disputes.length}</h3>
                        </div>
                    </Card>
                </Box>
                <ul>
                    {disputes.map(dispute => (
                        <li key={dispute._id}>{dispute.description}</li>
                    ))}
                </ul>
            </div>
        )}
    </div>
};

export default DisputeManagement;