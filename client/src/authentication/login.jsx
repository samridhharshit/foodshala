import React, {useCallback, useContext, useState} from "react";
import {withRouter, Redirect, Link} from "react-router-dom";
import app from '../auth/base'
import { AuthContext } from "../auth"

const Login = ({ history }) => {

    const [loading, setLoading] = useState(false)

    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                const data = await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                console.log(data.user.providerData[0])
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
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
                    <label htmlFor="p1">Password</label>
                    <input
                        name="p1"
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

export default withRouter(Login);