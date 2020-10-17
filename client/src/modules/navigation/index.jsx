import React, {useEffect, useState} from 'react'
import {
    Collapse,
    Button,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav
} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom'
import * as firebase from "firebase";
import axios from 'axios'
import { connect } from 'react-redux'
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navigation(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [cU, setCurrentUser]  = useState(null)

    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        console.log(props.user, props.currentlyLoggedIn)
        async function checkForUserAuthenticity() {
            const currentUser = firebase.auth().currentUser
            if (currentUser) {
                const fetchUserData = await axios.get(`/api/auth/get_user_details/${await currentUser.getIdToken()}`)
                console.log(fetchUserData)

                if (fetchUserData.data.status === 200) {
                    setCurrentUser(fetchUserData.data.data)
                    if (fetchUserData.data.data.type === "user") {
                        props.mountUserToStore(fetchUserData.data.data)
                    } else {
                        props.mountRestaurantToStore(fetchUserData.data.data)
                    }
                } else {
                    await firebase.auth().signOut()
                    setCurrentUser(null)
                }
            }
        }
        checkForUserAuthenticity()
    }, [])

    const handleLogout = async (e) => {
        e.preventDefault()

        let token;
        if (props.currentlyLoggedIn === "user") {
            token = props.user.access_token
        } else {
            token = props.restaurant.access_token
        }

        const status = await axios.put('/api/auth/logout', {
            type: props.currentlyLoggedIn,
            access_token: token
        })
        console.log(status)

        if (props.currentlyLoggedIn === "user") {
            props.unmountUser()
        } else {
            props.unmountRestaurant()
        }
        await firebase.auth().signOut()
        await setCurrentUser(null)
    }

    const show_cart = (e) => {
        e.preventDefault()
        console.log('showing cart')
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
                        cU === null ? (
                            <Link
                                to='/signup'
                                className="login-signup">
                                Signup/Login
                            </Link>
                        ) : (
                            <div  className="logout-cart">
                                <Button
                                    color="warning"
                                    onClick={show_cart}
                                    // className="login-signup"
                                >
                                    <FontAwesomeIcon icon={faCartPlus} size="2x" />
                                </Button>
                                <button
                                    onClick={handleLogout}
                                    className="login-signup"
                                >
                                    Logout
                                </button>
                            </div>
                        )
                    }
                </Collapse>
            </Navbar>
        </div>
    )
}

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
        mountUserToStore: (user) => { dispatch({ type: "MOUNT_USER", user }) },
        mountRestaurantToStore: (restaurant) => { dispatch({ type: "MOUNT_RESTAURANT", restaurant }) },
        unmountRestaurant: () => { dispatch({ type: "UNMOUNT_RESTAURANT" }) },
        unmountUser: () => { dispatch({ type: "UNMOUNT_USER" }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)

