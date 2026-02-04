import React from "react";

const UserCard = ({user}) => {
    console.log(user)
    const {firstName, lastName, photoUrl, about, age, gender, skills} = user;
  return (
    <div>
      <div className="card bg-slate-950 w-80 h-100 shadow-sm">
        <figure className="w-full h-48 flex justify-center items-center bg-black">
          <img
            src={user.photoUrl}
            alt="photo"
            className="max-w-full max-h-full object-contain"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {gender && age && <p>{age + ", " + gender}</p>}
          <p>
            {about}
          </p>
          <div className="card-actions justify-center">
            <button className="btn btn-secondary w-27">Ignore</button>
            <button className="btn btn-primary w-27">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
