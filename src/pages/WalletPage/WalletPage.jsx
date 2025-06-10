// import { Card, Box, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'
// import { LoaderPinwheel } from 'lucide-react'
// import { UserContext } from '../../context/UserContext'
// import React, { useContext, useEffect, useState } from 'react'
// import { useCookies } from 'react-cookie'
// import { GiCash } from 'react-icons/gi'
// import { toast } from 'react-toastify'
// import Select from 'react-select';
// // import { UserContext } from '../../context/UserContext'
// const WalletPage = () => {
//     const [active, setActive] = useState(0)
//     const [jobs, setJobs] = useState([]);
//     const [cookies] = useCookies();
//     const [open, setOpen] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const { userProfile } = useContext(UserContext)
//     const [banks, setbanks] = useState([])
//     const [accountLoading, setAccountLoading] = useState(false);
//     const [accountDetails, setAccountDetails] = useState({ accountNumber: '', bankCode: '', bankName: '' })
//     useEffect(() => {
//         const fetchJobs = async () => {
//             try {
//                 const myHeaders = new Headers();
//                 myHeaders.append("Authorization", cookies.grinderUser.token);

//                 const response = await fetch("https://nino-backend.vercel.app/api/job/mine", {
//                     method: "GET",
//                     headers: myHeaders,
//                     redirect: "follow"
//                 });

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }

//                 const data = await response.json();
//                 setJobs(data.jobs);
//                 console.log(data.jobs)
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchJobs();
//     }, [cookies.grinderUser?.token]);

//     const getBank = async () => {
//         try {
//             const myHeaders = new Headers();
//             myHeaders.append("Authorization", cookies.grinderUser.token);

//             const response = await fetch("https://nino-backend.vercel.app/api/payout/banks", {
//                 method: "GET",
//                 headers: myHeaders,
//                 redirect: "follow"
//             });

//             if (!response.ok) {
//                 toast.error(`HTTP error! status: ${response.status}`);
//             }

