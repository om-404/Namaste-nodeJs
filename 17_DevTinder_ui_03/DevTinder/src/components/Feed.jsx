import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import UserCard from "./UserCard.jsx";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    if (feed) return;
    // console.log(feed);
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      // console.log(res);

      dispatch(addFeed(res.data));
    } catch (error) {}
  };

  useEffect(() => {
    getFeed();
  }, []);
  return (
    feed && (
      <div className="flex justify-center p-5">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
