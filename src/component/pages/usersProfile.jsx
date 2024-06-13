import React, { Fragment , useState } from 'react';
import AdminNavHeader from '../adminNav/adminNavHeader';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { defaultAvatar } from '../assets';

const UserProfile = () => {
    const { user, loading } = useSelector(state => state.auth)

const storedUserData = JSON.parse(localStorage.getItem('user'));
    const storedFirstName = storedUserData ? storedUserData.firstName : '';
    const [userFirstName, setUserFirstName] = useState(storedFirstName);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Fragment>
            <AdminNavHeader navTitle={userFirstName} />
            <div className="container mt-5">
                <h2 className="mb-5 text-center">My Profile</h2>
                <div className="row justify-content-center user-info">
                    <div className="col-12 col-md-4 text-center">
                        {defaultAvatar && defaultAvatar ? (
                            <figure className="avatar avatar-profile">
                                <img
                                    className="rounded-circle img-fluid"
                                    src={ defaultAvatar }
                                    alt= "Default Avatar"
                                />
                            </figure>
                        ) : (
                            <div className="placeholder-avatar">No avatar available</div>
                        )}
                        <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-3">
                            Edit Profile Picture
                        </Link>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h4>Name</h4>
                                <p>{userFirstName || 'Not available'}</p>

                                <h4>Email Address</h4>
                                <p>{user.email || 'Not available'}</p>

                                <h4>Joined on</h4>
                                <p>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Not available'}</p>

                                <Link to="/userForgetPassword" className="btn btn-primary btn-block mt-3">
                                    Change Password
                                </Link>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default UserProfile;
