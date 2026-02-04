import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import axios from "axios";



const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelLogout = async () => {
    await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
    dispatch(removeUser());
    return navigate('/login');
  };
  // console.log(user);
  return (
    <div>
      <div className="navbar bg-slate-950 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            DevTinder
          </Link>
        </div>
        {user && (
          <div className="flex gap-2 items-center">
            <div>Welcome, {user.firstName}</div>
            <div className="dropdown dropdown-end mx-10">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="user photo" src={user.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/connections" className="justify-between">
                    Connections
                  </Link>
                </li>
                <li>
                  <Link to="/requests" className="justify-between">
                    Requests
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handelLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
