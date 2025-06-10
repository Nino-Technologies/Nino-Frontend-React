// import React, { useEffect, useState } from 'react';
// import './JobOfferPage.scss';
// import Nav from '../../components/Nav/Nav';
// import {
//     Paper,
//     CircularProgress,
//     Chip,
//     Avatar,
//     Typography,
//     Box,
//     Card,
//     CardContent,
//     Button,
//     Divider,
//     Grid,
//     Container
// } from '@mui/material';
// import {
//     TbMoneybag,
//     TbCalendar,
//     TbUsers,
//     // TbCheckCircle,
//     TbClock
// } from 'react-icons/tb';
// import {
//     LocationOn,
//     WorkRounded,
//     Person,
//     AssignmentInd,
//     Verified
// } from '@mui/icons-material';
// import Footer from '../../components/Footer/Footer';
// import { Link } from 'react-router-dom';
// import { useCookies } from 'react-cookie';
// import { CircleCheck } from 'lucide-react';

// const JobOfferPage = () => {
//     const [jobs, setJobs] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [cookies, setCookie, removeCookie] = useCookies();

//     useEffect(() => {
//         const fetchJobs = async () => {
//             try {
//                 const response = await fetch("https://nino-backend.vercel.app/api/job", {
//                     method: "GET",
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

//     if (loading) {
//         return (
//             <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', height: '100vh' }}>
//                 <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
//                     <CircularProgress style={{ color: '#EF6E0B' }} size={48} thickness={5} />
//                     <Typography variant="h6" color="textSecondary">Loading jobs...</Typography>
//                 </Box>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div>
//                 <Nav />
//                 <Container className="text-center p-4">
//                     <Typography variant="h5" color="error">Error: {error}</Typography>
//                 </Container>
//             </div>
//         );
//     }

//     return (
//         <div id="job-offer-page" className='bg-light'>
//             <Nav />
//             <Container maxWidth="lg" className="my-5 pt-5">
//                 <Paper elevation={6} className="p-4 py-5 mb-4" sx={{
//                     background: '#EF6E0B',
//                     color: 'white'
//                 }}>
//                     <Typography variant="h3" component="h1" className="fw-bold text-center">
//                         Most Recent Job Openings
//                     </Typography>
//                     <Typography variant="h6" className="text-center mt-2 opacity-75">
//                         {jobs.length} opportunities available
//                     </Typography>
//                 </Paper>

//                 <Grid container spacing={3}>
//                     {jobs && jobs.length > 0 ? (
//                         jobs.slice().reverse().map((job) => (
//                             <Grid item xs={12} md={6} lg={4} key={job._id}>
//                                 <JobCard job={job} />
//                             </Grid>
//                         ))
//                     ) : (
//                         <Grid item xs={12}>
//                             <Paper className="text-center p-5">
//                                 <Typography variant="h5" color="textSecondary">
//                                     No jobs available at the moment
//                                 </Typography>
//                             </Paper>
//                         </Grid>
//                     )}
//                 </Grid>
//             </Container>
//             <Footer />
//         </div>
//     );
// };

// const JobCard = ({ job }) => {
//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'inprogress': return '#ff9800';
//             case 'completed': return '#4caf50';
//             case 'pending': return '#2196f3';
//             default: return '#757575';
//         }
//     };

//     const getStatusIcon = (status) => {
//         switch (status) {
//             case 'inprogress': return <TbClock />;
//             case 'completed': return <CircleCheck />;
//             default: return <TbUsers />;
//         }
//     };

//     const formatDate = (dateString) => {
//         return new Date(dateString).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric'
//         });
//     };

//     const formatCurrency = (amount) => {
//         return new Intl.NumberFormat('en-NG', {
//             style: 'currency',
//             currency: 'NGN',
//             minimumFractionDigits: 0
//         }).format(amount);
//     };

