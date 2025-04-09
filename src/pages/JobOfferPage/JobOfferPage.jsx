import React from 'react';
import './JobOfferPage.scss';
import Nav from '../../components/Nav/Nav';
import { Paper } from '@mui/material';
import { TbMoneybag } from 'react-icons/tb';
import { LocationOn, WorkRounded } from '@mui/icons-material';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';

const JobOfferPage = () => {
    return (
        <div id="job-offer-page">
            <Nav />
            <div className="container mx-auto my-5 pt-5">
                <Paper elevation={3} className="p-4 py-5 bg-primaryy">
                    <h1 className="fw-bold text-center text-white">Most Recent Job Openings</h1>
                </Paper>
                <div className="row mt-5 g-4">
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
            <Footer />
        </div>
    );
};

export default JobOfferPage;

const JobCard = ({ job }) => {
    return (
        <div className="job-card p-3 border rounded shadow-sm d-flex flex-column justify-content-between">
            <div className="d-flex justify-content-between align-items-center">
                <h5 className="fw-bold">{'JOB NAME'}</h5>
                <button className="btn bg-primaryy text-white">Apply</button>
            </div>
            <hr />
            <div className="d-flex flex-wrap mt-2 justify-content-between fw-bold text-secondary fs-6">
                <div className="d-flex">
                    <p className="fw-bold">{'Company'}</p>
                    <span className="mx-2">|</span>
                    <p>{new Date().toLocaleDateString()}</p>
                </div>
                <p className="d-flex justify-content-between align-items-center gap-2 fs-6">
                    <LocationOn className="fs-6" />
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
            <Link to={'/single-job'} className="text-white text-decoration-none w-100">
                <button className="btn bg-primaryy text-white w-100">
                    VIEW DETAIL
                </button>
            </Link>
        </div>
    );
};