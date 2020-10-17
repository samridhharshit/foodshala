import React, {useCallback, useEffect, useState} from "react";
import { Redirect, withRouter, Link } from "react-router-dom";
import app from '../auth/base'
import * as firebase from "firebase";
import axios from 'axios'

import { connect } from 'react-redux'

const SignUp = ({ history }) => {

    const [loading, setLoading] = useState(false)

    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { fullName, email, p1, p2, type, desc, veg, non_veg } = event.target.elements;
        const foodTypeArray = []
        if (veg.value === "yes") {
            foodTypeArray.push("veg")
        }
        if (non_veg.value === "yes") {
            foodTypeArray.push("non-veg")
        }
        console.log(fullName.value, email.value, p1.value, p2.value, type.value, desc.value, veg.value, non_veg.value)
        if (p1.value === p2.value) {
            try {
                const data = await app
                    .auth()
                    .createUserWithEmailAndPassword(email.value, p1.value);
                const currentUser = firebase.auth().currentUser
                if (!data) {
                    alert('signup unsuccessful! Contact the developer...')
                    history.push('/')
                } else if (type.value === 'restaurant') {
                    const signupObjectForRestaurant = {
                        name: fullName.value,
                        email: email.value,
                        access_token: await currentUser.getIdToken(),
                        type: "restaurant",
                        food_type: foodTypeArray,
                        desc: desc.value
                    }
                    const response = await axios.post('/api/auth/register', signupObjectForRestaurant)
                    console.log(response)
                } else if (type.value === 'user') {
                    const signupObjectForUser= {
                        name: fullName.value,
                        email: email.value,
                        access_token: await currentUser.getIdToken(),
                        type: "user",
                        food_type: foodTypeArray
                    }
                    const response = await axios.post('/api/auth/register', signupObjectForUser)
                    console.log(response)
                }

                console.log(data)
                history.push("/");
            } catch (error) {
                alert(error);
            }
        } else {
            alert("password does not match!")
        }
    }, [history]);

    if (firebase.auth().currentUser !== null) {
        return <Redirect to={'/'} />
    }

    return (
        <>
            <div className="container col-6 align-content-center registration">
                <h1>Signup as a User or Restaurant...</h1>
                <form onSubmit={handleSignUp}>
                    <div className="form-group input-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            name="fullName"
                            type="text"
                            id="fullName"
                            required={true}
                        />
                    </div>
                    <div className="form-group input-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            name="email"
                            type="email"
                            id="email"
                            aria-describedby="emailHelp"
                            required={true}
                        />
                    </div>
                    <div className="form-group input-group">
                        <label htmlFor="p1">Password</label>
                        <input
                            name="p1"
                            type="password"
                            id="p1"
                            required={true}
                        />
                    </div>
                    <div className="form-group input-group">
                        <label htmlFor="p2">Confirm Password</label>
                        <input
                            name="p2"
                            type="password"
                            id="p2"
                            required={true}
                        />
                    </div>
                    <div className="form-group input-group">
                        <label htmlFor="type">Type</label>
                        <select
                            className="select"
                            name="type"
                            id="type"
                            required={true}
                        >
                            <option value="restaurant">Restaurant</option>
                            <option value="user">Customer</option>
                        </select>
                    </div>
                    <div className="form-group input-group">
                        <label htmlFor="desc">If opted Restaurant. Let us know more about it.</label>
                        <input
                            style={{"width": "100%"}}
                            type="text"
                            id="desc"
                            name="desc"
                        />
                    </div>
                    <div className="form-group input-group">
                        <label htmlFor="veg">Do you prefer veg?</label>
                        <select
                            className="select"
                            name="veg"
                            id="veg"
                            required={true}
                        >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="form-group input-group">
                        <label htmlFor="non-veg">Do you prefer Non-veg?</label>
                        <select
                            className="select"
                            name="non_veg"
                            id="non-veg"
                            required={true}
                        >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    {
                        loading ? (
                            <button type="submit" className="btn btn-primary">Signing you up...</button>
                        ) : (
                            <button type="submit" className="btn btn-primary">Submit</button>
                        )
                    }
                </form>
                <br />
                <p>Already registered with us?<Link to={'/login'}>Login here...</Link></p>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {

}

const mapDispatchToProps = (dispatch) => {

}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)
    (SignUp)
);
