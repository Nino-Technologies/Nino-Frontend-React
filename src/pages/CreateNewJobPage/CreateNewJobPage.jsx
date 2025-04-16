import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid, Paper, MenuItem, Chip } from '@mui/material';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';

const jobTypes = ['Full-Time', 'Part-Time', 'Contract', 'Freelance'];
const categories = [
    'Web Development',
    'Design',
    'Marketing',
    'Finance',
    'Engineering',
    'Data Science',
    'Content Writing',
    'Mobile Development',
    'Sales',
    'Customer Support',
    'Human Resources',
    'Project Management',
    'Legal',
    'Healthcare',
    'Education',
    'IT Support',
    'Construction',
    'Real Estate',
    'Photography',
    'Video Editing',
    'UI/UX Design',
    'Accounting',
    'Consulting',
    'Event Planning',
    'Social Media Management',
    'Translation',
    'Game Development',
    'Cybersecurity',
    'Machine Learning',
    'Artificial Intelligence',
    'Blockchain Development',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Architecture',
    'Logistics',
    'Supply Chain Management',
    'E-commerce',
    'SEO Optimization',
    'Public Relations',
    'Fitness Training',
    'Food Services', 'Others'
];



const CreateNewJobPage = () => {
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [files, setFiles] = useState([]);
    const [requestInspection, setRequestInspection] = useState(false);
    const handleFileUpload = (e) => {
        const uploadedFiles = Array.from(e.target.files);
        setFiles([...files, ...uploadedFiles]);
    };

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

    return (


        <Box
            sx={{
                backgroundColor: '#f8f9fa',

                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'start',
                position: 'relative',
                // justifyContent: 'space-evenly',
                px: 2,
                py: 4,

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
                    top: 1, // Sticks to the top of the viewport
                    height: '700px', // Ensures it spans the full height of the viewport
                    // overflow: 'visible', // Ensure no overflow issues
                }}
                style={{ position: 'sticky' }}
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


            {/* Right Section (Form) */}
            <Box
                sx={{
                    flex: 2,
                    padding: { md: 4 },
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        padding: { xs: 1, md: 4 },
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: '900',
                            color: '#EF6E0B',
                            textAlign: 'center',
                            mb: { md: 3 },
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

                            {/* Company Name */}
                            {/* <Grid item xs={12}>
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
                                </Grid> */}
                            <Grid item xs={12}>
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
                                    label="Task Category"
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

                            {/* Salary */}


                            {/* Job Description */}

                            {/* Additional info */}
                            <Grid item xs={12}>
                                <Typography variant='body1' sx={{ fontWeight: 'bold', mb: 1 }}>
                                    Additional Information :
                                </Typography>

                                {/* File Upload */}
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
                                </Box>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Add Specific skills (Press Enter to Add)"
                                        variant="outlined"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleAddTag}
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
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: 1,
                                            mt: 2,
                                        }}
                                    >
                                        {tags.map((tag, index) => (
                                            <Chip
                                                key={index}
                                                label={tag}
                                                onDelete={() => handleDeleteTag(tag)}
                                                sx={{
                                                    backgroundColor: '#EF6E0B',
                                                    color: 'white',
                                                    '& .MuiChip-deleteIcon': {
                                                        color: 'white',
                                                    },
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </Grid>
                                {/* Specific Skills */}
                                {/* <TextField
                                        fullWidth
                                        label="Specific Skills Required"
                                        variant="outlined"
                                        multiline
                                        rows={2}
                                        sx={{ mb: 3 }}
                                    /> */}

                                {/* Materials/Tools */}
                                <TextField
                                    fullWidth
                                    label="Materials/Tools Information"
                                    variant="outlined"
                                    multiline
                                    rows={2}
                                    sx={{ mb: 3 }}
                                />
                                <div>
                                    <input type="checkbox" name="request-inspection" id="request-inspection" className='p-2' /> <label htmlFor="request-inspection">Request Inspection</label>
                                </div>
                                {/* Inspection Request */}
                                {/* <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={requestInspection}
                                                onChange={(e) => setRequestInspection(e.target.checked)}
                                                sx={{
                                                    color: '#EF6E0B',
                                                    '&.Mui-checked': {
                                                        color: '#EF6E0B',
                                                    },
                                                }}
                                            />
                                        }
                                        label="Request On-Site Inspection"
                                        sx={{ mb: 2 }}
                                    ></FormControlLabel> */}

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

    );
};

export default CreateNewJobPage;
