import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import menu from "../../assets/menu.png";
import cross from "../../assets/cross.png";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  const showMenu = (e) => {
    e.target.classList.add("hidden");
    const menu = document.querySelector(".mobile-menu");

    menu.classList.remove("hidden");

    menu.classList.add("flex");
  };
  const closeMenu = (e) => {
    const menu = document.querySelector(".mobile-menu");
    const menuIcon = document.querySelector(".menu-icon");

    menuIcon.classList.remove("hidden");

    menu.classList.remove("flex");

    menu.classList.add("hidden");
  };

  return (
    <header className="py-3 shadow bg-black text-yellow-400 border-b-amber-500 border-b-2">
      <Container>
        <nav className="flex justify-between">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="sm:flex ml-auto gap-2 hidden">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-6 py-2 duration-200  bg-yellow-500 text-black hover:bg-yellow-600 rounded-full text-md font-semibold"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
          <span className="sm:hidden cursor-pointer">
            <img
              src={menu}
              alt="menu"
              className="w-8 menu-icon"
              onClick={showMenu}
            />
          </span>
          <div className="bg-transparent backdrop-blur-md hidden mobile-menu absolute right-0 ">
            <ul className=" ml-auto gap-y-10 justify-center items-center flex flex-col z-10 w-60">
              <li className="">
                <img
                  src={cross}
                  alt=""
                  className="w-8 mt-2"
                  onClick={closeMenu}
                />
              </li>
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name} className="w-full flex justify-center">
                    <button
                      onClick={() => {
                        navigate(item.slug);
                        closeMenu();
                      }}
                      className="inline-block px-6 py-2 duration-200  bg-yellow-500 text-black hover:bg-yellow-600 text-md font-semibold w-5/6"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
