import { Cancel, LocationOnOutlined, WorkRounded } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { TbMoneybag } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import './JobRecord.scss';
import { useCookies } from 'react-cookie';
import { CircularProgress } from '@mui/material';

const JobRecord = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies();
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
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);



    return (
        <div id='job-record' className='container mx-auto my-1 pt-5'>
            <div className='rounded-2 primary-color p-5'>
                <h1 className='text-center text-white fw-bold'>Created Jobs</h1>
            </div>

            <div className="jobs-container mt-5">
                {loading ? (
                    <div className="text-center p-4 d-flex justify-content-center align-items-center  m-auto text-center" style={{ width: '100%', height: 'calc(100vh - 300px)' }}>
                        <CircularProgress style={{ color: '#EF6E0B' }} size={48} thickness={5} />
                        <span className="ms-3 fs-5">Loading jobs...</span>
                    </div>
                ) : error ? (
                    <div className="text-center p-4 text-danger">Error: {error}</div>
                ) : jobs.length > 0 ? (
                    [...jobs].reverse().map((job) => (
                        <div className=" mb-4" key={job._id}>
                            <JobCard job={job} />
                        </div>
                    ))
                ) : (
                    <div className="text-center p-4">No jobs available</div>
                )}
            </div>
        </div>
    );
};

const JobCard = ({ job }) => {
    return (
        <div className="job-card p-3 border rounded shadow-sm d-flex flex-column h-100 justify-content-between">
            <div className="d-flex justify-content-between align-items-center">
                <h5 className="fw-bold">{job.title}</h5>
                <div className="d-flex gap-2">
                    <span>Job Status : <span className='fw-bold   text-light'>{job.artisan ? <span className='text-light bg-success p-2 rounded' style={{ fontSize: '12px' }}>On going</span> : <span className='fw-bold p-2 rounded bg-warning text-black' style={{ fontSize: '12px' }}> Pending</span>}</span></span>
                </div>
            </div>
            <hr />
            <div className="d-flex flex-wrap mt-2 justify-content-between fw-bold text-secondary fs-6">
                <div className="d-flex">
                    <p>{new Date(job.createdAt).toLocaleDateString()}</p>
                </div>
                <p className="d-flex align-items-center gap-2 fs-6" style={{ fontSize: '12px' }}>
                    <LocationOnOutlined className="fs-6" />
                    {job.location}
                </p>
                <p className="d-flex align-items-center gap-2">
                    <TbMoneybag className='text-sucess' />
                    ₦{job.budget}
                </p>
                <p className="d-flex align-items-center gap-2">
                    <WorkRounded className="fs-6" />
                    <span>{job.category}</span>
                </p>
            </div>
            <p className="text-secondary job-des">
                {job.description}
            </p>
            <div className="d-flex flex-wrap gap-2">
                {job.skills?.map((skill, index) => (
                    <p key={index} className="job-tag-p text-black px-3 py-1 rounded-5 bg-secondary-subtle font-small">
                        {skill}
                    </p>
                ))}
            </div>
            <div className="d-flex w-100 gap-2 mt-3">
                <Link to={`/single-job/${job._id}`} className="text-white text-decoration-none w-75">
                    <button className="btn bg-primaryy text-white w-100">
                        VIEW DETAIL
                    </button>
                </Link>
                <button className="btn bg-primaryy btn-outline-dark text-white d-flex align-items-center gap-3">
                    <Cancel /> <span>Close</span>
                </button>
            </div>
        </div>
    );
};

export default JobRecord;