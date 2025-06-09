import { Card, Box, CircularProgress } from '@mui/material'
import { LoaderPinwheel } from 'lucide-react'

import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { GiCash } from 'react-icons/gi'

const WalletPage = () => {
    const [active, setActive] = useState(0)
    const [jobs, setJobs] = useState([]);
    const [cookies] = useCookies();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const myHeaders = new Headers();
                myHeaders.append("Authorization", cookies.grinderUser.token);

                const response = await fetch("https://nino-backend.vercel.app/api/job/mine", {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow"
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setJobs(data.jobs);
                console.log(data.jobs)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [cookies.grinderUser?.token]);
    return (
        <div className='container py-3 h'>
            <div className='rounded-2 primary-color p-5 mt-3'>
                <h1 className='text-center text-white fw-bold'>Wallet</h1>
            </div>
            <div className='mt-3 d-flex justify-content-between align-items-center flex-wrap'>
                <Card elevation={0} sx={{ padding: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', maxWidth: { sm: '100%', md: '350px', gap: '10px' } }}  >
                    <Box className='p-2 rounded-1 d-flex justify-content-center align-items-center bg-success-subtle ' style={{ width: '50px', height: '50px' }}>
                        <GiCash className='text-success' style={{ width: '30px', height: '30px' }} />
                    </Box>
                    <Box className='d-flex flex-column  justify-content-between h-100 '>
                        <h3 className='' style={{ fontSize: '14px', lineHeight: 0, fontWeight: 200, color: 'gray' }}>Total Balance</h3>
                        <h2 style={{ fontSize: '20px', fontWeight: 900, color: 'green' }}>

                            ₦{'300,000'}

                        </h2></Box>
                </Card>
                <div>
                    <button className='btn btn-success rounded-1'>
                        Make Withdraw
                    </button>
                </div>
            </div>
            <div className='w-100 p-2 d-flex align-items-center justify-content-center mt-3 mb-4' style={{ background: '#fff' }}>
                <div className={`p-2 rounded-1 d-flex align-items-center justify-content-center flex-1 w-100 ${active === 0 ? 'bg-success text-white' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setActive(0)}>
                    <span className='text-center' >Recent Transactions</span>
                </div>
                <div className={`p-2 rounded-1 d-flex align-items-center justify-content-center flex-1 w-100 position-relative ${active === 1 ? 'bg-success text-white' : ''}`} onClick={() => setActive(1)} style={{ cursor: 'pointer' }}>
                    <span className='text-center d-flex' >Pending Jobs {jobs.length > 0 && (<span className='' style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'orange', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '10px', marginLeft: '5px' }}> {jobs.filter((job) => job.paymentJob.length > 0 && job.application && job.complete === false).length}</span>)}</span>
                </div>
            </div>
            {loading ? (
                <div className='text-center d-flex justify-content-center align-items-center'> <CircularProgress style={{ color: '#EF6E0B' }} size={28} thickness={5} />Loading</div>
            ) : (
                active === 0 ? (
                    <div>
                        <TransactionList />
                    </div>
                ) : (

                    <div>
                        {jobs.filter((job) => job.paymentJob.length > 0 && job.application && job.complete === false).map((job) => {
                            return <TransactionList key={job._id} job={job} />
                        })}
                    </div>
                )
            )}
        </div>
    )
}

export default WalletPage

const TransactionList = ({ job }) => {


    return <div className='w-100 p-2 d-flex justify-content-between bg-white my-1 '>
        <div className='d-flex flex-column text-secondary  '>
            <span className='fw-bold'> {job?.title}	</span>
            <div><p className='text-secondary-subtle fw-light ' style={{ fontSize: '10px' }}>
                {job?.description.slice(0, 30)}...</p></div>
        </div>
        <div className='d-flex flex-column bg-1  '>
            <span className='text-success fw-bold'>₦ {job?.application?.amount}</span>
            <div><div><span className='p-2 bg-warning-subtle rounded-pill d-flex justify-content-center align-items-center ' style={{ fontSize: '10px' }}>
                uncompleted</span></div></div>
        </div>
    </div>
}