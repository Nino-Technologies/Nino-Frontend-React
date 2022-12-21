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
                  <h3>Quick Request</h3>
                  <strong>
                    {" "}
                    Are you looking for a service provider and you are yet to
                    find one?
                  </strong>{" "}
                  <br />
                  Lets assist in getting a trusted service provider in less than
                  30 minutes
                </div>
              </div>
              <div className="col-md-6">
                {/* Form */}
                <QuickRequestComponent />
              </div>
            </div>
          </div>
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
                <h2>Supervisor</h2>
                <p>Monitors activity to identify project roadblocks</p>
                <img
                  src="https://alfonsosuarezg.github.io/four-card-feature-section/images/icon-supervisor.svg"
                  alt="supervisor feature icon"
                />
              </li>

              <li className="red-feature-card">
                <h2>Team Builder</h2>
                <p>
                  Scans our talent network to create the optimal team for your
                  project
                </p>
                <img
                  src="https://alfonsosuarezg.github.io/four-card-feature-section/images/icon-team-builder.svg"
                  alt="team builder feature icon"
                />
              </li>

              <li className="orange-feature-card">
                <h2>Karma</h2>
                <p>Regularly evaluates our talent to ensure quality</p>
                <img
                  src="https://alfonsosuarezg.github.io/four-card-feature-section/images/icon-karma.svg"
                  alt="karma feature icon"
                />
              </li>

              <li className="blue-feature-card">
                <h2>Calculator</h2>
                <p>
                  Uses data from past projects to provide better delivery
                  estimates
                </p>
                <img
                  src="https://alfonsosuarezg.github.io/four-card-feature-section/images/icon-calculator.svg"
                  alt="calculator feature icon"
                />
              </li>
            </ul>
          </main>
        </div>
        <div className="pro-artisan-section my-4 container py-4">
          <h1 className="text-center">Pro Artisans</h1>

          <CardCarousel items={proArtisanList} />
        </div>
        <div className="why-Choose-Us-section">
          <section className="chooseus-section d-flex align-items-center">
            <div className="container">
              <div className="sec-title text-center style-two">
                <p>Lorem Ipsum</p>
                <h2>Why Choose Us</h2>
              </div>
              <div className="row clearfix">
                <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                  <div id="content_block_04">
                    <div className="content-box">
                      <div className="single-item">
                        <div className="icon-box">
                          <div className="bg-layer"></div>
                          <i className="fas fa-users"></i>
                        </div>
                        <div className="box">
                          <h4>Lorem Ipsum</h4>
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                          </p>
                          <a href="#">
                            <i className="fas fa-arrow-right"></i>More Details
                          </a>
                        </div>
                      </div>
                      <div className="single-item text-right">
                        <div className="icon-box">
                          <div className="bg-layer"></div>
                          <i className="fas fa-box"></i>
                        </div>
                        <div className="box">
                          <h4>Lorem Ipsum 2</h4>
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                          </p>
                          <a href="#">
                            More Details<i className="fas fa-arrow-left"></i>
                          </a>
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
      </div>
    </>
  );
}

export default LandingPage;
