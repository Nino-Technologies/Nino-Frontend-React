import React, { useContext } from 'react';
import { Box, Typography, Button, Grid, Paper, Chip, Avatar, Dialog, Input, TextField, DialogContent } from '@mui/material';
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
  const [files, setFiles] = useState([]);
  const [requestInspection, setRequestInspection] = useState(false);
  const [open, setOpen] = useState(false);
  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles([...files, ...uploadedFiles]);
  };

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
        <Dialog open={open} onClose={() => setOpen(false)} className=' p-2' sx={{ backdropFilter: 'blur(1px)' }}>
          <DialogContent className='p-2 ' sx={{ width: { sm: '100%', md: '700px', maxWidth: 600 }, backgroundColor: '#fff', borderRadius: '8px' }}>
            <div className='d-flex justify-content-between align-items-center p-4'>
              <h5 className='text- fw-bold text-primaryy'>Submit A Bid</h5>
              <div className="p-2 border-1 border-primary text-black rounded-2 " style={{
                backgroundColor: '#EF6E0B'
              }}><span className='fw-bold'>Wallet:</span>12</div>
            </div>
            <div >
              {/* <Input type="number" placeholder='BID PRICE' className=' p-1 border-0 w-75' style={{
                // Removes arrows in Firefox
              }} /> */}
              <div className='mt-3'>
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#013049',
                      },
                      '&:hover fieldset': {
                        borderColor: '#EF6E0B',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#EF6E0B',
                      },
                    },
                  }}
                />
              </div>
              <div className='mt-3'>
                <TextField
                  fullWidth
                  label="Timeline"
                  variant="outlined"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#013049',
                      },
                      '&:hover fieldset': {
                        borderColor: '#EF6E0B',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#EF6E0B',
                      },
                    },
                  }}
                />
              </div>
              <div className='mt-3'>
                <TextField
                  fullWidth
                  label="Labour and Other Expenses"
                  variant="outlined"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#013049',
                      },
                      '&:hover fieldset': {
                        borderColor: '#EF6E0B',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#EF6E0B',
                      },
                    },
                  }}
                />
              </div>
              <div className='mt-3'>
                <TextField
                  fullWidth
                  label="Budget"
                  variant="outlined"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#013049',
                      },
                      '&:hover fieldset': {
                        borderColor: '#EF6E0B',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#EF6E0B',
                      },
                    },
                  }}
                />
              </div>
              <div className='mt-3'>
                <TextField
                  fullWidth
                  label="Additional Expenses"
                  variant="outlined"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#013049',
                      },
                      '&:hover fieldset': {
                        borderColor: '#EF6E0B',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#EF6E0B',
                      },
                    },
                  }}
                />
              </div>
              <div className='mt-3'>
                <TextField
                  fullWidth
                  label="Bid Amount"
                  variant="outlined"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#013049',
                      },
                      '&:hover fieldset': {
                        borderColor: '#EF6E0B',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#EF6E0B',
                      },
                    },
                  }}
                />
              </div>
              <div className='mt-3'>
                <TextField
                  fullWidth
                  label="Budget"
                  variant="outlined"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#013049',
                      },
                      '&:hover fieldset': {
                        borderColor: '#EF6E0B',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#EF6E0B',
                      },
                    },
                  }}
                />
              </div>
              <div className='d-flex gap-5 mt-3 py-3'>
                <div className='d-flex align-items-center gap-2'>
                  <input type="radio" name="inspection" id="" /> <label htmlFor="inspection">Free Inspection</label>
                </div>
                <div className='d-flex align-items-center gap-2' >
                  <input type="radio" name="inspection" id="" /> <label htmlFor="inspection">Paid Inspection</label>
                </div>
              </div>
            </div>

            <Typography variant='body1'>
              Additional Information (optional information)
            </Typography>
            <Box sx={{ mb: 3 }}>
              <input
                accept="image/*,video/*"
                style={{ display: 'none' }}
                id="file-upload"
                multiple
                type="file"
                onChange={handleFileUpload}
              />
              <label htmlFor="file-upload">
                <Button
                  variant="outlined"
                  component="span"
                  sx={{
                    borderColor: '#013049',
                    color: '#013049',
                    '&:hover': {
                      borderColor: '#EF6E0B',
                    },
                  }}
                >
                  Upload Photos/Videos
                </Button>
              </label>
              {files.map((file, index) => (
                <Chip
                  key={index}
                  label={file.name}
                  sx={{ ml: 1 }}
                  onDelete={() => setFiles(files.filter((_, i) => i !== index))}
                />
              ))}

              <div className='mt-3'>
                <TextField
                  fullWidth
                  label="Terms and Conditions"
                  variant="outlined"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#013049',
                      },
                      '&:hover fieldset': {
                        borderColor: '#EF6E0B',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#EF6E0B',
                      },
                    },
                  }}
                />
              </div>
            </Box>
            <Button variant='contained' className='p-3' sx={{ width: "100%", backgroundColor: '#EF6E0B', color: 'white', fontWeight: 'bold', fontSize: '10px', '&:hover': { backgroundColor: '#d65c0a', } }} onClick={() => setOpen(false)}>
              SUBMIT
            </Button>
          </DialogContent>
        </Dialog>
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
              <span className="fw-6"> Job Title</span>
            </Typography>
            {/* <Typography
              variant="h6"
              sx={{ color: '#EF6E0B', fontWeight: 'bold' }}
            >
              Tech Solutions Inc.
            </Typography> */}
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
              {<Paper
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
                  <Typography variant="body1">₦302,323</Typography>
                </Box>
                <h4 className='fs-6'>
                  Specific Skills
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
                {/* {userProfile?.role === 1 ?
                  <div className='d-flex justify-content-between align-items-center bg-white px-2 py-1  mt-4 rounded-5'>
                    <input type="number" placeholder='BID PRICE' className=' p-1 border-0 w-75' style={{
                      outline: 'none',
                      appearance: 'textfield', // Removes arrows in most browsers
                      MozAppearance: 'textfield', // Removes arrows in Firefox
                    }} />
                    <Button variant='contained' className='rounded-end-5 rounded-0' sx={{ backgroundColor: '#EF6E0B', color: 'white', fontWeight: 'bold', fontSize: '10px', '&:hover': { backgroundColor: '#d65c0a', } }}>
                      BID PRICE
                    </Button>
                  </div> : ''
                  } */}
              </Paper>

              }
              {userProfile?.role === 1 ? <Button onClick={() => setOpen(true)}
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
                Submit a bid
              </Button> : ""}
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
        {userProfile?.role === 0 ?
          <div className='container mt-5'>
            <h3 className='text-primaryy'>
              Artisans Bids:
            </h3>
            <div className="row justify-content-center mt-4">
              <div className="col-12 mt-3 ">
                <div className="row gap-4">
                  <ArtisanCard />
                  <ArtisanCard />
                  <ArtisanCard />
                  <ArtisanCard />
                  <ArtisanCard />
                </div>
              </div>
            </div>
          </div>
          : ''}
      </Box>
      <Footer />
    </div>
  );
};

