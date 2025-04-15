// import React, { useState } from 'react';
// import { Box, Typography, Button, Paper, Chip, Dialog, TextField } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import ScheduleIcon from '@mui/icons-material/Schedule';

// const BidCard = ({ bid, onUpdate }) => {
//     const [openEdit, setOpenEdit] = useState(false);
//     const [editedBid, setEditedBid] = useState(bid);

//     const handleUpdateBid = () => {
//         onUpdate(editedBid);
//         setOpenEdit(false);
//     };

//     return (
//         <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2, position: 'relative' }}>
//             {/* Edit Button */}
//             <Button
//                 variant="outlined"
//                 startIcon={<EditIcon />}
//                 sx={{
//                     position: 'absolute',
//                     top: 16,
//                     right: 16,
//                     color: '#013049',
//                     borderColor: '#013049',
//                     '&:hover': {
//                         borderColor: '#EF6E0B',
//                         color: '#EF6E0B'
//                     }
//                 }}
//                 onClick={() => setOpenEdit(true)}
//             >
//                 Edit
//             </Button>

//             {/* Bid Content */}
//             <Typography variant="h6" sx={{ color: '#013049', mb: 1, fontWeight: 'bold' }}>
//                 {bid.jobTitle}
//             </Typography>

//             <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', mb: 2 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <AttachMoneyIcon sx={{ color: '#EF6E0B', mr: 1 }} />
//                     <Typography variant="body1">
//                         Bid Amount: <span style={{ fontWeight: 'bold' }}>₦{bid.amount}</span>
//                     </Typography>
//                 </Box>

//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <ScheduleIcon sx={{ color: '#EF6E0B', mr: 1 }} />
//                     <Typography variant="body1">
//                         Timeline: <span style={{ fontWeight: 'bold' }}>{bid.timeline} days</span>
//                     </Typography>
//                 </Box>
//             </Box>

//             <Typography variant="body2" sx={{ mb: 2 }}>
//                 <strong>Description:</strong> {bid.description}
//             </Typography>

//             {bid.materials && (
//                 <Box sx={{ mb: 2 }}>
//                     <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
//                         Materials:
//                     </Typography>
//                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
//                         {bid.materials.map((material, index) => (
//                             <Chip
//                                 key={index}
//                                 label={material}
//                                 sx={{ backgroundColor: '#f0f0f0', color: '#013049' }}
//                             />
//                         ))}
//                     </Box>
//                 </Box>
//             )}

//             {/* Edit Bid Dialog */}
//             <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="md">
//                 <Box sx={{ p: 4, width: '600px' }}>
//                     <Typography variant="h5" sx={{ color: '#013049', mb: 3 }}>
//                         Edit Bid for {bid.jobTitle}
//                     </Typography>

//                     <TextField
//                         fullWidth
//                         label="Bid Amount"
//                         value={editedBid.amount}
//                         onChange={(e) => setEditedBid({ ...editedBid, amount: e.target.value })}
//                         sx={{ mb: 3 }}
//                     />

//                     <TextField
//                         fullWidth
//                         label="Timeline (days)"
//                         value={editedBid.timeline}
//                         onChange={(e) => setEditedBid({ ...editedBid, timeline: e.target.value })}
//                         sx={{ mb: 3 }}
//                     />

//                     <TextField
//                         fullWidth
//                         multiline
//                         rows={4}
//                         label="Description"
//                         value={editedBid.description}
//                         onChange={(e) => setEditedBid({ ...editedBid, description: e.target.value })}
//                         sx={{ mb: 3 }}
//                     />

//                     <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
//                         <Button
//                             variant="outlined"
//                             onClick={() => setOpenEdit(false)}
//                             sx={{
//                                 color: '#013049',
//                                 borderColor: '#013049',
//                                 '&:hover': { borderColor: '#EF6E0B' }
//                             }}
//                         >
//                             Cancel
//                         </Button>
//                         <Button
//                             variant="contained"
//                             onClick={handleUpdateBid}
//                             sx={{
//                                 backgroundColor: '#EF6E0B',
//                                 '&:hover': { backgroundColor: '#d65c0a' }
//                             }}
//                         >
//                             Update Bid
//                         </Button>
//                     </Box>
//                 </Box>
//             </Dialog>
//         </Paper>
//     );
// };

// const OngoingJobs = () => {
//     // Example bids data - replace with real data from your API/context
//     const [bids, setBids] = useState([
//         {
//             id: 1,
//             jobTitle: "Kitchen Wiring Installation",
//             amount: "150,000",
//             timeline: "14",
//             description: "Complete installation of kitchen wiring with safety certification",
//             materials: ["2mm cables", "Circuit breakers", "Socket outlets"]
//         },
//         {
//             id: 2,
//             jobTitle: "Office Lighting Upgrade",
//             amount: "85,000",
//             timeline: "7",
//             description: "LED lighting upgrade for office space including dimmer switches"
//         }
//     ]);

//     const handleUpdateBid = (updatedBid) => {
//         setBids(bids.map(bid => bid.id === updatedBid.id ? updatedBid : bid));
//     };

//     return (
//         <div className='pb-5'>

//             <Box sx={{ p: 4, mt: 8 }}>
//                 <Typography variant="h4" sx={{ color: '#013049', mb: 4, fontWeight: 'bold' }}>
//                     My Bids
//                 </Typography>

//                 {bids.map(bid => (
//                     <BidCard
//                         key={bid.id}
//                         bid={bid}
//                         onUpdate={handleUpdateBid}
//                     />
//                 ))}
//             </Box>

//         </div>
//     );
// };

// export default OngoingJobs;
import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Chip, Dialog, TextField, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ScheduleIcon from '@mui/icons-material/Schedule';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import { AccessTimeSharp, WalletRounded } from '@mui/icons-material';

