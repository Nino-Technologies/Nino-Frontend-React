import React from 'react';
import { Box, TextField, Button, Typography, Grid, Paper, MenuItem } from '@mui/material';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';

const jobTypes = ['Full-Time', 'Part-Time', 'Contract', 'Freelance'];
const categories = ['Web Development', 'Design', 'Marketing', 'Finance', 'Engineering'];
const [tags, setTags] = useState([]);
const [tagInput, setTagInput] = useState('');

const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
        e.preventDefault();
        if (!tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
        }
        setTagInput('');
    }
};

const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
};
const CreateNewJobPage = () => {
    return (
        <div>
            <Nav />
            <Box
                sx={{
                    backgroundColor: '#f8f9fa',
                    minHeight: '90vh',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'stretch',
                    justifyContent: 'space-evenly',
                    px: 2,
                    py: 4,
                    mt: 10
                }}
            >
                {/* Left Section */}
                {/* Left Section */}
                <Box
                    sx={{
                        flex: 1,
                        backgroundColor: '#013049',
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 4,
                        position: 'sticky', // Makes the section sticky
                        top: 0, // Sticks to the top of the viewport
                        height: '100vh', // Ensures it spans the full height of the viewport
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: '900',
                            mb: 2,
                            textAlign: 'center',
                        }}
                    >
                        Welcome to Job Creation
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            textAlign: 'center',
                            lineHeight: 1.8,
                        }}
                    >
                        Post your job openings and connect with top-tier candidates. Fill out the form to create a new job and attract the best talent for your team.
                    </Typography>
                </Box>

                {/* Vertical Line of Demarcation */}
                <Box
                    sx={{
                        width: '2px',
                        backgroundColor: '#EF6E0B',
                        display: { xs: 'none', md: 'block' },
                    }}
                />

                {/* Right Section (Form) */}
                <Box
                    sx={{
                        flex: 2,
                        padding: 4,
                    }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            padding: 4,

                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: '900',
                                color: '#EF6E0B',
                                textAlign: 'center',
                                mb: 3,
                            }}
                        >
                            <span className='fw-bold'> Create a New Job</span>
                        </Typography>
                        <form>
                            <Grid container spacing={3}>
                                {/* Job Title */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Job Title"
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
                                </Grid>

                                {/* Company Name */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Company Name"
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
                                </Grid>

                                {/* Job Type */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Job Type"
                                        variant="outlined"
                                        required
                                        defaultValue=""
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
                                    >
                                        {jobTypes.map((type) => (
                                            <MenuItem key={type} value={type}>
                                                {type}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                {/* Category */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Category"
                                        variant="outlined"
                                        required
                                        defaultValue=""
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
                                    >
                                        {categories.map((category) => (
                                            <MenuItem key={category} value={category}>
                                                {category}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                {/* Location */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Location"
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
                                </Grid>

                                {/* Salary */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Salary Range (e.g., $50,000 - $70,000)"
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
                                </Grid>

                                {/* Job Description */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Job Description"
                                        variant="outlined"
                                        multiline
                                        rows={4}
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
                                </Grid>

                                {/* Submit Button */}
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#EF6E0B',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            fontSize: '1rem',
                                            py: 1.5,
                                            '&:hover': {
                                                backgroundColor: '#d65c0a',
                                            },
                                        }}
                                    >
                                        Post Job
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Box>
            </Box>
            <Footer />
        </div>
    );
};

export default CreateNewJobPage;
