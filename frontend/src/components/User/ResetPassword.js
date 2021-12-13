import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import "./ResetPassword.css";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { useAlert } from "react-alert";
import LockIcon from "@material-ui/icons/Lock";
import Loader from '../layout/Loader/Loader';
import { useNavigate, useParams } from 'react-router';
import Metadata from '../layout/Metadata';
import { resetPassword } from '../../actions/userAction';
import { clearErrors } from '../../actions/userAction';
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useNavigate();
    let params = useParams();

    const { error, success, loading } = useSelector(
        (state) => state.forgotPassword
    );
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(params.token, myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Password Updated Successfully");
            history("/login");
        }
    }, [dispatch, error, alert, history, success]);


    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <Metadata title="Change Password" />
                    <div className="resetPasswordContainer">
                        <div className="resetPasswordBox">
                            <h2 className="resetPasswordHeading">Update Profile</h2>
                            <Link to="/login">
                                <button className="BacktoProfileBtn">
                                    <ArrowBackIcon /> <span>Back to Login</span>
                                </button>
                            </Link>
                            <form
                                className="resetPasswordForm"
                                onSubmit={resetPasswordSubmit}
                            >
                                <div>
                                    <LockOpenIcon />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
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
                                    value="Update"
                                    className="resetPasswordBtn"
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default ResetPassword
