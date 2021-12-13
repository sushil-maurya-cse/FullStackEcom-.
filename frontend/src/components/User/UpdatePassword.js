import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";
import Metadata from "../layout/Metadata";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";


const UpdatePassword = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, isUpdated, loading } = useSelector((state) => state.profile);
  
    const [oldPassword,setOldPassword]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [butttonText, setButtonText]=useState("Update Password");

  
    const updatePasswordSubmit = (e) => {
      e.preventDefault();

      const myForm = new FormData();
  
      myForm.set("oldPassword", oldPassword);
      myForm.set("newPassword", newPassword);
      myForm.set("confirmPassword", confirmPassword);
      dispatch(updatePassword(myForm));
    };
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        setButtonText("Try Again")
        dispatch(clearErrors());
      }
      if (isUpdated) {
        setButtonText("Updating")
        alert.success("Password Updated Succesfuly");
        history("/account");
      }
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }, [dispatch, error, alert, isUpdated, history]);
    return (
      <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>
              <Link to="/account">
              <button className="BacktoProfileBtn">
                <ArrowBackIcon /> <span>Back</span>
              </button>
              </Link>
              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value={butttonText}
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
    )
}

export default UpdatePassword
