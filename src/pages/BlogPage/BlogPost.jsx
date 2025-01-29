import { Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
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
import {
  FeaturedBlogCardPost,
  FeaturedPostComponent,
  SideCol,
} from "./BlogPage";
import Footer from "../../components/Footer/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BlogContext } from "./../../context/BlogContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import {UserContext} from "./../../context/UserContext";

function BlogPost() {
  const { id } = useParams();
  const [pageLoading, setPageLoading] = useState(true);
  const [readingTime, setReadingTime] = useState(true);
  const [blogPost, setBlogPost] = useState({});
  // const [postContent, setPostContent] = useState("");
  const { blogPosts } = useContext(BlogContext);
  const { apiUrl } = useContext(UserContext);
  const navigate = useNavigate();

  async function getBlogPost(seo_url) {
    if (seo_url === "" || seo_url === undefined) {
      alert("this page requires an artisan ID ");
      return navigate("/blog");
    }

    if (blogPosts?.blogs?.length !== 0) {
      var post = blogPosts?.blogs?.find((post) => post?.seo_url === seo_url);

      // print
      if (!post) {
        // toast.info("Artesian post not found");
        toast.info(" blog with the ID provided is a not found");
        navigate("/blog");
      } else {
        setBlogPost(post);
        setPageLoading(false);
      }
      return;
    } else {
      // if blog post array is empty then get a single blog post object from the database
      let response = await fetch(`${apiUrl}/blog?seo_url=${id}`);
      if (response.ok) {
        let json = await response.json();
        // console.log(json);
        setPageLoading(false);
        setBlogPost(json.post);
      } else {
        console.log("error");
        alert(" Post with the ID provided is a not found");
        navigate("/blog");
        return;
      }
    }
  }
  useEffect(() => {
    getBlogPost(id);
  }, [id]);

  const { image_url, title, sub_title, createdAt, author, tags, body } =
    blogPost;

  // body.
  useEffect(() => {
    let words = body?.split(" ").length;
    let readingTime = Math.ceil(words / 250);
    setReadingTime(readingTime);
  }, [blogPost]);
  return (
    <div className="BlogPost">
      <Nav />
      <div className="image-container top-image">
        <Link to="/blog" className="back_button">
          <FaArrowAltCircleLeft />
        </Link>
        <img src={image_url} alt="test" />
      </div>
      <div className="container-xl">
        <div className="header">
          <h1>{title}</h1>
          <p>{sub_title}</p>
          <div className="sub flex-wrap">
            <sub>
              <b>Author: </b> {author?.name}
            </sub>
            <sub>
              <b>Date: </b>
              {createdAt?.split("T")[0]}
            </sub>
            <sub>{readingTime} minutes read</sub>
          </div>
          <div className="tags-container">
            <b>Tags:</b>{" "}
            {tags?.map((tag, i) => (
              <div className="tag" key={i}>
                {tag}
              </div>
            ))}
          </div>
          {/* <Divider /> */}
        </div>
      </div>
      <hr />

      <div className="container-xl blog-grade-section">
        <div className="row">
          <div className="col-md-9 col-12 ">
            {pageLoading ? (
              <>Loading ....</>
            ) : (
              <div className="post_content-container">
                <ReactMarkdown
                  skipHtml={true}
                  children={body}
                  rehypePlugins={[rehypeRaw, rehypeKatex]}
                  remarkPlugins={[remarkGfm, remarkMath]}
                />
              </div>
            )}
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

      {/* <div className="more-articles">
        <h1>MORE ARTICLES</h1>
        <div className="featured_post-section flex-wrap">
          <FeaturedPostComponent />
        </div>
      </div> */}
    </div>
  );
}
