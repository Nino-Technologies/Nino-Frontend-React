import React, { useContext, useEffect, useState } from 'react'
import Nav from '../../components/Nav/Nav'
import { Box, Chip, CircularProgress, Grid, Paper, TextField, Typography } from '@mui/material'
import { ArrowBackRounded, Category, Description, Email, GpsFixedSharp, LocationCity, LocationOn, MoneyRounded, Photo, Title } from '@mui/icons-material'

import { TbGps } from 'react-icons/tb'
import { BsTools } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { GoClock } from 'react-icons/go'
import BidDialogBox from './components/BidDialogBox'
import { grey } from '@mui/material/colors'
import { Avatar, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, } from '@mui/material';
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { toast } from 'react-toastify'
import './SingleJobPage.scss'
import { usePaystackPayment } from "react-paystack";
const SingleJobPage = () => {
  const { id } = useParams()
  const [cookies, setCookie, removeCookie] = useCookies();
  const { userProfile } = useContext(UserContext)
  const [open, setOpen] = useState(false);
  const [job, setJob] = useState(null);
  const navigate = useNavigate();
  const [artisanBidDetails, setArtisanBidDetails] = useState(false)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log('this is the user profile', userProfile);

  }, [userProfile])
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`https://nino-backend.vercel.app/api/job?id=${id}`);
        if (!response.ok) throw new Error('Failed to fetch job');

        const data = await response.json();
        console.log('this is the data from a single job', data)
        console.log('this is the id from a params', id)
        if (data.ok && data.jobs.length > 0) {
          setJob(data.jobs[0]);

        }
      } catch (error) {
        console.error('Error fetching job:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
    console.log('this is the user profile', userProfile)
  }, [id]);

  if (loading) return <div className="text-center p-4 d-flex justify-content-center align-items-center " style={{ width: '100%', height: '100vh' }}>
    <CircularProgress style={{ color: '#EF6E0B' }} size={48} thickness={5} />
    <span className="ms-3 fs-5">Loading job Details...</span>
  </div>;
  if (!job) return <div>Job not found</div>;
  console.log(job)
  return (
    <div className="w-100 " style={{ backgroundColor: '#013049', minHeight: '100vh' }}>
      <Nav />

      <div className="container py-5 mt-5">
        <Grid container spacing={2} >
          {/* Left Panel */}
          {/* Right Panel */}
          <Grid item xs={12} md={8} className='m-auto'>
            <Paper elevation={3} style={{ borderRadius: 10, padding: '24px', background: '#ffffff' }}>
              <h4 className="fw-bold mb-4" style={{
                color: '#013049', fontSize: '1.5rem',
              }}><span style={{
                display: 'flex',
                alignItems: 'center', gap: 8
              }}> <div className='p-2 border-black border-1 rounded-circle' onClick={() => navigate(-1)} style={{
                width: '30px', height: '30px', border: 'solid 1px black', display: 'flex',
                justifyContent: 'center',
                alignItems: 'center', cursor: 'pointer'
              }}><ArrowBackRounded /> </div>Job Details</span></h4>
              <hr />
              <div className="mb-3 d-flex align-items-start">

                <div>
                  <Typography variant="caption" style={{ color: '#013049', display: 'flex', alignItems: 'center' }}><Title style={{ color: '#013049', marginRight: 8 }} /><span className=''>Title</span></Typography>
                  <Typography variant="body1" className="fw-bold"><span>{job?.title}</span></Typography>
                </div>
              </div>
              <div className="mb-3 d-flex align-items-start">

                <div>
                  <Typography variant="caption" style={{ color: '#013049', display: 'flex', alignItems: 'center' }}><Description style={{ color: '#013049', marginRight: 8 }} /><span>Description</span></Typography>
                  {/* <Typography variant="body1" className="fw-bold"><span> */}
                  {job?.description}
                  {/* </span></Typography> */}
                </div>
              </div>
              <div className="mb-3 d-flex align-items-start">

                <div>
                  <Typography variant="caption" style={{ color: '#013049', display: 'flex', alignItems: 'center' }}><LocationOn style={{ color: '#013049', marginRight: 8 }} /><span>Location</span></Typography>
                  <Typography variant="body1" className="fw-bold"><span>{job?.location}</span></Typography>
                </div>
              </div>

              <div className="mb-3 d-flex align-items-start">

                <div>
                  <Typography variant="caption" style={{ color: '#013049', display: 'flex', alignItems: 'center' }}>  <MoneyRounded style={{ color: '#013049', marginRight: 8 }} /><span>Budget</span></Typography>
                  <Typography variant="body1" className="fw-bold"><span>₦ {job?.budget}</span> </Typography>
                </div>
              </div>

              <div className="mb-3 d-flex align-items-start">

                <div>
                  <Typography variant="caption" style={{ color: '#013049', display: 'flex', alignItems: 'center' }}>  <GoClock style={{ color: '#013049', marginRight: 8 }} /><span>Estimated Time</span></Typography>
                  {/* <Typography variant="body1" className="fw-bold"><span>31/02/25 - 31/5/25</span></Typography> */}
                </div>
              </div>

              <div className="mb-3 d-flex align-items-start">

                <div>
                  <Typography variant="caption" style={{ color: '#013049', display: 'flex', alignItems: 'center' }}> <Category style={{ color: '#013049', marginRight: 8 }} /> Category</Typography>
                  <Typography variant="body1" className="fw-bold"> <span>
                    {job?.category} </span></Typography>
                </div>
              </div>

              <div className="mb-4 d-flex align-items-start">

                <div>
                  <Typography variant="caption" style={{ color: '#013049', display: 'flex', alignItems: 'center' }}>  <BsTools style={{ color: '#013049', marginRight: 8, marginTop: 4 }} /><span>Required Skills</span></Typography>
                  <div className="mt-2 d-flex flex-wrap gap-2">
                    {job?.skills.map((skill, i) => (
                      <Chip
                        key={i}
                        label={skill}
                        size="small"
                        style={{ backgroundColor: '#ef6e0b', color: '#fff', fontWeight: 500 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <hr />
              <Typography variant="caption" style={{ color: '#013049', display: 'flex', alignItems: 'center' }}> <Photo style={{ color: '#013049', marginRight: 8 }} /><span>Media</span> </Typography>
              <hr />
              <div className="d-flex flex-wrap gap-3">
                {job.media.map((mediaUrl, index) => (
                  <a href={mediaUrl} key={index} target="_blank" rel="noopener noreferrer">
                    {mediaUrl.includes('video') ? (
                      <video src={mediaUrl} controls style={{ width: 280, borderRadius: 12 }} />
                    ) : (
                      <div className='m-auto ' style={{ width: '150px', height: '150px', overflow: 'hidden', borderRadius: 12, cursor: 'pointer' }}> <img src={mediaUrl} alt={`Media ${index + 1}`} style={{ width: '100%', height: '100%', borderRadius: 12, objectFit: 'cover' }} />
                      </div>
                    )}
                  </a>
                ))}
              </div>
              {userProfile?.role === 1 && (
                <button
                  onClick={() => setOpen(true)}
                  className="btn w-100 mt-3"
                  style={{
                    backgroundColor: '#013049',
                    color: 'white',
                    borderRadius: 10,
                    padding: '10px 16px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Make A Bid
                </button>
              )}

              {job && <BidDialogBox open={open} id={id} setOpen={setOpen} job={job} />}
            </Paper>


            {/* Artisan Bids (Owner Only) */}

          </Grid>
          {job.status === 'pending' && (<Grid item xs={12} md={4}>
            {userProfile?._id === job?.user?._id && (
              <Paper sx={{ mt: { xs: 3, md: 0 }, p: 2, borderRadius: 2, backgroundColor: '#ef6e0b' }}>
                <Typography className="fw-bold text-white mb-2">Artisans Bids</Typography>
                <div id='artisan-card-container' className="bg-white p-2 rounded bg-secondary-subtle artisan-card-container">
                  {job.applied.length < 1 ? (
                    <div>No Bids Yet</div>
                  ) : (
                    job.applied.map((applied, i) => (
                      <ArtisanCards key={applied._id || i} applied={applied} jobId={job._id} userId={job?.user?._id} />
                    ))
                  )}
                </div>
              </Paper>
            )}

            {job?.applied?.filter(job => job?.artisan?._id === userProfile?._id).length > 0 && (
              <Paper sx={{ mt: { xs: 3, md: 0 }, p: 2, borderRadius: 2, backgroundColor: '#ef6e0b' }}>
                <Typography className="fw-bold text-white mb-2">Your Bid</Typography>
                <div id='artisan-card-container' className="bg-white p-2 rounded bg-secondary-subtle artisan-card-container">
                  {job.applied
                    .filter(applied => applied?.artisan?._id === userProfile?._id)
                    .map((applied, i) => (
                      <ArtisanCards
                        key={applied._id || i}
                        applied={applied}
                        jobId={job._id}
                        userId={job?.user?._id}  // Correct prop passing
                      />
                    ))}
                </div>
              </Paper>
            )}
          </Grid>)}
        </Grid>
      </div>
    </div>

  )
}

export default SingleJobPage

const InfoRow = ({ icon, label, value }) => (
  <div className="d-flex justify-content-between align-items-start mb-3">
    <Typography variant="body1" className="fw-bold d-flex align-items-center" style={{ color: '#EF6E0B' }}>
      {icon}&nbsp;{label}:
    </Typography>
    <Typography variant="body2" style={{ color: '#013049', fontWeight: '600', maxWidth: 200, textAlign: 'right' }}>
      {value}
    </Typography>
  </div>
);



const ArtisanCards = ({ applied, jobId, userId }) => {
  const [requestInspection, setRequestInspection] = useState(false);
  const [paidInspection, setPaidInspection] = useState(false)
  const [artisanBidDetails, setArtisanBidDetails] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies();
  const { userProfile, token } = useContext(UserContext);
  // const [payment, setOpen] = useState(false);
  const config = {
    reference: jobId,
    email: userProfile.email,
    amount: applied.amount * 100,
    //save key in .env
    publicKey: "pk_live_e109e2fcfae6ad6a12d44d9d3d0833abd80b4cc4",
  };
  const initializePayment = usePaystackPayment(config);
  const onSuccess = async (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log('this is the reference after the payment', reference);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "{{vault:json-web-token}}");

      const raw = {
        type: "pay",
        artisan: applied?.artisan._id,
        amount: applied?.amount,
        payment_verified: true,
        status: "inprogress",
        redirectUrl: window.location.href,
        reference: reference
      };

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: "follow"
      };

      const response = await fetch(`${token}/payments/job?jobId=${jobId}`, requestOptions)

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
  }

  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    toast.info("Payment Canceled");
  };
  useEffect(() => {
    console.log(jobId, 'this is the job id from artisan card');
    console.log(applied, 'this is the applied from artisan card');
    console.log(userId, 'this is the user id from artisan card');
    console.log(config, 'this is the config from artisan card')
  })
  const updateJobStatus = async ({ jobId, artisanId, status }) => {
    try {
      console.log(jobId, artisanId, status, 'this is the job id from artisan card');
      // Validate required parameters
      if (!jobId || !artisanId || !status) {
        throw new Error('Missing required parameters: jobId, artisanId, status');
      }

      // Get token from secure storage (never hardcode in production)
      const token = cookies.grinderUser.token // Replace with your token storage method

      // Configure request
      const headers = new Headers({
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      });

      const body = JSON.stringify({
        jobId: jobId,
        artisanId: artisanId,
        status: status
      });

      console.log(body, 'this is the object from artisan card');
      const response = await fetch('https://nino-backend.vercel.app/api/job/artisan', {
        method: 'POST',
        headers,
        body,
        redirect: 'follow'
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${errorData.message || response.statusText}`);
      }
      console.log(response, 'this is the response from artisan card');

      setArtisanBidDetails(false)
      if (status === 'accepted') {
        toast.success('Artisan Bid Accepted  Successfully');
        // depositFundsForJob()
        if (applied?.amount > 0) {
          initializePayment(onSuccess, onClose)
        }
        setArtisanBidDetails(false)
      }
      else {
        toast.success('Artisan Bid Rejected  Successfully');
      }
      return await response.json();
    } catch (error) {
      console.log(error);
      toast.error('Error Accepting job status: ' + error.message,)
    }
  }
  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 1,
        mb: 2,
        borderRadius: 1,
        boxShadow: 3,
        background: '#fff',
        gap: 1,
      }}
    >
      {/* Profile Image */}
      <Box sx={{ display: 'flex', gap: 1, width: '100%', alignItems: 'center' }}>
        <Avatar
          src={applied?.artisan?.avatar}
          alt={applied?.artisan?.fullName}
          sx={{ width: 64, height: 64, mr: 2 }}
        />

        {/* Artisan Info */}
        <Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#013049' }}>
              {applied?.artisan?.fullName}
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
              {applied?.artisan?.service}
            </Typography>
            <Typography variant="body2" sx={{ color: '#EF6E0B', fontWeight: 600 }}>
              Bid: {applied.amount}
            </Typography>
          </Box>



        </Box>
      </Box>
      {/* Action Buttons */}
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, width: '100%' }}>
        <Link to={`/artisans-profile/` + applied?.artisan?._id}> <Button
          variant="outlined"
          sx={{
            flex: 1,
            borderColor: '#013049',
            color: '#013049',
            fontWeight: 'bold',
            '&:hover': { borderColor: '#EF6E0B', color: '#EF6E0B' },
            minWidth: 120,
          }}
        >
          View Profile
        </Button></Link>
        <Button
          variant="contained"
          sx={{
            flex: 1,
            fontSize: '14px',
            backgroundColor: '#EF6E0B',
            color: 'white',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#d65c0a' },
            minWidth: 120,
          }}
          onClick={() => { setArtisanBidDetails(true) }}
        >
          View Details
        </Button>
      </Box>


      <Dialog open={artisanBidDetails} onClose={() => { setArtisanBidDetails(false) }} style={{}}>
        <DialogTitle>
          <h3 className='fw-bold ' style={{ color: '#EF6E0B' }}>Bid Details</h3>
        </DialogTitle>


        <div className='d-flex gap-2 flex-column' style={{ padding: '10px' }}>
          <div className="rounded bg-secondary-subtle p-2 " style={{ width: '100%', maxWidth: '600px' }}>
            <h6 className='fw-bold'>Description</h6>
            <p>{applied?.description}</p>
          </div>
          <div className="rounded bg-secondary-subtle p-2 " style={{ width: '100%', maxWidth: '600px' }}>
            <h6 className='fw-bold'>Estimated Cost:</h6>
            <p>{applied?.amount}</p>
          </div>
          <div className="rounded bg-secondary-subtle p-2 " style={{ width: '100%', maxWidth: '600px' }}>
            <h6 className='fw-bold'>Timeline</h6>
            <p>{applied?.timeLine}</p>
          </div>
          <div className="rounded bg-secondary-subtle p-2 " style={{ width: '100%', maxWidth: '600px' }}>
            <h6 className='fw-bold'>Related Media</h6>
            <p>    {applied?.media?.map((mediaUrl, index) => (
              <div className='shadow' key={index} >
                <a href={mediaUrl} target="_blank" rel="noopener noreferrer">
                  {mediaUrl.includes('video') ? (
                    <video
                      src={mediaUrl}
                      controls
                      style={{
                        width: '300px',
                        height: 200,
                        objectFit: 'contain',
                        borderRadius: '8px'
                      }}
                    />
                  ) : (
                    <img
                      src={mediaUrl}
                      alt={`Media ${index + 1}`}
                      style={{
                        width: '300px',
                        height: 200,
                        objectFit: 'contain',
                        borderRadius: '8px'
                      }}
                    />
                  )}
                </a>
              </div>
            ))}</p>
          </div>
          {applied.inspectionFee > 0 ? <div className="rounded bg-secondary-subtle p-2 d-flex gap-1 flex-column " style={{ width: '500px', maxWidth: '600px' }}>
            <h6 className='fw-bold'>Inspection Fee : ₦ {applied.inspectionFee}</h6>
            {userProfile?._id === userId && (<div className='d-flex gap-2 flex-wrap'>
              <input type="text" placeholder='Address' className='p-3 rounded border-solid border-black' />
              <input type="datetime-local" placeholder='Inspection Date' className='p-3 rounded border-solid border-black' />
            </div>
            )}
          </div> : <p className='text-center'>No inspection fee Required</p>
          }
        </div>
        {userProfile?._id === userId && (
          <DialogActions>
            {console.log(userProfile?._id, userId, 'this is from dialog box')}
            {applied?.inspectionFee > 0 && (
              <Button
                className='fw-bold'
                sx={{ backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: '#d65c0a' } }}
              >
                Pay for Inspection
              </Button>
            )}
            <Button
              onClick={() => updateJobStatus({
                jobId: jobId,
                artisanId: applied?.artisan?._id,
                status: 'accepted'
              })}
              className='fw-bold'
              sx={{ backgroundColor: '#EF6E0B', color: 'white', '&:hover': { backgroundColor: '#d65c0a' } }}
            >
              Accept Bid
            </Button>
            <Button
              onClick={() => updateJobStatus({
                jobId: jobId,
                artisanId: applied?.artisan?._id,
                status: 'rejected'
              })}
              className='fw-bold'
              sx={{ backgroundColor: 'red', color: 'white', '&:hover': { backgroundColor: 'crimson' } }}
            >
              Reject Bid
            </Button>
            <Button
              onClick={() => setArtisanBidDetails(false)}
              variant='outlined'
            >
              Cancel
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </Paper>
  );
};