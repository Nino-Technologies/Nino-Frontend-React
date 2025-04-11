import React, { useContext } from 'react';
import { Box, Typography, Button, Grid, Paper, Chip } from '@mui/material';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { UserContext } from '../../context/UserContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const SingleJobPage = () => {
  const { userProfile } = useContext(UserContext)
  const [accept, setAccept] = useState(false);



  console.log('this is user details from user Context', userProfile)
  return (
    <div>
      <Nav />
      <Box
        sx={{
          backgroundColor: '#f8f9fa',
          minHeight: '100vh',
          py: 2,
          px: 2,
          mt: 8,

        }}
      >
        <div className='border-top-0 border-1 border-secondary-subtle p-3 px-4 rounded bg-secondary-subtle container border-2'
        >
          {/* Job Title and Company */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              mb: 4,

            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', color: '#013049', mb: 1 }}
            >
              <span className="fw-6">  Frontend Developer</span>
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: '#EF6E0B', fontWeight: 'bold' }}
            >
              Tech Solutions Inc.
            </Typography>
          </Box>

          {/* Job Details */}
          <Grid container spacing={4}>
            {/* Left Section */}
            <Grid item xs={12} md={8}>
              <Typography
                variant="h5"
                sx={{ fontWeight: '900', color: '#013049', mb: 2 }}
              >
                <span className='fw-2'>Job Description</span>
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#000', lineHeight: 1.8, mb: 4, fontWeight: 'bold' }}
              >
                We are looking for a skilled Frontend Developer to join our
                dynamic team. You will be responsible for implementing
                user-friendly interfaces and ensuring seamless user experiences.
                Your role will involve working closely with designers and
                backend developers to bring our projects to life.
              </Typography>

              <Typography
                variant="h5"
                sx={{ fontWeight: 'bold', color: '#013049', mb: 2 }}
              >
                Responsibilities
              </Typography>
              <ul style={{ color: '#555', lineHeight: 1.8 }}>
                <li>Develop and maintain responsive web applications.</li>
                <li>Collaborate with designers to implement UI/UX designs.</li>
                <li>Optimize applications for maximum speed and scalability.</li>
                <li>Write clean, maintainable, and efficient code.</li>
                <li>Debug and troubleshoot issues across browsers and devices.</li>
              </ul>
            </Grid>

            {/* Right Section */}
            <Grid item xs={12} md={4}>
              <Paper
                elevation={2}
                sx={{
                  padding: 3,
                  borderRadius: 4,
                  backgroundColor: '#013049',
                  color: 'white',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}
                >
                  Job Details
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <LocationOnIcon sx={{ color: '#EF6E0B', mr: 1 }} />
                  <Typography variant="body1">Abuja, Nigeria</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <WorkIcon sx={{ color: '#EF6E0B', mr: 1 }} />
                  <Typography variant="body1">Full-Time</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <AttachMoneyIcon sx={{ color: '#EF6E0B', mr: 1 }} />
                  <Typography variant="body1">$50,000 - $70,000/year</Typography>
                </Box>
                <h4 className='fs-6'>
                  Skills and Expertise
                </h4>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,
                    mt: 2,
                  }}
                >
                  <Chip label="React" sx={{ backgroundColor: '#EF6E0B', color: 'white' }} />
                  <Chip label="JavaScript" sx={{ backgroundColor: '#EF6E0B', color: 'white' }} />
                  <Chip label="CSS" sx={{ backgroundColor: '#EF6E0B', color: 'white' }} />
                </Box>
                {userProfile?.role === 1 ?
                  <div className='d-flex justify-content-between align-items-center bg-white px-2 py-1  mt-4 rounded-5'>
                    <input type="number" placeholder='BID PRICE' className=' p-1 border-0 w-75' style={{
                      outline: 'none',
                      appearance: 'textfield', // Removes arrows in most browsers
                      MozAppearance: 'textfield', // Removes arrows in Firefox
                    }} />
                    <Button variant='contained' className='rounded-end-5 rounded-0' sx={{ backgroundColor: '#EF6E0B', color: 'white', fontWeight: 'bold', fontSize: '10px', '&:hover': { backgroundColor: '#d65c0a', } }}>
                      BID PRICE
                    </Button>
                  </div> : ''}
              </Paper>
              <Button onClick={''}
                variant="contained"
                sx={{
                  backgroundColor: '#EF6E0B',
                  color: 'white',
                  mt: 3,
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  width: '100%',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#d65c0a',
                  },

                }}
              >
                Apply Now
              </Button>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <div className=''>

                </div>
                <Typography variant="body2" sx={{ color: '#555' }}>
                  By applying, you agree to our{' '}
                  <Link href="#" style={{ color: '#EF6E0B', textDecoration: 'none' }}>
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="#" style={{ color: '#EF6E0B', textDecoration: 'none' }}>
                    Privacy Policy
                  </Link>
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Call to Action */}

        </div>
      </Box>
      <Footer />
    </div>
  );
};

export default SingleJobPage;
