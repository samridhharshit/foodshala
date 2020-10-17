import React, { useCallback, useContext, useState } from "react";
import {withRouter, Redirect, Link} from "react-router-dom";
import app from '../auth/base'
import { AuthContext } from "../auth"
import * as firebase from "firebase";
import { connect } from "react-redux";
import axios from 'axios';

const Login = (props) => {

    const [loading, setLoading] = useState(false)

    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;

            await setLoading(true)
            try {
                const data = await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);

                const currentUser = await firebase.auth().currentUser
                const loginObject = {
                    email: email.value,
                    access_token: await currentUser.getIdToken()
                }
                const response = await axios.put('/api/auth/login', loginObject)
                console.log(response)
                if (response.data.status === 200) {
                    if (response.data.data.type === "user") {
                        props.mountUserAfterLogin(response.data.data)
                    } else {
                        props.mountRestaurantAfterLogin(response.data.data)
                    }
                } else {
                    await firebase.auth().signOut()
                    alert(response.data.message)
                }
                window.location.reload()
            } catch (error) {
                alert(error);
            }
            setLoading(false)
        },
        []
    );

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <div className="container col-6 align-content-center registration">
            <h1>Can't wait to see you on the other side!</h1>
            <form onSubmit={handleLogin}>
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
                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        type="password"
                        id="password"
                        required={true}
                    />
                </div>
                {
                    loading ? (
                        <button type="submit" className="btn btn-primary">logging you in...</button>
                    ) : (
                        <button type="submit" className="btn btn-primary">Login</button>
                    )
                }
            </form>
            <br />
            <p>Don't have an account? No worries, <Link to={'/signup'}>Click here </Link>to register..</p>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        restaurant: state.restaurant,
        cart: state.cart,
        currentlyLoggedIn: state.currentlyLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        mountUserAfterLogin: (user) => { dispatch({ type: "MOUNT_USER", user }) },
        mountRestaurantAfterLogin: (restaurant) => { dispatch({ type: "MOUNT_RESTAURANT", restaurant }) }
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)
    (Login)
);