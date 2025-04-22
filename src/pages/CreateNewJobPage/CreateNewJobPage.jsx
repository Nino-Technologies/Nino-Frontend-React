import React, { useContext, useState } from 'react';
import { Box, TextField, Button, Typography, Grid, Paper, MenuItem, Chip, Checkbox, FormControlLabel } from '@mui/material';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import { UserContext } from '../../context/UserContext';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { toast } from 'react-toastify';



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
    const { CreateJob } = useContext(UserContext)
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [files, setFiles] = useState([]);
    const [media, setMedia] = useState([]);
    const [requestInspection, setRequestInspection] = useState(false);

    const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'grinders');

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/dvprllhcj/upload`,
                { method: 'POST', body: formData }
            );
            const data = await response.json();
            return { url: data.secure_url, name: file.name };
        } catch (error) {
            console.error('Error uploading file:', error);
            return null;
        }
    };

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);
        const uploadPromises = files.map(file => uploadToCloudinary(file));
        const uploadedMedia = await Promise.all(uploadPromises);
        setMedia(prev => [...prev, ...uploadedMedia.filter(item => item !== null)]);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const jobData = {
            title: formData.get('jobTitle'),
            description: formData.get('jobDescription'),
            materialInformation: formData.get('materials'),
            skills: tags,
            media: media.map(item => item.url),
            budget: Number(formData.get('budget')),
            location: formData.get('location'),
            category: formData.get('category'),
            requestInspection: requestInspection,
        };

        try {
            CreateJob(jobData)
            // Replace with actual submitJob function
            console.log('Submitting job:', jobData);
            // await submitJob(jobData);
            // alert('Job posted successfully!');
            // Reset form
            setTags([]);
            setMedia([]);
            setRequestInspection(false);
            e.target.reset();
            toast.success('Job posted successfully!');
        } catch (error) {
            alert('Error posting job: ' + error.message);
        }
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

            <Box sx={{ flex: 2, padding: { md: 4 } }}>
                <Paper elevation={3} sx={{ padding: { xs: 1, md: 4 } }}>
                    <Typography variant="h4" sx={{ color: '#EF6E0B', textAlign: 'center', mb: 3 }}>
                        Create a New Job
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="jobTitle"
                                    label="Job Title"
                                    variant="outlined"
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="jobDescription"
                                    label="Job Description"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="location"
                                    label="Location"
                                    variant="outlined"
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="budget"
                                    label="Budget"
                                    variant="outlined"
                                    type="number"
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    select
                                    name="category"
                                    label="Task Category"
                                    variant="outlined"
                                    required
                                    defaultValue=""
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category} value={category}>
                                            {category}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <Box sx={{ mb: 3 }}>
                                    <input
                                        accept="image/*,video/*"
                                        style={{ display: 'none' }}
                                        id="file-upload"
                                        multiple
                                        type="file"
                                        onChange={handleFileUpload}
                                    />
                                    <Box className='flex justify-between  items-center my-2'>
                                        {/* <FileUploaderRegular
                                            sourceList="local, camera, gdrive"
                                            cameraModes="photo, video"
                                            classNameUploader="uc-light"
                                            pubkey="de06d3627e924744c45e"
                                            onChange={handleFileUpload}
                                        /> */}
                                        {/* <CloudinaryInput /> */}
                                        <label htmlFor="file-upload">
                                            <Button variant="outlined" component="span">
                                                Upload Photos/Videos
                                            </Button>
                                        </label>
                                        {media.map((item, index) => (
                                            <Chip
                                                key={index}
                                                label={item.name}
                                                sx={{ ml: 1 }}
                                                onDelete={() => setMedia(media.filter((_, i) => i !== index))}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Add Specific skills (Press Enter to Add)"
                                    value={tagInput}

                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleAddTag}
                                />
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                                    {tags.map((tag, index) => (
                                        <Chip
                                            key={index}
                                            label={tag}
                                            onDelete={() => handleDeleteTag(tag)}
                                            sx={{ backgroundColor: '#EF6E0B', color: 'white' }}
                                        />
                                    ))}
                                </Box>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="materials"
                                    label="Materials/Tools Information"
                                    variant="outlined"
                                    multiline
                                    rows={2}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={requestInspection}
                                            onChange={(e) => setRequestInspection(e.target.checked)}
                                            color="primary"
                                        />
                                    }
                                    label="Request Inspection"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ backgroundColor: '#EF6E0B', '&:hover': { backgroundColor: '#d65c0a' } }}
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

// const CloudinaryInput = () => {
//     const cld = new Cloudinary({ cloud: { cloudName: 'dvprllhcj' } });

//     // Use this sample image or upload your own via the Media Explorer
//     const img = cld
//         .image('cld-sample-5')
//         .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
//         .quality('auto')
//         .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio

//     return (<AdvancedImage cldImg={img} />);
// };