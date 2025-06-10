import React, { useContext, useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Paper,
    Chip,
    Dialog,
    TextField,
    Grid,
    CircularProgress,
    Card,
    CardContent,
    CardActions,
    IconButton,
    Menu,
    MenuItem,
    Divider,
    Badge,
    Stack,
    Alert,
    Fade,
    Skeleton
} from '@mui/material';
import {
    Edit as EditIcon,
    AttachMoney as AttachMoneyIcon,
    Schedule as ScheduleIcon,
    MoreVert as MoreVertIcon,
    Visibility as ViewIcon,
    Report as ReportIcon,
    CheckCircle as CheckCircleIcon,
    Payment as PaymentIcon,
    Wallet as WalletIcon,
    AccessTime as AccessTimeIcon,
    Assignment as AssignmentIcon
} from '@mui/icons-material';
import { toast } from "react-toastify";
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { PaystackButton } from 'react-paystack';
import { UserContext } from '../../context/UserContext';

// Theme configuration
const theme = {
    primary: '#ef6e0b',
    secondary: '#013049',
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',
    light: '#f8f9fa',
    white: '#ffffff',
    gray: '#6c757d'
};

const BidCard = ({ bid, onUpdate, job, fetchJob, setJobs }) => {
    const [openDispute, setOpenDispute] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [cookies] = useCookies();
    const { userProfile } = useContext(UserContext);
    const [disputeDescription, setDisputeDescription] = useState('');
    const [loadingJobComplete, setLoadingJobComplete] = useState(false);
    const [loadingPayment, setLoadingPayment] = useState(false);

    const openMenu = Boolean(anchorEl);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const CompleteJob = async () => {
        setLoadingJobComplete(true);
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", cookies.grinderUser.token);
            myHeaders.append("Content-Type", "application/json");

            const requestOptions = {
                method: "PUT",
                headers: myHeaders,
                redirect: "follow"
            };

            const response = await fetch(`https://nino-backend.vercel.app/api/job/complete?jobId=${bid.job}`, requestOptions);
            const result = await response.json();

            if (response.ok) {
                toast.success("Job completed successfully!");
                fetchJob();
            } else {
                toast.error(result.message || "Failed to complete job");
            }
        } catch (error) {
            console.error("Error completing job:", error);
            toast.error("Failed to complete job. Please try again.");
        } finally {
            setLoadingJobComplete(false);
        }
    };

    const config = {
        reference: (new Date()).getTime().toString(),
        email: userProfile.email,
        amount: bid.amount * 100,
        publicKey: "pk_test_f8e5c57777aaf7ebb1d557ab36331af498857a93"
    };

    const handlePaystackSuccessAction = async (reference) => {
        setLoadingPayment(true);
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", cookies.grinderUser.token);
            myHeaders.append('Content-Type', 'application/json');

            const raw = {
                type: "job",
                artisan: bid?.artisan,
                amount: bid?.amount,
                payment_verified: true,
                status: "inprogress",
                redirectUrl: 'hi',
                reference: reference.reference
            };

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(raw),
                redirect: "follow"
            };

            const response = await fetch(`https://nino-backend.vercel.app/api/payments/job?jobId=${bid.job}`, requestOptions);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Payment verification failed');
            }

            const result = await response.json();
            toast.success('Payment processed successfully!');
            fetchJob();
        } catch (error) {
            console.error('Payment processing error:', error);
            toast.error(error.message || 'Failed to process payment');
        } finally {
            setLoadingPayment(false);
        }
    };

    const handlePaystackCloseAction = () => {
        console.log('Payment dialog closed');
    };

    const componentProps = {
        ...config,
        text: 'Process Payment',
        onSuccess: (reference) => handlePaystackSuccessAction(reference),
        onClose: handlePaystackCloseAction,
    };

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
            setOpenDispute(false);
            setDisputeDescription('');
            handleMenuClose();
            return result;
        } catch (error) {
            console.error("Dispute Error:", error);
            toast.error(`Error: ${error.message}`);
            return null;
        }
    };

    const calculateDaysLeft = (timelineString) => {
        if (!timelineString) return { text: 'N/A', status: 'unknown' };

        try {
            const [startDateStr, endDateStr] = timelineString.split('-');
            const [day, month, year] = endDateStr.split('/');
            const endDate = new Date(`${year}-${month}-${day}`);
            const today = new Date();
            const timeDiff = endDate - today;
            const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

            if (daysLeft < 0) return { text: 'Overdue', status: 'overdue' };
            if (daysLeft === 0) return { text: 'Due today', status: 'urgent' };
            if (daysLeft <= 3) return { text: `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`, status: 'urgent' };
            return { text: `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`, status: 'normal' };
        } catch (error) {
            return { text: 'N/A', status: 'unknown' };
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'overdue': return theme.error;
            case 'urgent': return theme.warning;
            case 'normal': return theme.success;
            default: return theme.gray;
        }
    };

    const timeline = calculateDaysLeft(bid.timeLine);

    return (
        <Card
            elevation={0}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                border: `1px solid #e0e0e0`,
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 25px rgba(239, 110, 11, 0.15)`,
                    borderColor: theme.primary
                },
                position: 'relative',
                overflow: 'visible'
            }}
        >
            {/* Status Badge */}
            <Box
                sx={{
                    position: 'absolute',
                    top: -8,
                    left: 6,
                    backgroundColor: job.paymentJob.length === 0 ? 'orange' : 'green',
                    color: 'white',
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    zIndex: 1
                }}
            >
                {job.paymentJob.length === 0 ? 'No Deposit Found' : 'User Deposited'}
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    top: -8,
                    right: 8,
                    backgroundColor: theme.primary,
                    color: 'white',
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    zIndex: 1
                }}
            >
                Active
            </Box>


            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            color: theme.secondary,
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            lineHeight: 1.3
                        }}
                    >
                        <span>
                            {bid.jobTitle.length > 25 ? `${bid.jobTitle.slice(0, 25)}...` : bid.jobTitle}
                        </span>
                    </Typography>

                    <IconButton
                        onClick={handleMenuClick}
                        size="small"
                        sx={{
                            color: theme.gray,
                            '&:hover': {
                                backgroundColor: `${theme.primary}15`,
                                color: theme.primary
                            }
                        }}
                    >
                        <MoreVertIcon />
                    </IconButton>
                </Box>

                {/* Key Metrics */}
                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {/* <AttachMoneyIcon sx={{ color: theme.primary, fontSize: '1.1rem' }} /> */}
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: theme.secondary }}>
                            ₦{bid.amount?.toLocaleString() || '0'}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ScheduleIcon sx={{ color: getStatusColor(timeline.status), fontSize: '1.1rem' }} />
                        <Typography
                            variant="body2"
                            sx={{
                                color: getStatusColor(timeline.status),
                                fontWeight: 'medium'
                            }}
                        >
                            {timeline.text}
                        </Typography>
                    </Box>
                </Stack>

                {/* Description */}
                <Typography
                    variant="body2"
                    sx={{
                        color: theme.gray,
                        mb: 2,
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}
                >
                    <div dangerouslySetInnerHTML={{ __html: bid?.description?.slice(0, 80) || '' }} />
                    {bid?.description?.length > 80 && '...'}
                </Typography>

                {/* Materials */}
                {bid.materials && bid.materials.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="caption" sx={{ fontWeight: 'bold', color: theme.secondary, mb: 1, display: 'block' }}>
                            Materials Required:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {bid.materials.slice(0, 3).map((material, index) => (
                                <Chip
                                    key={index}
                                    label={material}
                                    size="small"
                                    sx={{
                                        backgroundColor: `${theme.primary}10`,
                                        color: theme.secondary,
                                        fontSize: '0.7rem',
                                        height: 20
                                    }}
                                />
                            ))}
                            {bid.materials.length > 3 && (
                                <Chip
                                    label={`+${bid.materials.length - 3} more`}
                                    size="small"
                                    sx={{
                                        backgroundColor: theme.light,
                                        color: theme.gray,
                                        fontSize: '0.7rem',
                                        height: 20
                                    }}
                                />
                            )}
                        </Box>
                    </Box>
                )}
            </CardContent>

            {/* Actions */}
            <CardActions sx={{ p: 3, pt: 0, flexDirection: 'column', gap: 1 }}>
                {/* Complete Job Button */}
                {job.paymentJob.length === 0 ? <p className=' p-1 rounded text-secondary ' >Process Payment to continue...</p> : <Button
                    fullWidth
                    variant="contained"
                    disabled={loadingJobComplete}
                    onClick={CompleteJob}
                    startIcon={loadingJobComplete ? <CircularProgress size={16} /> : <CheckCircleIcon />}
                    sx={{
                        backgroundColor: theme.primary,
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: 2,
                        py: 1.2,
                        '&:hover': {
                            backgroundColor: '#d65c0a'
                        },
                        '&:disabled': {
                            backgroundColor: theme.light
                        }
                    }}
                >
                    {userProfile.role === 0 ? 'Mark as Satisfied' : 'Complete Task'}
                </Button>}

                {/* Payment Button */}
                {(job.paymentJob.length === 0) &&
                    job.status === 'inprogress' &&
                    userProfile?._id === job?.user && (
                        <Box sx={{ width: '100%', mt: 1 }}>
                            <PaystackButton
                                {...componentProps}
                                className="w-100 border-0 p-2 rounded bg-success text-white"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    backgroundColor: theme.success,
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            />
                        </Box>
                    )}
            </CardActions>

            {/* Context Menu */}
            <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        minWidth: 160
                    }
                }}
            >
                <MenuItem
                    onClick={() => {
                        setOpenDispute(true);
                        handleMenuClose();
                    }}
                    sx={{ gap: 2, py: 1.5 }}
                >
                    <ReportIcon sx={{ color: theme.error, fontSize: '1.1rem' }} />
                    <Typography variant="body2">Create Dispute</Typography>
                </MenuItem>
                <MenuItem
                    component={Link}
                    to={`/single-job/${bid.job}`}
                    onClick={handleMenuClose}
                    sx={{ gap: 2, py: 1.5 }}
                >
                    <ViewIcon sx={{ color: theme.primary, fontSize: '1.1rem' }} />
                    <Typography variant="body2">View Job Details</Typography>
                </MenuItem>
            </Menu>

            {/* Dispute Dialog */}
            <Dialog
                open={openDispute}
                onClose={() => setOpenDispute(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 3 }
                }}
            >
                <Box sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ color: theme.secondary, mb: 1, fontWeight: 'bold' }}>
                        Create Dispute
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.gray, mb: 3 }}>
                        Please describe the issue with "{bid.jobTitle}"
                    </Typography>

                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Dispute Description"
                        value={disputeDescription}
                        onChange={(e) => setDisputeDescription(e.target.value)}
                        sx={{
                            mb: 3,
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: theme.primary
                                }
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: theme.primary
                            }
                        }}
                        placeholder="Explain the issue in detail..."
                    />

                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button
                            variant="outlined"
                            onClick={() => setOpenDispute(false)}
                            sx={{
                                color: theme.gray,
                                borderColor: theme.gray,
                                '&:hover': {
                                    borderColor: theme.secondary,
                                    color: theme.secondary
                                }
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            disabled={!disputeDescription.trim()}
                            onClick={async () => {
                                await submitDispute({
                                    jobId: bid.job,
                                    description: disputeDescription
                                });
                            }}
                            sx={{
                                backgroundColor: theme.error,
                                '&:hover': { backgroundColor: '#c82333' }
                            }}
                        >
                            Submit Dispute
                        </Button>
                    </Stack>
                </Box>
            </Dialog>
        </Card>
    );
};

const OngoingJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cookies] = useCookies();
    const { userProfile } = useContext(UserContext);
    const [completedJobs, setCompletedJobs] = useState([]);
    const [jobType, setJobType] = useState('ongoing');
    const [bids, setBids] = useState([]);

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

            const ongoingJobs = data.jobs.filter(job =>
                (job.application || (job.applied && job.applied.length > 0)) &&
                job.status === "inprogress"
            );
            const completedJobs = data.jobs.filter(job =>
                job.status === "completed"
            );

            setBids(ongoingJobs);
            setCompletedJobs(completedJobs);

            if (ongoingJobs.length === 0 && jobType === 'ongoing') {
                toast.info("No ongoing jobs found.");
            }
        } catch (err) {
            setError(err.message);
            toast.error("Failed to fetch jobs: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleUpdateBid = (updatedBid) => {
        setBids(bids.map(bid => bid.id === updatedBid.id ? updatedBid : bid));
    };

    const statsCards = [
        {
            title: 'Available Balance',
            value: userProfile?.wallet?.toLocaleString() || '0',
            icon: WalletIcon,
            color: theme.primary,
            show: userProfile.role === 1
        },
        {
            title: 'Active Jobs',
            value: bids.length.toString(),
            icon: AssignmentIcon,
            color: theme.secondary,
            show: true
        },
        {
            title: 'Completed Jobs',
            value: completedJobs.length.toString(),
            icon: CheckCircleIcon,
            color: theme.success,
            show: true
        }
    ].filter(card => card.show);

    if (loading) {
        return (
            <Box sx={{ p: 4 }}>
                {/* Header Skeleton */}
                <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 3, mb: 3 }} />

                {/* Stats Skeleton */}
                <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                    {[1, 2, 3].map((_, index) => (
                        <Skeleton key={index} variant="rectangular" height={80} sx={{ flex: 1, borderRadius: 2 }} />
                    ))}
                </Stack>

                {/* Cards Skeleton */}
                <Grid container spacing={3}>
                    {[1, 2, 3, 4, 5, 6].map((_, index) => (
                        <Grid item key={index} xs={12} sm={6} lg={4}>
                            <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 3 }} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 4 }}>
                <Alert severity="error" sx={{ borderRadius: 2 }}>
                    <Typography variant="h6">Error Loading Jobs</Typography>
                    <Typography variant="body2">{error}</Typography>
                </Alert>
            </Box>
        );
    }

    const currentJobs = jobType === 'ongoing' ? bids : completedJobs;

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#fafafa', minHeight: '100vh' }}>
            {/* Hero Header */}
            <Paper
                elevation={0}
                sx={{
                    background: theme.primary,
                    color: 'white',
                    p: { xs: 3, md: 5 },
                    borderRadius: 4,
                    mb: 4,
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="7" cy="7" r="7"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                        opacity: 0.3
                    }
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 'bold',
                        mb: 1,
                        fontSize: { xs: '2rem', md: '3rem' },
                        position: 'relative',
                        zIndex: 1
                    }}
                >
                    <span>
                        Job Management
                    </span>
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        opacity: 0.9,
                        fontSize: { xs: '1rem', md: '1.25rem' },
                        position: 'relative',
                        zIndex: 1
                    }}
                >
                    Track and manage your active projects
                </Typography>
            </Paper>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {statsCards.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                border: `1px solid #e0e0e0`,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                                }
                            }}
                        >
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Box
                                    sx={{
                                        p: 2,
                                        borderRadius: 2,
                                        backgroundColor: `${stat.color}15`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <stat.icon sx={{ color: stat.color, fontSize: '1.5rem' }} />
                                </Box>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.secondary }}>
                                        <span>
                                            {stat.title.includes('Balance') ? `₦${stat.value}` : stat.value}
                                        </span>
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: theme.gray }}>
                                        {stat.title}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Job Type Toggle */}
            <Paper
                elevation={0}
                sx={{
                    p: 1,
                    borderRadius: 3,
                    border: `1px solid #e0e0e0`,
                    mb: 4,
                    backgroundColor: 'white'
                }}
            >
                <Stack direction="row" spacing={1}>
                    {[
                        { key: 'ongoing', label: 'Ongoing Jobs', count: bids.length },
                        { key: 'completed', label: 'Completed Jobs', count: completedJobs.length }
                    ].map((tab) => (
                        <Button
                            key={tab.key}
                            onClick={() => setJobType(tab.key)}
                            sx={{
                                flex: 1,
                                py: 2,
                                borderRadius: 2,
                                fontWeight: 'bold',
                                backgroundColor: jobType === tab.key ? theme.secondary : 'transparent',
                                color: jobType === tab.key ? 'white' : theme.gray,
                                '&:hover': {
                                    backgroundColor: jobType === tab.key ? theme.secondary : `${theme.secondary}10`
                                }
                            }}
                        >
                            {tab.label}
                            <Badge
                                badgeContent={tab.count}
                                sx={{
                                    ml: 1,
                                    '& .MuiBadge-badge': {
                                        backgroundColor: jobType === tab.key ? theme.primary : theme.light,
                                        color: jobType === tab.key ? 'white' : theme.secondary
                                    }
                                }}
                            />
                        </Button>
                    ))}
                </Stack>
            </Paper>

            {/* Jobs Grid */}
            {currentJobs.length === 0 ? (
                <Paper
                    elevation={0}
                    sx={{
                        p: 6,
                        textAlign: 'center',
                        borderRadius: 3,
                        border: `1px solid #e0e0e0`
                    }}
                >
                    <AssignmentIcon sx={{ fontSize: 64, color: theme.gray, mb: 2 }} />
                    <Typography variant="h5" sx={{ color: theme.secondary, mb: 1, fontWeight: 'bold' }}>
                        No {jobType} jobs found
                    </Typography>
                    <Typography variant="body1" sx={{ color: theme.gray }}>
                        {jobType === 'ongoing'
                            ? "You don't have any active jobs at the moment."
                            : "You haven't completed any jobs yet."
                        }
                    </Typography>
                </Paper>
            ) : (
                <Fade in timeout={500}>
                    <Grid container spacing={3}>
                        {currentJobs.map((job) => {
                            const application = job.application ||
                                (job.applied && job.applied.length > 0 ? job.applied[0] : null);

                            if (!application) return null;

                            return (
                                <Grid item key={job._id} xs={12} sm={6} lg={4}>
                                    <BidCard
                                        job={job}
                                        bid={{
                                            ...application,
                                            jobTitle: job.title,
                                            job: job._id,
                                        }}
                                        onUpdate={handleUpdateBid}
                                        fetchJob={fetchJobs}
                                        setJobs={setJobs}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                </Fade>
            )}
        </Box>
    );
};

export default OngoingJobs;