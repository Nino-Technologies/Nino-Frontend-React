import { Alert, Box, Chip, Dialog, DialogContent, TextField, Typography } from '@mui/material'
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';


const BidDialogBox = ({ open, setOpen, id, job }) => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [paidInspection, setPaidInspection] = useState(false)
    const [files, setFiles] = useState([]);

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
        bidError: null
    });
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };


    const submitBid = async () => {
        if (!cookies?.grinderUser?.token) {
            setState(prev => ({ ...prev, bidError: 'Authentication required' }));
            return;
        }

        if (!state.bidSubmission.startDate || !state.bidSubmission.endDate) {
            setState(prev => ({ ...prev, bidError: 'Both dates are required' }));
            return;
        }

        const timelineString = `${formatDate(state.bidSubmission.startDate)}-${formatDate(state.bidSubmission.endDate)}`;
        setState(prev => ({ ...prev, submittingBid: true, bidError: null }));

        try {
            const headers = new Headers({
                'Authorization': cookies.grinderUser.token,
                'Content-Type': 'application/json'
            });

            const body = JSON.stringify({
                description: state.bidSubmission.description,
                timeLine: timelineString,
                materialCost: state.bidSubmission.materialCost,
                amount: Number(state.bidSubmission.amount),
                inspectionFee: Number(state.bidSubmission.inspectionFee),
                laborCost: Number(state.bidSubmission.laborCost),
                expensis: Number(state.bidSubmission.expensis)
            });
            console.log('this is the body!', body)
            const response = await fetch(
                `https://nino-backend.vercel.app/api/job/apply/${id}`,
                {
                    method: 'POST',
                    headers,
                    body,
                    redirect: 'follow'
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Bid submission failed');
            }

            const result = await response.json();
            toast.success('bid submited successfully')
            setOpen(false);
            // Handle successful submission (maybe show toast or update UI)
        } catch (error) {
            setState(prev => ({
                ...prev,
                bidError: error.message || 'Failed to submit bid',
                submittingBid: false
            }));
        } finally {
            setState(prev => ({ ...prev, submittingBid: false }));
        }
    };

    const handleInputChange = (field, value) => {
        setState(prev => ({
            ...prev,
            bidSubmission: { ...prev.bidSubmission, [field]: value }
        }));
    };

    const handleFileUpload = (e) => {
        const uploadedFiles = Array.from(e.target.files);
        setState(prev => ({
            ...prev,
            bidSubmission: { ...prev.bidSubmission, files: [...prev.bidSubmission.files, ...uploadedFiles] }
        }));
    };

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
                                onChange={(e) => handleInputChange('description', e.target.value)}
                            />
                        </div>
                        <div className='mt-3 d-flex align-items-center gap-4'>
                            <div className='d-flex gap-2'>
                                <label htmlFor="start-date">Estimated start Date: </label>
                                <input
                                    type="date"
                                    id="start-date"
                                    value={state.bidSubmission.startDate}
                                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                                    className='w-full p-2 rounded border-1 border-black'
                                />
                            </div>
                            <div className='d-flex gap-2'>
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
                        <div className='mt-3'>
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
                                value={state.bidSubmission.amount}
                                onChange={(e) => handleInputChange('amount', e.target.value)}
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
                                value={state.bidSubmission.expensis}
                                onChange={(e) => handleInputChange('expensis', e.target.value)}
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
                                value={state.bidSubmission.amount}
                                onChange={(e) => handleInputChange('amount', e.target.value)}
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
                                value={state.bidSubmission.description}
                                onChange={(e) => handleInputChange('timeLine', e.target.value)}
                            />
                        </div>
                        <div className='d-flex gap-5 mt-3 py-3 align-items-center'>
                            {job?.requestInspection ?
                                <div className='d-flex gap-5'>
                                    <div className='d-flex align-items-center gap-2'>
                                        <input type="radio" name="inspection" id="" checked={!paidInspection} onChange={() => { setPaidInspection(false) }} /> <label htmlFor="inspection">Free Inspection</label>
                                    </div>
                                    <div className='d-flex align-items-center gap-2' >
                                        <input type="radio" name="inspection" id="" checked={paidInspection} onChange={() => { setPaidInspection(true) }} /> <label htmlFor="inspection">Paid Inspection</label>
                                    </div> </div> : <p className='text-secondary-subtle'>Inspection Unavailable</p>}
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