const ArtisanCard = () => {
  return <Paper
    elevation={1}
    sx={{
      p: 3,
      borderRadius: 2,
      border: '1px solid #e0e0e0',
    }}
    className='col-md-5'
  >
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Avatar
        src="/path-to-artisan-image.jpg"
        sx={{ width: 60, height: 60, mr: 2 }}
      />
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#013049' }}>
          Electrician
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Frontend Developer
        </Typography>
      </Box>
    </Box>

    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Bid Amount:
      </Typography>
      <Typography
        variant="h6"
        sx={{ color: '#EF6E0B', fontWeight: 'bold' }}
      >
        $500
      </Typography>
    </Box>

    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        <span className='fw-bold'>Estimated Timeline</span> 6 weeks
      </Typography></Box>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
      <span className='fw-bold'>Description</span> "I have 5 years of experience in frontend development and would love to help with your project..."
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
      <span className='fw-bold'>Materials and Cost</span>: 2yards 2mm wire , Shock Absorber
    </Typography>

    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button
        variant="contained"
        sx={{
          flex: 1,
          backgroundColor: '#EF6E0B',
          '&:hover': { backgroundColor: '#d65c0a' },
        }}
      >
        Accept Bid
      </Button>
      <Button
        variant="outlined"
        sx={{
          flex: 1,
          borderColor: '#013049',
          color: '#013049',
          '&:hover': {
            borderColor: '#EF6E0B',
            color: '#EF6E0B',
          },
        }}
      >
        View Profile
      </Button>
    </Box> </Paper>
}

export default SingleJobPage;
