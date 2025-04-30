import React, { useEffect, useState } from 'react';
import './JobOfferPage.scss';
import Nav from '../../components/Nav/Nav';
import { Paper } from '@mui/material';
import { TbMoneybag } from 'react-icons/tb';
import { LocationOn, WorkRounded } from '@mui/icons-material';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { CircularProgress } from '@mui/material';
const JobOfferPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies();
    useEffect(() => {

        const fetchJobs = async () => {
            try {
                // const myHeaders = new Headers();
                // myHeaders.append("Authorization", cookies.grinderUser.token);

                const response = await fetch("https://nino-backend.vercel.app/api/job", {
                    method: "GET",
                    // headers: myHeaders,
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

    if (loading) return <div className="text-center p-4 d-flex justify-content-center align-items-center " style={{ width: '100%', height: '100vh' }}>
        <CircularProgress style={{ color: '#EF6E0B' }} size={48} thickness={5} />
        <span className="ms-3 fs-5">Loading jobs...</span>
    </div>
    if (error) return <div>
        <Nav />
        <div className="text-center p-4 text-danger">Error: {error}</div>;
    </div>

    return (
        <div id="job-offer-page" className='bg-secondary-subtle' style={{ background: '' }}>
            <Nav />
            <div className="container mx-auto my-5 pt-5">
                <Paper elevation={3} className="p-4 py-5 bg-primaryy city-bg">
                    <h1 className="fw-bold text-center text-white">Most Recent Job Openings</h1>
                </Paper>
                <div className=" container mt-4  gap-2 jobs-container">

                    {jobs.length > 0 ? (
                        jobs.map((job) => <JobCard key={job._id} job={job} />)
                    ) : (
                        <div className="text-center p-4">No jobs available</div>
                    )}
                </div>
                {/* <div className="row mt-5 g-4">
                    <div className="col-md-6 ">
                        <JobCard />
                    </div>
                    <div className="col-md-6 ">
                        <JobCard />
                    </div>
                    <div className="col-md-6 ">
                        <JobCard />
                    </div>
                </div> */}
            </div>
            <Footer />
        </div>
    );
};

export default JobOfferPage;

// This is a functional component called JobCard that takes in a prop called job
// const JobCard = ({ job }) => {
//     // This returns a div with a class of job-card, p-3, border, rounded, shadow-sm, d-flex, flex-column, justify-content-between
//     return (
//         <div className="job-card p-3 border rounded shadow-sm d-flex flex-column justify-content-between">
//             // This is a div with a class of d-flex, justify-content-between, align-items-center
//             <div className="d-flex justify-content-between align-items-center">
//                 // This is a h5 with a class of fw-bold and a text of 'JOB NAME'
//                 <h5 className="fw-bold">{'JOB NAME'}</h5>
//                 // This is a button with a class of btn, bg-primaryy, text-white and a text of 'Apply'
//                 <button className="btn bg-primaryy text-white">Apply</button>
//             </div>
//             // This is a horizontal rule
//             <hr />
//             // This is a div with a class of d-flex, flex-wrap, mt-2, justify-content-between, fw-bold, text-secondary, fs-6
//             <div className="d-flex flex-wrap mt-2 justify-content-between fw-bold text-secondary fs-6">
//                 // This is a div with a class of d-flex
//                 <div className="d-flex">
//                     // This is a p with a class of fw-bold and a text of 'Company'
//                     <p className="fw-bold">{'Company'}</p>
//                     // This is a span with a class of mx-2 and a text of '|'
//                     <span className="mx-2">|</span>
//                     // This is a p with a text of the current date
//                     <p>{new Date().toLocaleDateString()}</p>
//                 </div>
//                 // This is a p with a class of d-flex, justify-content-between, align-items-center, gap-2, fs-6
//                 <p className="d-flex justify-content-between align-items-center gap-2 fs-6">
//                     // This is an icon with a class of fs-6
//                     <LocationOn className="fs-6" />
//                     // This is a text of 'Abuja'
//                     {'Abuja'}
//                 </p>
//                 // This is a p with a class of d-flex, justify-content-between, align-items-center, gap-2
//                 <p className="d-flex justify-content-between align-items-center gap-2">
//                     // This is an icon with a class of fs-6
//                     <TbMoneybag />
//                     {'Price'}
//                 </p>
//                 <p className="d-flex justify-content-between align-items-center gap-2">
//                     <WorkRounded className="fs-6" />
//                     <span>Contract</span>
//                 </p>
//             </div>
//             <p className="text-secondary job-des">
//                 {
//                     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nam sit a vitae porro dicta. Voluptatem hic autem aliquam ducimus necessitatibus quae vero error. Minima placeat recusandae esse mollitia repudiandae.'
//                 }
//             </p>
//             <div className="d-flex justify-content-between align-items-center gap-3">
//                 <p className="job-tag-p text-black px-3 py-1 rounded-5 bg-secondary-subtle font-small">
//                     Web Development
//                 </p>
//             </div>
//             <Link to={'/single-job'} className="text-white text-decoration-none w-100">
//                 <button className="btn bg-primaryy text-white w-100">
//                     VIEW DETAIL
//                 </button>
//             </Link>
//         </div>
//     );
// };

// This function returns a JobCard component that takes in a job object as a prop
const JobCard = ({ job }) => {
    // Return a div with a class of job-card, p-3, border, rounded, shadow-sm, d-flex, flex-column, justify-content-between, and mb-4
    return (
        <div className="job-card p-3 border rounded shadow-sm d-flex flex-column justify-content-between mb-4 bg-white" >

            <div className="d-flex justify-content-between align-items-center " >

                <h5 className="fw-bold">{job.title}</h5>

                {/* <button className="btn bg-primaryy text-white">Apply</button> */}
            </div>

            <hr />

            <div className="d-flex flex-wrap mt-2 justify-content-between fw-bold text-secondary font-sm-text">

                <div className="d-flex">

                    {/* <p className="fw-bold">Company</p> */}

                    {/* <span className="mx-2">|</span> */}

                    <p>{new Date(job.createdAt).toLocaleDateString()}</p>
                </div>

                <p className="d-flex align-items-center gap-2 font-sm-text ">

                    <LocationOn className="fs-6" />

                    {job.location.length > 8 ? job.location.slice(-8) : job.location}...
                </p>

                <p className="d-flex align-items-center gap-2 font-sm-text">

                    <TbMoneybag />

                    ₦{job.budget}
                </p>

                <p className="d-flex align-items-center gap-2 font-sm-text">

                    <WorkRounded className="fs-6" />

                    <span>{job.category}</span>
                </p>
            </div>

            <p className="text-secondary job-des mt-3">{job.description}</p>

            <div className="d-flex flex-wrap gap-2 my-3">

                {job.skills?.map((skill, index) => (
                    // Return a span with a class of job-tag-p, text-black, px-3, py-1, rounded-5, and bg-secondary-subtle
                    <span key={index} className="job-tag-p text-black px-3 py-1 rounded-5 bg-secondary-subtle">

                        {skill}
                    </span>
                ))}
            </div>

            <Link to={`/single-job/${job._id}`} className="text-white text-decoration-none w-100">

                <button className="btn  text-white w-100" style={{ backgroundColor: '#013049' }}>
                    VIEW DETAIL
                </button>
            </Link>
        </div>
    );
};