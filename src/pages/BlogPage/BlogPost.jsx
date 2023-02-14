import { Divider } from "@mui/material";
import React from "react";
import Nav from "../../components/Nav/Nav";
import adsImage from "../../assets/images/Grinders_Ads.svg";
import "./BlogPost.scss";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import { TextField } from "@mui/material";
import { FeaturedBlogCardPost } from "./BlogPage";
import Footer from "../../components/Footer/Footer";

function BlogPost() {
  const postContent = `
  
  **Good day pals, if you are looking for a very easy way to integrate a serverless
from on your frontend website, you are at the right article.**

A functional website must have form submission and integration. A functioning Form can be found on almost all hosted websites, including portfolios, landing pages for businesses, e-commerce sites, etc. It is impossible to deny the value of forms on a website. For a front-end developer who has little to no experience with the backend, it is challenging to construct a functional form on either our unpaid or paid projects.

# Get started with FabForm

To make use of the service FabForm is providing you have to have an account with them.
This is has simple as anything, it will take less than 2 minutes to set up an account.

- Visit Fabform
- Click on the Get started button
- fill the registration form all you need is a working email and a password.
- verify your email by clicking on the link sent to your email address.

At this point you have successfully created a working account with febform.

<img src="https://cdn.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej.png"  width="100%" height="300px">

## Submit form
FabForm gives you totally control of the structure and style of your form, it doesn't give you custom attribute or a set of rules while creating your form, they make use of the already existing and we'll know attributes of the form element which are action and name attributes

<img src="https://cdn.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej.png"  width="100%" height="300px">

# Give feedback

If you enjoyed and learned something new from this article, follow me for More web simplified topics, and do well to give me feedback by using the reaction emojis. Let me know how you feel about the explanation in the comment section. Give feedback, corrections, and recommendations. Much 🥰

  `;
  return (
    <div className="BlogPost">
      <Nav />
      <div className="image-container top-image">
        <img
          src="https://cdn.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej.png"
          alt="test"
        />
      </div>
      <div className="container-xl">
        <div className="header">
          <h1>Header Post</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quia
            quisquam libero nobis veritatis.
          </p>
          <div className="sub">
            <sub>Author Name</sub>
            <sub>12, February 2023</sub>
            <sub>3 minutes read</sub>
          </div>
          {/* <Divider /> */}
        </div>
      </div>
      <hr />

      <div className="container-xl blog-grade-section">
        <div className="row">
          <div className="col-md-9 col-12 ">
            <div className="post_content-container">
              <ReactMarkdown
                skipHtml={true}
                children={postContent}
                rehypePlugins={[rehypeRaw, rehypeKatex]}
                remarkPlugins={[remarkGfm, remarkMath]}
              />
            </div>
          </div>
          <div className="col-md-3 d-none d-md-flex">
            <SideCol />
          </div>
        </div>
      </div>
      <div className="container-xl">
        <AfterPostContent />
      </div>
      <Footer />
    </div>
  );
}

export default BlogPost;

function SideCol() {
  return (
    <div className="SideCol">
      <div className="read_more-container">
        <div className="header">READ MORE</div>

        <ul>
          <li>Read more Blog Post</li>
          <li>Read more Blog Post</li>
          <li>Read more Blog Post</li>
          <li>Read more Blog Post</li>
        </ul>
      </div>

      <div className="ads_image-container mt-5">
        <img src={adsImage} alt="" />
      </div>
    </div>
  );
}

function AfterPostContent() {
  return (
    <div className="AfterPostContent">
      <div className="Subscribe-section">
        <h1>Subscribe to my newsletter</h1>
        <p>
          Read articles from Grinders's Blog directly inside your inbox.
          Subscribe to the newsletter, and don't miss out.
        </p>
        <form action="">
          <TextField
            // fullWidth
            id="outlined-basic"
            label="Enter Email"
            variant="outlined"
          />
          <button>Subscribe</button>
        </form>
      </div>

      <div className="more-articles">
        <h1>MORE ARTICLES</h1>
        <div className="featured_post-section">
          <FeaturedBlogCardPost />
          <FeaturedBlogCardPost />
        </div>
      </div>
    </div>
  );
}
