import React, { Fragment } from 'react';
import AdminNavHeader from '../adminNav/adminNavHeader';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserProfile = () => {
    const { user, loading } = useSelector(state => state.auth);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Fragment>
            <AdminNavHeader navTitle={user.name} />
            <div className="container mt-5">
                <h2 className="mb-5 text-center">My Profile</h2>
                <div className="row justify-content-center user-info">
                    <div className="col-12 col-md-4 text-center">
                        {user.avatar && user.avatar.url ? (
                            <figure className="avatar avatar-profile">
                                <img
                                    className="rounded-circle img-fluid"
                                    src={user.avatar.url}
                                    alt={user.name}
                                />
                            </figure>
                        ) : (
                            <div className="placeholder-avatar">No avatar available</div>
                        )}
                        <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-3">
                            Edit Profile
                        </Link>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h4>Full Name</h4>
                                <p>{user.name || 'Not available'}</p>

                                <h4>Email Address</h4>
                                <p>{user.email || 'Not available'}</p>

                                <h4>Joined on</h4>
                                <p>{user.createdAt ? String(user.createdAt).substring(0, 10) : 'Not available'}</p>

                                {user.role !== 'admin' && (
                                    <Fragment>
                                        <Link to="/cart/me" className="btn btn-danger btn-block mt-3">
                                            My Cart
                                        </Link>
                                        <Link to="/transaction/me" className="btn btn-danger btn-block mt-3">
                                            My Transactions
                                        </Link>
                                    </Fragment>
                                )}
                                <Link to="/password/update" className="btn btn-primary btn-block mt-3">
                                    Change Password
                                </Link>
                                <Link to="/back/me" className="btn btn-primary btn-block mt-3">
                                    Exit Profile
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