//     return (
//         <Card
//             elevation={3}
//             className="h-100"
//             sx={{
//                 transition: 'all 0.3s ease',
//                 '&:hover': {
//                     transform: 'translateY(-4px)',
//                     boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
//                 }
//             }}
//         >
//             <CardContent className="p-4">
//                 {/* Header Section */}
//                 <Box className="d-flex justify-content-between align-items-start mb-3">
//                     <Typography variant="h6" component="h3" className="fw-bold" sx={{ color: '#013049' }}>
//                         {job.title}
//                     </Typography>
//                     <Chip
//                         icon={getStatusIcon(job.status)}
//                         label={job.status.toUpperCase()}
//                         size="small"
//                         sx={{
//                             backgroundColor: getStatusColor(job.status),
//                             color: 'white',
//                             fontWeight: 'bold'
//                         }}
//                     />
//                 </Box>

//                 <Divider sx={{ mb: 2 }} />

//                 {/* Job Details */}
//                 <Box className="mb-3">
//                     <Grid container spacing={2} className="mb-2">
//                         <Grid item xs={6}>
//                             <Box className="d-flex align-items-center gap-1">
//                                 <TbCalendar size={16} color="#666" />
//                                 <Typography variant="caption" color="textSecondary">
//                                     {formatDate(job.createdAt)}
//                                 </Typography>
//                             </Box>
//                         </Grid>
//                         <Grid item xs={6}>
//                             <Box className="d-flex align-items-center gap-1">
//                                 <LocationOn sx={{ fontSize: 16, color: '#666' }} />
//                                 <Typography variant="caption" color="textSecondary">
//                                     {job.location}
//                                 </Typography>
//                             </Box>
//                         </Grid>
//                     </Grid>

//                     <Grid container spacing={2}>
//                         <Grid item xs={6}>
//                             <Box className="d-flex align-items-center gap-1">
//                                 <TbMoneybag size={16} color="#EF6E0B" />
//                                 <Typography variant="body2" sx={{ color: '#EF6E0B', fontWeight: 'bold' }}>
//                                     {formatCurrency(job.budget)}
//                                 </Typography>
//                             </Box>
//                         </Grid>
//                         <Grid item xs={6}>
//                             <Box className="d-flex align-items-center gap-1">
//                                 <WorkRounded sx={{ fontSize: 16, color: '#666' }} />
//                                 <Typography variant="caption" color="textSecondary">
//                                     {job.category}
//                                 </Typography>
//                             </Box>
//                         </Grid>
//                     </Grid>
//                 </Box>

//                 {/* Description */}
//                 <Typography variant="body2" color="textSecondary" className="mb-3" sx={{ lineHeight: 1.6 }}>
//                     {job.description.length > 120 ?
//                         job.description.slice(0, 120) + '...' :
//                         job.description
//                     }
//                 </Typography>

//                 {/* Client Info */}
//                 {job.user && (
//                     <Box className="d-flex align-items-center gap-2 mb-3 p-2" sx={{ backgroundColor: '#f8f9fa', borderRadius: 1 }}>
//                         <Avatar
//                             src={job.user.avatar}
//                             alt={job.user.fullName}
//                             sx={{ width: 32, height: 32 }}
//                         />
//                         <Box>
//                             <Typography variant="caption" color="textSecondary">Client</Typography>
//                             <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                                 {job.user.fullName}
//                             </Typography>
//                         </Box>
//                     </Box>
//                 )}

//                 {/* Assigned Artisan (if exists) */}
//                 {job.artisan && (
//                     <Box className="d-flex align-items-center gap-2 mb-3 p-2" sx={{ backgroundColor: '#e8f5e8', borderRadius: 1 }}>
//                         <Avatar
//                             src={job.artisan.avatar}
//                             alt={job.artisan.fullName}
//                             sx={{ width: 32, height: 32 }}
//                         />
//                         <Box className="flex-grow-1">
//                             <Box className="d-flex align-items-center gap-1">
//                                 <Typography variant="caption" color="textSecondary">Assigned to</Typography>
//                                 <Verified sx={{ fontSize: 12, color: '#4caf50' }} />
//                             </Box>
//                             <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                                 {job.artisan.fullName}
//                             </Typography>
//                             <Typography variant="caption" color="textSecondary">
//                                 {job.artisan.service}
//                             </Typography>
//                         </Box>
//                     </Box>
//                 )}

