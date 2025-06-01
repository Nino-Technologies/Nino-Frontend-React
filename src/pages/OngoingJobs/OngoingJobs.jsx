import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, Chip, Dialog, TextField, Grid, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ScheduleIcon from '@mui/icons-material/Schedule';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import { AccessTimeSharp, WalletRounded } from '@mui/icons-material';
import { toast } from "react-toastify";
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { PaystackButton } from 'react-paystack';
import { SlOptionsVertical } from "react-icons/sl";
import { UserContext } from '../../context/UserContext';
const BidCard = ({ bid, onUpdate }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [editedBid, setEditedBid] = useState(bid);
    const [cookies, setCookie, removeCookie] = useCookies();
    const { userProfile, token } = useContext(UserContext);
    const [disputeDescription, setDisputeDescription] = useState(''); // Add this line
    useEffect(() => {
        console.log(bid)
    }, [])
    const config = {
        reference: (new Date()).getTime().toString(),
        email: userProfile.email,
        amount: bid.amount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: "pk_test_f8e5c57777aaf7ebb1d557ab36331af498857a93"
    };
    const handlePaystackSuccessAction = async (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        console.log(reference);
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", cookies.grinderUser.token);
            myHeaders.append('Content-Type', 'application/json');

            const raw = {
                type: "pay",
                artisan: bid?.artisan,
                amount: bid?.amount,
                payment_verified: true,
                status: "inprogress",
                redirectUrl: window.location.href,
                reference: reference.reference
            };
            console.log('after paystack was successful', raw)
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(raw),
                redirect: "follow"
            };

            const response = await fetch(`https://nino-backend.vercel.app/api/payments/job?jobId=${bid.job}`, requestOptions)

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Payment verification failed');
            }
            const result = await response.json();
            console.log('Payment verification successful:', result);

            // Show success notification to user
            toast.success('Payment processed successfully!');

            // You might want to update UI state here
            return result;

        } catch (error) {
            console.error('Payment processing error:', error);

            // Show error notification to user
            toast.error(error.message || 'Failed to process payment');

        }
    };

    // you can call this function anything
    const handlePaystackCloseAction = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
    }
    const componentProps = {
        ...config,
        text: 'Proceed to Payment',
        onSuccess: (reference) => handlePaystackSuccessAction(reference),
        onClose: handlePaystackCloseAction,
    };
    const [cardOptions, setCardOptions] = useState(false)
    const submitDispute = async ({ jobId, description }) => {
        try {
            const response = await fetch("https://nino-backend.vercel.app/api/jobDispute", {
                method: "POST",
                headers: {
                    "Authorization": cookies.grinderUser.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    job: jobId,
                    description: description
                }),
                redirect: "follow"
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result?.message || "An error occurred while submitting the dispute");
            }

            toast.success("Dispute submitted successfully!");
            return result;
        } catch (error) {
            console.error("Dispute Error:", error);
            toast.error(`Error: ${error.message}`);
            return null;
        }

    };

    const handleUpdateBid = () => {
        onUpdate(editedBid);
        setOpenEdit(false);
    }

    // Add this utility function outside your component
    const calculateDaysLeft = (timelineString) => {
        if (!timelineString) return 'N/A';

        try {
            // Split the date range into start and end dates
            const [startDateStr, endDateStr] = timelineString.split('-');

            // Parse the dates (assuming format DD/MM/YYYY)
            const [day, month, year] = endDateStr.split('/');
            const endDate = new Date(`${year}-${month}-${day}`);
            const today = new Date();

            // Calculate difference in days
            const timeDiff = endDate - today;
            const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

            // Return appropriate message
            if (daysLeft < 0) return 'Exceeded';
            if (daysLeft === 0) return 'Due today';
            return `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`;
        } catch (error) {
            console.error('Error parsing timeline:', error);
            return 'N/A';
        }
    };



    return (
        <Paper elevation={1} sx={{
            p: { xs: 1, md: 3 },
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            transition: '0.3s',
            '&:hover': {
                boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)'
            },
            position: 'relative'
        }}>
            {/* Edit Button */}
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                <Typography variant="h6" sx={{ color: '#013049', mb: 1, fontWeight: 'bold' }}>
                    {bid.jobTitle.length > 20 ? `${bid.jobTitle.slice(0, 20)}...` : bid.jobTitle}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', position: '' }}>
                    <span className='cursor-pointer text-end px-3'>
                        <SlOptionsVertical className=' ' style={{ cursor: 'pointer' }} onClick={() => setCardOptions(!cardOptions)} />

                    </span>
                    {cardOptions ? <ul className='card-options shadow bg-white rounded p-2  z-2 position-absolute' style={{ right: 30, top: 60 }}>
                        <li className='list-unstyled'>
                            <Button onClick={() => setOpenEdit(true)} className='text-black'>
                                Dispute
                            </Button>

                        </li>
                        <li className='list-unstyled'>
                            <Link to={`/single-job/${bid.job}`}  >
                                <Button className='text-black'>View Job</Button> </Link>
                        </li>
                    </ul> : ''}

                </Box>

                {/* Bid Content */}

            </Box>

            <Box className='h-100 d-flex flex-column justify-content-between' sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* <AttachMoneyIcon sx={{ color: '#EF6E0B', mr: 1 }} /> */}
                        <Typography variant="body1">
                            ₦{bid.amount}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ScheduleIcon sx={{ color: '#EF6E0B', mr: 1 }} />
                        <Typography variant="body1">
                            {calculateDaysLeft(bid.timeLine)}
                        </Typography>
                    </Box>
                </Box>
                <Typography variant="body2" sx={{ mb: 2 }}>
                    {bid.description}
                </Typography>
                <Box>



                    {bid.materials && (
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                Materials:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {bid.materials.map((material, index) => (
                                    <Chip
                                        key={index}
                                        label={material}
                                        size="small"
                                        sx={{
                                            backgroundColor: '#f8f9fa',
                                            color: '#013049',
                                            border: '1px solid #e0e0e0'
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    )}
                    <Box className="flex justify-content-center align-items-center" >

                        {userProfile.role === 0 ? <Button className='text-white flex-1 w-100' variant='contained' sx={{ color: 'white', backgroundColor: '#ef6e0b' }}><span>
                            Satisfied   </span> </Button> : <Button variant='contained' sx={{ color: 'white', backgroundColor: '#ef6e0b' }} className='flex-1 w-100'><span>
                                Task  Completed    </span></Button>}

                        {<PaystackButton {...componentProps} className='btn btn-success mt-1 flex-1 w-100' />}
                    </Box>
                </Box>
            </Box>

            {/* Edit Bid Dialog - Keep existing dialog code */}
            <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="md">
                <Box sx={{ p: 4, width: '600px' }}>
                    <Typography variant="h5" sx={{ color: '#013049', mb: 3 }}>
                        Create Dispute for {bid.jobTitle}
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Dispute Description"
                        name='description' // Fixed typo
                        value={disputeDescription}
                        onChange={(e) => setDisputeDescription(e.target.value)}
                        sx={{ mb: 3 }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={() => setOpenEdit(false)}
                            sx={{
                                color: '#013049',
                                borderColor: '#013049',
                                '&:hover': { borderColor: '#EF6E0B' }
                            }}
                        >
                            Cancel                         </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#EF6E0B',
                                '&:hover': { backgroundColor: '#d65c0a' }
                            }}
                            onClick={async () => {
                                try {
                                    await submitDispute({
                                        jobId: bid.job, // Make sure your bid object contains the job ID
                                        description: disputeDescription
                                    });
                                    setOpenEdit(false);
                                    setDisputeDescription(''); // Clear the input
                                } catch (error) {
                                    // Error is already handled in submitDispute
                                }
                            }}
                        >
                            Submit Dispute
                        </Button>
                    </Box>
                </Box>
            </Dialog>

        </Paper>
    );
};

// const OngoingJobs = () => {
//     const [jobs, setJobs] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [cookies, setCookie, removeCookie] = useCookies();
//     useEffect(() => {
//         const fetchJobs = async () => {
//             try {
//                 const myHeaders = new Headers();
//                 myHeaders.append("Authorization", cookies.grinderUser.token);

//                 const response = await fetch("https://nino-backend.vercel.app/api/job/mine", {
//                     method: "GET",
//                     headers: myHeaders,
//                     redirect: "follow"
//                 });

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }

//                 const data = await response.json();
//                 const activeJobs = await data.jobs.filter(job => job.application !== null); // Filter for ongoing jobs
//                 setJobs(data.jobs);
//                 setBids(activeJobs.application); // Assuming jobs contain the bids data
//                 if (data.jobs.length === 0) {
//                     toast.info("No ongoing jobs found.");
//                 }
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchJobs();
//     }, []);
//     const [bids, setBids] = useState([
//         // Sample bids data

//         // Add more sample bids as needed
//     ]);

//     const handleUpdateBid = (updatedBid) => {
//         setBids(bids.map(bid => bid.id === updatedBid.id ? updatedBid : bid));
//     };

//     return (
//         <div className='pb-5'>

//             <Box sx={{
//                 p: 4,
//                 mt: 2,
//                 minHeight: 'calc(100vh - 128px)'
//             }}>
//                 <div className='d-flex justify-content-center align-items-center p-5 rounded-3 mb-4' style={{ backgroundColor: '#ef6e0b' }}>
//                     <Typography variant="h4" sx={{
//                         color: '#fff',
//                         mb: 4,
//                         fontWeight: 'bold',
//                         textAlign: 'center'
//                     }}>
//                         <span class='fw-6'>  ACTIVE JOBS</span>
//                     </Typography>

//                 </div>
//                 <div className='d-flex gap-2  mb-4'>
//                     <div className='p-2 rounded-1 bg-secondary-subtle my-2'>
//                         <span className='fw-5'> <WalletRounded style={{ color: '#ef6e0b' }} /> <span className='fw-bold'>Wallet</span> : 510,045</span>
//                     </div>
//                     <div className='p-2 rounded-1 bg-secondary-subtle my-2'>
//                         <span className='fw-5'> <AccessTimeSharp style={{ color: '#ef6e0b' }} /> <span className='fw-bold'>Pending</span>  : 510,045</span>
//                     </div>
//                 </div>
//                 <Grid container spacing={3}>
//                     {bids.map(bid => (
//                         <Grid item key={bid.id} xs={12} sm={6} md={4}>
//                             <BidCard
//                                 bid={bid.application}
//                                 onUpdate={handleUpdateBid}
//                             />
//                         </Grid>
//                     ))}
//                 </Grid>
//             </Box>

//         </div>
//     );
// };
const OngoingJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies();

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

                // Filter jobs to only include those with application data and status "inprogress"
                const ongoingJobs = data.jobs.filter(job =>
                    (job.application || (job.applied && job.applied.length > 0)) &&
                    job.status === "inprogress"
                );

                setBids(ongoingJobs);

                if (ongoingJobs.length === 0) {
                    toast.info("No ongoing jobs found.");
                }
            } catch (err) {
                setError(err.message);
                toast.error("Failed to fetch jobs: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const [bids, setBids] = useState([]);

    const handleUpdateBid = (updatedBid) => {
        setBids(bids.map(bid => bid.id === updatedBid.id ? updatedBid : bid));
    };

    if (loading) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <div className='pb-5'>
            <Box sx={{
                p: 4,
                mt: 2,
                minHeight: 'calc(100vh - 128px)'
            }}>
                <div className='d-flex justify-content-center align-items-center p-5 rounded-3 mb-4' style={{ backgroundColor: '#ef6e0b' }}>
                    <Typography variant="h4" sx={{
                        color: '#fff',
                        mb: 4,
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}>
                        <span className='fw-6'>ACTIVE JOBS</span>
                    </Typography>
                </div>
                <div className='d-flex gap-2 mb-4'>
                    <div className='p-2 rounded-1 bg-secondary-subtle my-2'>
                        <span className='fw-5'> <WalletRounded style={{ color: '#ef6e0b' }} /> <span className='fw-bold'>Wallet</span> : 510,045</span>
                    </div>
                    <div className='p-2 rounded-1 bg-secondary-subtle my-2'>
                        <span className='fw-5'> <AccessTimeSharp style={{ color: '#ef6e0b' }} /> <span className='fw-bold'>Pending</span> : 510,045</span>
                    </div>
                </div>

                {bids.length === 0 ? (
                    <Box sx={{ p: 4, textAlign: 'center' }}>
                        <Typography variant="h6">No ongoing jobs found</Typography>
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {bids.map((job) => {
                            // Use the application data if it exists, otherwise use the first applied item
                            const application = job.application ||
                                (job.applied && job.applied.length > 0 ? job.applied[0] : null);

                            if (!application) return null;

                            return (
                                <Grid item key={job._id} xs={12} sm={6} md={4}>
                                    <BidCard
                                        bid={{
                                            ...application,
                                            jobTitle: job.title,
                                            job: job._id,
                                            // Add any other necessary fields
                                        }}
                                        onUpdate={handleUpdateBid}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                )}
            </Box>
        </div>
    );
};
export default OngoingJobs;