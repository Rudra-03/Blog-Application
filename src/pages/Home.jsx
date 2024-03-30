import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import blog from "../assets/1st.jpg";

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
      <div className="w-full py-8">
        <Container>
          {/* <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                please login
                            </h1>
                        </div>
                    </div> */}
          <div className="flex flex-wrap gap-x-20 gap-y-20 justify-center items-center">
            <div className="flex flex-col align-start text-center">
              <div>
                <h1 className="text-4xl pt-4 font-bold">WELCOME TO YOUR BLOG APP</h1>
              </div>
              <div className="mt-5 flex gap-4 justify-center sm:justify-start">
                <button
                  className=" bg-yellow-500 text-black hover:bg-yellow-600 px-4 py-2 rounded-lg font-semibold"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className=" bg-yellow-500 text-black hover:bg-yellow-600 px-4 py-2 rounded-lg font-semibold"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </button>
              </div>
            </div>
            <div className="flex flex-grow justify-center sm:pr-14 sm:justify-end">
              <img src={blog} alt="" className="rounded-xl max-w-sm" />
            </div>
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
