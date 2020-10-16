import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router-dom";
import app from '../auth/base'
import { AuthContext } from "../auth"

const Login = ({ history }) => {
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
        <div>
            <h1>Log in</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Email
                    <input name="email" type="email" placeholder="Email" />
                </label>
                <label>
                    Password
                    <input name="password" type="password" placeholder="Password" />
                </label>
                <button type="submit">Log in</button>
            </form>
        </div>
    );
};

export default withRouter(Login);