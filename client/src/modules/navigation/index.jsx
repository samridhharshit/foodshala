import React, {useEffect, useState} from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav
} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom'
import * as firebase from "firebase";
import axios from 'axios'

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [redirectToSignupPage, setRedirectToSignupPage] = useState(false)
    const [cU, setCurrentUser]  = useState(null)

    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        async function checkForUserAuthenticity() {
            const currentUser = firebase.auth().currentUser
            if (currentUser) {
                console.log(await currentUser.getIdToken())
                const fetchUserData = await axios.get(`/api/auth/get_user_details/${await currentUser.getIdToken()}`)
                console.log(fetchUserData)
                if (fetchUserData.data.status === 200) {
                    setCurrentUser(fetchUserData.data.data)
                }
            }
        }
        checkForUserAuthenticity()
    }, [])

    const handleLogout = (e) => {
        e.preventDefault()
        firebase.auth().signOut()
        setRedirectToSignupPage(false)
        setCurrentUser(null)
        return <Redirect to='/' />
    }

    if(redirectToSignupPage) {
        return <Redirect to="/signup" />
    }

    return (
        <div>
            <Navbar
                sticky={true}
                style={{backgroundColor: '#f1e8ae'}}
                light expand="md"
            >
                <NavbarBrand
                    className="title"
                    href="/"
                >
                    foodShala
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar />
                    {
                        cU !== null ? (
                            <button
                                onClick={handleLogout}
                                className="login-signup">
                                Logout
                            </button>
                        ) : (
                            <Link
                                to='/signup'
                                className="login-signup">
                                Signup/Login
                            </Link>
                        )
                    }
                </Collapse>
            </Navbar>
        </div>
    )
}