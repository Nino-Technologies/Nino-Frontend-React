import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import {UserContext} from "./UserContext";

export const BlogContext = createContext();

export function BlogProvider({ children }) {
  let postReset = [];
  const [blogPostsSearch, SetBlogPostsSearch] = useState([]);
  const [blogPosts, SetBlogPosts] = useState({
    loading: true,
    blogs: [],
  });
  const [cookies] = useCookies();

  const { apiUrl } = React.useContext(UserContext);
  async function getBlogPost() {
    try {
      const resp = await axios.get(`${apiUrl}/blog`, {
        headers: {
          // authorization: cookies.grinderUser.token,
        },
      });
      // setPageLoading(false);
      // console.log(resp.data.blog);
      // console.log(postReset);
      postReset = [];
      postReset = resp.data.blog.reverse();
      // postReset.push(resp.data.blog.reverse());
      SetBlogPosts({ loading: false, blogs: resp.data.blog.reverse() });
      // SetBlogPostsSearch({ loading: false, blogs: resp.data.blog.reverse() });
      // console.log(postReset);
      // SetBlogPostsSearch(resp.data.blog.reverse());
      // console.log("blogPostsSearch", blogPostsSearch);
      // setNotification(resp.data.data.reverse());
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  }

  function searchBlogPost(word) {
    let postResult = [];
    blogPosts.blogs.map((post) => {
      if (
        post.title.toLowerCase().trim().indexOf(word.toLowerCase().trim()) !==
          -1 ||
        post.body.toLowerCase().trim().indexOf(word.toLowerCase().trim()) !==
          -1 ||
        post.description
          .toLowerCase()
          .trim()
          .indexOf(word.toLowerCase().trim()) !== -1
      ) {
        postResult.push(post);
      } else {
        // console.log(post.title, word);
      }
    });
    SetBlogPostsSearch((prevState) => postResult);
    // console.log(postResult, word);
    // console.log("blogPostsSearch", blogPostsSearch);
  }
  function deleteBlogPost(id) {
    if (!id || id === "") {
      return toast.error("Error getting post id");
    }
    if (window.confirm("This Blog Post Will be Deleted")) {
      // console.log(postObject);
      axios
        .delete(`${apiUrl}/blog?post_id=${id}`)
        .then(function (response) {
          toast.success("blog Deleted successfully");
          SetBlogPosts({
            loading: false,
            blogs: response.data.blog,
          });
          // navigate("/dashboard/author");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  React.useEffect(() => {
    getBlogPost();
  }, []);

  return (
    <BlogContext.Provider
      value={{
        blogPosts,
        SetBlogPosts,
        getBlogPost,
        searchBlogPost,
        blogPostsSearch,
        deleteBlogPost,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

/*    {
        _id: "112233445566",
        image_url:
          "https://cdn.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej.png",
        title: "Test Post",
        sub_title: "Test Post subTitle",
        author: "Victor Smith",
        tags: ["html", "css", "js"],
        view: 200,
        published_date: "12/feb/2020",
        description:
          "A functional website must have form submission and integration. A functioning Form can be found on almost all hosted websites, including portfolios, landing pages for businesses, e-commerce sites, etc. It is impossible to deny the value of forms on a website. For a front-end developer who has little to no experience with the backend, it is challenging to construct a functional form on either our unpaid or paid projects.",
        body: ` 
# i am a body from my mother home

<h1> hi header 1</h1>

<h2> this is header two </h2>

Here is some JavaScript code:

~~~js
console.log('It works!')
~~~

![test](https://cdn.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej.png)

<img src="https://mma.prnewswire.com/media/1513369/Educative_Logo.jpg"  width="60%" height="30%">

This ~is not~ strikethrough, but ~~this is~~!

The lift coefficient ($C_L$) is a dimensionless coefficient.

A paragraph with *emphasis* and **strong importance**.
import {UserContext} from './UserContext';

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
        `,
      },
      {
        _id: "112233445567",
        image_url:
          "https://cdn.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej.png",
        title: "Header Post",
        sub_title:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quia quisquam libero nobis veritatis.",
        description:
          "A functional website must have form submission and integration. A functioning Form can be found on almost all hosted websites, including portfolios, landing pages for businesses, e-commerce sites, etc. It is impossible to deny the value of forms on a website. For a front-end developer who has little to no experience with the backend, it is challenging to construct a functional form on either our unpaid or paid projects.",
        author: "Victor Smith",
        published_date: "12/feb/2020",
        tags: ["html", "css", "js"],
        view: 200,
        body: `
         
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
      `,
      }, */