//             const result = await response.json();
//             setbanks(result.banks);
//             console.log(banks)
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     useEffect(() => {
//         getBank()
//     }, [])

//     const changeBank = (e) => {
//         const bank = banks.find(bank => bank.id === e.value);
//         console.log('this is the selected bank', bank)
//         setAccountDetails({ ...accountDetails, bankCode: bank.code, bankName: bank.name })
//     }

//     useEffect(() => {
//         if (userProfile?.accountNumber?.length === 10) {
//             setAccountLoading(true)
//         }

//     }, [accountDetails.accountNumber])


//     return (
//         <div className='container py-3 h'>
//             <div className='rounded-2 primary-color p-5 mt-3'>
//                 <h1 className='text-center text-white fw-bold'>Wallet</h1>
//             </div>
//             <div className='mt-3 d-flex justify-content-between align-items-center flex-wrap'>
//                 <Card elevation={0} sx={{ padding: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', maxWidth: { sm: '100%', md: '350px', gap: '10px' } }}  >
//                     <Box className='p-2 rounded-1 d-flex justify-content-center align-items-center bg-success-subtle ' style={{ width: '50px', height: '50px' }}>
//                         <GiCash className='text-success' style={{ width: '30px', height: '30px' }} />
//                     </Box>
//                     <Box className='d-flex flex-column  justify-content-between h-100 '>
//                         <h3 className='' style={{ fontSize: '14px', lineHeight: 0, fontWeight: 200, color: 'gray' }}>Total Balance</h3>
//                         <h2 style={{ fontSize: '20px', fontWeight: 900, color: 'green' }}>

//                             ₦ {userProfile?.wallet?.toLocaleString()}

//                         </h2></Box>
//                 </Card>
//                 <div>
//                     <button className='btn btn-success rounded-1' onClick={() => { setOpen(true) }}>
//                         Make Withdraw
//                     </button>
//                     <Dialog open={open} onClose={() => setOpen(false)} height={'400px'} >
//                         <DialogTitle >
//                             Withdraw Funds
//                         </DialogTitle>
//                         <DialogContent height={'500px'}>
//                             <DialogContentText width={'500px'}>
//                                 <Select
//                                     className="basic-single"
//                                     classNamePrefix="select"
//                                     value={accountDetails.bankCode}
//                                     onChange={(e) => changeBank(e)}
//                                     isSearchable={true}
//                                     options={banks.map((bank) => ({
//                                         label: bank.name,
//                                         value: bank.id,
//                                     }))
//                                     }

//                                 />
//                                 <input type="number" disabled={accountLoading} value={accountDetails.accountNumber} placeholder='Account Number' maxLength={10} />
//                             </DialogContentText>
//                         </DialogContent>
//                         <DialogActions>
//                             <Button
//                                 onClick={''}
//                                 color="primary"
//                             >
//                                 Cancel
//                             </Button>
//                         </DialogActions>
//                     </Dialog>
//                 </div>
//             </div>
//             <div className='w-100 p-2 d-flex align-items-center justify-content-center mt-3 mb-4' style={{ background: '#fff' }}>
//                 <div className={`p-2 rounded-1 d-flex align-items-center justify-content-center flex-1 w-100 ${active === 0 ? 'bg-success text-white' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setActive(0)}>
//                     <span className='text-center' >Recent Transactions</span>
//                 </div>
//                 <div className={`p-2 rounded-1 d-flex align-items-center justify-content-center flex-1 w-100 position-relative ${active === 1 ? 'bg-success text-white' : ''}`} onClick={() => setActive(1)} style={{ cursor: 'pointer' }}>
//                     <span className='text-center d-flex' >Pending Jobs {jobs.length > 0 && (<span className='' style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'orange', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '10px', marginLeft: '5px' }}> {jobs.filter((job) => job.paymentJob.length > 0 && job.application && job.complete === false).length}</span>)}</span>
//                 </div>
//             </div>
//             {loading ? (
//                 <div className='text-center d-flex justify-content-center align-items-center'> <CircularProgress style={{ color: '#EF6E0B' }} size={28} thickness={5} />Loading</div>
//             ) : (
//                 active === 0 ? (
//                     <div>
//                         <TransactionList />
//                     </div>
//                 ) : (

//                     <div>
//                         {jobs.filter((job) => job.paymentJob.length > 0 && job.application && job.complete === false).map((job) => {
//                             return <TransactionList key={job._id} job={job} />
//                         })}
//                     </div>
//                 )
//             )}
//         </div>
//     )
// }

// export default WalletPage

// const TransactionList = ({ job }) => {


//     return <div className='w-100 p-2 d-flex justify-content-between bg-white my-1 '>
//         <div className='d-flex flex-column text-secondary  '>
//             <span className='fw-bold'> {job?.title}	</span>
//             <div><p className='text-secondary-subtle fw-light ' style={{ fontSize: '10px' }}>
//                 {job?.description.slice(0, 30)}...</p></div>
//         </div>
//         <div className='d-flex flex-column bg-1  '>
//             <span className='text-success fw-bold'>₦ {job?.application?.amount}</span>
//             <div><div><span className='px-2 bg-warning-subtle rounded-pill d-flex justify-content-center align-items-center ' style={{ fontSize: '10px' }}>
//                 uncompleted</span></div></div>
//         </div>
//     </div>
// }

import { Card, Box, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField, Alert, Divider } from '@mui/material'
import { LoaderPinwheel, CheckCircle, AlertCircle } from 'lucide-react'
import { UserContext } from '../../context/UserContext'
import React, { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { GiCash } from 'react-icons/gi'
import { toast } from 'react-toastify'
import Select from 'react-select';

const WalletPage = () => {
    const [active, setActive] = useState(0)
    const [jobs, setJobs] = useState([]);
    const [cookies] = useCookies();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userProfile } = useContext(UserContext)
    const [banks, setbanks] = useState([])

    // Withdrawal form states
    const [withdrawalData, setWithdrawalData] = useState({
        accountNumber: '',
        bankCode: '',
        bankName: '',
        amount: '',
        password: ''
    });
    const [accountVerification, setAccountVerification] = useState({
        loading: false,
        verified: false,
        accountName: '',
        error: ''
    });
    const [withdrawalLoading, setWithdrawalLoading] = useState(false);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const myHeaders = new Headers();
                myHeaders.append("Authorization", cookies.grinderUser.token);

                const response = await fetch("https://nino-backend.vercel.app/api/job/mine", {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow"
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setJobs(data.jobs);
                console.log(data.jobs)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [cookies.grinderUser?.token]);

    const getBank = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", cookies.grinderUser.token);

            const response = await fetch("https://nino-backend.vercel.app/api/payout/banks", {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            });

            if (!response.ok) {
                toast.error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setbanks(result.banks);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load banks');
        }
    }

    useEffect(() => {
        getBank()
    }, [])

    const changeBank = (selectedOption) => {
        const bank = banks.find(bank => bank.id === selectedOption.value);
        setWithdrawalData({
            ...withdrawalData,
            bankCode: bank.code,
            bankName: bank.name
        });
        // Reset verification when bank changes
        setAccountVerification({
            loading: false,
            verified: false,
            accountName: '',
            error: ''
        });
    }

    const handleAccountNumberChange = (e) => {
        const accountNumber = e.target.value.replace(/\D/g, '').slice(0, 10);
        setWithdrawalData({
            ...withdrawalData,
            accountNumber
        });

        // Reset verification when account number changes
        setAccountVerification({
            loading: false,
            verified: false,
            accountName: '',
            error: ''
        });
    }

    const verifyAccount = async () => {
        if (!withdrawalData.accountNumber || withdrawalData.accountNumber.length !== 10 || !withdrawalData.bankCode) {
            toast.error('Please enter a valid 10-digit account number and select a bank');
            return;
        }

        setAccountVerification({ ...accountVerification, loading: true, error: '' });

        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", cookies.grinderUser.token);

            const response = await fetch(
                `https://nino-backend.vercel.app/api/payout/resolve-account?account_number=${withdrawalData.accountNumber}&bank_code=${withdrawalData.bankCode}`,
                {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow"
                }
            );

            const result = await response.json();

            if (result.okay) {
                setAccountVerification({
                    loading: false,
                    verified: true,
                    accountName: result?.accountDetail?.account_name,
                    error: ''
                });
                toast.success('Account verified successfully!');
            } else {
                setAccountVerification({
                    loading: false,
                    verified: false,
                    accountName: '',
                    error: result.message || 'Account verification failed'
                });
                toast.error(result.message || 'Account verification failed');
            }
        } catch (error) {
            setAccountVerification({
                loading: false,
                verified: false,
                accountName: '',
                error: 'Network error. Please try again.'
            });
            toast.error('Network error. Please try again.');
        }
    }

    const handleWithdrawal = async () => {
        // Validation
        if (!accountVerification.verified) {
            toast.error('Please verify your account first');
            return;
        }

        if (!withdrawalData.amount || parseFloat(withdrawalData.amount) <= 0) {
            toast.error('Please enter a valid amount');
            return;
        }

        if (parseFloat(withdrawalData.amount) > userProfile?.wallet) {
            toast.error('Insufficient balance');
            return;
        }

        if (!withdrawalData.password) {
            toast.error('Please enter your password');
            return;
        }

        setWithdrawalLoading(true);

        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", cookies.grinderUser.token);
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "bankCode": withdrawalData.bankCode,
                "accountNumber": withdrawalData.accountNumber,
                "requested_amount": parseFloat(withdrawalData.amount),
                "password": withdrawalData.password
            });

            const response = await fetch("https://nino-backend.vercel.app/api/payout/", {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            });

            const result = await response.json();

            if (response.ok && result.success) {
                toast.success('Withdrawal request submitted successfully!');
                handleCloseDialog();
                // Refresh user profile or wallet balance here if needed
            } else {
                toast.error(result.message || 'Withdrawal failed');
            }
        } catch (error) {
            toast.error('Network error. Please try again.');
        } finally {
            setWithdrawalLoading(false);
        }
    }

    const handleCloseDialog = () => {
        setOpen(false);
        setWithdrawalData({
            accountNumber: '',
            bankCode: '',
            bankName: '',
            amount: '',
            password: ''
        });
        setAccountVerification({
            loading: false,
            verified: false,
            accountName: '',
            error: ''
        });
    }

    return (
        <div className='container py-3 h'>
            <div className='rounded-2 primary-color p-5 mt-3'>
                <h1 className='text-center text-white fw-bold'>Wallet</h1>
            </div>
            {userProfile.role === 1 ?
                <div className='mt-3 d-flex justify-content-between align-items-center flex-wrap'>
                    <Card elevation={0} sx={{ padding: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', maxWidth: { sm: '100%', md: '350px', gap: '10px' } }}>
                        <Box className='p-2 rounded-1 d-flex justify-content-center align-items-center bg-success-subtle' style={{ width: '50px', height: '50px' }}>
                            <GiCash className='text-success' style={{ width: '30px', height: '30px' }} />
                        </Box>
                        <Box className='d-flex flex-column justify-content-between h-100'>
                            <h3 className='' style={{ fontSize: '14px', lineHeight: 0, fontWeight: 200, color: 'gray' }}>Total Balance</h3>
                            <h2 style={{ fontSize: '20px', fontWeight: 900, color: 'green' }}>
                                ₦ {userProfile?.wallet?.toLocaleString()}
                            </h2>
                        </Box>
                    </Card>

                    <div>
                        <button className='btn btn-success rounded-1' onClick={() => setOpen(true)}>
                            Make Withdraw
                        </button>

                        <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                            <DialogTitle sx={{ pb: 1 }}>
                                Withdraw Funds
                            </DialogTitle>
                            <DialogContent>
                                <Box sx={{ mt: 2 }}>
                                    {/* Bank Selection */}
                                    <Box sx={{ mb: 3 }}>
                                        <label style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', display: 'block' }}>
                                            Select Bank
                                        </label>
                                        <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            placeholder="Choose your bank..."
                                            onChange={changeBank}
                                            isSearchable={true}
                                            options={banks.map((bank) => ({
                                                label: bank.name,
                                                value: bank.id,
                                            }))}
                                            styles={{
                                                control: (base) => ({
                                                    ...base,
                                                    minHeight: '45px',
                                                    borderRadius: '8px'
                                                })
                                            }}
                                        />
                                    </Box>

                                    {/* Account Number */}
                                    <Box sx={{ mb: 2 }}>
                                        <TextField
                                            fullWidth
                                            label="Account Number"
                                            variant="outlined"
                                            value={withdrawalData.accountNumber}
                                            onChange={handleAccountNumberChange}
                                            placeholder="Enter 10-digit account number"
                                            inputProps={{ maxLength: 10 }}
                                            sx={{ mb: 1 }}
                                        />

                                        {withdrawalData.accountNumber.length === 10 && withdrawalData.bankCode && (
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={verifyAccount}
                                                disabled={accountVerification.loading}
                                                startIcon={accountVerification.loading ? <CircularProgress size={16} /> : null}
                                            >
                                                {accountVerification.loading ? 'Verifying...' : 'Verify Account'}
                                            </Button>
                                        )}
                                    </Box>

                                    {/* Account Verification Status */}
                                    {accountVerification.verified && (
                                        <Alert severity="success" sx={{ mb: 2 }} icon={<CheckCircle size={20} />}>
                                            Account verified: <strong>{accountVerification.accountName}</strong>
                                        </Alert>
                                    )}

                                    {accountVerification.error && (
                                        <Alert severity="error" sx={{ mb: 2 }} icon={<AlertCircle size={20} />}>
                                            {accountVerification.error}
                                        </Alert>
                                    )}

                                    {/* Amount */}
                                    <TextField
                                        fullWidth
                                        label="Amount"
                                        variant="outlined"
                                        type="number"
                                        value={withdrawalData.amount}
                                        onChange={(e) => setWithdrawalData({ ...withdrawalData, amount: e.target.value })}
                                        placeholder="Enter amount to withdraw"
                                        sx={{ mb: 2 }}
                                        helperText={`Available balance: ₦${userProfile?.wallet?.toLocaleString()}`}
                                    />

                                    <Divider sx={{ my: 2 }} />

                                    {/* Password */}
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        variant="outlined"
                                        type="password"
                                        value={withdrawalData.password}
                                        onChange={(e) => setWithdrawalData({ ...withdrawalData, password: e.target.value })}
                                        placeholder="Enter your password to confirm"
                                        sx={{ mb: 2 }}
                                    />
                                </Box>
                            </DialogContent>

                            <DialogActions sx={{ px: 3, pb: 3 }}>
                                <Button
                                    onClick={handleCloseDialog}
                                    variant="outlined"
                                    disabled={withdrawalLoading}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleWithdrawal}
                                    variant="contained"
                                    color="success"
                                    disabled={!accountVerification.verified || withdrawalLoading}
                                    startIcon={withdrawalLoading ? <CircularProgress size={16} color="inherit" /> : null}
                                >
                                    {withdrawalLoading ? 'Processing...' : 'Withdraw'}
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div> : ''}

            <div className='w-100 p-2 d-flex align-items-center justify-content-center mt-3 mb-4' style={{ background: '#fff' }}>
                <div className={`p-2 rounded-1 d-flex align-items-center justify-content-center flex-1 w-100 ${active === 0 ? 'bg-success text-white' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setActive(0)}>
                    <span className='text-center'>Recent Transactions</span>
                </div>
                <div className={`p-2 rounded-1 d-flex align-items-center justify-content-center flex-1 w-100 position-relative ${active === 1 ? 'bg-success text-white' : ''}`} onClick={() => setActive(1)} style={{ cursor: 'pointer' }}>
                    <span className='text-center d-flex'>
                        Pending Jobs
                        {jobs.length > 0 && (
                            <span className='' style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'orange', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '10px', marginLeft: '5px' }}>
                                {jobs.filter((job) => job.paymentJob.length > 0 && job.application && job.complete === false).length}
                            </span>
                        )}
                    </span>
                </div>
            </div>

            {loading ? (
                <div className='text-center d-flex justify-content-center align-items-center'>
                    <CircularProgress style={{ color: '#EF6E0B' }} size={28} thickness={5} />
                    Loading
                </div>
            ) : (
                active === 0 ? (
                    <div>
                        <TransactionList />
                    </div>
                ) : (
                    <div>
                        {jobs.filter((job) => job.paymentJob.length > 0 && job.application && job.complete === false).map((job) => {
                            return <TransactionList key={job._id} job={job} />
                        })}
                    </div>
                )
            )}
        </div>
    )
}

export default WalletPage

const TransactionList = ({ job }) => {
    return (
        <div className='w-100 p-2 d-flex justify-content-between bg-white my-1'>
            <div className='d-flex flex-column text-secondary'>
                <span className='fw-bold'>{job?.title}</span>
                <div>
                    <p className='text-secondary-subtle fw-light' style={{ fontSize: '10px' }}>
                        {job?.description.slice(0, 30)}...
                    </p>
                </div>
            </div>
            <div className='d-flex flex-column bg-1'>
                <span className='text-success fw-bold'>₦ {job?.application?.amount}</span>
                <div>
                    <div>
                        <span className='px-2 bg-warning-subtle rounded-pill d-flex justify-content-center align-items-center' style={{ fontSize: '10px' }}>
                            uncompleted
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}