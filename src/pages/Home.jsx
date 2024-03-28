import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import {Blog} from "../assets/blog"

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (!authStatus) {
    return (
      <div className="w-full py-8 mt-4">
        <Container>
          {/* <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                please login
                            </h1>
                        </div>
                    </div> */}
          <div className="flex m-5 flex-wrap gap-x-20 gap-y-10 justify-center">
            <div className="">
              <h1 className="text-4xl ">WELCOME TO YOUR BLOG APP</h1>
              <div className="mt-5 flex gap-4 justify-center">
                <button
                  className="bg-black text-white px-4 py-2 rounded-lg"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="bg-black text-white px-4 py-2 rounded-lg"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </button>
              </div>
            </div>
            {/* <div className="flex flex-grow lg:justify-center ">
             <img src="https://i.ibb.co/6b6Bx0t/1.png" alt="" />
            </div> */}
          </div>
          <div></div>
        </Container>
      </div>
    );
  } else if (authStatus && posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                no post
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
