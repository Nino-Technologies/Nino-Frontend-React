import React, { useContext } from 'react';
import { Box, Typography, Button, Grid, Paper, Chip, Avatar, Dialog, Input, TextField, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@mui/material';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { UserContext } from '../../context/UserContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const SingleJobPage = () => {

  const { id } = useParams()
  const { userProfile } = useContext(UserContext)
  const [accept, setAccept] = useState(false);
  const [files, setFiles] = useState([]);
  const [requestInspection, setRequestInspection] = useState(false);
  const [paidInspection, setPaidInspection] = useState(false)
  const [open, setOpen] = useState(false);
  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles([...files, ...uploadedFiles]);
  };

  console.log('this is user details from user Context', userProfile, 'this is the single job id', id)
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
              <div className="p-2 border-1 border-primary text-black rounded-2 text-white" style={{
                backgroundColor: '#EF6E0B'
              }}><span className='fw-bold '>Connect:</span>12</div>
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
                  <input type="radio" name="inspection" id="" checked={!paidInspection} onChange={() => { setPaidInspection(false) }} /> <label htmlFor="inspection">Free Inspection</label>
                </div>
                <div className='d-flex align-items-center gap-2' >
                  <input type="radio" name="inspection" id="" checked={paidInspection} onChange={() => { setPaidInspection(true) }} /> <label htmlFor="inspection">Paid Inspection</label>
                </div>
                {paidInspection ? <div className='mt-3'>
                  <TextField
                    fullWidth
                    label="Inspect Cost"
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
                </div> : ''}
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
            <Button variant='contained' className='p-3' sx={{ width: "100%", backgroundColor: '#EF6E0B', color: 'white', fontWeight: 'bold', fontSize: '16px', '&:hover': { backgroundColor: '#d65c0a', } }} onClick={() => setOpen(false)}>
              <span>
                SUBMIT</span>
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
              <Box sx={{ mt: 2, textAlign: 'center' }}>{userProfile?.role === 0 ? <div className='text-start rounded-1 bg-white p-2'>
                <Typography variant="body1" color="initial"><span className='fw-bold'>Disclaimer:</span>       it's better to pay for the bid directly on grinders than outside the platform because once customer is not satisfied artisans would not be paid and client can ask for a refund</Typography>
              </div> : ''}
                <Typography variant="body2" sx={{ color: '#555' }}>

                  <br /> By applying, you agree to our{' '}
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
  const [openArtisanDetails, setOpenArtisanDetails] = useState(false)
  const [requestInspection, setRequestInspection] = useState(false)
  return <div className='col-md-5'>
    <Paper
      elevation={1}
      sx={{
        p: 3,
        borderRadius: 2,
        border: '1px solid #e0e0e0',
      }}

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
      {/* 
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          <span className='fw-bold'>Estimated Timeline</span> 6 weeks
        </Typography></Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        <span className='fw-bold'>Description</span> "I have 5 years of experience in frontend development and would love to help with your project..."
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        <span className='fw-bold'>Materials and Cost</span>: 2yards 2mm wire , Shock Absorber
      </Typography> */}

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          sx={{
            flex: 1,
            backgroundColor: '#EF6E0B',
            '&:hover': { backgroundColor: '#d65c0a' },
          }}
          onClick={() => { setOpenArtisanDetails(true) }}
        >
          View Bid details
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
    <Dialog
      open={openArtisanDetails}
      onClose={() => { setOpenArtisanDetails(false) }}
      maxWidth="md"
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 2,
          p: 2,
          minWidth: { xs: '90%', sm: '600px' }
        }
      }}
    >
      <DialogTitle sx={{ borderBottom: '2px solid #EF6E0B', pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src="/path-to-artisan-image.jpg"
            sx={{ width: 64, height: 64 }}
          />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#013049' }}>
              John Doe's Bid Details
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#666' }}>
              Electrician • 5 years experience
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          {/* Bid Amount and Timeline */}
          <Grid item xs={12} sm={6}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AttachMoneyIcon sx={{ color: '#EF6E0B', mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Bid Amount
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ color: '#EF6E0B', fontWeight: 'bold' }}>
                ₦50,000
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <WorkIcon sx={{ color: '#EF6E0B', mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Timeline
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ color: '#013049', fontWeight: 'bold' }}>
                6 weeks
              </Typography>
            </Paper>
          </Grid>

          {/* Detailed Information */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#013049', mb: 2 }}>
              Proposal Description
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              I have extensive experience in handling similar projects. My approach would include:
              • Initial assessment and planning
              • Quality material procurement
              • Professional installation
              • Testing and quality assurance
            </Typography>
          </Grid>

          {/* Cost Breakdown */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#013049', mb: 2 }}>
              Cost Breakdown
            </Typography>
            <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ color: '#666' }}>
                    Labor Cost:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    ₦20,000
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ color: '#666' }}>
                    Materials Cost:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    ₦25,000
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ color: '#666' }}>
                    Additional Expenses:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    ₦5,000
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Materials List */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#013049', mb: 2 }}>
              Required Materials
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {['2yards 2mm wire', 'Shock Absorber', 'Circuit Breaker', 'Cable Ties'].map((material) => (
                <Chip
                  key={material}
                  label={material}
                  sx={{
                    bgcolor: '#013049',
                    color: 'white',
                    '& .MuiChip-label': { fontWeight: 'medium' }
                  }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      {requestInspection ? <Box className='d-md-flex flex-sm-column flex-md-row gap-1'>
        <div className='mt-3'>
          <TextField
            fullWidth
            label="Address"
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
            label="Phone Number"
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
          <input
            fullWidth
            label="Date"
            variant="outlined"
            type='datetime-local'
            required
            className='outline-none border-1 border-bg-secondary-subtle rounded w-100 p-2 py-3'
          // sx={{
          //   '& .MuiOutlinedInput-root': {
          //     '& fieldset': {
          //       borderColor: '#013049',
          //     },
          //     '&:hover fieldset': {
          //       borderColor: '#EF6E0B',
          //     },
          //     '&.Mui-focused fieldset': {
          //       borderColor: '#EF6E0B',
          //     },
          //   },
          // }}
          />
        </div>
        {/* <TODO>
          Make the button conditionally show confirm inspection or paid inspection depending on the type of inpection
        </TODO> */}
        <button className='btn btn-success mt-3'>Pay For Inspection</button>


      </Box> : ''}
      {/* <DialogActions sx={{ p: 3, gap: 2 }}> */}
      <div className='d-flex flex-column flex-md-row gap-2 mt-2'>

        <Button
          variant="contained"
          sx={{
            bgcolor: '#013049',
            color: 'white',
            '&:hover': {
              bgcolor: '#d65c0a',
            }
          }}
          onClick={() => setRequestInspection(true)}
        >
          Approve Inspection (paid)
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: '#EF6E0B',
            color: 'white',
            '&:hover': {
              bgcolor: '#d65c0a',
            }
          }}
        >
          Accept Bid
        </Button>
        <Button
          onClick={() => setOpenArtisanDetails(false)}
          variant="outlined"
          sx={{
            borderColor: '#013049',
            color: '#013049',
            '&:hover': {
              borderColor: '#EF6E0B',
              color: '#EF6E0B',
            },
            width: { sm: '100%', md: 'auto' }
          }}
        >
          Close
        </Button>
      </div>
      {/* </DialogActions> */}
    </Dialog>
  </div>


}

export default SingleJobPage;

// import React, { useContext, useState } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   Grid,
//   Paper,
//   Chip,
//   Avatar,
//   Dialog,
//   TextField,
//   DialogContent,
//   DialogTitle,
//   DialogActions,
//   useMediaQuery,
//   useTheme
// } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import WorkIcon from '@mui/icons-material/Work';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import Nav from '../../components/Nav/Nav';
// import Footer from '../../components/Footer/Footer';
// import { UserContext } from '../../context/UserContext';

// const SingleJobPage = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const { id } = useParams();
//   const { userProfile } = useContext(UserContext);
//   const [open, setOpen] = useState(false);
//   const [files, setFiles] = useState([]);
//   const [paidInspection, setPaidInspection] = useState(false);
//   const [openArtisanDetails, setOpenArtisanDetails] = useState(false);
//   const [requestInspection, setRequestInspection] = useState(false);

//   // Style constants
//   const primaryColor = '#013049';
//   const accentColor = '#EF6E0B';
//   const textSecondary = '#6c757d';

//   const handleFileUpload = (e) => {
//     const uploadedFiles = Array.from(e.target.files);
//     setFiles([...files, ...uploadedFiles]);
//   };

//   const StyledTextField = (props) => (
//     <TextField
//       fullWidth
//       variant="outlined"
//       sx={{
//         '& .MuiOutlinedInput-root': {
//           '& fieldset': { borderColor: primaryColor },
//           '&:hover fieldset': { borderColor: accentColor },
//           '&.Mui-focused fieldset': { borderColor: accentColor },
//         },
//         '& .MuiInputLabel-root.Mui-focused': { color: accentColor },
//         mb: 2
//       }}
//       {...props}
//     />
//   );

//   return (
//     <div>
//       <Nav />
//       <Box sx={{
//         backgroundColor: '#f8f9fa',
//         minHeight: '100vh',
//         py: 2,
//         mt: 8,
//         width: '100%',
//         maxWidth: '100vw',
//         overflowX: 'hidden'
//       }}>
//         {/* Bid Dialog */}
//         <Dialog
//           open={open}
//           onClose={() => setOpen(false)}
//           fullScreen={isMobile}
//           sx={{
//             '& .MuiDialog-paper': {
//               width: '100%',
//               maxWidth: '800px',
//               borderRadius: 4
//             }
//           }}
//         >
//           <DialogContent sx={{ p: 3 }}>
//             <Box sx={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               mb: 3,
//               borderBottom: `2px solid ${primaryColor}`,
//               pb: 2
//             }}>
//               <Typography variant="h5" sx={{ fontWeight: 700, color: primaryColor }}>
//                 Submit A Bid
//               </Typography>
//               <Chip
//                 label="Connect: 12"
//                 sx={{
//                   bgcolor: accentColor,
//                   color: 'white',
//                   fontWeight: 'bold',
//                   fontSize: '0.875rem'
//                 }}
//               />
//             </Box>

//             <Grid container spacing={3}>
//               <Grid item xs={12} md={6}>
//                 <StyledTextField label="Description" required />
//                 <StyledTextField label="Timeline" required />
//                 <StyledTextField label="Labour and Other Expenses" required />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <StyledTextField label="Budget" required />
//                 <StyledTextField label="Additional Expenses" required />
//                 <StyledTextField label="Bid Amount" required />
//               </Grid>
//             </Grid>

//             <Box sx={{
//               display: 'flex',
//               gap: 3,
//               alignItems: 'center',
//               my: 3,
//               flexDirection: isMobile ? 'column' : 'row'
//             }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <input
//                   type="radio"
//                   checked={!paidInspection}
//                   onChange={() => setPaidInspection(false)}
//                 />
//                 <Typography>Free Inspection</Typography>
//               </Box>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <input
//                   type="radio"
//                   checked={paidInspection}
//                   onChange={() => setPaidInspection(true)}
//                 />
//                 <Typography>Paid Inspection</Typography>
//               </Box>
//             </Box>

//             {paidInspection && <StyledTextField label="Inspection Cost" required />}

//             <Box sx={{ mb: 3 }}>
//               <input
//                 accept="image/*,video/*"
//                 hidden
//                 id="file-upload"
//                 multiple
//                 type="file"
//                 onChange={handleFileUpload}
//               />
//               <label htmlFor="file-upload">
//                 <Button
//                   variant="outlined"
//                   component="span"
//                   sx={{
//                     borderColor: primaryColor,
//                     color: primaryColor,
//                     '&:hover': { borderColor: accentColor }
//                   }}
//                 >
//                   Upload Photos/Videos
//                 </Button>
//               </label>
//               <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//                 {files.map((file, index) => (
//                   <Chip
//                     key={index}
//                     label={file.name}
//                     onDelete={() => setFiles(files.filter((_, i) => i !== index))}
//                     sx={{
//                       bgcolor: '#e9ecef',
//                       '& .MuiChip-deleteIcon': { color: textSecondary }
//                     }}
//                   />
//                 ))}
//               </Box>
//             </Box>

//             <Button
//               fullWidth
//               variant="contained"
//               sx={{
//                 bgcolor: accentColor,
//                 py: 1.5,
//                 fontSize: '1rem',
//                 fontWeight: 700,
//                 '&:hover': { bgcolor: '#d65c0a' }
//               }}
//               onClick={() => setOpen(false)}
//             >
//               SUBMIT BID
//             </Button>
//           </DialogContent>
//         </Dialog>

//         {/* Main Content */}
//         <Box sx={{
//           width: '100%',
//           maxWidth: 1400,
//           mx: 'auto',
//           px: isMobile ? 2 : 4
//         }}>
//           {/* Job Header */}
//           <Box sx={{
//             bgcolor: 'white',
//             borderRadius: 4,
//             p: 4,
//             boxShadow: 3,
//             mb: 4
//           }}>
//             <Typography variant="h3" sx={{
//               fontWeight: 800,
//               color: primaryColor,
//               mb: 2,
//               fontSize: isMobile ? '2rem' : '2.5rem'
//             }}>
//               Senior Frontend Developer
//             </Typography>

//             <Box sx={{
//               display: 'flex',
//               gap: 3,
//               alignItems: 'center',
//               flexWrap: 'wrap'
//             }}>
//               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                 <LocationOnIcon sx={{ color: accentColor, mr: 1 }} />
//                 <Typography variant="h6">Abuja, Nigeria</Typography>
//               </Box>
//               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                 <WorkIcon sx={{ color: accentColor, mr: 1 }} />
//                 <Typography variant="h6">Full-Time</Typography>
//               </Box>
//               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                 <AttachMoneyIcon sx={{ color: accentColor, mr: 1 }} />
//                 <Typography variant="h6">₦302,323</Typography>
//               </Box>
//             </Box>
//           </Box>

//           {/* Job Details Grid */}
//           <Grid container spacing={4}>
//             <Grid item xs={12} md={8}>
//               <Box sx={{
//                 bgcolor: 'white',
//                 borderRadius: 4,
//                 p: 4,
//                 boxShadow: 3
//               }}>
//                 <Typography variant="h5" sx={{
//                   fontWeight: 700,
//                   color: primaryColor,
//                   mb: 3
//                 }}>
//                   Job Description
//                 </Typography>
//                 <Typography sx={{ mb: 4, lineHeight: 1.8 }}>
//                   We're seeking a skilled Frontend Developer to create responsive web applications
//                   and collaborate with our design team. You'll work with modern technologies including
//                   React, TypeScript, and Material-UI.
//                 </Typography>

//                 <Typography variant="h5" sx={{
//                   fontWeight: 700,
//                   color: primaryColor,
//                   mb: 3
//                 }}>
//                   Responsibilities
//                 </Typography>
//                 <Box component="ul" sx={{
//                   pl: 3,
//                   mb: 4,
//                   '& li': { mb: 1.5 }
//                 }}>
//                   <li>Develop and maintain responsive web applications</li>
//                   <li>Implement UI/UX designs with precision</li>
//                   <li>Optimize applications for performance</li>
//                   <li>Write clean, maintainable code</li>
//                 </Box>
//               </Box>
//             </Grid>

//             <Grid item xs={12} md={4}>
//               <Box sx={{
//                 bgcolor: primaryColor,
//                 borderRadius: 4,
//                 p: 4,
//                 boxShadow: 3,
//                 color: 'white'
//               }}>
//                 <Typography variant="h6" sx={{
//                   fontWeight: 700,
//                   mb: 3,
//                   textAlign: 'center'
//                 }}>
//                   Job Details
//                 </Typography>

//                 <Box sx={{ mb: 3 }}>
//                   <Chip
//                     label="React"
//                     sx={{
//                       bgcolor: accentColor,
//                       color: 'white',
//                       mr: 1,
//                       mb: 1
//                     }}
//                   />
//                   <Chip
//                     label="JavaScript"
//                     sx={{
//                       bgcolor: accentColor,
//                       color: 'white',
//                       mr: 1,
//                       mb: 1
//                     }}
//                   />
//                   <Chip
//                     label="Material-UI"
//                     sx={{
//                       bgcolor: accentColor,
//                       color: 'white',
//                       mb: 1
//                     }}
//                   />
//                 </Box>

//                 {userProfile?.role === 1 && (
//                   <Button
//                     fullWidth
//                     variant="contained"
//                     sx={{
//                       bgcolor: accentColor,
//                       py: 1.5,
//                       fontWeight: 700,
//                       '&:hover': { bgcolor: '#d65c0a' }
//                     }}
//                     onClick={() => setOpen(true)}
//                   >
//                     Submit Bid
//                   </Button>
//                 )}

//                 <Box sx={{ mt: 3, textAlign: 'center' }}>
//                   <Typography variant="body2">
//                     By applying, you agree to our{' '}
//                     <Link to="#" style={{ color: accentColor }}>
//                       Terms
//                     </Link>{' '}
//                     and{' '}
//                     <Link to="#" style={{ color: accentColor }}>
//                       Privacy Policy
//                     </Link>
//                   </Typography>
//                 </Box>
//               </Box>
//             </Grid>
//           </Grid>

//           {/* Artisan Bids Section */}
//           {userProfile?.role === 0 && (
//             <Box sx={{ mt: 5 }}>
//               <Typography variant="h4" sx={{
//                 fontWeight: 700,
//                 color: primaryColor,
//                 mb: 4
//               }}>
//                 Artisan Bids
//               </Typography>

//               <Grid container spacing={3}>
//                 {[1, 2, 3, 4].map((item) => (
//                   <Grid item xs={12} key={item}>
//                     <ArtisanCard
//                       onViewDetails={() => setOpenArtisanDetails(true)}
//                     />
//                   </Grid>
//                 ))}
//               </Grid>
//             </Box>
//           )}
//         </Box>

//         {/* Artisan Details Dialog */}
//         <Dialog
//           open={openArtisanDetails}
//           onClose={() => setOpenArtisanDetails(false)}
//           maxWidth="md"
//           fullWidth
//         >
//           <DialogTitle sx={{
//             bgcolor: primaryColor,
//             color: 'white',
//             borderBottom: `3px solid ${accentColor}`
//           }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//               <Avatar sx={{ width: 56, height: 56 }} />
//               <Box>
//                 <Typography variant="h5">John Doe</Typography>
//                 <Typography>Electrician • 5 years experience</Typography>
//               </Box>
//             </Box>
//           </DialogTitle>

//           <DialogContent sx={{ pt: 4 }}>
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={6}>
//                 <Paper sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
//                   <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
//                     Bid Details
//                   </Typography>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//                     <Typography>Bid Amount:</Typography>
//                     <Typography sx={{ fontWeight: 700, color: accentColor }}>
//                       ₦50,000
//                     </Typography>
//                   </Box>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                     <Typography>Timeline:</Typography>
//                     <Typography sx={{ fontWeight: 700 }}>6 weeks</Typography>
//                   </Box>
//                 </Paper>
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <Paper sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
//                   <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
//                     Contact Information
//                   </Typography>
//                   <Typography>📞 +234 812 345 6789</Typography>
//                   <Typography>📧 john.doe@example.com</Typography>
//                 </Paper>
//               </Grid>

//               <Grid item xs={12}>
//                 <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
//                   Materials List
//                 </Typography>
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//                   {['2mm Wire', 'Circuit Breaker', 'Cable Ties'].map((item) => (
//                     <Chip
//                       key={item}
//                       label={item}
//                       sx={{ bgcolor: primaryColor, color: 'white' }}
//                     />
//                   ))}
//                 </Box>
//               </Grid>
//             </Grid>
//           </DialogContent>

//           <DialogActions sx={{ p: 3, gap: 2 }}>
//             <Button
//               variant="contained"
//               sx={{ bgcolor: accentColor, '&:hover': { bgcolor: '#d65c0a' } }}
//             >
//               Accept Bid
//             </Button>
//             <Button
//               variant="outlined"
//               onClick={() => setOpenArtisanDetails(false)}
//               sx={{ borderColor: primaryColor, color: primaryColor }}
//             >
//               Close
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//       <Footer />
//     </div>
//   );
// };

// const ArtisanCard = ({ onViewDetails }) => {
//   return (
//     <Paper sx={{
//       p: 3,
//       borderRadius: 4,
//       bgcolor: 'white',
//       boxShadow: 3,
//       transition: 'transform 0.2s',
//       '&:hover': { transform: 'translateY(-5px)' }
//     }}>
//       <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//         <Avatar sx={{ width: 56, height: 56, mr: 2 }} />
//         <Box>
//           <Typography variant="h6" sx={{ fontWeight: 700 }}>
//             Electrician Specialist
//           </Typography>
//           <Typography variant="body2">5 years experience</Typography>
//         </Box>
//       </Box>

//       <Box sx={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         mb: 2
//       }}>
//         <Typography variant="body2">Bid Amount:</Typography>
//         <Typography variant="h6" sx={{ color: '#EF6E0B', fontWeight: 700 }}>
//           ₦50,000
//         </Typography>
//       </Box>

//       <Button
//         fullWidth
//         variant="contained"
//         sx={{
//           bgcolor: '#013049',
//           '&:hover': { bgcolor: '#00111c' },
//           mt: 2
//         }}
//         onClick={onViewDetails}
//       >
//         View Bid Details
//       </Button>
//     </Paper>
//   );
// };

// export default SingleJobPage;