import { Typography } from '@mui/material'
import React from 'react'

const OngoingJobs = () => {
    return (
        <div className='pt-5 container'>
            <div className='d-flex justify-content-center align-items-center p-5 rounded-3 mb-4' style={{ backgroundColor: '#ef6e0b' }}>
                <Typography variant="h4" sx={{
                    color: '#fff',
                    mb: 4,
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>
                    <span class='fw-6'>  Ongoing Jobs</span>
                </Typography>

            </div>
        </div>
    )
}

export default OngoingJobs
