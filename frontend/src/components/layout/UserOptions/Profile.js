import React, { Fragment, useEffect } from "react";
import "./profile.css" ;
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import Metadata from "../Metadata";
import { useNavigate } from "react-router";



const Profile = () => {
    const {loading, isAuthenticated , user}=useSelector((state)=>state.user);
    const history = useNavigate();

    useEffect(() => {
        if (isAuthenticated === false) {
          history("/login");
        }
      }, [history, isAuthenticated]);
    return (
        <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{(String(user.createdAt).substr(0,10).replace((/(\d{4})-(\d\d)-(\d\d)/, "$3-$2-$1")))}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
    )
}

export default Profile
