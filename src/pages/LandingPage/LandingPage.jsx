import React, { useEffect, useContext, useState } from "react";
// import heroImage from "../../assets/images/undraw_coffee_break_h3uu.svg";
// import smallHeroImage from "../../assets/images/hero-section-image-design-small.png";
import "./LandingPage.scss";
import Search from "../../components/Search/Search";
import Nav from "../../components/Nav/Nav";
import { Link } from "react-router-dom";
import { UserContext } from "./../../context/UserContext";
import ProArtisanCard from "../../components/ProArtisanCard/ProArtisanCard";
import CardCarousel from "../../components/CardCarousel/CardCarousel";
import { SearchContext } from "./../../context/SearchContext";
import { QuickRequestComponent } from "./../../components/Search/Search";
import Footer from "../../components/Footer/Footer";
import img1 from "../../assets/images/woolly-computer-with-the-checkmark-confirming-the-user-is-logged-into-account.png";
import img2 from "../../assets/images/clip-car-service-support.png";
import img3 from "../../assets/images/quirky-twenty-four-hours-service-1.png";
import img4 from "../../assets/images/bonbon-five-stars-quality-rating.png";
import img5 from "../../assets/images/pocus-service.png";
import img6 from "../../assets/images/juicy-woman-connects-a-laptop-to-the-server.png";

function LandingPage() {
  const { loggedIn } = useContext(UserContext);
  const { artisans } = useContext(SearchContext);
  const [proArtisanList, setProArtisanList] = useState([]);

  useEffect(() => {
    // console.log(artisans);
    const proArtisan = [];
    artisans.forEach((artisan) => {
      if (
        artisan.freeAccount === false
        // (artisan.subscriptionExpired === false)
      ) {
        proArtisan.push(artisan);
        console.log(artisan);
      }
    });

    setProArtisanList(proArtisan);
    console.log(proArtisan);
  }, [artisans]);

  return (
    <>
      <Nav />
      <div className="con tainer">
        <div className="hero-section">
          <div className="text-div">
            <div className="mobile-background"></div>
            <h1 className="hero-name">Hire service providers With Grinders</h1>
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

        <div className="artisan-request-section py-3 secondary-color">
          <div className="artesian-request-container container">
            <div className="row">
              <div className="col-md-6 d-flex">
                <div className="my-auto">
                  <h3>Send A Quick Request</h3>
                  <strong>
                    {" "}
                    Do you need something done and you can’t find someone by
                    service?
                  </strong>{" "}
                  <br />
                  Tell us what you are trying to get done and get a
                  professional within 30min
                </div>
              </div>
              <div className="col-md-6">
                {/* Form */}
                <QuickRequestComponent />
              </div>
            </div>
          </div>
        </div>
        <div className="pro-artisan-section my-4 container py-4">
          <h1 className="text-center">Pro Artisans</h1>

          <CardCarousel items={proArtisanList} />
        </div>
        <div className="feature-section">
          <header>
            <h1>
              <strong> Reliable, efficient Service providers</strong>
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
                  Grinders creates accountability between artisans and clients
                  by properly scrutinizing artisans and creating a reward and
                  report system to put them in check.
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
                <h2>Why Choose Us</h2>
              </div>
              <div className="row clearfix">
                <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                  <div id="content_block_04">
                    <div className="content-box">
                      <div className="single-item">
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
                      <div className="single-item text-right">
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
                <div className="col-lg-6 col-md-12 col-sm-12 video-column">
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

        <Footer />
      </div>
    </>
  );
}

export default LandingPage;
