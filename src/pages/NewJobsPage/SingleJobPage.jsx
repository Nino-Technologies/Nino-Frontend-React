import React, { useContext, useEffect, useState } from 'react'
import Nav from '../../components/Nav/Nav'
import { Box, Chip, CircularProgress, Grid, Paper, Typography } from '@mui/material'
import { Category, GpsFixedSharp, LocationCity, LocationOn, MoneyRounded } from '@mui/icons-material'
import { TbGps } from 'react-icons/tb'
import { BsTools } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { GoClock } from 'react-icons/go'
import BidDialogBox from './components/BidDialogBox'
import { grey } from '@mui/material/colors'
import { Avatar, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, } from '@mui/material';
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
const SingleJobPage = () => {
  const { id } = useParams()
  const [cookies, setCookie, removeCookie] = useCookies();
  const { userProfile } = useContext(UserContext)
  const [open, setOpen] = useState(false);
  const [job, setJob] = useState(null);
  const [artisanBidDetails, setArtisanBidDetails] = useState(false)
  const [loading, setLoading] = useState(true);
  useEffect(() => {

  })
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

  return (
    <div className='w-100'>
      <Nav />

      <div className="container">
        <Grid container className='mt-5 pt-5 w-100' sx={{ width: '100%' }} spacing={3}>
          {/* Main Content - Larger Column */}
          <Grid item xs={12} md={8}>
            <Paper className='w-100 p-4' elevation={2}>
              <div>
                <h3 className='fw-bold text-uppercase text-primarry'>
                  {job?.title}
                </h3>
              </div>
              <hr />
              <div className='p-2 rounded-2 border border-1 ' style={{ background: grey }}>
                <h5 className='fs-6 fw-bold'>
                  Description
                </h5>
                <p className='text-secondary lead'>
                  {job?.description}
                </p>
              </div>
              <hr />
              <div className='p-2 rounded-2 border border-1 ' style={{ background: grey }}>
                <h5 className='fs-6 fw-bold'>
                  Material Info
                </h5>
                <p className='text-secondary lead'>
                  {job?.materialInformation}
                </p>
              </div>
              <div>
                {<div>
                  {job.media.length > 0 && (
                    <Box sx={{ mt: 4 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Attached Media
                      </Typography>
                      <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {job.media.map((mediaUrl, index) => (
                          <div className='shadow' key={index}>
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
                        ))}
                      </div>
                    </Box>
                  )}

                </div>}
              </div>
            </Paper>
          </Grid>
          {/* Sidebar - Smaller Column */}
          <Grid item xs={12} md={4}>
            <Paper className='w-100 p-4 ' elevation={2}>
              <h4>Job Details</h4>
              <div className='d-flex flex-wap justify-content-between align-items-center mb-3'>

                <Typography variant="body1" color="#EF6E0B"> <LocationOn style={{ color: '#EF6E0B' }} />Location:</Typography>
                <Typography variant="body2" className='fw-6 text-wrap fw-bold text' color="#000">{job?.location} </Typography>

              </div>
              <div className='d-flex flex-wap justify-content-between align-items-center mb-3'>

                <Typography variant="body1" color="#EF6E0B"> <MoneyRounded style={{ color: '#EF6E0B' }} /> Budget:</Typography>
                <Typography variant="body2" className='fw-6 text-wrap fw-bold' color="#000">₦ {job?.budget} </Typography>

              </div>
              <div className='d-flex flex-wap justify-content-between align-items-center mb-3'>

                <Typography variant="body1" color="#EF6E0B"> <GoClock style={{ color: '#EF6E0B' }} /> Estimated Time:</Typography>
                <Typography variant="body2" className='fw-6 text-wrap fw-bold' color="#000">31/02/25 - 31/5/25 </Typography>

              </div>
              <div className='d-flex flex-wap justify-content-between align-items-center mb-3'>

                <Typography variant="body1" color="#EF6E0B"> <Category style={{ color: '#EF6E0B' }} />Category:</Typography>
                <Typography variant="body2" className='fw-6 text-wrap fw-bold' color="#000">{job?.category}</Typography>

              </div>
              <div className='d-flex flex-wap justify-content-between align-items-center mb-3'>

                <Typography variant="body1" color="#EF6E0B"> <BsTools style={{ color: '#EF6E0B' }} /> Skills:</Typography>
                <Typography variant="body2" className='fw-6 text-wrap' color="#000">{job?.skills.map((skill, index) => <Chip label={skill} key={index} className=' mx-1' style={{ background: '#EF6E0B', color: '#fff' }} />)} </Typography>

              </div>
              <div>
                <hr />
                {userProfile?.role === 1 ?
                  <button className='btn w-full rounded-3  py-2 px-4 ' onClick={() => setOpen(true)} style={{
                    width: '100%',
                    background: '#EF6E0B',
                    color: 'white'
                  }}>Make Bid </button> : ''}
              </div>
              {job ? <BidDialogBox open={open} id={id} setOpen={setOpen} job={job || {}} /> : ''}
            </Paper>
            {userProfile?._id === job.user ?
              <Paper sx={{ marginTop: 2, padding: 1, background: '#EF6E0B' }}>
                <div className="hello" style={{ fontWeight: 700 }}><Typography className='fw-bold text-white'>Artisans bids</Typography></div>
                <hr />
                <div className='p-2 rounded bg-white'>
                  <div>

                    {Array.isArray(job.applied) && job.applied.length < 1 ? (
                      <div>No Bids Yet</div>
                    ) : (
                      job.applied.map((applied, index) => (
                        <ArtisanCards key={applied._id || index} applied={applied} />
                      ))
                    )}
                  </div>
                </div>
              </Paper> : ''}
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default SingleJobPage




const ArtisanCards = ({ applied }) => {

  const [artisanBidDetails, setArtisanBidDetails] = useState(false)
  // Example artisan data (replace with real data as needed)
  const artisan = {
    name: "John Doe",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    profession: "Electrician",
    bidAmount: "₦50,000",
  };

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
          src={artisan.profileImage}
          alt={artisan.name}
          sx={{ width: 64, height: 64, mr: 2 }}
        />

        {/* Artisan Info */}
        <Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#013049' }}>
              {artisan.name}
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
              {artisan.profession}
            </Typography>
            <Typography variant="body2" sx={{ color: '#EF6E0B', fontWeight: 600 }}>
              Bid: {applied.amount}
            </Typography>
          </Box>



        </Box>
      </Box>
      {/* Action Buttons */}
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, width: '100%' }}>
        <Link to={`/artisans-profile/` + applied.artisan}> <Button
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


      {/* dialog box */}
      <Dialog open={artisanBidDetails} onClose={() => { setArtisanBidDetails(false) }}  >
        <DialogTitle >

        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>
              Proposed Budget:{applied.amount}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => { setArtisanBidDetails(false) }}
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};