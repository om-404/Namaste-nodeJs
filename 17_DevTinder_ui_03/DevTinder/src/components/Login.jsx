// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/constants";

// const Login = () => {
//   const [email, setEmail] = useState("bhim123@gmail.com");
//   const [password, setPassword] = useState("Bhim123@");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/login",
//         {
//           email,
//           password,
//         },
//         { withCredentials: true },
//       );

//       dispatch(addUser(res.data)); // adding data into the store
//       return navigate("/");
//     } catch (err) {
//       // console.log(err);
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="flex justify-center my-15">
//       <div className="card w-96 bg-slate-950 card-xl shadow-sm">
//         <div className="card-body ">
//           <h2 className="card-title p-2">Login</h2>
//           {/* email component */}
//           <div className="p-2">
//             <label className="input validator">
//               <svg
//                 className="h-[1em] opacity-50"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//               >
//                 <g
//                   strokeLinejoin="round"
//                   strokeLinecap="round"
//                   strokeWidth="2.5"
//                   fill="none"
//                   stroke="currentColor"
//                 >
//                   <rect width="20" height="16" x="2" y="4" rx="2"></rect>
//                   <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
//                 </g>
//               </svg>
//               <input
//                 type="email"
//                 placeholder="mail@site.com"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </label>
//             <div className="validator-hint hidden">
//               Enter valid email address
//             </div>
//           </div>

//           {/* password component */}
//           <div className="p-2">
//             <label className="input validator">
//               <svg
//                 className="h-[1em] opacity-50"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//               >
//                 <g
//                   strokeLinejoin="round"
//                   strokeLinecap="round"
//                   strokeWidth="2.5"
//                   fill="none"
//                   stroke="currentColor"
//                 >
//                   <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
//                   <circle
//                     cx="16.5"
//                     cy="7.5"
//                     r=".5"
//                     fill="currentColor"
//                   ></circle>
//                 </g>
//               </svg>
//               <input
//                 type="password"
//                 required
//                 placeholder="Password"
//                 minLength="8"
//                 pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
//                 title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </label>
//             <p className="validator-hint hidden">
//               Must be more than 8 characters, including
//               <br />
//               At least one number <br />
//               At least one lowercase letter <br />
//               At least one uppercase letter
//             </p>
//           </div>
//           <p className="text-red-500">{error}</p>
//           <div className="justify-center card-actions p-2">
//             <button className="btn btn-primary" onClick={handleLogin}>
//               Login
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginFrom, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      // console.log(res.data.user)
      dispatch(addUser(res.data.user));
      return navigate("/");
    } catch (err) {
      setError(err.response.data);
      console.log(err);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      console.log(res);
      dispatch(addUser(res.data.user));
      console.log("my name is om snawale")
      return navigate("/profile");
    } catch (error) {
      setError(error.response.data);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginFrom ? "Login" : "Signup"}
          </h2>
          <div>
            {!isLoginFrom && (
              <>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Firstname</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Lastname</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
              </>
            )}
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <p className="text-red-500 text-center">{error}</p>
          <div className="card-actions justify-center mt-2">
            <button
              className="btn btn-primary"
              onClick={isLoginFrom ? handleLogin : handleSignUp}
            >
              {isLoginFrom ? "Login" : "Signup"}
            </button>
          </div>
          <p
            className=" text-center cursor-pointer py-2"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginFrom
              ? "New user ? signup here"
              : "Existing User ? Login here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

