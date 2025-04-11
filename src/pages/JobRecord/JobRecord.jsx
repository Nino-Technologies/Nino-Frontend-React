import { Cancel, LocationOn, LocationOnOutlined, WorkRounded } from '@mui/icons-material';
import React from 'react'
import { TbMoneybag } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import './JobRecord.scss'
const JobRecord = () => {
    return (
        <div id='job-record' className='container mx-auto my-2 pt-5'>
            <div className='rounded-2 primary-color p-5'>
                <h1 className='text-center text-white fw-bold'>
                    Job Records
                </h1>
            </div>

            <div>
                <div className="row mt-5">
                    <div className="col-md-6 ">
                        <JobCard />
                    </div>
                    <div className="col-md-6 ">
                        <JobCard />
                    </div>
                    <div className="col-md-6 ">
                        <JobCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobRecord


const JobCard = ({ job }) => {
    return (
        <div className="job-card p-3 border rounded shadow-sm d-flex flex-column justify-content-between">
            <div className="d-flex justify-content-between align-items-center">
                <h5 className="fw-bold">{'JOB NAME'}</h5>
                <div className="d-flex gap-2">
                    <span>Job Status : <span className='fw-bold text-success-emphasis'>On Going</span></span>
                </div>
            </div>
            <hr />
            <div className="d-flex flex-wrap mt-2 justify-content-between fw-bold text-secondary fs-6">
                <div className="d-flex">
                    <p className="fw-bold">{'Company'}</p>
                    <span className="mx-2">|</span>
                    <p>{new Date().toLocaleDateString()}</p>
                </div>
                <p className="d-flex justify-content-between align-items-center gap-2 fs-6">
                    <LocationOnOutlined className="fs-6" />
                    {'Abuja'}
                </p>
                <p className="d-flex justify-content-between align-items-center gap-2">
                    <TbMoneybag />
                    {'Price'}
                </p>
                <p className="d-flex justify-content-between align-items-center gap-2">
                    <WorkRounded className="fs-6" />
                    <span>Contract</span>
                </p>
            </div>
            <p className="text-secondary job-des">
                {
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nam sit a vitae porro dicta. Voluptatem hic autem aliquam ducimus necessitatibus quae vero error. Minima placeat recusandae esse mollitia repudiandae.'
                }
            </p>
            <div className="d-flex justify-content-between align-items-center gap-3">
                <p className="job-tag-p text-black px-3 py-1 rounded-5 bg-secondary-subtle font-small">
                    Web Development
                </p>
            </div>
            <div className="d-flex w-100 gap-2">
                <Link to={'/single-job'} className="text-white text-decoration-none w-75">
                    <button className="btn bg-primaryy text-white w-100">
                        VIEW DETAIL
                    </button>
                </Link>
                <div className="btn bg-primaryy text-white d-flex align-items-center gap-3"><Cancel /> <span>close Job</span></div>
            </div>
        </div>
    );
};