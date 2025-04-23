import React, { useEffect, useContext, useState } from "react";
// import heroImage from "../../assets/images/undraw_coffee_break_h3uu.svg";
// import smallHeroImage from "../../assets/images/hero-section-image-design-small.png";
import "./LandingPage.scss";
import Search from "../../components/Search/Search.jsx";
import Nav from "../../components/Nav/Nav.jsx";
import { Link } from "react-router-dom";
import { UserContext } from "./../../context/UserContext.jsx";
// import ProArtisanCard from "../../components/ProArtisanCard/ProArtisanCard.jsx";
import CardCarousel from "../../components/CardCarousel/CardCarousel";
import { SearchContext } from "./../../context/SearchContext.jsx";
import { QuickRequestComponent } from "./../../components/Search/Search.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import img1 from "../../assets/images/woolly-computer-with-the-checkmark-confirming-the-user-is-logged-into-account.png";
import img2 from "../../assets/images/clip-car-service-support.png";
import img3 from "../../assets/images/quirky-twenty-four-hours-service-1.png";
import img4 from "../../assets/images/bonbon-five-stars-quality-rating.png";
import img5 from "../../assets/images/pocus-service.png";
import img6 from "../../assets/images/juicy-woman-connects-a-laptop-to-the-server.png";
import womanArtisan from "../../assets/images/AboutUsLady1.png";
import AboutUsArtisan from '../../assets/images/AboutUs_Artisan.webp'
import createJobIMG from '../../assets/images/internship-job-training-illustration.png'
import AboutImg from '../../assets/images/fpkdl.com_750_people-standing-against-clear-sky_1048944-2881346.jpg'
// import { Button } from "@mui/material";
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import { GiHelmet, GiMiningHelmet } from "react-icons/gi";
import { FaClock } from "react-icons/fa";
function LandingPage() {
  const { loggedIn } = useContext(UserContext);
  const { artisans } = useContext(SearchContext);
  const [proArtisanList, setProArtisanList] = useState([]);
  const [readMoreAboutUs, setReadMoreAboutUs] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // console.log(artisans);
    const proArtisan = [];
    artisans.forEach((artisan) => {
      if (
        artisan.freeAccount === false
        // (artisan.subscriptionExpired === false)
      ) {
        proArtisan.push(artisan);
        // console.log(artisan);
      }
    });

    setProArtisanList(proArtisan);
    // console.log(proArtisan);
  }, [artisans]);
  const steps = [
    {
      number: 1,
      title: "Discover",
      content: "Explore our wide range of innovative solutions tailored to your needs."
    },
    {
      number: 2,
      title: "Select",
      content: "Choose the perfect package that matches your requirements."
    },
    {
      number: 3,
      title: "Customize",
      content: "Personalize your selection with our easy-to-use tools."
    },
    {
      number: 4,
      title: "Enjoy",
      content: "Experience seamless integration and outstanding performance."
    }]
  return (
    <>
      <Nav />
      <div className="con tainer">
        <div className="hero-section">
          <div className="mobile-background"></div>
          <div className="text-div">
            <h1 className="hero-name">Hire service providers With <span className="text-primaryy">Grinders</span></h1>
            <p className="sub">Connecting people to trusted local services.</p>
            <Search />
            {loggedIn ? null : (
              <Link to={"/register?as=artisan"} className="text-end py-2">
                {" "}
                Become a service provider
              </Link>
            )}
            {/* <img src={smallHeroImage} alt="" className="smallHeroImage" /> */}
          </div>
          <div className="image-div">
            <div className="image-container">
              {/* <img src={heroImage} alt="working-man" className="working-man" /> */}
            </div>
          </div>
        </div>

        {/* <div className="artisan-request-section py-5 px-2 quick_hire_bg ">
          <div className="artesian-request-container container">
            <div className="row">
              <div className="col-md-6 d-flex text-start">
                <div className="my-auto">
                  <h2 className="font-bold fw-bold text-2xl text-white">Send A Quick Request</h2>
                  <p className="light_grey">
                    <strong>
                      {" "}
                      Do you need something done and you can’t find someone by
                      service?
                    </strong>{" "}
                    <br />
                    Tell us what you are trying to get done and get a
                    professional within 30min
                  </p>

                </div>
              </div>
              <div className="col-md-6 mt-3 mt-md-0">
                Form
                <QuickRequestComponent />
              </div>
            </div>
          </div>
        </div> */}
        <div className="  p-md-5">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center   row ">
            {/* Section for Hiring Artisans */}
            <div className="hire-artisans-section text-center text-md-start col-md-6 p-5 bg-primaryy">
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  color: 'white',
                  mb: 2,
                }}
              >
                Hire Skilled Service Provider
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'white',
                  mb: 3,
                  lineHeight: 1.8,
                }}
              >
                <span> Connect with trusted and skilled artisans for your projects. Browse through our list of verified service providers and find the perfect match for your needs.</span>
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#fff',
                  color: '#EF6E0B',
                  fontWeight: 'bold',
                  px: 4,
                  py: 1.5,
                  borderRadius: '8px',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#d65c0a',
                    color: 'white',
                  },
                }}
              >
                <Link to="/artisans" className="text-decoration-none text-primaryy">
                  Find Artisans
                </Link>
              </Button>
            </div>

            {/* Section for Posting New Jobs */}
            <div className="post-jobs-section text-center text-md-start col-md-6 p-5 " style={{ backgroundColor: '#013049' }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  color: '#fff',
                  mb: 2,
                }}
              >
                Post a New Job
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#fff',
                  mb: 3,
                  lineHeight: 1.8,
                }}
              >
                <span> Looking for top-tier candidates? Post a job opening and let us help you find the perfect talent to grow your team.</span>
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#EF6E0B',
                  color: 'white',
                  fontWeight: 'bold',
                  px: 4,
                  py: 1.5,
                  borderRadius: '8px',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#d65c0a',
                  },
                }}
              >
                <Link to="/dashboard/create-offer" className="text-decoration-none text-white">
                  Post a Job
                </Link>
              </Button>
            </div>
          </div>
        </div>


        {/* 
        <div className="about-us-section mt-4 container pt-4 border-1 border-black">
          <div>
            <h1 className="text-center font-weight-bold fs-1 fw-bold text-primaryy">About us</h1>
            <span></span>
          </div>
          <div className="row flex justify-content-center align-items-end">
            <div className="col-md-3 ">
              <img src={AboutUsArtisan} alt="" className="object-fit-contain" />
            </div>
            <div className="col-md-6 my-5">
              <h4 className="fw-bolder  text-center">
                Welcome to Grinders Technologies!

              </h4>
              <p className="lead text-center">

                We’re a dynamic platform connecting skilled workers with clients who need top-quality services. Our mission is to empower artisans and professionals by showcasing their expertise while making it easy for clients to find the right talent.
    
              </p>
              <div className="text-center">
                <a href="/about-us" className=" primary-btn text-decoration-none  text-white p-3">Learn More</a>
              </div>
            </div>
            <div className="col-md-3 d-none d-md-block">
              <img src={womanArtisan} alt="" className="object-fit-contain w-75 " />
            </div>
          </div>
        </div> */}
        <div className="about-us-section py-5 bg-light">
          <div className="container">
            <div className="row justify-content-center mb-5">
              <div className="col-lg-8 text-center">
                <h6 className="text-uppercase  mb-3">Who We Are</h6>
                <h2 className="display-4 fw-bold mb-4 text-primaryy">Connecting Talent with Opportunity</h2>
                <div className="divider mx-auto bg-gradient-primary" />
              </div>
            </div>

            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <div className="position-relative">
                  <img
                    src={AboutImg}
                    alt="Team collaboration"
                    className="img-fluid rounded-3 shadow-lg"
                  />
                  <div className="position-absolute bottom-0 start-0 bg-white p-4 m-3 rounded shadow-sm">
                    <h3 className="text-primary mb-0">15K+</h3>
                    <p className="text-muted mb-0">Professionals Registered</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="ps-lg-5">
                  <h3 className="fw-semibold mb-4">
                    Empowering Skilled Professionals Since 2018
                  </h3>
                  <p className="lead text-muted mb-4">
                    At Grinders Technologies, we've built a trusted ecosystem where expertise meets demand.
                    Our platform revolutionizes how businesses connect with top-tier professionals across various industries.
                  </p>

                  <div className="d-grid gap-4">
                    <div className="d-flex align-items-center">
                      <div className="icon-box bg-primary text-white me-4">
                        <i className="fas fa-shield-alt fa-2x"> <GiMiningHelmet className='fs-2' /></i>
                      </div>
                      <div>
                        <h5 className="fw-semibold mb-1">Verified Professionals</h5>
                        <p className="text-muted mb-0">Rigorous vetting process ensures quality</p>
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <div className="icon-box bg-success text-white me-4">
                        <i className="fas fa-clock fa-2x"><FaClock className='fs-2' /></i>
                      </div>
                      <div>
                        <h5 className="fw-semibold mb-1">24/7 Support</h5>
                        <p className="text-muted mb-0">Round-the-clock customer service</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <a href="/about-us" className=" px-5 py-3 primary-btn">
                      Explore Our Story <i className="fas fa-arrow-right ms-2"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pro-artisan-section mb-4 container py-4  shadow">
          <h1 className="text-center fw-bold text-primaryy">Pro Artisans</h1>

          <CardCarousel items={proArtisanList} />
        </div>


        <Box sx={{ py: 8, bgcolor: 'linear-gradient(to bottom, #f8f9fa, #ffffff)' }}>
          <Container maxWidth="lg">
            <Paper
              elevation={6}
              sx={{
                borderRadius: 4,
                px: { xs: 4, md: 6 },

                backgroundColor: '#013049',
              }}
              className="d-flex justify-content-between align-items-center flex-column flex-md-row gap-4"
            >
              <div className="w-100 d-flex flex-column justify-content-center   py-4">
                <Typography variant="h6" sx={{ fontWeight: 900 }} className="fw-bold fs-3 text-white" gutterBottom>
                  <span className="fw-6">Create a Job Opening</span>
                </Typography>

                <Typography variant="h2" color="text.secondary" sx={{ fontSize: '1.125rem', mb: 4 }} className="fw-bold max-w-[800px] mx-auto text-white">
                  Our platform connects you with top-tier candidates quickly and efficiently. Post a job today
                  and let us help you find the perfect talent to grow your team.
                </Typography>

                <div>
                  <Button
                    variant="contained"
                    className="bg-primaryy"
                    size="small"
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: '10px',
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                      boxShadow: 3,
                      backgroundColor: '#EF6E0B',
                      color: 'white',
                      '&:hover': {
                        boxShadow: 6,
                      },

                    }}

                  >
                    <Link to="/dashboard/create-offer" className="text-decoration-none text-white cursor-pointer" >Create Job Opening Now</Link>
                  </Button>
                </div>
              </div>
              <div className="d-none d-md-flex justify-content-end align-items-end">
                <img src={createJobIMG} alt="" className="w-50" />
              </div>
            </Paper>
          </Container>
        </Box>

        <div className="feature-section">
          <header>
            <h1 className="text-primaryy">
              <strong className="text-primaryy"> Reliable, efficient Service providers</strong>
              {/* <br />
             Powered by Technology */}
            </h1>

            <p>
              We create a link between skilled and reliable service provider and
              their potential client.
            </p>
          </header>

          <main>
            <ul className="cards-container">
              <li className="cyan-feature-card">
                <h2>Skilled artisans</h2>
                <p>
                  Grinders houses various highly skilled Service Provider across
                  the country
                </p>
                <div className="image-container">
                  <img src={img1} alt="supervisor feature icon" />
                </div>
              </li>

              <li className="red-feature-card">
                <h2>Accountability </h2>
                <p>
                  Grinders holds artisans accountable to clients through
                  evaluation, rewards, and reports.
                </p>
                <div className="image-container">
                  <img src={img2} alt="team builder feature icon" />
                </div>
              </li>

              <li className="orange-feature-card">
                <h2>On demand service</h2>
                <p>Grinders get you the help you need as soon as you want it</p>
                <div className="image-container">
                  <img src={img3} alt="karma feature icon" />
                </div>
              </li>

              <li className="blue-feature-card">
                <h2>Quality service</h2>
                <p>
                  Grinders with the team of customers services ensure you have
                  the best in quality, making sure you satisfied by the service
                  rendered
                </p>
                <div className="image-container">
                  <img src={img4} alt="calculator feature icon" />
                </div>
              </li>
            </ul>
          </main>
        </div>

        <div className="why-Choose-Us-section">
          <section className="chooseus-section d-flex align-items-center">
            <div className="container">
              <div className="sec-title text-center style-two">
                {/* <p>Lorem Ipsum</p> */}
                <h1 className="fw-bold text-primaryy">Why Choose Us</h1>
              </div>
              <div className="row clearfix">
                <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                  <div id="content_block_04">
                    <div className="content-box">
                      <div className="single-item  flex-wrap flex-sm-nowrap">
                        <div className="icon-box">
                          {/* <div className="bg-layer"></div>
                          <i className="fas fa-users"></i> */}
                          <img src={img5} alt="." />
                        </div>
                        <div className="box">
                          <h4>Quality services</h4>
                          <p>
                            Grinders ensures service providers are giving out
                            quality services to their clients, repairing the
                            wounded relationship between artisans and clients
                          </p>
                          {/* <a href="#">
                            <i className="fas fa-arrow-right"></i>More Details
                          </a> */}
                        </div>
                      </div>
                      <div className="single-item text-right flex-wrap flex-sm-nowrap">
                        <div className="icon-box">
                          {/* <div className="bg-layer"></div>
                          <i className="fas fa-box"></i> */}
                          <img src={img6} alt="." />
                        </div>
                        <div className="box">
                          <h4>Direct Connection</h4>
                          <p>
                            Grinders creates a connection between the clients
                            and service providers, no additional cost is
                            incurred.
                          </p>
                          {/* <a href="#">
                            More Details<i className="fas fa-arrow-left"></i>
                          </a> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="col-lg-6 col-md-12 col-sm-12 d-none d-md-block video-column">
                  <div id="video_block_01">
                    <div
                      className="video-inner wow slideInRight"
                      data-wow-delay="00ms"
                      data-wow-duration="1500ms"
                      style={{
                        backgroundImage:
                          "url(https://i.ibb.co/Lz7ZrL1/video-bg.jpg)",
                      }}
                    >
                      <div
                        className="pattern-layer"
                        style={{
                          backgroundImage:
                            "url(https://i.ibb.co/1qq5bKr/cube-shapes.png)",
                        }}
                      ></div>
                      <div className="video-btn">
                        <div
                          className="btn-bg rotate-me"
                          style={{
                            backgroundImage:
                              "url(https://i.ibb.co/kKmvK RY/btn-icon-bg.png)",
                          }}
                        ></div>
                        <a
                          href=""
                          className="lightbox-image"
                          data-toggle="modal"
                          data-target="#myModal"
                        >
                          <i className="fas fa-play"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- chooseus-section end --> */}
          <div className="modal fade" id="myModal">
            <div className="modal-dialog  modal-lg modal-dialog-centered">
              <div className="modal-content">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>

                {/* <!-- Modal body --> */}
                <div className="modal-body">
                  <iframe
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/WqUaM-ZueXU"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="how-it-works-section">
          <div className="container">
            <div className="sec-title text-center style-two">
              {/* <p>Lorem Ipsum</p> */}
              <h1 className="fw-bold text-primaryy">How It Works </h1>
            </div>
            <div className="how-it-works-container">
              <div className="steps-wrapper">
                {steps.map((step, index) => (
                  <div
                    key={step.number}
                    className={`step-pill ${index === activeIndex ? 'active' : ''}`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <div className="step-number-container">
                      <span className="step-number">{step.number}</span>
                    </div>
                    <div className="step-content">
                      <h3>{step.title}</h3>
                      <p>{step.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="">

              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default LandingPage;
