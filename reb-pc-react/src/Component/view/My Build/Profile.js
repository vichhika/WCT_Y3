import React from "react";
import "./../../../Css/profile.scss"

function Profile() {

    return (
        <div className="p-Profile container w-75">
            <div className="row">
                <div className="col-4">

                    <div className="card border border-primary">
                        <div className="card-body">
                            <div className="d-flex flex-column">
                                <img
                                    src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin"
                                    className="rounded-circle align-self-center mb-4" width="150"/>

                                <h5 className="align-self-center">Leang123</h5>
                                <div className="mt-3">

                                    <div className="align-content-start">

                                        <button className="btn btn-primary w-100" type="button" data-toggle="collapse"
                                                data-target="#editYourInfo" aria-expanded="false"
                                                aria-controls="editYourInfo">Edit You Information
                                        </button>

                                        <div className="collapse" id="editYourInfo">
                                            <div className="card-body border">
                                                <form>
                                                    <div className="form-group">
                                                        <label htmlFor="uname">User Name</label>
                                                        <input type="text" className="form-control" id="uname"
                                                               placeholder="Your user name"
                                                               defaultValue="Leang123"/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="email">Email address</label>
                                                        <input type="email" className="form-control" id="email"
                                                               placeholder="name@example.com"
                                                               defaultValue="ngoun.mengleang@kemail.com"/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="phone">Full Name</label>
                                                        <input type="tel" className="form-control" id="phone"
                                                               placeholder="Your Phone number"
                                                               defaultValue="01235481"/>
                                                    </div>

                                                    <div className="d-flex justify-content-end ">
                                                        <button type="submit" className="btn btn-primary" disabled>
                                                            save
                                                        </button>
                                                    </div>


                                                </form>

                                            </div>
                                        </div>


                                        <button className="btn btn-danger w-100 mt-3" type="button"
                                                data-toggle="collapse"
                                                data-target="#changePass" aria-expanded="false"
                                                aria-controls="changePass">Change Password
                                        </button>

                                        <div className="collapse" id="changePass">
                                            <div className="card-body  border">
                                                <form>
                                                    <div className="form-group">
                                                        <label htmlFor="npass">New Password</label>
                                                        <input type="password" className="form-control" id="npass"/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="connpss">Confirm New password</label>
                                                        <input type="password" className="form-control" id="connpss"/>
                                                    </div>

                                                    <div className="d-flex justify-content-end ">
                                                        <button type="submit" className="btn btn-primary" disabled>
                                                            save
                                                        </button>
                                                    </div>


                                                </form>

                                            </div>
                                        </div>


                                    </div>

                                    {/*<div className="d-flex justify-content-around">*/}
                                    {/*    <button className="btn btn-primary">Follow</button>*/}
                                    {/*    <button className="btn btn-outline-primary">Message</button>*/}
                                    {/*</div>*/}

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="col-8">

                    <div className="card border-primary">
                        <div className="card-body ">
                            <h1 className="text-center">Build History</h1>

                            <ul className="list-group">
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-8 my-auto">
                                            <h5>Build Name tag</h5>
                                            <p>summery build</p>
                                        </div>
                                        <div className="col-2 text-center  my-auto">
                                            <button className="btn btn-primary">Open</button>
                                        </div>
                                        <div className="col-2 text-center  my-auto">
                                            <button className="btn btn-danger">Delete</button>
                                        </div>
                                    </div>

                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-8 my-auto">
                                            <h5>Build Name tag</h5>
                                            <p>summery build</p>
                                        </div>
                                        <div className="col-2 text-center  my-auto">
                                            <button className="btn btn-primary">Open</button>
                                        </div>
                                        <div className="col-2 text-center  my-auto">
                                            <button className="btn btn-danger">Delete</button>
                                        </div>
                                    </div>

                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-8 my-auto">
                                            <h5>Build Name tag</h5>
                                            <p>summery build</p>
                                        </div>
                                        <div className="col-2 text-center  my-auto">
                                            <button className="btn btn-primary">Open</button>
                                        </div>
                                        <div className="col-2 text-center  my-auto">
                                            <button className="btn btn-danger">Delete</button>
                                        </div>
                                    </div>

                                </li>

                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-8 my-auto">
                                            <h5>Build Name tag</h5>
                                            <p>summery build</p>
                                        </div>
                                        <div className="col-2 text-center  my-auto">
                                            <button className="btn btn-primary">Open</button>
                                        </div>
                                        <div className="col-2 text-center  my-auto">
                                            <button className="btn btn-danger">Delete</button>
                                        </div>
                                    </div>
                                </li>

                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-8 my-auto">
                                            <h5>Build Name tag</h5>
                                            <p>summery build</p>
                                        </div>
                                        <div className="col-2 text-center  my-auto">
                                            <button className="btn btn-primary">Open</button>
                                        </div>
                                        <div className="col-2 text-center  my-auto">
                                            <button className="btn btn-danger">Delete</button>
                                        </div>
                                    </div>
                                </li>

                            </ul>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Profile;
