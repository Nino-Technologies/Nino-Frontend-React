import { Alert, Box, Chip, Dialog, DialogContent, TextField, Typography } from '@mui/material'
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';


const BidDialogBox = ({ open, setOpen, id, job }) => {
    const [cookies] = useCookies();
    const [paidInspection, setPaidInspection] = useState(false)

    const [state, setState] = useState({
        loading: true,
        error: null,
        job: null,
        bidSubmission: {
            description: '',
            materialCost: '',
            amount: '',
            startDate: '',
            endDate: '',
            inspectionFee: '',
            laborCost: '',
            expensis: '',
            media: []
        },
        submittingBid: false,
        bidError: null,
        uploadingMedia: false
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        setState(prev => ({ ...prev, uploadingMedia: true }));

        try {
            const uploadPromises = files.map(async (file) => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'grinders'); // Replace with your Cloudinary preset

                const response = await fetch(
                    'https://api.cloudinary.com/v1_1/dvprllhcj/upload',
                    { method: 'POST', body: formData }
                );
                const data = await response.json();
                return { url: data.secure_url, name: file.name };
            });

            const uploadedMedia = await Promise.all(uploadPromises);

            setState(prev => ({
                ...prev,
                bidSubmission: {
                    ...prev.bidSubmission,
                    media: [...prev.bidSubmission.media, ...uploadedMedia]
                },
                uploadingMedia: false
            }));
        } catch (error) {
            console.error('Upload error:', error);
            setState(prev => ({
                ...prev,
                bidError: 'Failed to upload some files',
                uploadingMedia: false
            }));
        }
    };

    const submitBid = async () => {
        if (!cookies?.grinderUser?.token) {
            setState(prev => ({ ...prev, bidError: 'Authentication required' }));
            return;
        }

        const timelineString = `${formatDate(state.bidSubmission.startDate)}-${formatDate(state.bidSubmission.endDate)}`;

        try {
            const body = JSON.stringify({
                description: state.bidSubmission.description,
                timeLine: timelineString,
                materialCost: state.bidSubmission.materialCost,
                amount: Number(state.bidSubmission.amount),
                inspectionFee: Number(state.bidSubmission.inspectionFee),
                laborCost: Number(state.bidSubmission.laborCost),
                expensis: Number(state.bidSubmission.expensis),
                media: state.bidSubmission.media.map(m => m.url)
            });
            console.log('this is the bid submitted', body)

            const response = await fetch(
                `https://nino-backend.vercel.app/api/job/apply/${id}`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': cookies.grinderUser.token,
                        'Content-Type': 'application/json'
                    },
                    body
                }
            );

            if (!response.ok) throw new Error('Bid submission failed');

            toast.success('Bid submitted successfully');
            setOpen(false);
        } catch (error) {
            setState(prev => ({
                ...prev,
                bidError: error.message || 'Failed to submit bid'
            }));
        }
    };


    const handleInputChange = (field, value) => {
        setState(prev => ({
            ...prev,
            bidSubmission: { ...prev.bidSubmission, [field]: value }
        }));
    };

    // const handleFileUpload = (e) => {
    //     const uploadedFiles = Array.from(e.target.files);
    //     setState(prev => ({
    //         ...prev,
    //         bidSubmission: { ...prev.bidSubmission, files: [...prev.bidSubmission.files, ...uploadedFiles] }
    //     }));
    // };

    return (
        <div>
            <Dialog open={open} onClose={() => setOpen(false)} className=' p-2' sx={{ backdropFilter: 'blur(1px)' }}>
                <DialogContent className='p-2 ' sx={{ width: { sm: '100%', md: '700px', maxWidth: 600 }, backgroundColor: '#fff', borderRadius: '8px' }}>
                    <div className='d-flex justify-content-between align-items-center p-4'>
                        <h5 className='text- fw-bold text-primaryy'>Submit A Bid</h5>
                        {/* <div className="p-2 border-1 border-primary text-black rounded-2 text-white" style={{
                backgroundColor: '#EF6E0B'
              }}><span className='fw-bold '>Connect:</span>12</div> */}
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
                                    minHeight: '100px',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#013049',
                                            minHeight: '100px',

                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#EF6E0B',
                                            minHeight: '100px',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#EF6E0B',
                                            minHeight: '100px',
                                        },
                                    },
                                }}
                                value={state.bidSubmission.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                            />
                        </div>
                        <div className='mt-3 d-flex align-items-center gap-4 flex-wrap'>
                            <div className='d-flex gap-2 align-items-center'>
                                <label htmlFor="start-date">Estimated start Date: </label>
                                <input
                                    type="date"
                                    id="start-date"
                                    value={state.bidSubmission.startDate}
                                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                                    className='w-full p-2 rounded border-1 border-black'
                                />
                            </div>
                            <div className='d-flex gap-2  align-items-center'>
                                <label htmlFor="end-date">Estimated Completion Date: </label>
                                <input
                                    type="date"
                                    id="end-date"
                                    value={state.bidSubmission.endDate}
                                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                                    className='w-full p-2 rounded border-1 border-black'
                                />
                            </div>
                        </div>

                        {/* </div> */}
                        {/* <div className='mt-3'>
                            <TextField
                                fullWidth
                                label="Material Cost"
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
                                value={state.bidSubmission.materialCost}
                                onChange={(e) => handleInputChange('materialCost', e.target.value)}
                            />
                        </div> */}
                        <div className='mt-3'>
                            <TextField
                                fullWidth
                                label="Total Budget"
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
                                value={state.bidSubmission.amount}
                                onChange={(e) => handleInputChange('amount', e.target.value)}
                            />
                        </div>
                        {/* <div className='mt-3'>
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
                                value={state.bidSubmission.expensis}
                                onChange={(e) => handleInputChange('expensis', e.target.value)}
                            />
                        </div> */}
                        {/* <div className='mt-3'>
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
                                value={state.bidSubmission.amount}
                                onChange={(e) => handleInputChange('amount', e.target.value)}
                            />
                        </div> */}
                        {/* <div className='mt-3'>
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
                                value={state.bidSubmission.description}
                                onChange={(e) => handleInputChange('timeLine', e.target.value)}
                            />
                        </div> */}
                        <div className='d-flex gap-5 mt-3 py-3 flex-wrap align-items-center'>
                            {job?.requestInspection ?
                                <div className='d-flex gap-5'>
                                    <div className='d-flex align-items-center gap-2'>
                                        <input type="radio" name="inspection" id="" checked={!paidInspection} onChange={() => { setPaidInspection(false) }} /> <label htmlFor="inspection">Free Inspection</label>
                                    </div>
                                    <div className='d-flex align-items-center gap-2' >
                                        <input type="radio" name="inspection" id="" checked={paidInspection} onChange={() => { setPaidInspection(true) }} /> <label htmlFor="inspection">Paid Inspection</label>
                                    </div> </div> : <p className='text-secondary-subtle'>Inspection Unavailable</p>}
                            {paidInspection ? <div className='mb-3'>
                                <TextField
                                    fullWidth
                                    label="Inspection Cost"
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
                                    value={state.bidSubmission.inspectionFee}
                                    onChange={(e) => handleInputChange('inspectionFee', e.target.value)}
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
                            disabled={state.uploadingMedia}
                        />
                        <label htmlFor="file-upload">
                            <Button
                                variant="outlined"
                                component="span"
                                disabled={state.uploadingMedia}
                            >
                                {state.uploadingMedia ? 'Uploading...' : 'Upload Photos/Videos'}
                            </Button>
                        </label>

                        <Box sx={{ mt: 2 }}>
                            {state.bidSubmission.media.map((media, index) => (
                                <Chip
                                    key={index}
                                    label={media.name}
                                    onDelete={() => setState(prev => ({
                                        ...prev,
                                        bidSubmission: {
                                            ...prev.bidSubmission,
                                            media: prev.bidSubmission.media.filter((_, i) => i !== index)
                                        }
                                    }))}
                                    sx={{ m: 0.5 }}
                                />
                            ))}
                        </Box>
                    </Box>
                    {state.bidError && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {state.bidError}
                        </Alert>
                    )}
                    <Button variant='contained' className='p-3' sx={{ width: "100%", backgroundColor: '#EF6E0B', color: 'white', fontWeight: 'bold', fontSize: '16px', '&:hover': { backgroundColor: '#d65c0a', } }} onClick={submitBid}
                        disabled={state.submittingBid}>
                        <span>
                            {state.submittingBid ? 'Submitting...' : 'Submit Bid'}</span>
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default BidDialogBox