//                 {/* Applications Count */}
//                 {job.applied && job.applied.length > 0 && (
//                     <Box className="d-flex align-items-center gap-1 mb-3">
//                         <AssignmentInd sx={{ fontSize: 16, color: '#666' }} />
//                         <Typography variant="caption" color="textSecondary">
//                             {job.applied.length} application{job.applied.length !== 1 ? 's' : ''}
//                         </Typography>
//                     </Box>
//                 )}

//                 {/* Skills Tags */}
//                 {job.skills && job.skills.length > 0 && (
//                     <Box className="mb-3">
//                         <Typography variant="caption" color="textSecondary" className="mb-1 d-block">
//                             Required Skills:
//                         </Typography>
//                         <Box className="d-flex flex-wrap gap-1">
//                             {job.skills.slice(0, 3).map((skill, index) => (
//                                 <Chip
//                                     key={index}
//                                     label={skill}
//                                     size="small"
//                                     sx={{
//                                         backgroundColor: '#EF6E0B',
//                                         color: 'white',
//                                         fontSize: '0.7rem'
//                                     }}
//                                 />
//                             ))}
//                             {job.skills.length > 3 && (
//                                 <Chip
//                                     label={`+${job.skills.length - 3} more`}
//                                     size="small"
//                                     variant="outlined"
//                                     sx={{ fontSize: '0.7rem' }}
//                                 />
//                             )}
//                         </Box>
//                     </Box>
//                 )}

//                 {/* Action Button */}
//                 <Link to={`/single-job/${job._id}`} style={{ textDecoration: 'none' }}>
//                     <Button
//                         variant="contained"
//                         fullWidth
//                         sx={{
//                             backgroundColor: '#013049',
//                             '&:hover': {
//                                 backgroundColor: '#024a6b'
//                             },
//                             textTransform: 'none',
//                             fontWeight: 'bold',
//                             py: 1.5
//                         }}
//                     >
//                         View Details
//                     </Button>
//                 </Link>
//             </CardContent>
//         </Card>
//     );
// };

// export default JobOfferPage;
import React, { useEffect, useState } from 'react';
import './JobOfferPage.scss';
import Nav from '../../components/Nav/Nav';
import {
    Paper,
    CircularProgress,
    Chip,
    Avatar,
    Typography,
    Box,
    Card,
    CardContent,
    Button,
    Divider,
    Grid,
    Container,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Pagination,
    Stack,
    Badge
} from '@mui/material';
import {
    TbMoneybag,
    TbCalendar,
    TbUsers,
    TbClock,
    TbFilter
} from 'react-icons/tb';
import {
    LocationOn,
    WorkRounded,
    Person,
    AssignmentInd,
    Verified,
    FilterList
} from '@mui/icons-material';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { CircleCheck } from 'lucide-react';