const BidCard = ({ bid, onUpdate }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [editedBid, setEditedBid] = useState(bid);

    const handleUpdateBid = () => {
        onUpdate(editedBid);
        setOpenEdit(false);
    };

    return (
        <Paper elevation={1} sx={{
            p: 3,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            transition: '0.3s',
            '&:hover': {
                boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)'
            }
        }}>
            {/* Edit Button */}
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ color: '#013049', mb: 1, fontWeight: 'bold' }}>
                    {bid.jobTitle}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="outlined"// startIcon={<EditIcon />}
                            sx={{
                                color: '#013049',
                                borderColor: '#013049',
                                '&:hover': {
                                    borderColor: '#EF6E0B',
                                    color: '#EF6E0B'
                                }
                            }}
                            onClick={() => setOpenEdit(true)}
                        >
                            Dispute
                        </Button>
                    </Box>
                </Box>

                {/* Bid Content */}

            </Box>

            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AttachMoneyIcon sx={{ color: '#EF6E0B', mr: 1 }} />
                        <Typography variant="body1">
                            ₦{bid.amount}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ScheduleIcon sx={{ color: '#EF6E0B', mr: 1 }} />
                        <Typography variant="body1">
                            {bid.timeline} days
                        </Typography>
                    </Box>
                </Box>

                <Typography variant="body2" sx={{ mb: 2 }}>
                    {bid.description}
                </Typography>

                {bid.materials && (
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                            Materials:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {bid.materials.map((material, index) => (
                                <Chip
                                    key={index}
                                    label={material}
                                    size="small"
                                    sx={{
                                        backgroundColor: '#f8f9fa',
                                        color: '#013049',
                                        border: '1px solid #e0e0e0'
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>
                )}
                <Box className="" >
                    <button className='btn bg-primaryy w-100 text-white' style={{ backgroundColor: '#ef6e0b', position: 'relative', button: 0 }}>View Job</button>
                </Box>
            </Box>

            {/* Edit Bid Dialog - Keep existing dialog code */}
            <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="md">
                <Box sx={{ p: 4, width: '600px' }}>
                    <Typography variant="h5" sx={{ color: '#013049', mb: 3 }}>
                        Edit Bid for {bid.jobTitle}
                    </Typography>

                    <TextField
                        fullWidth
                        label="Bid Amount"
                        value={editedBid.amount}
                        onChange={(e) => setEditedBid({ ...editedBid, amount: e.target.value })}
                        sx={{ mb: 3 }}
                    />

                    <TextField
                        fullWidth
                        label="Timeline (days)"
                        value={editedBid.timeline}
                        onChange={(e) => setEditedBid({ ...editedBid, timeline: e.target.value })}
                        sx={{ mb: 3 }}
                    />

                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Description"
                        value={editedBid.description}
                        onChange={(e) => setEditedBid({ ...editedBid, description: e.target.value })}
                        sx={{ mb: 3 }}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={() => setOpenEdit(false)}
                            sx={{
                                color: '#013049',
                                borderColor: '#013049',
                                '&:hover': { borderColor: '#EF6E0B' }
                            }}
                        >
                            Cancel                         </Button>
                        <Button
                            variant="contained"
                            onClick={handleUpdateBid} sx={{
                                backgroundColor: '#EF6E0B',
                                '&:hover': { backgroundColor: '#d65c0a' }
                            }}
                        >
                            Completed
                        </Button>
                    </Box>
                </Box>
            </Dialog>

        </Paper>
    );
};

const OngoingJobs = () => {
    const [bids, setBids] = useState([
        // Sample bids data
        {
            id: 1,
            jobTitle: "Kitchen Wiring Installation",
            amount: "150,000",
            timeline: "14",
            description: "Complete installation of kitchen wiring with safety certification",
            materials: ["2mm cables", "Circuit breakers", "Socket outlets"]
        },
        {
            id: 2,
            jobTitle: "Office Lighting Upgrade",
            amount: "85,000",
            timeline: "7",
            inspection: 'pending Approval',
            description: "LED lighting upgrade for office space including dimmer switches"
        },
        // Add more sample bids as needed
    ]);

    const handleUpdateBid = (updatedBid) => {
        setBids(bids.map(bid => bid.id === updatedBid.id ? updatedBid : bid));
    };

    return (
        <div className='pb-5'>

            <Box sx={{
                p: 4,
                mt: 8,
                minHeight: 'calc(100vh - 128px)'
            }}>
                <div className='d-flex justify-content-center align-items-center p-5 rounded-3 mb-4' style={{ backgroundColor: '#ef6e0b' }}>
                    <Typography variant="h4" sx={{
                        color: '#fff',
                        mb: 4,
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}>
                        <span class='fw-6'>  ACTIVE JOBS</span>
                    </Typography>

                </div>
                <div className='d-flex gap-2  mb-4'>
                    <div className='p-2 rounded-1 bg-secondary-subtle my-2'>
                        <span className='fw-5'> <WalletRounded style={{ color: '#ef6e0b' }} /> <span className='fw-bold'>Wallet</span> : 510,045</span>
                    </div>
                    <div className='p-2 rounded-1 bg-secondary-subtle my-2'>
                        <span className='fw-5'> <AccessTimeSharp style={{ color: '#ef6e0b' }} /> <span className='fw-bold'>Pending</span>  : 510,045</span>
                    </div>
                </div>
                <Grid container spacing={3}>
                    {bids.map(bid => (
                        <Grid item key={bid.id} xs={12} sm={6} md={4}>
                            <BidCard
                                bid={bid}
                                onUpdate={handleUpdateBid}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>

        </div>
    );
};

export default OngoingJobs;