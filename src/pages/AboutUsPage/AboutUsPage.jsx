import React from "react";
import "./AboutUsPage.scss";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";

function AboutUsPage() {
  return (
    <div className="about">
      <Nav />
      <div className="hero">
        <div className="container">
          <h3 className="hero-name">
            We Help Users Connect <br />
            to <span id="art">Artisans</span>
          </h3>
        </div>
      </div>
      <svg
        className="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#003049"
          fillOpacity="1"
          d="M0,224L60,224C120,224,240,224,360,202.7C480,181,600,139,720,117.3C840,96,960,96,1080,117.3C1200,139,1320,181,1380,202.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>
      <div className="main">
        <div className="about pt-md-0 py-5">
          <div className="container">
            <div className="col-md-12 text-center">
              <h4 className="sub-head-text">Who we Are</h4>
              <div className="line m-auto mb-4"></div>
              <p className="desc">
                Grinders is an online community that allows you hire all kind of
                handy help you need. We create a link between skilled and
                reliable Artisans and their potential client. Creating a trusted
                and legitimate mobile platform where local skilled professionals
                get hired for jobs, get reviews and are also recommended to
                other clients.
              </p>
            </div>
          </div>
        </div>

        <div className="mission py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="con">
                  <img
                    className="img"
                    src="https://images.unsplash.com/photo-1632392981396-eab641de07e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-md-6 m-auto">
                <h4 className="sub-head-text1 text-start mb-2">Our Vision</h4>
                <div className="line mb-4"></div>
                <p className="desc text-start mb-5">
                  Is to create a lasting avenue where all artisans/handicraft
                  and skilled worker can make a living and improve their
                  standard of living by connecting to various client on our
                  platform
                </p>
                <h4 className="sub-head-text1 text-start mb-2">Our Mission</h4>
                <div className="line mb-4"></div>

                <ul className="list-group">
                  <li className="list-group-item">
                    Connect artisans to various clients around their location
                  </li>
                  <li className="list-group-item">
                    Create a platform where artisans can make a living
                  </li>
                  <li className="list-group-item">
                    Render instant handy help to the populace
                  </li>
                  <li className="list-group-item">
                    Encourage handicraft in nation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUsPage;