const JobOfferPage = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies();

    // Filter and pagination states
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage] = useState(9); // 9 jobs per page for nice 3x3 grid

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch("https://nino-backend.vercel.app/api/job", {
                    method: "GET",
                    redirect: "follow"
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setJobs(data.jobs);
                setFilteredJobs(data.jobs);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    // Filter jobs based on status
    useEffect(() => {
        let filtered = [...jobs];

        if (statusFilter !== 'all') {
            filtered = jobs.filter(job => {
                switch (statusFilter) {
                    case 'ongoing':
                        return job.status === 'pending' || job.status === 'inprogress';
                    case 'assigned':
                        return job.artisan && job.status !== 'completed';
                    case 'completed':
                        return job.status === 'completed';
                    case 'pending':
                        return job.status === 'pending' && !job.artisan;
                    default:
                        return true;
                }
            });
        }

        setFilteredJobs(filtered.slice().reverse()); // Most recent first
        setCurrentPage(1); // Reset to first page when filter changes
    }, [jobs, statusFilter]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const currentJobs = filteredJobs.slice(startIndex, endIndex);

    // Get job counts for each filter
    const getJobCounts = () => {
        return {
            all: jobs.length,
            ongoing: jobs.filter(job => job.status === 'pending' || job.status === 'inprogress').length,
            assigned: jobs.filter(job => job.artisan && job.status !== 'completed').length,
            completed: jobs.filter(job => job.status === 'completed').length,
            pending: jobs.filter(job => job.status === 'pending' && !job.artisan).length
        };
    };

    const jobCounts = getJobCounts();

    const handleFilterChange = (event) => {
        setStatusFilter(event.target.value);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', height: '100vh' }}>
                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                    <CircularProgress style={{ color: '#EF6E0B' }} size={48} thickness={5} />
                    <Typography variant="h6" color="textSecondary">Loading jobs...</Typography>
                </Box>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Nav />
                <Container className="text-center p-4">
                    <Typography variant="h5" color="error">Error: {error}</Typography>
                </Container>
            </div>
        );
    }

    return (
        <div id="job-offer-page" className='bg-light'>
            <Nav />
            <Container maxWidth="lg" className="my-5 pt-5">
                {/* Header Section */}
                <Paper elevation={6} className="p-4 py-5 mb-4" sx={{
                    background: '#EF6E0B',
                    color: 'white'
                }}>
                    <Typography variant="h3" component="h1" className="fw-bold text-center">
                        Most Recent Job Openings
                    </Typography>
                    <Typography variant="h6" className="text-center mt-2 opacity-75">
                        {filteredJobs.length} of {jobs.length} opportunities available
                    </Typography>
                </Paper>

                {/* Filter Section */}
                <Paper elevation={2} className="p-3 mb-4">
                    <Box className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <Box className="d-flex align-items-center gap-2">
                            <FilterList sx={{ color: '#666' }} />
                            <Typography variant="h6" sx={{ color: '#013049', fontWeight: 'bold' }}>
                                Filter Jobs
                            </Typography>
                        </Box>

                        <FormControl size="small" sx={{ minWidth: 200 }}>
                            <InputLabel>Job Status</InputLabel>
                            <Select
                                value={statusFilter}
                                label="Job Status"
                                onChange={handleFilterChange}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#EF6E0B',
                                        },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#EF6E0B',
                                    },
                                }}
                            >
                                <MenuItem value="all">
                                    <Box className="d-flex justify-content-between align-items-center w-100">
                                        <span>All Jobs</span>
                                        <Badge badgeContent={jobCounts.all} color="primary" sx={{ ml: 2 }} />
                                    </Box>
                                </MenuItem>
                                <MenuItem value="pending">
                                    <Box className="d-flex justify-content-between align-items-center w-100">
                                        <span>Available Jobs</span>
                                        <Badge badgeContent={jobCounts.pending} color="info" sx={{ ml: 2 }} />
                                    </Box>
                                </MenuItem>
                                <MenuItem value="ongoing">
                                    <Box className="d-flex justify-content-between align-items-center w-100">
                                        <span>Ongoing Jobs</span>
                                        <Badge badgeContent={jobCounts.ongoing} color="warning" sx={{ ml: 2 }} />
                                    </Box>
                                </MenuItem>
                                <MenuItem value="assigned">
                                    <Box className="d-flex justify-content-between align-items-center w-100">
                                        <span>Assigned to Artisans</span>
                                        <Badge badgeContent={jobCounts.assigned} color="secondary" sx={{ ml: 2 }} />
                                    </Box>
                                </MenuItem>
                                <MenuItem value="completed">
                                    <Box className="d-flex justify-content-between align-items-center w-100">
                                        <span>Completed Jobs</span>
                                        <Badge badgeContent={jobCounts.completed} color="success" sx={{ ml: 2 }} />
                                    </Box>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Filter Summary */}
                    <Box className="mt-3">
                        <Typography variant="body2" color="textSecondary">
                            Showing {currentJobs.length} of {filteredJobs.length} jobs
                            {statusFilter !== 'all' && (
                                <Chip
                                    label={statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                                    size="small"
                                    onDelete={() => setStatusFilter('all')}
                                    sx={{ ml: 1, backgroundColor: '#EF6E0B', color: 'white' }}
                                />
                            )}
                        </Typography>
                    </Box>
                </Paper>

                {/* Jobs Grid */}
                <Grid container spacing={3}>
                    {currentJobs && currentJobs.length > 0 ? (
                        currentJobs.map((job) => (
                            <Grid item xs={12} md={6} lg={4} key={job._id}>
                                <JobCard job={job} />
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12}>
                            <Paper className="text-center p-5">
                                <TbFilter size={48} color="#ccc" />
                                <Typography variant="h5" color="textSecondary" className="mt-3">
                                    {statusFilter === 'all' ?
                                        'No jobs available at the moment' :
                                        `No ${statusFilter} jobs found`
                                    }
                                </Typography>
                                {statusFilter !== 'all' && (
                                    <Button
                                        variant="outlined"
                                        onClick={() => setStatusFilter('all')}
                                        sx={{ mt: 2, borderColor: '#EF6E0B', color: '#EF6E0B' }}
                                    >
                                        View All Jobs
                                    </Button>
                                )}
                            </Paper>
                        </Grid>
                    )}
                </Grid>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Box className="d-flex justify-content-center mt-5 mb-4">
                        <Paper elevation={2} sx={{ p: 2 }}>
                            <Stack spacing={2} alignItems="center">
                                <Typography variant="body2" color="textSecondary">
                                    Page {currentPage} of {totalPages} • {filteredJobs.length} total jobs
                                </Typography>
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    color="primary"
                                    size="large"
                                    showFirstButton
                                    showLastButton
                                    sx={{
                                        '& .MuiPaginationItem-root': {
                                            '&.Mui-selected': {
                                                backgroundColor: '#EF6E0B',
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: '#d45a00',
                                                },
                                            },
                                        },
                                    }}
                                />
                            </Stack>
                        </Paper>
                    </Box>
                )}
            </Container>
            <Footer />
        </div>
    );
};

