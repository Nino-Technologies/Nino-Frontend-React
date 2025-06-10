// import { Cancel, LocationOnOutlined, WorkRounded } from '@mui/icons-material';
// import React, { useState, useEffect } from 'react';
// import { TbMoneybag } from 'react-icons/tb';
// import { Link } from 'react-router-dom';
// import './JobRecord.scss';
// import { useCookies } from 'react-cookie';
// import { CircularProgress } from '@mui/material';

// const JobRecord = () => {
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
//                 setJobs(data.jobs);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchJobs();
//     }, []);



//     return (
//         <div id='job-record' className='container mx-auto my-1 pt-5'>
//             <div className='rounded-2 primary-color p-5'>
//                 <h1 className='text-center text-white fw-bold'>Created Jobs</h1>
//             </div>

//             <div className="jobs-container mt-5">
//                 {loading ? (
//                     <div className="text-center p-4 d-flex justify-content-center align-items-center  m-auto text-center" style={{ width: '100%', height: 'calc(100vh - 300px)' }}>
//                         <CircularProgress style={{ color: '#EF6E0B' }} size={48} thickness={5} />
//                         <span className="ms-3 fs-5">Loading jobs...</span>
//                     </div>
//                 ) : error ? (
//                     <div className="text-center p-4 text-danger">Error: {error}</div>
//                 ) : jobs.length > 0 ? (
//                     [...jobs].reverse().map((job) => (
//                         <div className=" mb-4" key={job._id}>
//                             <JobCard job={job} />
//                         </div>
//                     ))
//                 ) : (
//                     <div className="text-center p-4">No jobs available</div>
//                 )}
//             </div>
//         </div>
//     );
// };

// const JobCard = ({ job }) => {
//     return (
//         <div className="job-card p-3 border rounded shadow-sm d-flex flex-column h-100 justify-content-between">
//             <div className="d-flex justify-content-between align-items-center">
//                 <h5 className="fw-bold">{job.title}</h5>
//                 <div className="d-flex gap-2">
//                     <span>Job Status : <span className='fw-bold   text-light'>{job.artisan ? <span className='text-light bg-success p-2 rounded' style={{ fontSize: '12px' }}>On going</span> : <span className='fw-bold p-2 rounded bg-warning text-black' style={{ fontSize: '12px' }}> Pending</span>}</span></span>
//                 </div>
//             </div>
//             <hr />
//             <div className="d-flex flex-wrap mt-2 justify-content-between fw-bold text-secondary fs-6">
//                 <div className="d-flex">
//                     <p>{new Date(job.createdAt).toLocaleDateString()}</p>
//                 </div>
//                 <p className="d-flex align-items-center gap-2 fs-6" style={{ fontSize: '12px' }}>
//                     <LocationOnOutlined className="fs-6" />
//                     {job.location}
//                 </p>
//                 <p className="d-flex align-items-center gap-2">
//                     <TbMoneybag className='text-sucess' />
//                     ₦{job.budget}
//                 </p>
//                 <p className="d-flex align-items-center gap-2">
//                     <WorkRounded className="fs-6" />
//                     <span>{job.category}</span>
//                 </p>
//             </div>
//             <p className="text-secondary job-des">
//                 {job.description}
//             </p>
//             <div className="d-flex flex-wrap gap-2">
//                 {job.skills?.map((skill, index) => (
//                     <p key={index} className="job-tag-p text-black px-3 py-1 rounded-5 bg-secondary-subtle font-small">
//                         {skill}
//                     </p>
//                 ))}
//             </div>
//             <div className="d-flex w-100 gap-2 mt-3">
//                 <Link to={`/single-job/${job._id}`} className="text-white text-decoration-none w-75">
//                     <button className="btn bg-primaryy text-white w-100">
//                         VIEW DETAIL
//                     </button>
//                 </Link>
//                 <button className="btn bg-primaryy btn-outline-dark text-white d-flex align-items-center gap-3">
//                     <Cancel /> <span>Close</span>
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default JobRecord;
import {
    Cancel,
    LocationOnOutlined,
    WorkRounded,
    CalendarTodayOutlined,
    VisibilityOutlined,
    PersonOutlined
} from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { TbMoneybag } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import './JobRecord.scss';
import { useCookies } from 'react-cookie';
import { CircularProgress, Chip, Card, CardContent, Typography, Box, Button, Divider, Grid } from '@mui/material';

