import React from "react";
import "./AboutUsPage.scss";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";

function AboutUsPage() {
  return (
    <div class="about">
      <Nav />
      <div class="hero">
        <div class="container">
          <h3 class="hero-name">
            We Help Users Connect <br />
            to <span id="art">Artisans</span>
          </h3>
        </div>
      </div>
      <svg
        class="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#003049"
          fill-opacity="1"
          d="M0,224L60,224C120,224,240,224,360,202.7C480,181,600,139,720,117.3C840,96,960,96,1080,117.3C1200,139,1320,181,1380,202.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>
      <div class="main">
        <div class="about pt-md-0 py-5">
          <div class="container">
            <div class="col-md-12 text-center">
              <h4 class="sub-head-text">Who we Are</h4>
              <div class="line m-auto mb-4"></div>
              <p class="desc">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Adipisci voluptatem incidunt consequatur in perferendis placeat
                earum omnis aut neque autem. Culpa illum cumque enim eos velit
                expedita laudantium eligendi voluptatem. Adipisci voluptatem
                incidunt consequatur in perferendis placeat earum omnis aut
                neque autem. Culpa illum cumque enim eos velit expedita
                laudantium eligendi voluptatem.
              </p>
            </div>
          </div>
        </div>

        <div class="mission py-5">
          <div class="container">
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="con">
                  {/* <!-- <img class="img" src="https://images.unsplash.com/photo-1521097624001-0b8aaab53a59?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80" alt=""> --> */}
                  <img
                    class="img"
                    src="https://images.unsplash.com/photo-1632392981396-eab641de07e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
                    alt=""
                  />
                </div>
              </div>
              <div class="col-md-6 m-auto">
                <h4 class="sub-head-text1 text-start mb-2">Our Vision</h4>
                <div class="line mb-4"></div>
                <p class="desc text-start mb-5">
                  Is to create a lasting avenue where all artisans/handicraft
                  and skilled worker can make a living and improve their
                  standard of living by connecting to various client on our
                  platform
                </p>
                <h4 class="sub-head-text1 text-start mb-2">Our Mission</h4>
                <div class="line mb-4"></div>

                <ul class="list-group">
                  <li class="list-group-item">
                    Connect artisans to various clients around their location
                  </li>
                  <li class="list-group-item">
                    Create a platform where artisans can make a living
                  </li>
                  <li class="list-group-item">
                    Render instant handy help to the populace
                  </li>
                  <li class="list-group-item">
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