const JobCard = ({ job }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'inprogress': return '#ff9800';
            case 'completed': return '#4caf50';
            case 'pending': return '#2196f3';
            default: return '#757575';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'inprogress': return <TbClock />;
            case 'completed': return <CircleCheck />;
            default: return <TbUsers />;
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        <Card
            elevation={3}
            className="h-100"
            sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                }
            }}
        >
            <CardContent className="p-4">
                {/* Header Section */}
                <Box className="d-flex justify-content-between align-items-start mb-3">
                    <Typography variant="h6" component="h3" className="fw-bold" sx={{ color: '#013049' }}>
                        {job.title}
                    </Typography>
                    <Chip
                        icon={getStatusIcon(job.status)}
                        label={job.status.toUpperCase()}
                        size="small"
                        sx={{
                            backgroundColor: getStatusColor(job.status),
                            color: 'white',
                            fontWeight: 'bold'
                        }}
                    />
                </Box>

                <Divider sx={{ mb: 2 }} />

                {/* Job Details */}
                <Box className="mb-3">
                    <Grid container spacing={2} className="mb-2">
                        <Grid item xs={6}>
                            <Box className="d-flex align-items-center gap-1">
                                <TbCalendar size={16} color="#666" />
                                <Typography variant="caption" color="textSecondary">
                                    {formatDate(job.createdAt)}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box className="d-flex align-items-center gap-1">
                                <LocationOn sx={{ fontSize: 16, color: '#666' }} />
                                <Typography variant="caption" color="textSecondary">
                                    {job.location}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Box className="d-flex align-items-center gap-1">
                                <TbMoneybag size={16} color="#EF6E0B" />
                                <Typography variant="body2" sx={{ color: '#EF6E0B', fontWeight: 'bold' }}>
                                    {formatCurrency(job.budget)}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box className="d-flex align-items-center gap-1">
                                <WorkRounded sx={{ fontSize: 16, color: '#666' }} />
                                <Typography variant="caption" color="textSecondary">
                                    {job.category}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                {/* Description */}
                <Typography variant="body2" color="textSecondary" className="mb-3" sx={{ lineHeight: 1.6 }}>
                    {job.description.length > 120 ?
                        job.description.slice(0, 120) + '...' :
                        job.description
                    }
                </Typography>

                {/* Client Info */}
                {job.user && (
                    <Box className="d-flex align-items-center gap-2 mb-3 p-2" sx={{ backgroundColor: '#f8f9fa', borderRadius: 1 }}>
                        <Avatar
                            src={job.user.avatar}
                            alt={job.user.fullName}
                            sx={{ width: 32, height: 32 }}
                        />
                        <Box>
                            <Typography variant="caption" color="textSecondary">Client</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {job.user.fullName}
                            </Typography>
                        </Box>
                    </Box>
                )}

                {/* Assigned Artisan (if exists) */}
                {job.artisan && (
                    <Box className="d-flex align-items-center gap-2 mb-3 p-2" sx={{ backgroundColor: '#e8f5e8', borderRadius: 1 }}>
                        <Avatar
                            src={job.artisan.avatar}
                            alt={job.artisan.fullName}
                            sx={{ width: 32, height: 32 }}
                        />
                        <Box className="flex-grow-1">
                            <Box className="d-flex align-items-center gap-1">
                                <Typography variant="caption" color="textSecondary">Assigned to</Typography>
                                <Verified sx={{ fontSize: 12, color: '#4caf50' }} />
                            </Box>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {job.artisan.fullName}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                {job.artisan.service}
                            </Typography>
                        </Box>
                    </Box>
                )}

                {/* Applications Count */}
                {job.applied && job.applied.length > 0 && (
                    <Box className="d-flex align-items-center gap-1 mb-3">
                        <AssignmentInd sx={{ fontSize: 16, color: '#666' }} />
                        <Typography variant="caption" color="textSecondary">
                            {job.applied.length} application{job.applied.length !== 1 ? 's' : ''}
                        </Typography>
                    </Box>
                )}

                {/* Skills Tags */}
                {job.skills && job.skills.length > 0 && (
                    <Box className="mb-3">
                        <Typography variant="caption" color="textSecondary" className="mb-1 d-block">
                            Required Skills:
                        </Typography>
                        <Box className="d-flex flex-wrap gap-1">
                            {job.skills.slice(0, 3).map((skill, index) => (
                                <Chip
                                    key={index}
                                    label={skill}
                                    size="small"
                                    sx={{
                                        backgroundColor: '#EF6E0B',
                                        color: 'white',
                                        fontSize: '0.7rem'
                                    }}
                                />
                            ))}
                            {job.skills.length > 3 && (
                                <Chip
                                    label={`+${job.skills.length - 3} more`}
                                    size="small"
                                    variant="outlined"
                                    sx={{ fontSize: '0.7rem' }}
                                />
                            )}
                        </Box>
                    </Box>
                )}

                {/* Action Button */}
                <Link to={`/single-job/${job._id}`} style={{ textDecoration: 'none' }}>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            backgroundColor: '#013049',
                            '&:hover': {
                                backgroundColor: '#024a6b'
                            },
                            textTransform: 'none',
                            fontWeight: 'bold',
                            py: 1.5
                        }}
                    >
                        View Details
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
};

export default JobOfferPage;