const JobRecord = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cookies] = useCookies();

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
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [cookies.grinderUser?.token]);

    const getStatusColor = (job) => {
        if (job.complete) return 'success';
        if (job.artisan) return 'info';
        if (job.applied && job.applied.length > 0) return 'warning';
        return 'default';
    };

    const getStatusText = (job) => {
        if (job.complete) return 'Completed';
        if (job.artisan) return 'In Progress';
        if (job.applied && job.applied.length > 0) return `${job.applied.length} Application${job.applied.length > 1 ? 's' : ''}`;
        return 'Open';
    };

    return (
        <Box className="job-record-container" sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
            {/* Header Section */}
            <Card elevation={0} sx={{ mb: 4, background: 'linear-gradient(135deg, #EF6E0B 0%, #FF8A3D 100%)' }}>
                <CardContent sx={{ py: 4 }}>
                    <Typography variant="h4" component="h1" sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        mb: 1
                    }}>
                        My Job Postings
                    </Typography>
                    <Typography variant="subtitle1" sx={{
                        color: 'rgba(255,255,255,0.9)',
                        textAlign: 'center'
                    }}>
                        Manage and track your posted jobs
                    </Typography>
                </CardContent>
            </Card>

            {/* Jobs List */}
            {loading ? (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '400px',
                    gap: 2
                }}>
                    <CircularProgress size={48} sx={{ color: '#EF6E0B' }} />
                    <Typography variant="h6" color="text.secondary">
                        Loading your jobs...
                    </Typography>
                </Box>
            ) : error ? (
                <Card sx={{ textAlign: 'center', p: 4 }}>
                    <Typography variant="h6" color="error" gutterBottom>
                        Failed to load jobs
                    </Typography>
                    <Typography color="text.secondary">
                        {error}
                    </Typography>
                </Card>
            ) : jobs.length > 0 ? (

                <Grid container spacing={3}>
                    {[...jobs].reverse().map((job) => (
                        <Grid item xs={12} md={6} key={job._id}>
                            <JobCard job={job} />
                        </Grid>
                    ))}
                </Grid>

            ) : (

                <Card sx={{ textAlign: 'center', p: 6 }}>
                    <WorkRounded sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h5" gutterBottom color="text.secondary">
                        No jobs posted yet
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 3 }}>
                        Start by creating your first job posting
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: '#EF6E0B',
                            '&:hover': { bgcolor: '#d65a09' }
                        }}
                    >
                        <Link to={'/dashboard/create-offer'}>
                            Post a Job
                        </Link>
                    </Button>
                </Card>

            )}
        </Box>
    );
};

const JobCard = ({ job }) => {
    const getStatusColor = (job) => {
        if (job.complete) return 'success';
        if (job.artisan) return 'info';
        if (job.applied && job.applied.length > 0) return 'warning';
        return 'default';
    };

    const getStatusText = (job) => {
        if (job.complete) return 'Completed';
        if (job.artisan) return 'In Progress';
        if (job.applied && job.applied.length > 0) return `${job.applied.length} Application${job.applied.length > 1 ? 's' : ''}`;
        return 'Open';
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <Card elevation={2} sx={{
            '&:hover': {
                elevation: 4,
                transform: 'translateY(-2px)',
                transition: 'all 0.3s ease'
            }
        }}>
            <CardContent sx={{ p: 3 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', flex: 1 }}>
                        {job.title}
                    </Typography>
                    <Chip
                        label={getStatusText(job)}
                        color={getStatusColor(job)}
                        size="small"
                        sx={{ ml: 2 }}
                    />
                </Box>

                {/* Job Details Grid */}
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                    gap: 2,
                    mb: 3
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarTodayOutlined sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                            {formatDate(job.createdAt)}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOnOutlined sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary" noWrap>
                            {job.location}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TbMoneybag style={{ fontSize: 16, color: '#4caf50' }} />
                        <Typography variant="body2" sx={{ fontWeight: 'medium', color: '#4caf50' }}>
                            {formatCurrency(job.budget)}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <WorkRounded sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                            {job.category}
                        </Typography>
                    </Box>
                </Box>

                {/* Description */}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                    {job.description.length > 150
                        ? `${job.description.substring(0, 150)}...`
                        : job.description
                    }
                </Typography>

                {/* Skills */}
                {job.skills && job.skills.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {job.skills.map((skill, index) => (
                                <Chip
                                    key={index}
                                    label={skill}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                        bgcolor: 'rgba(239, 110, 11, 0.1)',
                                        borderColor: 'rgba(239, 110, 11, 0.3)',
                                        color: '#EF6E0B'
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>
                )}

                {/* Applications Info */}
                {job.applied && job.applied.length > 0 && (
                    <Box sx={{ mb: 2, p: 2, bgcolor: 'rgba(255, 193, 7, 0.1)', borderRadius: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <PersonOutlined sx={{ fontSize: 16, color: '#ff9800' }} />
                            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                {job.applied.length} Application{job.applied.length > 1 ? 's' : ''} Received
                            </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                            Latest application: {formatDate(job.applied[job.applied.length - 1].createdAt)}
                        </Typography>
                    </Box>
                )}

                <Divider sx={{ my: 2 }} />

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button
                        component={Link}
                        to={`/single-job/${job._id}`}
                        variant="contained"
                        startIcon={<VisibilityOutlined />}
                        sx={{
                            flex: 1,
                            minWidth: 150,
                            bgcolor: '#EF6E0B',
                            '&:hover': { bgcolor: '#d65a09' }
                        }}
                    >
                        View Details
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<Cancel />}
                        sx={{
                            color: '#dc3545',
                            borderColor: '#dc3545',
                            '&:hover': {
                                bgcolor: 'rgba(220, 53, 69, 0.04)',
                                borderColor: '#dc3545'
                            }
                        }}
                    >
                        Close Job
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default JobRecord;