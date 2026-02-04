import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";
import { BASE_URL } from "../utils/constants.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice.js";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";


const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if(userData) return;
    try {
      const user = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(user.data));

    } catch (error) {
      if(error.status === 401){
        navigate("/login");
      }
      console.error(error);
      // else navigate to another page
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      {/* < Footer /> */}
    </div>
  );
};

export default Body;
